import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Home } from 'lucide-react'; // Correction: Supprimer l'importation de CourseCard
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses.json';

const CoursesPage = () => {
  const navigate = useNavigate();
  const userProgress = JSON.parse(localStorage.getItem('arabika_progress') || '{"course": 0, "message": 0}');

  // Calculer les cours débloqués et complétés
  const getCourseStatus = (courseId: number) => {
    if (courseId <= userProgress.course) {
      return courseId < userProgress.course ? 'completed' : 'in-progress';
    }
    return 'locked';
  };

  const learningPaths = [
    {
      title: "Alphabet Arabe",
      description: "Maîtrise les 28 lettres",
      icon: "🔤",
      progress: "3/28 lettres",
      color: "from-[#CBA76A] to-[#8B5E3C]"
    },
    {
      title: "Vocabulaire Essentiel", 
      description: "Mots du quotidien",
      icon: "💬",
      progress: "0/50 mots",
      color: "from-[#8B5E3C] to-[#3E2C1E]"
    },
    {
      title: "Conversation Basique",
      description: "Phrases utiles",
      icon: "📝",
      progress: "0/25 phrases", 
      color: "from-[#CBA76A] to-[#3E2C1E]"
    },
    {
      title: "Culture & Traditions",
      description: "Découverte culturelle",
      icon: "🌍",
      progress: "0/10 modules",
      color: "from-[#8B5E3C] to-[#CBA76A]"
    }
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

          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#3E2C1E]">
              Parcours d'Apprentissage
            </h1>
            <p className="text-xs text-[#8B5E3C]">Apprends à ton rythme</p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-[#8B5E3C] hover:text-[#3E2C1E] transition-colors"
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
          className="bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] rounded-3xl p-6 text-white shadow-xl mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Ta Progression Globale</h2>
              <p className="text-white/80 text-sm">Continue ton aventure arabe</p>
            </div>
            <BookOpen className="w-8 h-8 text-white/80" />
          </div>
          
          <div className="bg-white/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Modules complétés</span>
              <span className="text-sm font-bold">
                {userProgress.course + 1}/{coursesData.courses.length}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((userProgress.course + 1) / coursesData.courses.length) * 100}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Parcours d'apprentissage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-[#3E2C1E] mb-4">Parcours Disponibles</h3>
          <div className="grid grid-cols-2 gap-4">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br ${path.color} rounded-2xl p-4 text-white shadow-lg cursor-pointer`}
                onClick={() => {
                  // Rediriger vers le premier cours du parcours
                  localStorage.setItem('arabika_progress', JSON.stringify({
                    course: 0,
                    message: 0
                  }));
                  navigate('/chat');
                }}
              >
                <div className="text-2xl mb-2">{path.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{path.title}</h4>
                <p className="text-white/80 text-xs mb-2">{path.description}</p>
                <div className="text-xs text-white/60">{path.progress}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Liste des modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#3E2C1E]">Modules Alphabet</h3>
            <span className="text-sm text-[#8B5E3C]">
              {userProgress.course + 1}/{coursesData.courses.length} complétés
            </span>
          </div>

          <div className="space-y-4">
            {coursesData.courses.map((course, index) => {
              const status = getCourseStatus(course.id);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const isCurrent = status === 'in-progress';

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  status={status}
                  onStart={() => {
                    if (!isLocked) {
                      // Sauvegarder le cours sélectionné
                      localStorage.setItem('arabika_progress', JSON.stringify({
                        course: course.id - 1,
                        message: 0
                      }));
                      navigate('/chat');
                    }
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-[#CBA76A]/20 mt-6"
        >
          <h4 className="font-semibold text-[#3E2C1E] mb-3">Tes Statistiques</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#CBA76A]">{userProgress.course + 1}</div>
              <div className="text-xs text-[#8B5E3C]">Modules</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#CBA76A]">
                {Math.round(((userProgress.course + 1) / coursesData.courses.length) * 100)}%
              </div>
              <div className="text-xs text-[#8B5E3C]">Progression</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#CBA76A]">
                {(userProgress.course + 1) * 15}min
              </div>
              <div className="text-xs text-[#8B5E3C]">Temps</div>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CoursesPage;