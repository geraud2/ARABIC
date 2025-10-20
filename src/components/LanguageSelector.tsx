// components/LanguageSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const languages: Language[] = [
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  size = 'md'
}) => {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  return (
    <div className="relative group">
      {/* Bouton principal */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 bg-white border border-[#53B16F]/20 rounded-xl ${sizeClasses[size]} text-gray-700 hover:border-[#53B16F] transition-colors w-full`}
      >
        <Globe className="w-4 h-4 text-[#53B16F]" />
        <span className="text-2xl">{currentLang.flag}</span>
        <div className="flex-1 text-left">
          <div className="font-medium">{currentLang.nativeName}</div>
          <div className="text-xs text-gray-500">{currentLang.name}</div>
        </div>
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-gray-400"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Menu déroulant */}
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#53B16F]/20 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <motion.button
            key={language.code}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLanguageChange(language.code)}
            className={`flex items-center gap-3 w-full p-3 text-left border-b border-gray-100 last:border-b-0 hover:bg-[#53B16F]/5 transition-colors ${
              currentLanguage === language.code ? 'bg-[#53B16F]/10' : ''
            }`}
          >
            <span className="text-2xl">{language.flag}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{language.nativeName}</div>
              <div className="text-xs text-gray-500">{language.name}</div>
            </div>
            {currentLanguage === language.code && (
              <div className="w-2 h-2 bg-[#53B16F] rounded-full" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;