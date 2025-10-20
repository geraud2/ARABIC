import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, User, MessageCircle, Scan, Globe, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import LanguageSelector from '../components/LanguageSelector';

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    teacher: '',
    level: '',
    goals: [],
    learningStyle: [],
    language: 'fr'
  });

  // Textes multilingues
  const translations = {
    fr: {
      welcome: "Fisabil - تعلم العربية",
      greeting: (name: any) => `Bon retour, ${name} !`,
      adventure: "Ton aventure arabe",
      description: "Apprends l'arabe avec ton assistant IA. Découvre les lettres, la prononciation et la culture arabe.",
      features: [
        "Leçons interactives avec IA",
        "Prononciation audio intégrée", 
        "Progression personnalisée",
        "Culture et traditions arabes"
      ],
      startLesson: "Commencer une leçon",
      quickAccess: {
        chat: "Chat IA",
        chatSub: "Apprendre",
        courses: "Parcours", 
        coursesSub: "Modules",
        profile: "Profil",
        profileSub: "Compte",
        scan: "Scanner",
        scanSub: "Textes",
        stats: "Statistiques",
        statsSub: "Progression"
      },
      profile: "Ton profil",
      profileStats: {
        level: "Niveau",
        goals: "Objectifs",
        style: "Style"
      }
    },
    en: {
      welcome: "Fisabil - Learn Arabic",
      greeting: (name: any) => `Welcome back, ${name}!`,
      adventure: "Your Arabic adventure",
      description: "Learn Arabic with your AI assistant. Discover letters, pronunciation and Arabic culture.",
      features: [
        "Interactive AI lessons",
        "Built-in audio pronunciation", 
        "Personalized progression",
        "Arabic culture and traditions"
      ],
      startLesson: "Start a lesson",
      quickAccess: {
        chat: "AI Chat",
        chatSub: "Learn",
        courses: "Courses", 
        coursesSub: "Modules",
        profile: "Profile",
        profileSub: "Account",
        scan: "Scan",
        scanSub: "Texts",
        stats: "Statistics",
        statsSub: "Progress"
      },
      profile: "Your profile",
      profileStats: {
        level: "Level",
        goals: "Goals",
        style: "Style"
      }
    },
    es: {
      welcome: "Fisabil - Aprende Árabe",
      greeting: (name: any) => `¡Bienvenido de nuevo, ${name}!`,
      adventure: "Tu aventura árabe",
      description: "Aprende árabe con tu asistente IA. Descubre letras, pronunciación y cultura árabe.",
      features: [
        "Lecciones interactivas con IA",
        "Pronunciación de audio integrada", 
        "Progresión personalizada",
        "Cultura y tradiciones árabes"
      ],
      startLesson: "Comenzar lección",
      quickAccess: {
        chat: "Chat IA",
        chatSub: "Aprender",
        courses: "Cursos", 
        coursesSub: "Módulos",
        profile: "Perfil",
        profileSub: "Cuenta",
        scan: "Escanear",
        scanSub: "Textos",
        stats: "Estadísticas",
        statsSub: "Progreso"
      },
      profile: "Tu perfil",
      profileStats: {
        level: "Nivel",
        goals: "Objetivos",
        style: "Estilo"
      }
    },
    de: {
      welcome: "Fisabil - Arabisch Lernen",
      greeting: (name: any) => `Willkommen zurück, ${name}!`,
      adventure: "Dein Arabisch-Abenteuer",
      description: "Lerne Arabisch mit deinem KI-Assistenten. Entdecke Buchstaben, Aussprache und arabische Kultur.",
      features: [
        "Interaktive KI-Lektionen",
        "Integrierte Audio-Aussprache", 
        "Personaliserter Fortschritt",
        "Arabische Kultur und Traditionen"
      ],
      startLesson: "Lektion starten",
      quickAccess: {
        chat: "KI-Chat",
        chatSub: "Lernen",
        courses: "Kurse", 
        coursesSub: "Module",
        profile: "Profil",
        profileSub: "Konto",
        scan: "Scannen",
        scanSub: "Texte",
        stats: "Statistiken",
        statsSub: "Fortschritt"
      },
      profile: "Dein Profil",
      profileStats: {
        level: "Niveau",
        goals: "Ziele",
        style: "Stil"
      }
    },
    ar: {
      welcome: "في سبيل - تعلم العربية",
      greeting: (name: any) => `أهلاً بعودتك، ${name}!`,
      adventure: "مغامرتك العربية",
      description: "تعلم العربية مع مساعد الذكاء الاصطناعي. اكتشف الحروف والنطق والثقافة العربية.",
      features: [
        "دروس تفاعلية مع الذكاء الاصطناعي",
        "نطق صوتي مدمج", 
        "تقدم شخصي",
        "الثقافة والتقاليد العربية"
      ],
      startLesson: "ابدأ درساً",
      quickAccess: {
        chat: "دردشة ذكية",
        chatSub: "تعلم",
        courses: "مسارات", 
        coursesSub: "وحدات",
        profile: "الملف",
        profileSub: "الحساب",
        scan: "مسح",
        scanSub: "نصوص",
        stats: "إحصائيات",
        statsSub: "تقدم"
      },
      profile: "ملفك الشخصي",
      profileStats: {
        level: "المستوى",
        goals: "الأهداف",
        style: "النمط"
      }
    }
  };

  useEffect(() => {
    // Charger les données utilisateur
    const savedUser = localStorage.getItem('fisabilUser');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const t = translations[userData.language as keyof typeof translations] || translations.fr;

  const handleLanguageChange = (newLanguage: string) => {
    const updatedUser = { ...userData, language: newLanguage };
    setUserData(updatedUser);
    localStorage.setItem('fisabilUser', JSON.stringify(updatedUser));
    window.location.reload();
  };

  const quickActions = [
    {
      icon: MessageCircle,
      label: t.quickAccess.chat,
      subtitle: t.quickAccess.chatSub,
      path: '/chat',
      color: '#53B16F'
    },
    {
      icon: BookOpen,
      label: t.quickAccess.courses,
      subtitle: t.quickAccess.coursesSub,
      path: '/courses',
      color: '#53B16F'
    },
    {
      icon: Scan,
      label: t.quickAccess.scan,
      subtitle: t.quickAccess.scanSub,
      path: '/scan',
      color: '#53B16F'
    },
    {
      icon: BarChart3,
      label: t.quickAccess.stats,
      subtitle: t.quickAccess.statsSub,
      path: '/courses', // ✅ Route corrigée vers les statistiques
      color: '#53B16F'
    },
    {
      icon: User,
      label: t.quickAccess.profile,
      subtitle: t.quickAccess.profileSub,
      path: '/profile', // ✅ Route corrigée vers le profil
      color: '#53B16F'
    },
    {
      icon: Globe,
      label: "Langue",
      subtitle: userData.language.toUpperCase(),
      path: null,
      color: '#53B16F',
      customAction: () => {
        // Ouvrir le sélecteur de langue
        const selector = document.querySelector('.language-selector');
        if (selector) {
          selector.classList.toggle('open');
        }
      }
    }
  ];

  const handleNavigation = (path: string | null, customAction?: () => void) => {
    if (customAction) {
      customAction();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 safe-area-bottom">
      
      {/* Contenu principal */}
      <div className="p-4 sm:p-6 max-w-md mx-auto">
        {/* Sélecteur de langue */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 language-selector"
        >
         
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-6 flex justify-center"
>
  <LanguageSelector
    currentLanguage={userData.language}
    onLanguageChange={handleLanguageChange}
  />
</motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-center mb-6 sm:mb-8 pt-4"
        >
          {/* Logo Fisabil */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
            <img 
              src="/fisa.jpeg" 
              alt="Fisabil"
              className="w-full h-full object-cover rounded-full border-4 border-[#53B16F] shadow-lg"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-[#53B16F] mb-3"
          >
            في سبيل
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg text-[#53B16F]"
          >
            {t.welcome}
          </motion.p>

          {userData.name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[#53B16F] mt-2 text-sm"
            >
              {t.greeting(userData.name)}
            </motion.p>
          )}
        </motion.div>

        {/* Carte principale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6 border border-[#53B16F]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#53B16F]" />
            <h2 className="text-base sm:text-lg font-semibold text-[#53B16F]">
              {t.adventure}
            </h2>
          </div>

          <p className="text-[#53B16F] leading-relaxed mb-4 sm:mb-6 text-sm">
            {t.description}
          </p>

          <div className="space-y-2 mb-4 sm:mb-6">
            {t.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-xs text-[#53B16F]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#53B16F] flex-shrink-0"></div>
                <span className="flex-1">{feature}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/chat')}
            className="w-full bg-gradient-to-r from-[#53B16F] to-[#53B16F] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm"
          >
            {t.startLesson}
          </motion.button>
        </motion.div>

        {/* Cartes rapides - Grid responsive */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm border border-[#53B16F]/10 cursor-pointer hover:border-[#53B16F] transition-colors"
                onClick={() => handleNavigation(action.path, action.customAction)}
              >
                <div className="text-center">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#53B16F] mx-auto mb-1" />
                  <div className="text-[#53B16F] font-semibold text-xs truncate">
                    {action.label}
                  </div>
                  <div className="text-[#53B16F] text-xs opacity-70 truncate">
                    {action.subtitle}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Statistiques rapides */}
        {userData.level && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-[#53B16F]/10"
          >
            <h3 className="text-[#53B16F] font-semibold text-sm mb-3 text-center">
              {t.profile}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[#53B16F] font-bold text-xs">
                  {t.profileStats.level}
                </div>
                <div className="text-[#53B16F] text-xs capitalize truncate">
                  {userData.level}
                </div>
              </div>
              <div>
                <div className="text-[#53B16F] font-bold text-xs">
                  {t.profileStats.goals}
                </div>
                <div className="text-[#53B16F] text-xs">
                  {userData.goals?.length || 0}
                </div>
              </div>
              <div>
                <div className="text-[#53B16F] font-bold text-xs">
                  {t.profileStats.style}
                </div>
                <div className="text-[#53B16F] text-xs">
                  {userData.learningStyle?.length || 0}
                </div>
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