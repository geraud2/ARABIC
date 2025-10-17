import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, BookOpen, Filter, Search, Volume2, Star, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface VocabularyWord {
  id: number;
  arabic: string;
  translation: string;
  pronunciation: string;
  masteryLevel: number;
  lastReviewed: string;
  reviewInterval: number;
  category?: string;
  example?: string;
}

const VocabularyPage = () => {
  const navigate = useNavigate();
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [filteredVocabulary, setFilteredVocabulary] = useState<VocabularyWord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'review' | 'mastered'>('all');
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);

  // Charger le vocabulaire
  useEffect(() => {
    const savedVocabulary = localStorage.getItem('fisabil_vocabulary');
    if (savedVocabulary) {
      const vocab = JSON.parse(savedVocabulary);
      setVocabulary(vocab);
      setFilteredVocabulary(vocab);
    }
  }, []);

  // Filtrer le vocabulaire
  useEffect(() => {
    let filtered = vocabulary;

    // Filtre par statut
    if (filter === 'new') {
      filtered = filtered.filter(word => word.masteryLevel < 0.3);
    } else if (filter === 'review') {
      filtered = filtered.filter(word => {
        const lastReviewed = new Date(word.lastReviewed);
        const daysSinceReview = (Date.now() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceReview >= word.reviewInterval;
      });
    } else if (filter === 'mastered') {
      filtered = filtered.filter(word => word.masteryLevel >= 0.8);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(word => 
        word.arabic.includes(searchTerm) || 
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVocabulary(filtered);
  }, [vocabulary, filter, searchTerm]);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const updateMasteryLevel = (wordId: number, newLevel: number) => {
    const updatedVocabulary = vocabulary.map(word => 
      word.id === wordId 
        ? { 
            ...word, 
            masteryLevel: newLevel,
            lastReviewed: new Date().toISOString(),
            reviewInterval: newLevel >= 0.8 ? 7 : newLevel >= 0.5 ? 3 : 1
          }
        : word
    );
    
    setVocabulary(updatedVocabulary);
    localStorage.setItem('fisabil_vocabulary', JSON.stringify(updatedVocabulary));
  };

  const deleteWord = (wordId: number) => {
    const updatedVocabulary = vocabulary.filter(word => word.id !== wordId);
    setVocabulary(updatedVocabulary);
    localStorage.setItem('fisabil_vocabulary', JSON.stringify(updatedVocabulary));
  };

  const getMasteryColor = (level: number) => {
    if (level >= 0.8) return '#53B16F';
    if (level >= 0.5) return '#53B16F';
    return '#53B16F';
  };

  const getMasteryLabel = (level: number) => {
    if (level >= 0.8) return 'Maîtrisé';
    if (level >= 0.5) return 'Intermédiaire';
    return 'Nouveau';
  };

  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter(word => word.masteryLevel >= 0.8).length,
    dueForReview: vocabulary.filter(word => {
      const lastReviewed = new Date(word.lastReviewed);
      const daysSinceReview = (Date.now() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceReview >= word.reviewInterval;
    }).length,
    newWords: vocabulary.filter(word => word.masteryLevel < 0.3).length
  };

  const filters = [
    { key: 'all' as const, label: 'Tous', count: stats.total },
    { key: 'new' as const, label: 'Nouveaux', count: stats.newWords },
    { key: 'review' as const, label: 'À réviser', count: stats.dueForReview },
    { key: 'mastered' as const, label: 'Maîtrisés', count: stats.mastered }
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#53B16F]/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#53B16F]">
              Mon Vocabulaire
            </h1>
            <p className="text-xs text-[#53B16F]/70">{stats.total} mots personnalisés</p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3"
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterItem.key)}
              className={`p-3 rounded-2xl text-center transition-all ${
                filter === filterItem.key
                  ? 'bg-[#53B16F] text-white shadow-lg'
                  : 'bg-[#53B16F]/10 text-[#53B16F] border border-[#53B16F]/20'
              }`}
            >
              <div className="text-lg font-bold">{filterItem.count}</div>
              <div className="text-xs">{filterItem.label}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#53B16F]/60" />
          <input
            type="text"
            placeholder="Rechercher un mot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#53B16F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent text-[#53B16F] placeholder-[#53B16F]/40"
          />
        </motion.div>

        {/* Liste du vocabulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <AnimatePresence>
            {filteredVocabulary.length > 0 ? (
              filteredVocabulary.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedWord(word)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl font-arabic text-[#53B16F]">
                          {word.arabic}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(word.arabic);
                          }}
                          className="p-2 bg-[#53B16F]/10 rounded-full hover:bg-[#53B16F]/20 transition-colors"
                        >
                          <Volume2 className="w-4 h-4 text-[#53B16F]" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-[#53B16F] font-medium">
                          {word.translation}
                        </div>
                        <div className="text-xs text-[#53B16F]/60">
                          {word.pronunciation}
                        </div>
                      </div>

                      {word.example && (
                        <div className="mt-2 p-2 bg-[#53B16F]/5 rounded-lg">
                          <div className="text-xs text-[#53B16F]/70">{word.example}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {/* Niveau de maîtrise */}
                      <div 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getMasteryColor(word.masteryLevel) }}
                      >
                        {getMasteryLabel(word.masteryLevel)}
                      </div>

                      {/* Bouton suppression */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWord(word.id);
                        }}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-[#53B16F]/60 mb-1">
                      <span>Maîtrise</span>
                      <span>{Math.round(word.masteryLevel * 100)}%</span>
                    </div>
                    <div className="w-full bg-[#53B16F]/10 rounded-full h-2">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${word.masteryLevel * 100}%`,
                          backgroundColor: getMasteryColor(word.masteryLevel)
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <BookOpen className="w-16 h-16 text-[#53B16F]/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#53B16F] mb-2">
                  Aucun mot trouvé
                </h3>
                <p className="text-[#53B16F]/70 text-sm mb-4">
                  {vocabulary.length === 0 
                    ? "Scanne tes premiers textes pour créer ton vocabulaire personnalisé"
                    : "Aucun mot ne correspond à votre recherche"
                  }
                </p>
                {vocabulary.length === 0 && (
                  <button
                    onClick={() => navigate('/scan')}
                    className="bg-[#53B16F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#53B16F]/90 transition-colors"
                  >
                    Scanner un texte
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bouton d'action */}
        {vocabulary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <button
              onClick={() => navigate('/review')}
              className="flex-1 bg-[#53B16F] text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Réviser maintenant
            </button>
            <button
              onClick={() => navigate('/scan')}
              className="flex-1 bg-white text-[#53B16F] font-medium py-3 px-4 rounded-xl shadow-lg border border-[#53B16F]/20 hover:shadow-xl transition-shadow"
            >
              Ajouter des mots
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal de détail du mot */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedWord(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-5xl font-arabic text-[#53B16F] mb-4">
                  {selectedWord.arabic}
                </div>
                <button
                  onClick={() => playAudio(selectedWord.arabic)}
                  className="bg-[#53B16F] text-white p-3 rounded-full hover:bg-[#53B16F]/90 transition-colors"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#53B16F]/70">Traduction</label>
                  <div className="text-[#53B16F] font-medium">{selectedWord.translation}</div>
                </div>
                <div>
                  <label className="text-sm text-[#53B16F]/70">Prononciation</label>
                  <div className="text-[#53B16F]">{selectedWord.pronunciation}</div>
                </div>
                <div>
                  <label className="text-sm text-[#53B16F]/70">Niveau de maîtrise</label>
                  <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => updateMasteryLevel(selectedWord.id, star * 0.2)}
                        className="text-2xl transition-colors"
                      >
                        <Star
                          className={star * 0.2 <= selectedWord.masteryLevel 
                            ? "text-[#53B16F] fill-current" 
                            : "text-[#53B16F]/30"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="w-full mt-6 bg-[#53B16F] text-white py-3 rounded-xl font-medium hover:bg-[#53B16F]/90 transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default VocabularyPage;
