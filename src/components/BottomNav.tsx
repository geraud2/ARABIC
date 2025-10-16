import React from 'react';
import { Home, MessageCircle, User, BookOpen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Accueil' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/courses', icon: BookOpen, label: 'Parcours' }, // ← CORRECTION : '/courses' au lieu de '/CoursesPage'
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#CBA76A]/20 shadow-lg z-50">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 transition-all ${
                isActive ? 'text-[#CBA76A]' : 'text-[#8B5E3C]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-[#CBA76A] rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;