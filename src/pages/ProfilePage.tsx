import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Target, Clock, BookOpen, TrendingUp, Home, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalWords: 0,
    masteredWords: 0,
    scannedTexts: 0,
    studyTime: 0,
    dailyGoal: 20,
    streak: 0
  });

  useEffect(() => {
    // Charger les statistiques Fisabil
    const savedVocabulary = localStorage.getItem('fisabil_vocabulary');
    const savedTexts = localStorage.getItem('fisabil_scanned_texts');
    const userData = localStorage.getItem('fisabilUser');
    
    let totalWords = 0;
    let masteredWords = 0;
    let scannedTexts = 0;

    if (savedVocabulary) {
      const vocabulary = JSON.parse(savedVocabulary);
      totalWords = vocabulary.length;
      masteredWords = vocabulary.filter((word: any) => word.masteryLevel >= 0.8).length;
    }

    if (savedTexts) {
      scannedTexts = JSON.parse(savedTexts).length;
    }

    setUserStats({
      totalWords,
      masteredWords,
      scannedTexts,
      studyTime: totalWords * 2, // Estimation : 2min par mot
      dailyGoal: 20,
      streak: 3 // Exemple de série
    });
  }, []);

  const masteryPercentage = userStats.totalWords > 0 
    ? Math.round((userStats.masteredWords / userStats.totalWords) * 100) 
    : 0;

  const statsCards = [
    { 
      icon: BookOpen, 
      label: 'Mots appris', 
      value: userStats.totalWords,
      subtitle: 'Vocabulaire personnel',
      color: '#53B16F'
    },
    { 
      icon: Target, 
      label: 'Maîtrisés', 
      value: userStats.masteredWords,
      subtitle: `${masteryPercentage}% de maîtrise`,
      color: '#53B16F' 
    },
    { 
      icon: Scan, 
      label: 'Textes scannés', 
      value: userStats.scannedTexts,
      subtitle: 'Documents analysés',
      color: '#53B16F'
    },
    { 
      icon: Clock, 
      label: 'Temps d\'étude', 
      value: `${userStats.studyTime}min`,
      subtitle: 'Cumulé',
      color: '#53B16F' 
    }
  ];

  const progressItems = [
    { label: 'Objectif quotidien', current: 8, total: userStats.dailyGoal, color: '#53B16F' },
    { label: 'Série actuelle', current: userStats.streak, total: 7, color: '#53B16F' },
    { label: 'Mots à réviser', current: Math.max(0, userStats.totalWords - userStats.masteredWords), total: userStats.totalWords, color: '#53B16F' }
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
              Mes Statistiques
            </h1>
            <p className="text-xs text-[#53B16F]/70">Tableau de bord d'apprentissage</p>
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
        {/* Bannière principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#53B16F] to-[#53B16F] rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Progression Globale</h2>
              <p className="text-white/80 text-sm">Basé sur ton vocabulaire personnel</p>
            </div>
            <BarChart3 className="w-8 h-8 text-white/80" />
          </div>

          <div className="bg-white/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Niveau de maîtrise</span>
              <span className="text-sm font-bold">{masteryPercentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${masteryPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-2 gap-4">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#53B16F]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#53B16F]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#53B16F]">{stat.value}</div>
                    <div className="text-xs text-[#53B16F]/70">{stat.label}</div>
                  </div>
                </div>
                <div className="text-xs text-[#53B16F]/60">{stat.subtitle}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Progression détaillée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-[#53B16F]/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-[#53B16F]" />
            <h3 className="text-lg font-semibold text-[#53B16F]">Progression Détaillée</h3>
          </div>

          <div className="space-y-4">
            {progressItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-[#53B16F] font-medium">{item.label}</span>
                  <span className="text-[#53B16F]/70">{item.current}/{item.total}</span>
                </div>
                <div className="w-full bg-[#53B16F]/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.current / item.total) * 100}%` }}
                    className="h-full bg-[#53B16F] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => navigate('/review')}
            className="bg-[#53B16F] text-white font-medium py-3 px-4 rounded-xl text-sm shadow-lg hover:shadow-xl transition-shadow"
          >
            Réviser
          </button>
          <button
            onClick={() => navigate('/scan')}
            className="bg-white text-[#53B16F] font-medium py-3 px-4 rounded-xl text-sm shadow-lg border border-[#53B16F]/20 hover:shadow-xl transition-shadow"
          >
            Scanner
          </button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ProfilePage;