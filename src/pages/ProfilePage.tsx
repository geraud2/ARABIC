import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, BookOpen, Flame, Star, Trophy, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

interface Progress {
  lesson: number;
  message: number;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Progress | null>(null);
  const userData = JSON.parse(localStorage.getItem('arabikaUser') || '{}');

  useEffect(() => {
    const savedProgress = localStorage.getItem('arabika_progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const totalLessons = 2;
  const completedLessons = progress ? Math.min(progress.lesson + 1, totalLessons) : 0;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const stats = [
    { icon: BookOpen, label: 'Leçons', value: `${completedLessons}/${totalLessons}`, color: '#CBA76A' },
    { icon: Flame, label: 'Série', value: '3 jours', color: '#8B5E3C' },
    { icon: Star, label: 'Points', value: completedLessons * 50, color: '#CBA76A' },
    { icon: Trophy, label: 'Niveau', value: userData.level || 'Débutant', color: '#8B5E3C' }
  ];

  const achievements = [
    { name: 'Premier pas', description: 'Commence ta première leçon', unlocked: completedLessons > 0 },
    { name: 'Alif maîtrisé', description: 'Apprends la lettre Alif', unlocked: completedLessons > 0 },
    { name: 'Persévérant', description: 'Continue 3 jours de suite', unlocked: false },
    { name: 'Expert', description: 'Termine toutes les leçons', unlocked: completedLessons >= totalLessons }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E5] to-[#F8F0E0] pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#CBA76A]/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#8B5E3C] hover:text-[#3E2C1E] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>

          <h1 className="text-lg font-semibold text-[#3E2C1E]">
            Mon Profil
          </h1>

          <button
            onClick={() => navigate('/home')}
            className="text-[#8B5E3C] hover:text-[#3E2C1E] transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Carte profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#CBA76A] to-[#8B5E3C] rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.name || 'Apprenant'}</h2>
              <p className="text-white/80 text-sm">Membre depuis aujourd'hui</p>
            </div>
          </div>

          <div className="bg-white/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progression globale</span>
              <span className="text-sm font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl p-4 shadow-lg border border-[#CBA76A]/20"
              >
                <Icon className="w-8 h-8 mb-2" style={{ color: stat.color }} />
                <div className="text-2xl font-bold text-[#3E2C1E]">{stat.value}</div>
                <div className="text-sm text-[#8B5E3C]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Accomplissements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-[#CBA76A]/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-[#CBA76A]" />
            <h3 className="text-lg font-semibold text-[#3E2C1E]">Accomplissements</h3>
          </div>

          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-[#CBA76A]/10 to-[#8B5E3C]/10 border border-[#CBA76A]/20'
                    : 'bg-gray-100 opacity-50 border border-gray-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-[#CBA76A] to-[#8B5E3C] text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {achievement.unlocked ? '🏆' : '🔒'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#3E2C1E] text-sm">{achievement.name}</div>
                  <div className="text-xs text-[#8B5E3C]">{achievement.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bouton continuer */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/chat')}
          className="w-full bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Continuer l'apprentissage
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ProfilePage;