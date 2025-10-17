import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Volume2, Play, Pause, SkipBack, SkipForward, Download, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface AudioDocument {
  id: number;
  title: string;
  content: string;
  date: string;
  wordCount: number;
  audioProgress?: number;
}

const AudioPage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<AudioDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<AudioDocument | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Charger les documents scannés
  useEffect(() => {
    const savedTexts = localStorage.getItem('fisabil_scanned_texts');
    if (savedTexts) {
      const texts = JSON.parse(savedTexts);
      const audioDocs = texts.map((text: any) => ({
        id: text.id,
        title: `Texte du ${new Date(text.date).toLocaleDateString()}`,
        content: text.content,
        date: text.date,
        wordCount: text.wordCount,
        audioProgress: 0
      }));
      setDocuments(audioDocs);
    }
  }, []);

  // Simulation génération audio
  const generateAudio = async (document: AudioDocument) => {
    setIsGenerating(true);
    
    // Simulation API TTS - À REMPLACER PAR UN VRAI SERVICE
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsGenerating(false);
        setSelectedDoc(document);
        resolve();
      }, 2000);
    });
  };

  const playAudio = () => {
    if (!selectedDoc) return;
    
    // Simulation lecture - À REMPLACER PAR VRAI AUDIO
    setIsPlaying(true);
    
    // Simulation progression
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + (playbackRate * 0.5);
      });
    }, 100);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    // En vrai implémentation, on stopperait l'audio ici
  };

  const seekAudio = (percent: number) => {
    setCurrentTime(percent);
    // En vrai implémentation, on seekerait l'audio
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const downloadAudio = () => {
    if (!selectedDoc) return;
    
    // Simulation téléchargement
    const element = document.createElement('a');
    const file = new Blob([selectedDoc.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `audio-${selectedDoc.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getPlaybackRateLabel = () => {
    return `${playbackRate}x`;
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
              Lecture Vocale
            </h1>
            <p className="text-xs text-[#53B16F]/70">Écoute tes textes en arabe</p>
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
        {/* Lecteur audio principal */}
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#53B16F] to-[#53B16F] rounded-3xl p-6 text-white shadow-xl"
          >
            <div className="text-center mb-6">
              <Volume2 className="w-12 h-12 mx-auto mb-3 text-white/80" />
              <h2 className="text-xl font-bold mb-2">{selectedDoc.title}</h2>
              <p className="text-white/80 text-sm">
                {selectedDoc.wordCount} mots • {Math.round(selectedDoc.wordCount * 0.5)}s estimé
              </p>
            </div>

            {/* Contrôles audio */}
            <div className="space-y-4">
              {/* Barre de progression */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/80">
                  <span>{Math.floor(currentTime)}s</span>
                  <span>{Math.round(selectedDoc.wordCount * 0.5)}s</span>
                </div>
                <div 
                  className="w-full bg-white/20 rounded-full h-3 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width * 100;
                    seekAudio(percent);
                  }}
                >
                  <motion.div
                    className="h-full bg-white rounded-full relative"
                    style={{ width: `${currentTime}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                  </motion.div>
                </div>
              </div>

              {/* Contrôles de lecture */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={changePlaybackRate}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  {getPlaybackRateLabel()}
                </button>

                <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={isPlaying ? pauseAudio : playAudio}
                  className="p-4 bg-white text-[#53B16F] rounded-full hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={downloadAudio}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Aperçu du texte */}
            <div className="mt-6 bg-white/10 rounded-2xl p-4 max-h-32 overflow-y-auto">
              <div className="text-lg font-arabic text-right leading-loose text-white">
                {selectedDoc.content.substring(0, 200)}...
              </div>
            </div>
          </motion.div>
        )}

        {/* Liste des documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#53B16F]">Tes Textes</h3>
            <span className="text-sm text-[#53B16F]/70">{documents.length} documents</span>
          </div>

          {documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => generateAudio(doc)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#53B16F]/10 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-[#53B16F]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#53B16F] text-sm">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-[#53B16F]/70">
                            {doc.wordCount} mots • {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#53B16F]/5 rounded-lg p-3 mt-2">
                        <div className="text-sm font-arabic text-right text-[#53B16F] leading-relaxed line-clamp-2">
                          {doc.content.substring(0, 100)}...
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {isGenerating && selectedDoc?.id === doc.id ? (
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                              className="w-2 h-2 rounded-full bg-[#53B16F]"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-[#53B16F] rounded-full flex items-center justify-center">
                          <Volume2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Volume2 className="w-16 h-16 text-[#53B16F]/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#53B16F] mb-2">
                Aucun texte disponible
              </h3>
              <p className="text-[#53B16F]/70 text-sm mb-4">
                Scanne tes premiers textes pour générer des audios
              </p>
              <button
                onClick={() => navigate('/scan')}
                className="bg-[#53B16F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#53B16F]/90 transition-colors"
              >
                Scanner un texte
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Fonctionnalités avancées */}
        {documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20"
          >
            <h4 className="font-semibold text-[#53B16F] mb-3">Fonctionnalités Audio</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 p-3 bg-[#53B16F]/5 rounded-xl">
                <div className="w-8 h-8 bg-[#53B16F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">0.5x</span>
                </div>
                <span className="text-[#53B16F]">Vitesse lente</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#53B16F]/5 rounded-xl">
                <div className="w-8 h-8 bg-[#53B16F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">1.5x</span>
                </div>
                <span className="text-[#53B16F]">Vitesse rapide</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#53B16F]/5 rounded-xl">
                <div className="w-8 h-8 bg-[#53B16F] rounded-full flex items-center justify-center">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#53B16F]">Télécharger</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#53B16F]/5 rounded-xl">
                <div className="w-8 h-8 bg-[#53B16F] rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#53B16F]">Mode lecture</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default AudioPage;