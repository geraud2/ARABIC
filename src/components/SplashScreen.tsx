import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      
      {/* Éléments décoratifs arabes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-[#53B16F]">﷽</div>
        <div className="absolute bottom-10 right-10 text-6xl text-[#53B16F]">﷽</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-[#53B16F]">۞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl text-[#53B16F]">۞</div>
        <div className="absolute top-20 right-20 text-3xl text-[#53B16F]">۩</div>
        <div className="absolute bottom-20 left-20 text-3xl text-[#53B16F]">۩</div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-8 w-full max-w-md">
        
        {/* LOGO FISABIL */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Logo Fisabil avec bord arrondi */}
          <img 
            src="fisa.jpeg" 
            alt="Fisabil"
            className="w-40 h-40 mx-auto mb-4 object-cover rounded-full border-4 border-[#53B16F] shadow-lg"
          />
          
          {/* Étoile arabe au-dessus du logo */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-3xl text-[#53B16F] mb-2"
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-[#53B16F] mb-4">
            في سبيل
          </h1>
          
          {/* Ligne décorative */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-1 bg-gradient-to-r from-[#53B16F] to-[#53B16F] mx-auto mb-4"
          ></motion.div>
          
          <p className="text-[#53B16F] text-xl font-medium mb-2">
            بوابة تعلم اللغة العربية
          </p>
          <p className="text-[#53B16F] text-base">
            Apprenez l'arabe avec intelligence
          </p>
        </motion.div>

        {/* Indicateur de chargement style arabe */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-2 mb-6">
            {["ا", "ب", "ت", "ث", "ج", "ح", "خ"].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.15,
                }}
                className="text-[#53B16F] text-xl font-bold"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <p className="text-[#53B16F] text-sm opacity-70">
            جاري التحميل... يرجى الانتظار
          </p>
        </motion.div>
      </div>

      {/* Calligraphie du Basmala en bas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full text-center"
      >
        <p className="text-[#53B16F] text-lg font-arabic px-4">
         
        </p>
        <p className="text-[#53B16F] text-sm mt-2">
          Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
        </p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;