// pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, User, Settings, Globe, Bell, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import LanguageSelector from '../components/LanguageSelector';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    language: 'fr',
    teacher: '',
    subscription: 'free',
    trialDaysLeft: 15
  });

  // Textes multilingues
  const translations = {
    fr: {
      title: 'Profil',
      subtitle: 'Gère ton compte',
      sections: {
        account: 'Compte',
        preferences: 'Préférences',
        support: 'Support'
      },
      fields: {
        name: 'Nom',
        email: 'Email',
        teacher: 'Professeur',
        subscription: 'Abonnement',
        language: 'Langue'
      },
      buttons: {
        save: 'Sauvegarder',
        edit: 'Modifier'
      },
      menu: {
        notifications: 'Notifications',
        privacy: 'Confidentialité',
        help: 'Aide',
        about: 'À propos'
      }
    },
    en: {
      title: 'Profile',
      subtitle: 'Manage your account',
      sections: {
        account: 'Account',
        preferences: 'Preferences',
        support: 'Support'
      },
      fields: {
        name: 'Name',
        email: 'Email',
        teacher: 'Teacher',
        subscription: 'Subscription',
        language: 'Language'
      },
      buttons: {
        save: 'Save',
        edit: 'Edit'
      },
      menu: {
        notifications: 'Notifications',
        privacy: 'Privacy',
        help: 'Help',
        about: 'About'
      }
    },
    es: {
      title: 'Perfil',
      subtitle: 'Gestiona tu cuenta',
      sections: {
        account: 'Cuenta',
        preferences: 'Preferencias',
        support: 'Soporte'
      },
      fields: {
        name: 'Nombre',
        email: 'Correo',
        teacher: 'Profesor',
        subscription: 'Suscripción',
        language: 'Idioma'
      },
      buttons: {
        save: 'Guardar',
        edit: 'Editar'
      },
      menu: {
        notifications: 'Notificaciones',
        privacy: 'Privacidad',
        help: 'Ayuda',
        about: 'Acerca de'
      }
    },
    de: {
      title: 'Profil',
      subtitle: 'Konto verwalten',
      sections: {
        account: 'Konto',
        preferences: 'Einstellungen',
        support: 'Support'
      },
      fields: {
        name: 'Name',
        email: 'E-Mail',
        teacher: 'Lehrer',
        subscription: 'Abonnement',
        language: 'Sprache'
      },
      buttons: {
        save: 'Speichern',
        edit: 'Bearbeiten'
      },
      menu: {
        notifications: 'Benachrichtigungen',
        privacy: 'Datenschutz',
        help: 'Hilfe',
        about: 'Über'
      }
    },
    ar: {
      title: 'الملف الشخصي',
      subtitle: 'إدارة حسابك',
      sections: {
        account: 'الحساب',
        preferences: 'التفضيلات',
        support: 'الدعم'
      },
      fields: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        teacher: 'المعلم',
        subscription: 'الاشتراك',
        language: 'اللغة'
      },
      buttons: {
        save: 'حفظ',
        edit: 'تعديل'
      },
      menu: {
        notifications: 'الإشعارات',
        privacy: 'الخصوصية',
        help: 'المساعدة',
        about: 'حول'
      }
    }
  };

  const t = translations[userData.language as keyof typeof translations] || translations.fr;

  useEffect(() => {
    // Charger les données utilisateur
    const savedUser = localStorage.getItem('fisabilUser');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    const updatedUser = { ...userData, language: newLanguage };
    setUserData(updatedUser);
    localStorage.setItem('fisabilUser', JSON.stringify(updatedUser));
    
    // Forcer le rechargement pour appliquer la nouvelle langue
    window.location.reload();
  };

  const handleSaveProfile = () => {
    localStorage.setItem('fisabilUser', JSON.stringify(userData));
    // Afficher un message de succès
    alert(t.buttons.save === 'Sauvegarder' ? 'Profil sauvegardé !' : 'Profile saved!');
  };

  return (
    <div className="min-h-screen bg-white pb-16 safe-area-bottom">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#53B16F]/20 sticky top-0 z-10 safe-area-top">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden xs:inline">Retour</span>
          </button>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#53B16F]">
              {t.title}
            </h1>
            <p className="text-xs text-gray-600 hidden xs:block">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Section Compte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-[#53B16F] flex items-center gap-2">
            <User className="w-5 h-5" />
            {t.sections.account}
          </h2>

          <div className="space-y-3">
            {/* Nom */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.fields.name}
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.fields.email}
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Section Préférences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-[#53B16F] flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t.sections.preferences}
          </h2>

          <div className="space-y-3">
            {/* Sélecteur de langue */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t.fields.language}
              </label>
              <LanguageSelector
                currentLanguage={userData.language}
                onLanguageChange={handleLanguageChange}
                size="md"
              />
            </div>

            {/* Professeur */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.fields.teacher}
              </label>
              <div className="text-gray-600 text-sm">
                {userData.teacher || 'Non défini'}
              </div>
            </div>

            {/* Abonnement */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.fields.subscription}
              </label>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm capitalize">
                  {userData.subscription}
                </span>
                {userData.trialDaysLeft > 0 && (
                  <span className="text-[#53B16F] text-sm font-medium">
                    {userData.trialDaysLeft} jours d'essai
                  </span>
                )}
                <button
                  onClick={() => navigate('/subscription')}
                  className="text-[#53B16F] text-sm font-medium hover:text-[#53B16F]/80"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-[#53B16F] flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            {t.sections.support}
          </h2>

          <div className="grid gap-2">
            <button className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#53B16F] transition-colors">
              <Bell className="w-5 h-5 text-[#53B16F]" />
              <span className="text-gray-700">{t.menu.notifications}</span>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#53B16F] transition-colors">
              <Shield className="w-5 h-5 text-[#53B16F]" />
              <span className="text-gray-700">{t.menu.privacy}</span>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#53B16F] transition-colors">
              <HelpCircle className="w-5 h-5 text-[#53B16F]" />
              <span className="text-gray-700">{t.menu.help}</span>
            </button>
          </div>
        </motion.div>

        {/* Bouton Sauvegarder */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleSaveProfile}
          className="w-full bg-[#53B16F] text-white py-3 rounded-xl font-semibold hover:bg-[#53B16F]/90 transition-colors shadow-lg"
        >
          {t.buttons.save}
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;