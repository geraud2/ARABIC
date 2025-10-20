import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Définir le type pour les noms d'icônes
type IconName = 
  | 'tea' | 'leaf' | 'plant' | 'tree' | 'target' | 'globe' 
  | 'book' | 'briefcase' | 'palette' | 'brain' | 'family' 
  | 'clock' | 'sun' | 'moon' | 'star' | 'ear' | 'eye' 
  | 'hand' | 'game' | 'teacher1' | 'teacher2' | 'teacher3'
  | 'male' | 'female' | 'languages';

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
    teacher3: "🧕",
    male: "👨",
    female: "👩",
    languages: "🌐"
  };

  return <span className={className}>{icons[name]}</span>;
};

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    language: "fr",
    level: "",
    goals: [] as string[],
    frequency: "",
    learningStyle: [] as string[],
    teacher: ""
  });
  const navigate = useNavigate();

  // Configuration des langues disponibles
  const languages = [
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  // Configuration des professeurs par genre et langue
  const teachersConfig = {
    male: { fr: 'Karim', en: 'Omar', es: 'Youssef', de: 'Samir' },
    female: { fr: 'Leila', en: 'Aisha', es: 'Fatima', de: 'Zahra' }
  };

  // Textes multilingues
  const translations = {
    fr: {
      step0: {
        title: "Préparons ton voyage arabe",
        subtitle: "Comme une bonne préparation, l'arabe s'apprend avec méthode et régularité",
        nameLabel: "Comment t'appelles-tu ?",
        ageLabel: "Quel âge as-tu ?",
        namePlaceholder: "Ton prénom"
      },
      step1: {
        title: "Quel est ton niveau en arabe ?",
        subtitle: "Choisis ton point de départ pour un apprentissage personnalisé"
      },
      step2: {
        title: "Pourquoi veux-tu apprendre l'arabe ?",
        subtitle: "Sélectionne toutes tes motivations (plusieurs choix possibles)"
      },
      step3: {
        title: "Quel temps peux-tu consacrer ?",
        subtitle: "Choisis ton rythme d'apprentissage idéal"
      },
      step4: {
        title: "Comment préfères-tu apprendre ?",
        subtitle: "Sélectionne tes styles d'apprentissage préférés"
      },
      step5: {
        title: "Choisis ton professeur IA",
        subtitle: "Ton compagnon pour ce voyage linguistique"
      },
      back: "Retour",
      continue: "Continuer →",
      start: "Commencer →"
    },
    en: {
      step0: {
        title: "Let's prepare your Arabic journey",
        subtitle: "Like good preparation, Arabic is learned with method and regularity",
        nameLabel: "What's your name?",
        ageLabel: "How old are you?",
        namePlaceholder: "Your first name"
      },
      step1: {
        title: "What's your Arabic level?",
        subtitle: "Choose your starting point for personalized learning"
      },
      step2: {
        title: "Why do you want to learn Arabic?",
        subtitle: "Select all your motivations (multiple choices possible)"
      },
      step3: {
        title: "How much time can you dedicate?",
        subtitle: "Choose your ideal learning pace"
      },
      step4: {
        title: "How do you prefer to learn?",
        subtitle: "Select your preferred learning styles"
      },
      step5: {
        title: "Choose your AI teacher",
        subtitle: "Your companion for this language journey"
      },
      back: "Back",
      continue: "Continue →",
      start: "Start →"
    },
    es: {
      step0: {
        title: "Preparémonos para tu viaje árabe",
        subtitle: "Como una buena preparación, el árabe se aprende con método y regularidad",
        nameLabel: "¿Cómo te llamas?",
        ageLabel: "¿Cuántos años tienes?",
        namePlaceholder: "Tu nombre"
      },
      step1: {
        title: "¿Cuál es tu nivel de árabe?",
        subtitle: "Elige tu punto de partida para un aprendizaje personalizado"
      },
      step2: {
        title: "¿Por qué quieres aprender árabe?",
        subtitle: "Selecciona todas tus motivaciones (múltiples opciones posibles)"
      },
      step3: {
        title: "¿Cuánto tiempo puedes dedicar?",
        subtitle: "Elige tu ritmo de aprendizaje ideal"
      },
      step4: {
        title: "¿Cómo prefieres aprender?",
        subtitle: "Selecciona tus estilos de aprendizaje preferidos"
      },
      step5: {
        title: "Elige tu profesor IA",
        subtitle: "Tu compañero para este viaje lingüístico"
      },
      back: "Atrás",
      continue: "Continuar →",
      start: "Comenzar →"
    },
    de: {
      step0: {
        title: "Lass uns deine Arabisch-Reise vorbereiten",
        subtitle: "Wie eine gute Vorbereitung wird Arabisch mit Methode und Regelmäßigkeit gelernt",
        nameLabel: "Wie heißt du?",
        ageLabel: "Wie alt bist du?",
        namePlaceholder: "Dein Vorname"
      },
      step1: {
        title: "Wie ist dein Arabisch-Niveau?",
        subtitle: "Wähle deinen Startpunkt für personalisiertes Lernen"
      },
      step2: {
        title: "Warum möchtest du Arabisch lernen?",
        subtitle: "Wähle alle deine Motivationen (mehrere Auswahlmöglichkeiten)"
      },
      step3: {
        title: "Wie viel Zeit kannst du investieren?",
        subtitle: "Wähle dein ideales Lerntempo"
      },
      step4: {
        title: "Wie lernst du am liebsten?",
        subtitle: "Wähle deine bevorzugten Lernstile"
      },
      step5: {
        title: "Wähle deinen KI-Lehrer",
        subtitle: "Dein Begleiter für diese Sprachreise"
      },
      back: "Zurück",
      continue: "Weiter →",
      start: "Starten →"
    }
  };

  const t = translations[userData.language as keyof typeof translations];

  const steps = [
    {
      title: t.step0.title,
      subtitle: t.step0.subtitle,
      illustration: "tea" as IconName,
      content: (
        <div className="space-y-4">
          {/* Sélection de la langue */}
          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-3 text-left flex items-center gap-2">
              <Icon name="languages" className="text-lg" />
              Langue de l'interface
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserData({...userData, language: lang.value})}
                  className={`p-3 border-2 rounded-xl text-center transition-all ${
                    userData.language === lang.value 
                      ? 'border-[#53B16F] bg-[#53B16F]/10' 
                      : 'border-gray-200 hover:border-[#53B16F]'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-xs text-[#53B16F] font-medium">{lang.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-3 text-left">
              Tu es
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "male" as IconName, label: "Homme", value: "male" },
                { icon: "female" as IconName, label: "Femme", value: "female" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUserData({...userData, gender: option.value})}
                  className={`p-4 border-2 rounded-xl text-center transition-all ${
                    userData.gender === option.value 
                      ? 'border-[#53B16F] bg-[#53B16F]/10' 
                      : 'border-gray-200 hover:border-[#53B16F]'
                  }`}
                >
                  <Icon name={option.icon} className="text-3xl mb-2" />
                  <div className="text-[#53B16F] font-medium">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Nom et Âge */}
          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-2 text-left">
              {t.step0.nameLabel}
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-4 py-3 border border-[#53B16F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent text-gray-700 placeholder-gray-400"
              placeholder={t.step0.namePlaceholder}
            />
          </div>
          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-2 text-left">
              {t.step0.ageLabel}
            </label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
              className="w-full px-4 py-3 border border-[#53B16F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent text-gray-700 placeholder-gray-400"
              placeholder="25"
              min="5"
              max="100"
            />
          </div>
        </div>
      )
    },
    {
      title: t.step1.title,
      subtitle: t.step1.subtitle,
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
                  ? 'border-[#53B16F] bg-[#53B16F]/10' 
                  : 'border-gray-200 hover:border-[#53B16F]'
              }`}
            >
              <Icon name={option.icon} className="text-2xl flex-shrink-0" />
              <span className="text-gray-700 text-sm sm:text-base">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: t.step2.title,
      subtitle: t.step2.subtitle,
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
                  ? 'border-[#53B16F] bg-[#53B16F]/10' 
                  : 'border-gray-200 hover:border-[#53B16F]'
              }`}
            >
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 border-2 rounded border-current flex-shrink-0">
                {userData.goals.includes(option.value) && (
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#53B16F] rounded-sm" />
                )}
              </div>
              <Icon name={option.icon} className="text-xl flex-shrink-0" />
              <span className="text-gray-700 text-sm sm:text-base">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: t.step3.title,
      subtitle: t.step3.subtitle,
      illustration: "clock" as IconName,
      content: (
        <div className="space-y-3">
          {[
            { icon: "sun" as IconName, text: "5 min/jour - Léger et régulier", value: "light" },
            { icon: "moon" as IconName, text: "15 min/jour - Engagement modéré", value: "regular" },
            { icon: "star" as IconName, text: "30 min/jour - Apprentissage intensif", value: "intense" }
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserData({...userData, frequency: option.value})}
              className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-3 transition-all ${
                userData.frequency === option.value 
                  ? 'border-[#53B16F] bg-[#53B16F]/10' 
                  : 'border-gray-200 hover:border-[#53B16F]'
              }`}
            >
              <Icon name={option.icon} className="text-2xl flex-shrink-0" />
              <span className="text-gray-700 text-sm sm:text-base">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: t.step4.title,
      subtitle: t.step4.subtitle,
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
                  ? 'border-[#53B16F] bg-[#53B16F]/10' 
                  : 'border-gray-200 hover:border-[#53B16F]'
              }`}
            >
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 border-2 rounded border-current flex-shrink-0">
                {userData.learningStyle.includes(option.value) && (
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#53B16F] rounded-sm" />
                )}
              </div>
              <Icon name={option.icon} className="text-xl flex-shrink-0" />
              <span className="text-gray-700 text-sm sm:text-base">{option.text}</span>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      title: t.step5.title,
      subtitle: t.step5.subtitle,
      illustration: "book" as IconName,
      content: (
        <div className="space-y-4">
          {userData.gender && teachersConfig[userData.gender as keyof typeof teachersConfig] ? (
            Object.entries(teachersConfig[userData.gender as keyof typeof teachersConfig]).map(([lang, name]) => (
              <motion.button
                key={lang}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserData({...userData, teacher: name})}
                className={`w-full p-4 border-2 rounded-xl text-left flex items-center space-x-4 transition-all ${
                  userData.teacher === name
                    ? 'border-[#53B16F] bg-[#53B16F]/10' 
                    : 'border-gray-200 hover:border-[#53B16F]'
                }`}
              >
                <Icon name={userData.gender === 'male' ? "teacher2" : "teacher1"} className="text-3xl flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">{name}</div>
                  <div className="text-sm text-gray-600">
                    {languages.find(l => l.value === lang)?.label} - {userData.gender === 'male' ? 'Professeur' : 'Professeure'}
                  </div>
                </div>
              </motion.button>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Veuillez d'abord sélectionner votre genre
            </div>
          )}
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Sauvegarde des données avec la date d'inscription
      const userWithSubscription = {
        ...userData,
        signupDate: new Date().toISOString(),
        subscription: 'trial'
      };
      console.log("Données utilisateur:", userWithSubscription);
      localStorage.setItem('fisabilUser', JSON.stringify(userWithSubscription));
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) return userData.name && userData.age && userData.gender && userData.language;
    if (currentStep === 1) return userData.level;
    if (currentStep === 2) return userData.goals.length > 0;
    if (currentStep === 3) return userData.frequency;
    if (currentStep === 4) return userData.learningStyle.length > 0;
    if (currentStep === 5) return userData.teacher;
    return true;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 safe-area-top safe-area-bottom">
      <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 w-full max-w-md border border-[#53B16F]/20 mx-auto">
        
        {/* Logo Fisabil */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2">
            <img 
              src="/fisa.jpeg" 
              alt="Fisabil"
              className="w-full h-full object-cover rounded-full border-2 border-[#53B16F]"
            />
          </div>
        </div>

        {/* Indicateur de progression */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-[#53B16F] w-4 sm:w-6' 
                    : index < currentStep 
                    ? 'bg-[#53B16F]' 
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
              className="text-5xl sm:text-6xl mb-3 sm:mb-4"
            >
              <Icon name={steps[currentStep].illustration} />
            </motion.div>
            
            {/* Titre */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#53B16F] mb-2 px-2">
              {steps[currentStep].title}
            </h2>
            
            {/* Sous-titre */}
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 px-2">
              {steps[currentStep].subtitle}
            </p>

            {/* Contenu de l'étape */}
            <div className="mb-4 sm:mb-6 max-h-[50vh] overflow-y-auto">
              {steps[currentStep].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        <div className="flex justify-between items-center gap-3">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all flex-1 max-w-[120px] ${
              currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-[#53B16F] hover:bg-[#53B16F]/10'
            }`}
          >
            {t.back}
          </button>
          
          <motion.button
            whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
            whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-medium shadow-lg transition-all flex-1 ${
              isStepValid()
                ? 'bg-gradient-to-r from-[#53B16F] to-[#53B16F] text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? t.start : t.continue}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;