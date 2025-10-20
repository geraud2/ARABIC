import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Crown, Check, Star, Zap, Lock, Volume2, Scan, BookOpen, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulation de l'état d'abonnement de l'utilisateur
  const userSubscription = {
    plan: 'free',
    trialDaysLeft: 15, // ← 15 jours d'essai gratuit
    trialTotalDays: 15, // ← Total de 15 jours
    scanLimit: 3,
    scansUsed: 1
  };

  const plans = [
    {
      id: 'free',
      name: 'Gratuit',
      price: '0€',
      period: 'toujours',
      description: 'Parfait pour commencer',
      icon: Star,
      color: 'from-gray-400 to-gray-500',
      features: [
        { text: '3 scans par mois', included: true },
        { text: '50 mots de vocabulaire', included: true },
        { text: 'Chat IA basique', included: true },
        { text: 'Synthèse vocale standard', included: true },
        { text: 'Scans illimités', included: false },
        { text: 'Vocabulaire illimité', included: false },
        { text: 'IA conversation avancée', included: false },
        { text: 'Synthèse vocale HD', included: false },
        { text: 'Export des données', included: false },
        { text: 'Support prioritaire', included: false }
      ],
      cta: 'Continuer Gratuitement',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '9,99€',
      period: 'par mois',
      description: 'Expérience complète',
      icon: Crown,
      color: 'from-[#53B16F] to-[#53B16F]',
      features: [
        { text: 'Scans illimités', included: true },
        { text: 'Vocabulaire illimité', included: true },
        { text: 'IA conversation avancée', included: true },
        { text: 'Synthèse vocale HD', included: true },
        { text: 'Export des données', included: true },
        { text: 'Support prioritaire', included: true },
        { text: 'Nouveautés en avant-première', included: true },
        { text: 'Sauvegarde cloud', included: true }
      ],
      cta: 'Essayer 15 jours gratuitement', // ← 15 jours ici aussi
      popular: true
    }
  ];

  const features = [
    {
      icon: Scan,
      title: 'Scan de Textes',
      description: 'Scanne des textes arabes',
      free: '3/mois',
      premium: 'Illimité'
    },
    {
      icon: BookOpen,
      title: 'Vocabulaire',
      description: 'Dictionnaire personnel',
      free: '50 mots',
      premium: 'Illimité'
    },
    {
      icon: Volume2,
      title: 'Synthèse Vocale',
      description: 'Prononciation audio',
      free: 'Standard',
      premium: 'HD'
    },
    {
      icon: Zap,
      title: 'Assistant IA',
      description: 'Aide à la conversation',
      free: 'Basique',
      premium: 'Avancé'
    }
  ];

  const handleSubscription = async (planId: string) => {
    if (planId === 'free') {
      navigate('/home');
      return;
    }

    setIsProcessing(true);
    
    // Simulation processus de paiement
    setTimeout(() => {
      setIsProcessing(false);
      // En vrai, on redirigerait vers Stripe ou autre processeur de paiement
      alert('Redirection vers le processus de paiement...');
    }, 2000);
  };

  const currentPlan = plans.find(plan => plan.id === userSubscription.plan);

  // Calcul du pourcentage de progression de l'essai
  const trialProgress = ((userSubscription.trialTotalDays - userSubscription.trialDaysLeft) / userSubscription.trialTotalDays) * 100;

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
              Abonnement
            </h1>
            <p className="text-xs text-gray-600 hidden xs:block">Choisis ton expérience</p>
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
        {/* Bannière d'essai gratuit - 15 JOURS */}
        {userSubscription.trialDaysLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#53B16F] to-[#53B16F] rounded-2xl p-4 text-white shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-white/80 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="font-bold text-sm">Essai Premium 15 Jours</h2>
                <p className="text-white/80 text-xs">
                  {userSubscription.trialDaysLeft} jours restants sur 15
                </p>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trialProgress}%` }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Plan actuel */}
        {currentPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#53B16F]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#53B16F] rounded-lg flex items-center justify-center flex-shrink-0">
                <currentPlan.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#53B16F] text-sm">Plan Actuel</h3>
                <p className="text-gray-600 text-xs">{currentPlan.name}</p>
                {userSubscription.trialDaysLeft > 0 && (
                  <p className="text-[#53B16F] text-xs font-medium">
                    Essai gratuit • {userSubscription.trialDaysLeft} jours restants
                  </p>
                )}
              </div>
              {userSubscription.plan === 'free' && (
                <div className="text-right">
                  <span className="text-[#53B16F] font-semibold text-sm">
                    {userSubscription.scansUsed}/{userSubscription.scanLimit}
                  </span>
                  <p className="text-gray-600 text-xs">scans</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Comparaison des fonctionnalités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-base font-semibold text-gray-800 text-center">
            Comparaison
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl p-3 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-[#53B16F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-[#53B16F]" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-xs">{feature.title}</h4>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gratuit:</span>
                      <span className="text-gray-800 font-medium">{feature.free}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#53B16F]">Premium:</span>
                      <span className="text-[#53B16F] font-semibold">{feature.premium}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sélection des plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-base font-semibold text-gray-800 text-center">
            Choisis ton plan
          </h3>

          <div className="grid gap-4">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              const isCurrent = userSubscription.plan === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className={`relative rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#53B16F] to-[#53B16F] text-white shadow-lg border-2 border-[#53B16F]'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  } ${isCurrent ? 'ring-2 ring-[#53B16F]' : ''}`}
                  onClick={() => setSelectedPlan(plan.id as 'free' | 'premium')}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#53B16F] text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      Populaire
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-2 right-2 bg-white text-[#53B16F] px-2 py-1 rounded-full text-xs font-semibold border border-[#53B16F]">
                      Actuel
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#53B16F]'}`} />
                    <div>
                      <h3 className="font-bold text-sm">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold">{plan.price}</span>
                        <span className="text-xs opacity-80">/{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    {plan.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-xs">
                        {feature.included ? (
                          <Check className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#53B16F]'}`} />
                        ) : (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                        <span className={feature.included ? (isSelected ? 'text-white' : 'text-gray-700') : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: isCurrent ? 1 : 1.02 }}
                    whileTap={{ scale: isCurrent ? 1 : 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscription(plan.id);
                    }}
                    disabled={isCurrent || isProcessing}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-white text-[#53B16F] hover:bg-white/90'
                        : 'bg-[#53B16F] text-white hover:bg-[#53B16F]/90'
                    } ${isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Traitement...
                      </div>
                    ) : isCurrent ? (
                      'Plan Actuel'
                    ) : (
                      plan.cta
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Garanties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-3 text-center"
        >
          <div className="flex items-center gap-2 justify-center text-xs text-gray-600">
            <Shield className="w-3 h-3 text-[#53B16F]" />
            <span>30 jours garantie</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-xs text-gray-600">
            <Clock className="w-3 h-3 text-[#53B16F]" />
            <span>Annule anytime</span>
          </div>
        </motion.div>

        {/* Information essai 15 jours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500">
            ✅ <strong>15 jours d'essai gratuit</strong> - Aucune carte requise pour commencer
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SubscriptionPage;