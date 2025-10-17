import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, BookOpen, RefreshCw, Target, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [userVocabulary, setUserVocabulary] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    totalWords: 0,
    mastered: 0,
    dueForReview: 0,
    dailyGoal: 20
  });

  // Charger le vocabulaire personnalisé de l'utilisateur
  useEffect(() => {
    const savedVocabulary = localStorage.getItem('fisabil_vocabulary');
    const savedTexts = localStorage.getItem('fisabil_scanned_texts');
    
    if (savedVocabulary) {
      const vocabulary = JSON.parse(savedVocabulary);
      setUserVocabulary(vocabulary);
      
      // Calculer les statistiques de révision
      const mastered = vocabulary.filter((word: any) => word.masteryLevel >= 0.8).length;
      const dueForReview = vocabulary.filter((word: any) => {
        const lastReviewed = new Date(word.lastReviewed);
        const daysSinceReview = (Date.now() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceReview >= word.reviewInterval;
      }).length;

      setReviewStats({
        totalWords: vocabulary.length,
        mastered,
        dueForReview,
        dailyGoal: 20
      });
    }
  }, []);

  const reviewSessions = [
    {
      title: "Révision Express",
      description: "15 mots à réviser aujourd'hui",
      icon: "⚡",
      duration: "5-10 min",
      type: "quick",
      words: Math.min(15, reviewStats.dueForReview),
      color: "from-[#53B16F] to-[#53B16F]"
    },
    {
      title: "Session Complète", 
      description: "Tous les mots dus",
      icon: "📚",
      duration: "15-20 min",
      type: "full",
      words: reviewStats.dueForReview,
      color: "from-[#53B16F] to-[#53B16F]/80"
    },
    {
      title: "Nouveaux Mots",
      description: "Découvrir du nouveau vocabulaire",
      icon: "🆕",
      duration: "10-15 min",
      type: "new",
      words: "10+",
      color: "from-[#53B16F]/80 to-[#53B16F]"
    },
    {
      title: "Quiz Personnalisé",
      description: "Basé sur tes difficultés",
      icon: "🎯",
      duration: "10 min",
      type: "quiz",
      words: "Variable",
      color: "from-[#53B16F] to-[#53B16F]/60"
    }
  ];

  const startReviewSession = (sessionType: string) => {
    // Sauvegarder le type de session
    localStorage.setItem('fisabil_review_session', sessionType);
    
    // Rediriger vers la page de révision
    navigate('/review');
  };

  const getMasteryLevel = () => {
    if (reviewStats.totalWords === 0) return 0;
    return Math.round((reviewStats.mastered / reviewStats.totalWords) * 100);
  };

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
              Révision Intelligente
            </h1>
            <p className="text-xs text-[#53B16F]/70">Basé sur ton vocabulaire</p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Bannière de progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#53B16F] to-[#53B16F] rounded-3xl p-6 text-white shadow-xl mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Ta Maîtrise du Vocabulaire</h2>
              <p className="text-white/80 text-sm">Système de révision espacée</p>
            </div>
            <Target className="w-8 h-8 text-white/80" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-2xl p-3">
              <div className="text-lg font-bold">{reviewStats.totalWords}</div>
              <div className="text-xs text-white/80">Mots appris</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-3">
              <div className="text-lg font-bold">{reviewStats.mastered}</div>
              <div className="text-xs text-white/80">Maîtrisés</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-3">
              <div className="text-lg font-bold">{reviewStats.dueForReview}</div>
              <div className="text-xs text-white/80">À réviser</div>
            </div>
          </div>

          {/* Barre de maîtrise */}
          <div className="mt-4 bg-white/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Niveau de maîtrise</span>
              <span className="text-sm font-bold">{getMasteryLevel()}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getMasteryLevel()}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Sessions de révision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#53B16F]">Sessions de Révision</h3>
            <RefreshCw className="w-5 h-5 text-[#53B16F]" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {reviewSessions.map((session, index) => (
              <motion.div
                key={session.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br ${session.color} rounded-2xl p-4 text-white shadow-lg cursor-pointer`}
                onClick={() => startReviewSession(session.type)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">{session.icon}</div>
                  <div className="flex items-center gap-1 text-white/80 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{session.duration}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-sm mb-1">{session.title}</h4>
                <p className="text-white/80 text-xs mb-2">{session.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">
                    {typeof session.words === 'number' ? `${session.words} mots` : session.words}
                  </span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vocabulaire récent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#53B16F]">Vocabulaire Récent</h3>
            <button 
              onClick={() => navigate('/vocabulary')}
              className="text-[#53B16F] text-sm font-medium"
            >
              Voir tout
            </button>
          </div>

          {userVocabulary.length > 0 ? (
            <div className="space-y-3">
              {userVocabulary.slice(0, 5).map((word: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#53B16F]/5 rounded-xl">
                  <div>
                    <div className="font-semibold text-[#53B16F] text-sm">{word.arabic}</div>
                    <div className="text-[#53B16F]/70 text-xs">{word.translation}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    word.masteryLevel >= 0.8 ? 'bg-[#53B16F]' : 
                    word.masteryLevel >= 0.5 ? 'bg-[#53B16F]/60' : 'bg-[#53B16F]/30'
                  }`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <BookOpen className="w-12 h-12 text-[#53B16F]/30 mx-auto mb-2" />
              <p className="text-[#53B16F]/70 text-sm">
                Scanne tes premiers textes pour créer ton vocabulaire personnalisé
              </p>
              <button 
                onClick={() => navigate('/scan')}
                className="mt-3 bg-[#53B16F] text-white px-4 py-2 rounded-xl text-sm font-medium"
              >
                Scanner un texte
              </button>
            </div>
          )}
        </motion.div>

        {/* Objectif quotidien */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20 mt-4"
        >
          <h4 className="font-semibold text-[#53B16F] mb-3">Objectif Quotidien</h4>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#53B16F]/70">Mots révisés aujourd'hui</div>
              <div className="text-2xl font-bold text-[#53B16F]">0/{reviewStats.dailyGoal}</div>
            </div>
            <div className="w-16 h-16 bg-[#53B16F]/10 rounded-full flex items-center justify-center">
              <span className="text-[#53B16F] font-bold">0%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CoursesPage;