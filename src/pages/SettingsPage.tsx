import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Settings, User, Bell, Globe, Shield, HelpCircle, LogOut, Download, Trash2, Volume2, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  audioEnabled: boolean;
  autoScan: boolean;
  language: string;
  playbackSpeed: number;
}

interface SettingsItem {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  type: 'toggle' | 'select' | 'action' | 'navigation';
  value?: any;
  options?: Array<{ label: string; value: string }>;
  action: (value?: any) => void;
  isDangerous?: boolean;
}

interface SettingsSection {
  title: string;
  icon: React.ComponentType<any>;
  items: SettingsItem[];
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    darkMode: false,
    audioEnabled: true,
    autoScan: false,
    language: 'fr',
    playbackSpeed: 1.0
  });

  // Charger les données utilisateur et paramètres
  useEffect(() => {
    const savedUser = localStorage.getItem('fisabilUser');
    const savedSettings = localStorage.getItem('fisabil_settings');
    
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Sauvegarder les paramètres
  const saveSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('fisabil_settings', JSON.stringify(updated));
  };

  const handleLogout = () => {
    if (window.confirm('Es-tu sûr de vouloir te déconnecter ?')) {
      localStorage.removeItem('fisabilUser');
      localStorage.removeItem('fisabil_progress');
      navigate('/login');
    }
  };

  const handleDataExport = () => {
    const vocabulary = localStorage.getItem('fisabil_vocabulary');
    const scannedTexts = localStorage.getItem('fisabil_scanned_texts');
    
    const exportData = {
      user: userData,
      vocabulary: vocabulary ? JSON.parse(vocabulary) : [],
      scannedTexts: scannedTexts ? JSON.parse(scannedTexts) : [],
      exportDate: new Date().toISOString()
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `fisabil-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDataReset = () => {
    if (window.confirm('⚠️ Cette action supprimera toutes tes données d\'apprentissage. Es-tu sûr ?')) {
      localStorage.removeItem('fisabil_vocabulary');
      localStorage.removeItem('fisabil_scanned_texts');
      localStorage.removeItem('fisabil_progress');
      alert('Données réinitialisées avec succès');
      navigate('/home');
    }
  };

  const settingsSections: SettingsSection[] = [
    {
      title: 'Compte',
      icon: User,
      items: [
        {
          icon: User,
          title: 'Profil',
          subtitle: 'Gérer tes informations personnelles',
          type: 'navigation',
          action: () => navigate('/profile')
        },
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Contrôler les alertes',
          type: 'toggle',
          value: settings.notifications,
          action: (value: boolean) => saveSettings({ notifications: value })
        },
        {
          icon: Volume2,
          title: 'Audio',
          subtitle: 'Activer/désactiver les sons',
          type: 'toggle',
          value: settings.audioEnabled,
          action: (value: boolean) => saveSettings({ audioEnabled: value })
        }
      ]
    },
    {
      title: 'Apprentissage',
      icon: Settings,
      items: [
        {
          icon: Scan,
          title: 'Scan automatique',
          subtitle: 'Analyser automatiquement les textes',
          type: 'toggle',
          value: settings.autoScan,
          action: (value: boolean) => saveSettings({ autoScan: value })
        },
        {
          icon: Globe,
          title: 'Langue',
          subtitle: 'Changer la langue de l\'interface',
          type: 'select',
          value: settings.language,
          options: [
            { label: 'Français', value: 'fr' },
            { label: 'English', value: 'en' },
            { label: 'العربية', value: 'ar' }
          ],
          action: (value: string) => saveSettings({ language: value })
        },
        {
          icon: Volume2,
          title: 'Vitesse de lecture',
          subtitle: 'Ajuster la vitesse audio',
          type: 'select',
          value: settings.playbackSpeed.toString(),
          options: [
            { label: 'Lente (0.5x)', value: '0.5' },
            { label: 'Normale (1.0x)', value: '1.0' },
            { label: 'Rapide (1.5x)', value: '1.5' }
          ],
          action: (value: string) => saveSettings({ playbackSpeed: parseFloat(value) })
        }
      ]
    },
    {
      title: 'Confidentialité',
      icon: Shield,
      items: [
        {
          icon: Download,
          title: 'Exporter mes données',
          subtitle: 'Télécharger toutes tes données',
          type: 'action',
          action: handleDataExport
        },
        {
          icon: Trash2,
          title: 'Réinitialiser les données',
          subtitle: 'Supprimer ta progression',
          type: 'action',
          action: handleDataReset,
          isDangerous: true
        }
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        {
          icon: HelpCircle,
          title: 'Centre d\'aide',
          subtitle: 'Documentation et FAQ',
          type: 'navigation',
          action: () => window.open('https://help.fisabil.com', '_blank')
        },
        {
          icon: User,
          title: 'Contactez-nous',
          subtitle: 'Support technique',
          type: 'navigation',
          action: () => window.open('mailto:support@fisabil.com')
        }
      ]
    }
  ];

  const renderSettingControl = (item: SettingsItem) => {
    switch (item.type) {
      case 'toggle':
        return (
          <div className={`w-12 h-6 rounded-full transition-colors ${
            item.value ? 'bg-[#53B16F]' : 'bg-gray-300'
          }`}>
            <motion.div
              className="w-4 h-4 bg-white rounded-full m-1"
              animate={{ x: item.value ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        );

      case 'select':
        const currentOption = item.options?.find(opt => opt.value === item.value);
        return (
          <div className="flex items-center gap-2 text-[#53B16F]">
            <span className="text-sm">{currentOption?.label}</span>
            <span className="text-xs">▼</span>
          </div>
        );

      case 'navigation':
        return <span className="text-[#53B16F]">›</span>;

      case 'action':
        return (
          <span className={`text-sm ${item.isDangerous ? 'text-red-500' : 'text-[#53B16F]'}`}>
            {item.isDangerous ? 'Supprimer' : 'Exporter'}
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#53B16F]/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#53B16F]">
              Paramètres
            </h1>
            <p className="text-xs text-[#53B16F]/70">Gère ton compte Fisabil</p>
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
        {/* Carte profil rapide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#53B16F] to-[#53B16F] rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              {userData.name?.[0]?.toUpperCase() || '👤'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{userData.name || 'Apprenant'}</h2>
              <p className="text-white/80 text-sm">{userData.email || 'Non défini'}</p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span>Niveau: {userData.level || 'Débutant'}</span>
                <span>•</span>
                <span>Prof: {userData.teacher || 'Leila'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sections des paramètres */}
        {settingsSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-[#53B16F]/20"
            >
              {/* En-tête de section */}
              <div className="flex items-center gap-3 p-4 border-b border-[#53B16F]/10">
                <SectionIcon className="w-5 h-5 text-[#53B16F]" />
                <h3 className="font-semibold text-[#53B16F]">{section.title}</h3>
              </div>

              {/* Items de la section */}
              <div className="divide-y divide-[#53B16F]/5">
                {section.items.map((item, itemIndex) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="p-4 hover:bg-[#53B16F]/5 transition-colors cursor-pointer"
                      onClick={() => {
                        if (item.type === 'toggle') {
                          item.action(!item.value);
                        } else if (item.type === 'action' || item.type === 'navigation') {
                          item.action();
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <ItemIcon className={`w-5 h-5 ${item.isDangerous ? 'text-red-500' : 'text-[#53B16F]'}`} />
                          <div className="flex-1">
                            <div className={`font-medium ${item.isDangerous ? 'text-red-500' : 'text-[#53B16F]'}`}>
                              {item.title}
                            </div>
                            <div className="text-sm text-[#53B16F]/70 mt-1">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {renderSettingControl(item)}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Déconnexion */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Déconnexion</span>
        </motion.button>

        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-sm text-[#53B16F]/50">
            Fisabil v1.0.0
          </p>
          <p className="text-xs text-[#53B16F]/30 mt-1">
            © 2024 Fisabil. Tous droits réservés.
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;