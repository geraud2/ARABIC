import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FFF6E5] to-[#F8F0E0] flex items-center justify-center z-50 overflow-hidden">
      
      {/* Éléments décoratifs arabes */}
      <div className="absolute inset-0 opacity-5">
        {/* Motifs arabesques */}
        <div className="absolute top-10 left-10 text-6xl text-[#8B5E3C]">﷽</div>
        <div className="absolute bottom-10 right-10 text-6xl text-[#8B5E3C]">﷽</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-[#CBA76A]">۞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl text-[#CBA76A]">۞</div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-8 max-w-md">
        
        {/* Icône mosquée stylisée */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-6xl text-[#8B5E3C] mb-4">🕌</div>
          
          {/* Étoile arabe au-dessus de la mosquée */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-2xl text-[#CBA76A] mb-2"
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <h1 className="text-4xl font-bold text-[#3E2C1E] mb-2">
            عَرَبِيكا
          </h1>
          
          {/* Ligne décorative */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-0.5 bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] mx-auto mb-4"
          ></motion.div>
          
          <p className="text-[#8B5E3C] text-lg font-medium">
            بوابة تعلم اللغة العربية
          </p>
          <p className="text-[#CBA76A] text-sm mt-2">
            Votre porte d'entrée vers la langue arabe
          </p>
        </motion.div>

        {/* Indicateur de chargement style arabe */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-1 mb-4">
            {["ا", "ب", "ت", "ث", "ج", "ح"].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2,
                }}
                className="text-[#8B5E3C] text-lg font-bold"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <p className="text-[#8B5E3C] text-xs opacity-70">
            جاري التحميل...
          </p>
        </motion.div>

        {/* Calligraphie du Basmala en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-[#8B5E3C] text-lg font-arabic">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;