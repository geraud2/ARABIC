import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Clock, Star } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  letters: string[];
}

interface CourseCardProps {
  course: Course;
  status: 'locked' | 'in-progress' | 'completed';
  onStart: () => void;
}

const CourseCard = ({ course, status, onStart }: CourseCardProps) => {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isCurrent = status === 'in-progress';

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      className={`relative rounded-2xl p-4 shadow-lg border-2 transition-all ${
        isLocked
          ? 'bg-gray-100 border-gray-200 opacity-60'
          : isCompleted
          ? 'bg-white border-[#CBA76A]'
          : 'bg-white border-[#8B5E3C] shadow-md'
      }`}
    >
      {/* Badge de statut */}
      <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold ${
        isLocked
          ? 'bg-gray-400 text-white'
          : isCompleted
          ? 'bg-[#CBA76A] text-white'
          : 'bg-[#8B5E3C] text-white'
      }`}>
        {isLocked ? 'Verrouillé' : isCompleted ? 'Terminé' : 'En cours'}
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* En-tête du cours */}
          <div className="flex items-center gap-2 mb-2">
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-[#CBA76A]" />
            ) : isCurrent ? (
              <Star className="w-5 h-5 text-[#8B5E3C]" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
            <h3 className={`font-semibold ${
              isLocked ? 'text-gray-600' : 'text-[#3E2C1E]'
            }`}>
              {course.title}
            </h3>
          </div>

          {/* Description */}
          <p className={`text-sm mb-3 ${
            isLocked ? 'text-gray-500' : 'text-[#8B5E3C]'
          }`}>
            {course.description}
          </p>

          {/* Métadonnées */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#CBA76A]" />
              <span className={isLocked ? 'text-gray-500' : 'text-[#8B5E3C]'}>
                {course.duration}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-full ${
              isLocked 
                ? 'bg-gray-200 text-gray-600' 
                : course.level === 'débutant'
                ? 'bg-[#FFF6E5] text-[#8B5E3C]'
                : 'bg-[#F8F0E0] text-[#3E2C1E]'
            }`}>
              {course.level}
            </div>
          </div>

          {/* Lettres du cours */}
          {course.letters && course.letters.length > 0 && (
            <div className="mt-3">
              <div className="flex gap-1">
                {course.letters.map((letter, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-arabic ${
                      isLocked
                        ? 'bg-gray-300 text-gray-600'
                        : 'bg-[#FFF6E5] text-[#3E2C1E] border border-[#CBA76A]/20'
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bouton d'action */}
        <motion.button
          whileHover={{ scale: isLocked ? 1 : 1.05 }}
          whileTap={{ scale: isLocked ? 1 : 0.95 }}
          onClick={onStart}
          disabled={isLocked}
          className={`ml-4 p-3 rounded-xl transition-all ${
            isLocked
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isCompleted
              ? 'bg-[#FFF6E5] text-[#CBA76A] hover:bg-[#CBA76A] hover:text-white'
              : 'bg-[#CBA76A] text-white hover:bg-[#8B5E3C]'
          }`}
        >
          {isLocked ? (
            <Lock className="w-5 h-5" />
          ) : isCompleted ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CourseCard;