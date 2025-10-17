import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Crown, Check, Star, Zap, Lock, Volume2, Scan, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulation de l'état d'abonnement de l'utilisateur
  const userSubscription = {
    plan: 'free',
    trialDaysLeft: 7,
    scanLimit: 3,
    scansUsed: 1
  };

  const plans = [
    {
      id: 'free',
      name: 'Gratuit',
      price: '0€',
      period: 'toujours',
      description: 'Découverte de Fisabil',
      icon: Star,
      color: 'from-[#53B16F] to-[#53B16F]',
      features: [
        { text: '3 scans de texte par mois', included: true },
        { text: 'Vocabulaire limité (50 mots)', included: true },
        { text: 'Chat IA basique', included: true },
        { text: 'Synthèse vocale standard', included: true },
        { text: 'Scans illimités', included: false },
        { text: 'Vocabulaire illimité', included: false },
        { text: 'Chat IA avancé', included: false },
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
        { text: 'Chat IA avancé', included: true },
        { text: 'Synthèse vocale HD', included: true },
        { text: 'Export des données', included: true },
        { text: 'Support prioritaire', included: true },
        { text: 'Nouveautés en avant-première', included: true },
        { text: 'Sauvegarde cloud', included: true }
      ],
      cta: 'Essayer 7 jours gratuitement',
      popular: true
    }
  ];

  const features = [
    {
      icon: Scan,
      title: 'Scan Illimité',
      description: 'Scanne autant de textes arabes que tu veux',
      free: '3/mois',
      premium: 'Illimité'
    },
    {
      icon: BookOpen,
      title: 'Vocabulaire Personnalisé',
      description: 'Crée ton dictionnaire personnel',
      free: '50 mots',
      premium: 'Illimité'
    },
    {
      icon: Volume2,
      title: 'Synthèse Vocale Avancée',
      description: 'Écoute la prononciation parfaite',
      free: 'Standard',
      premium: 'HD Qualité'
    },
    {
      icon: Zap,
      title: 'IA Conversationnelle',
      description: 'Discute de tes textes avec notre IA',
      free: 'Basique',
      premium: 'Avancée'
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
              Abonnement Fisabil
            </h1>
            <p className="text-xs text-[#53B16F]/70">Choisis ton expérience</p>
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
        {/* Bannière d'essai gratuit */}
        {userSubscription.trialDaysLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#53B16F] to-[#53B16F] rounded-3xl p-6 text-white text-center shadow-xl"
          >
            <Crown className="w-12 h-12 mx-auto mb-3 text-white/80" />
            <h2 className="text-xl font-bold mb-2">Essai Premium Gratuit</h2>
            <p className="text-white/80 mb-3">
              Il te reste {userSubscription.trialDaysLeft} jours pour tester toutes les fonctionnalités Premium
            </p>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((30 - userSubscription.trialDaysLeft) / 30) * 100}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* Plan actuel */}
        {currentPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#53B16F]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#53B16F] rounded-xl flex items-center justify-center">
                <currentPlan.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#53B16F]">Plan Actuel</h3>
                <p className="text-sm text-[#53B16F]/70">{currentPlan.name}</p>
              </div>
            </div>
            
            {userSubscription.plan === 'free' && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#53B16F]">Scans utilisés</span>
                <span className="text-[#53B16F] font-semibold">
                  {userSubscription.scansUsed}/{userSubscription.scanLimit}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Comparaison des fonctionnalités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-[#53B16F] text-center">
            Compare les fonctionnalités
          </h3>

          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#53B16F]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#53B16F]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#53B16F] text-sm">{feature.title}</h4>
                      <p className="text-xs text-[#53B16F]/70">{feature.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-[#53B16F]/5 rounded-lg">
                      <div className="text-[#53B16F] font-semibold">Gratuit</div>
                      <div className="text-[#53B16F]/70 text-xs">{feature.free}</div>
                    </div>
                    <div className="text-center p-2 bg-[#53B16F] rounded-lg">
                      <div className="text-white font-semibold">Premium</div>
                      <div className="text-white/80 text-xs">{feature.premium}</div>
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
          <h3 className="text-lg font-semibold text-[#53B16F] text-center">
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
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-3xl p-6 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#53B16F] to-[#53B16F] text-white shadow-xl border-2 border-[#53B16F]'
                      : 'bg-white text-[#53B16F] shadow-lg border border-[#53B16F]/20'
                  } ${isCurrent ? 'ring-2 ring-[#53B16F]' : ''}`}
                  onClick={() => setSelectedPlan(plan.id as 'free' | 'premium')}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#53B16F] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Le Plus Populaire
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-2 right-4 bg-white text-[#53B16F] px-2 py-1 rounded-full text-xs font-semibold border border-[#53B16F]">
                      Actuel
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-[#53B16F]'}`} />
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-sm opacity-80">/{plan.period}</span>
                    </div>
                    <p className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-[#53B16F]/70'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {plan.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        {feature.included ? (
                          <Check className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#53B16F]'}`} />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={feature.included ? (isSelected ? 'text-white' : 'text-[#53B16F]') : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: isCurrent ? 1 : 1.05 }}
                    whileTap={{ scale: isCurrent ? 1 : 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscription(plan.id);
                    }}
                    disabled={isCurrent || isProcessing}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-[#53B16F] hover:bg-white/90'
                        : 'bg-[#53B16F] text-white hover:bg-[#53B16F]/90'
                    } ${isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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

        {/* Garantie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-[#53B16F]/70">
            ✅ Garantie satisfait ou remboursé sous 30 jours
          </p>
          <p className="text-xs text-[#53B16F]/50 mt-1">
            Résilie à tout moment • Aucun engagement
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SubscriptionPage;