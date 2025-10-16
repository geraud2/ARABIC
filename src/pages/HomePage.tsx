import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const HomePage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('arabikaUser') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E5] to-[#F8F0E0] pb-20">
      
      {/* Contenu principal */}
      <div className="p-6 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-center mb-8 pt-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#CBA76A] to-[#8B5E3C] mb-6 shadow-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-[#3E2C1E] mb-3"
          >
            Arabika
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-[#8B5E3C]"
          >
            تعلم العربية
          </motion.p>

          {userData.name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[#8B5E3C] mt-2 text-sm"
            >
              Bon retour, <span className="font-semibold">{userData.name}</span> !
            </motion.p>
          )}
        </motion.div>

        {/* Carte principale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-[#CBA76A]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#CBA76A]" />
            <h2 className="text-lg font-semibold text-[#3E2C1E]">
              Ton aventure arabe
            </h2>
          </div>

          <p className="text-[#8B5E3C] leading-relaxed mb-6 text-sm">
            Apprends l'arabe avec {userData.teacher || 'ton assistant'} IA. 
            Découvre les lettres, la prononciation et la culture arabe.
          </p>

          <div className="space-y-2 mb-6">
            {[
              "Leçons interactives avec IA",
              "Prononciation audio intégrée", 
              "Progression personnalisée",
              "Culture et traditions arabes"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-xs text-[#8B5E3C]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CBA76A]"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/chat')}
            className="w-full bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm"
          >
            Commencer une leçon
          </motion.button>
        </motion.div>

        {/* Cartes rapides - MODIFIÉ POUR 3 COLONNES */}
        <div className="grid grid-cols-3 gap-3 mb-6"> {/* Changé de 2 à 3 colonnes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-3 shadow-lg border border-[#CBA76A]/10 cursor-pointer"
            onClick={() => navigate('/chat')}
          >
            <div className="text-center">
              <MessageCircle className="w-5 h-5 text-[#CBA76A] mx-auto mb-1" />
              <div className="text-[#3E2C1E] font-semibold text-xs">Chat</div>
              <div className="text-[#8B5E3C] text-xs">Apprendre</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl p-3 shadow-lg border border-[#CBA76A]/10 cursor-pointer"
            onClick={() => navigate('/courses')}
          >
            <div className="text-center">
              <BookOpen className="w-5 h-5 text-[#CBA76A] mx-auto mb-1" />
              <div className="text-[#3E2C1E] font-semibold text-xs">Parcours</div>
              <div className="text-[#8B5E3C] text-xs">Modules</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-2xl p-3 shadow-lg border border-[#CBA76A]/10 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <div className="text-center">
              <User className="w-5 h-5 text-[#CBA76A] mx-auto mb-1" />
              <div className="text-[#3E2C1E] font-semibold text-xs">Profil</div>
              <div className="text-[#8B5E3C] text-xs">Stats</div>
            </div>
          </motion.div>
        </div>

        {/* Statistiques rapides */}
        {userData.level && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl p-4 shadow-lg border border-[#CBA76A]/10"
          >
            <h3 className="text-[#3E2C1E] font-semibold text-sm mb-3 text-center">
              Ton profil
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[#3E2C1E] font-bold text-xs">Niveau</div>
                <div className="text-[#8B5E3C] text-xs capitalize">{userData.level}</div>
              </div>
              <div>
                <div className="text-[#3E2C1E] font-bold text-xs">Objectifs</div>
                <div className="text-[#8B5E3C] text-xs">{userData.goals?.length || 0}</div>
              </div>
              <div>
                <div className="text-[#3E2C1E] font-bold text-xs">Style</div>
                <div className="text-[#8B5E3C] text-xs">{userData.learningStyle?.length || 0}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Barre de navigation en bas */}
      <BottomNav />
    </div>
  );
};

export default HomePage;