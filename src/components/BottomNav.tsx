import React, { useState } from 'react';
import { Home, MessageCircle, BookOpen, Settings, Volume2, ChevronUp, Scan, User, Crown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // 4 pages principales + 1 menu "Plus" = 5 éléments max
  const mainNavItems = [
    { path: '/home', icon: Home, label: 'Accueil' },
    { path: '/scan', icon: Scan, label: 'Scan' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/review', icon: BookOpen, label: 'Révision' },
  ];

  // Toutes les autres pages dans le menu "Plus"
  const moreMenuItems = [
    { path: '/audio', icon: Volume2, label: 'Audio' },
    { path: '/vocabulary', icon: BookOpen, label: 'Vocabulaire' },
    { path: '/profile', icon: User, label: 'Profil' },
    { path: '/subscription', icon: Crown, label: 'Abonnement' },
  ];

  const isMoreMenuActive = moreMenuItems.some(item => location.pathname === item.path);
  const isMainNavActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#53B16F]/20 shadow-lg z-50">
      
      {/* Menu déroulant "Plus" */}
      <AnimatePresence>
        {showMoreMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 right-0 bg-white border border-[#53B16F]/20 rounded-t-2xl shadow-lg mb-1 mx-4 max-h-64 overflow-y-auto"
          >
            {moreMenuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = isMainNavActive(item.path);
              
              return (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    navigate(item.path);
                    setShowMoreMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 p-4 border-b border-[#53B16F]/10 last:border-b-0 transition-colors ${
                    isActive ? 'bg-[#53B16F]/10 text-[#53B16F]' : 'hover:bg-[#53B16F]/5 text-[#53B16F]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="w-1 h-1 bg-[#53B16F] rounded-full ml-auto"></div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation principale - 4 éléments + 1 menu = 5 total */}
      <div className="flex justify-around items-center py-3">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isMainNavActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 transition-all ${
                isActive ? 'text-[#53B16F]' : 'text-[#53B16F]/70'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-[#53B16F] rounded-full"></div>
              )}
            </button>
          );
        })}

        {/* Bouton "Plus" avec menu déroulant */}
        <div className="relative">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center space-y-1 transition-all ${
              isMoreMenuActive ? 'text-[#53B16F]' : 'text-[#53B16F]/70'
            }`}
          >
            <div className="relative">
              <Settings className="w-5 h-5" />
              {showMoreMenu && (
                <ChevronUp className="w-3 h-3 absolute -top-1 -right-1 text-[#53B16F]" />
              )}
            </div>
            <span className="text-xs font-medium">Plus</span>
            {(isMoreMenuActive || showMoreMenu) && (
              <div className="w-1 h-1 bg-[#53B16F] rounded-full"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;