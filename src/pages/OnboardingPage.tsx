import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Définir le type pour les noms d'icônes
type IconName = 
  | 'tea' | 'leaf' | 'plant' | 'tree' | 'target' | 'globe' 
  | 'book' | 'briefcase' | 'palette' | 'brain' | 'family' 
  | 'clock' | 'sun' | 'moon' | 'star' | 'ear' | 'eye' 
  | 'hand' | 'game' | 'teacher1' | 'teacher2' | 'teacher3';

// Composant Icon avec type
const Icon = ({ name, className = "" }: { name: IconName; className?: string }) => {
  const icons: Record<IconName, string> = {
    tea: "🫖",
    leaf: "🌱",
    plant: "🌿",
    tree: "🪴",
    target: "🎯",
    globe: "🌍",
    book: "📚",
    briefcase: "💼",
    palette: "🎨",
    brain: "🧠",
    family: "👨‍👩‍👧‍👦",
    clock: "⏰",
    sun: "☀️",
    moon: "🌙",
    star: "⭐",
    ear: "👂",
    eye: "👀",
    hand: "✍️",
    game: "🎮",
    teacher1: "👩‍🏫",
    teacher2: "👨‍🏫", 
    teacher3: "🧕"
  };

  return <span className={className}>{icons[name]}</span>;
};

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    level: "",
    goals: [] as string[],
    frequency: "",
    learningStyle: [] as string[],
    teacher: ""
  });
  const navigate = useNavigate();

  const steps = [
    {
      title: "Préparons ton voyage arabe",
      subtitle: "Comme un bon thé, l'arabe s'apprécie avec patience et régularité",
      illustration: "tea" as IconName,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-[#3E2C1E] text-sm font-medium mb-2 text-left">
              Comment t'appelles-tu ?
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-4 py-3 border border-[#CBA76A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBA76A] focus:border-transparent"
              placeholder="Ton prénom"
            />
          </div>
          <div>
            <label className="block text-[#3E2C1E] text-sm font-medium mb-2 text-left">
              Quel âge as-tu ?
            </label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
              className="w-full px-4 py-3 border border-[#CBA76A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBA76A] focus:border-transparent"
              placeholder="Ton âge"
              min="5"
              max="100"
            />
          </div>
        </div>
      )
    },
    {
      title: "Quel est ton niveau en arabe ?",
      subtitle: "Choisis ton point de départ pour un apprentissage personnalisé",
      illustration: "leaf" as IconName,
      content: (
        <div className="space-y-3">
          {[
            { icon: "leaf" as IconName, text: "Débutant - Je découvre l'alphabet", value: "beginner" },
            { icon: "plant" as IconName, text: "Intermédiaire - Je connais les bases", value: "intermediate" },
            { icon: "tree" as IconName, text: "Avancé - Je veux me perfectionner", value: "advanced" }
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserData({...userData, level: option.value})}
              className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-3 transition-all ${
                userData.level === option.value 
                  ? 'border-[#CBA76A] bg-[#FFF6E5]' 
                  : 'border-gray-200 hover:border-[#CBA76A]'
              }`}
            >
              <Icon name={option.icon} className="text-2xl" />
              <span className="text-[#3E2C1E]">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: "Pourquoi veux-tu apprendre l'arabe ?",
      subtitle: "Sélectionne toutes tes motivations (plusieurs choix possibles)",
      illustration: "target" as IconName,
      content: (
        <div className="space-y-3">
          {[
            { icon: "globe" as IconName, text: "Voyager dans les pays arabes", value: "travel" },
            { icon: "book" as IconName, text: "Lire le Coran", value: "quran" },
            { icon: "briefcase" as IconName, text: "Raisons professionnelles", value: "work" },
            { icon: "palette" as IconName, text: "Apprécier la culture arabe", value: "culture" },
            { icon: "brain" as IconName, text: "Défi personnel", value: "challenge" },
            { icon: "family" as IconName, text: "Communiquer avec la famille", value: "family" }
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const updatedGoals = userData.goals.includes(option.value)
                  ? userData.goals.filter(g => g !== option.value)
                  : [...userData.goals, option.value];
                setUserData({...userData, goals: updatedGoals});
              }}
              className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-3 transition-all ${
                userData.goals.includes(option.value)
                  ? 'border-[#CBA76A] bg-[#FFF6E5]' 
                  : 'border-gray-200 hover:border-[#CBA76A]'
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6 border-2 rounded border-current">
                {userData.goals.includes(option.value) && (
                  <div className="w-3 h-3 bg-[#CBA76A] rounded-sm" />
                )}
              </div>
              <Icon name={option.icon} className="text-xl" />
              <span className="text-[#3E2C1E]">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: "Quel temps peux-tu consacrer ?",
      subtitle: "Choisis ton rythme d'apprentissage idéal",
      illustration: "clock" as IconName,
      content: (
        <div className="space-y-3">
          {[
            { icon: "sun" as IconName, text: "5 min/jour - Léger comme un thé", value: "light" },
            { icon: "moon" as IconName, text: "15 min/jour - Régulier comme l'appel à la prière", value: "regular" },
            { icon: "star" as IconName, text: "30 min/jour - Intense comme un café turc", value: "intense" }
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserData({...userData, frequency: option.value})}
              className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-3 transition-all ${
                userData.frequency === option.value 
                  ? 'border-[#CBA76A] bg-[#FFF6E5]' 
                  : 'border-gray-200 hover:border-[#CBA76A]'
              }`}
            >
              <Icon name={option.icon} className="text-2xl" />
              <span className="text-[#3E2C1E]">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: "Comment préfères-tu apprendre ?",
      subtitle: "Sélectionne tes styles d'apprentissage préférés",
      illustration: "brain" as IconName,
      content: (
        <div className="space-y-3">
          {[
            { icon: "ear" as IconName, text: "Auditif - J'apprends en écoutant", value: "auditory" },
            { icon: "eye" as IconName, text: "Visuel - J'ai besoin de voir l'écriture", value: "visual" },
            { icon: "hand" as IconName, text: "Pratique - Je veux écrire et répéter", value: "kinesthetic" },
            { icon: "game" as IconName, text: "Ludique - J'aime les jeux et défis", value: "gamified" }
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const updatedStyles = userData.learningStyle.includes(option.value)
                  ? userData.learningStyle.filter(s => s !== option.value)
                  : [...userData.learningStyle, option.value];
                setUserData({...userData, learningStyle: updatedStyles});
              }}
              className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-3 transition-all ${
                userData.learningStyle.includes(option.value)
                  ? 'border-[#CBA76A] bg-[#FFF6E5]' 
                  : 'border-gray-200 hover:border-[#CBA76A]'
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6 border-2 rounded border-current">
                {userData.learningStyle.includes(option.value) && (
                  <div className="w-3 h-3 bg-[#CBA76A] rounded-sm" />
                )}
              </div>
              <Icon name={option.icon} className="text-xl" />
              <span className="text-[#3E2C1E]">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: "Choisis ton professeur IA",
      subtitle: "Ton compagnon pour ce voyage linguistique",
      illustration: "book" as IconName,
      content: (
        <div className="space-y-4">
          {[
            { icon: "teacher1" as IconName, name: "Leila", desc: "Patiente et encourageante", color: "#CBA76A" },
            { icon: "teacher2" as IconName, name: "Omar", desc: "Dynamique et passionné", color: "#8B5E3C" },
            { icon: "teacher3" as IconName, name: "Fatima", desc: "Traditionnelle et rigoureuse", color: "#3E2C1E" }
          ].map((teacher) => (
            <motion.button
              key={teacher.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserData({...userData, teacher: teacher.name})}
              className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-4 transition-all ${
                userData.teacher === teacher.name
                  ? 'border-[#CBA76A] bg-[#FFF6E5]' 
                  : 'border-gray-200 hover:border-[#CBA76A]'
              }`}
            >
              <Icon name={teacher.icon} className="text-3xl" />
              <div>
                <div className="font-semibold text-[#3E2C1E]">{teacher.name}</div>
                <div className="text-sm text-[#8B5E3C]">{teacher.desc}</div>
              </div>
            </motion.button>
          ))}
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Sauvegarde des données et redirection
      console.log("Données utilisateur:", userData);
      localStorage.setItem('arabikaUser', JSON.stringify(userData));
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) return userData.name && userData.age;
    if (currentStep === 1) return userData.level;
    if (currentStep === 2) return userData.goals.length > 0;
    if (currentStep === 3) return userData.frequency;
    if (currentStep === 4) return userData.learningStyle.length > 0;
    if (currentStep === 5) return userData.teacher;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E5] to-[#F8F0E0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        
        {/* Indicateur de progression */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-[#CBA76A] w-6' 
                    : index < currentStep 
                    ? 'bg-[#8B5E3C]' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center"
          >
            {/* Illustration */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-6xl mb-4"
            >
              <Icon name={steps[currentStep].illustration} />
            </motion.div>
            
            {/* Titre */}
            <h2 className="text-2xl font-bold text-[#3E2C1E] mb-2">
              {steps[currentStep].title}
            </h2>
            
            {/* Sous-titre */}
            <p className="text-[#8B5E3C] mb-6">
              {steps[currentStep].subtitle}
            </p>

            {/* Contenu de l'étape */}
            <div className="mb-6">
              {steps[currentStep].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        <div className="flex justify-between items-center">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-[#8B5E3C] hover:bg-[#FFF6E5]'
            }`}
          >
            Retour
          </button>
          
          <motion.button
            whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
            whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-8 py-3 rounded-xl font-medium shadow-lg transition-all ${
              isStepValid()
                ? 'bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Commencer →' : 'Continuer →'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;