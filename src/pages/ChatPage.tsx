import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatAssistant from '../components/ChatAssistant';
import MessageBubble from '../components/MessageBubble';
import BottomNav from '../components/BottomNav';
import chatData from '../data/chat.json';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  arabic?: string;
  transliteration?: string;
  pronunciation?: string;
  options?: string[];
  audio?: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const lesson = chatData.lessons[currentLesson];
  const currentMessage = lesson.messages[currentMessageIndex];

  useEffect(() => {
    // Charger la progression sauvegardée
    const savedProgress = localStorage.getItem('arabika_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentLesson(progress.lesson || 0);
      setCurrentMessageIndex(progress.message || 0);
    }

    // Afficher le premier message après un délai
    setTimeout(() => {
      if (lesson.messages.length > 0) {
        showMessage(lesson.messages[0]);
      }
    }, 1000);
  }, []);

  const showMessage = (message: any) => {
    setIsTyping(true);
    setShowOptions(false);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text: message.text,
        arabic: message.arabic,
        transliteration: message.transliteration,
        pronunciation: message.pronunciation
      }]);
      setIsTyping(false);
      
      // Afficher les options après un court délai
      if (message.options) {
        setTimeout(() => setShowOptions(true), 500);
      }
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: option
    };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);

    // Gérer les actions spéciales
    if (option === 'Voir mon profil') {
      setTimeout(() => navigate('/profile'), 1000);
      return;
    }

    if (option === 'Retour à l\'accueil') {
      setTimeout(() => navigate('/home'), 1000);
      return;
    }

    if (option === 'Recommencer la leçon') {
      setCurrentMessageIndex(0);
      setMessages([]);
      setTimeout(() => showMessage(lesson.messages[0]), 1000);
      return;
    }

    if (option === 'Leçon suivante' && currentLesson < chatData.lessons.length - 1) {
      const nextLesson = currentLesson + 1;
      setCurrentLesson(nextLesson);
      setCurrentMessageIndex(0);
      setMessages([]);
      setTimeout(() => showMessage(chatData.lessons[nextLesson].messages[0]), 1000);
      
      // Sauvegarder la progression
      localStorage.setItem('arabika_progress', JSON.stringify({
        lesson: nextLesson,
        message: 0
      }));
      return;
    }

    if (option === 'Réviser Alif - ا') {
      setCurrentLesson(0);
      setCurrentMessageIndex(0);
      setMessages([]);
      setTimeout(() => showMessage(chatData.lessons[0].messages[0]), 1000);
      return;
    }

    if (option === 'Continuer avec Ba - ب') {
      setCurrentLesson(1);
      setCurrentMessageIndex(0);
      setMessages([]);
      setTimeout(() => showMessage(chatData.lessons[1].messages[0]), 1000);
      
      localStorage.setItem('arabika_progress', JSON.stringify({
        lesson: 1,
        message: 0
      }));
      return;
    }

    // Gestion normale de la progression
    const nextIndex = currentMessageIndex + 1;
    if (nextIndex < lesson.messages.length) {
      setCurrentMessageIndex(nextIndex);
      setTimeout(() => showMessage(lesson.messages[nextIndex]), 1000);
      
      // Sauvegarder la progression
      localStorage.setItem('arabika_progress', JSON.stringify({
        lesson: currentLesson,
        message: nextIndex
      }));
    } else {
      // Fin de la leçon - proposer de continuer
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'ai',
          text: "🎉 Félicitations ! Tu as terminé cette leçon. Que veux-tu faire maintenant ?",
          options: [
            'Leçon suivante',
            'Réviser cette leçon',
            'Voir mon profil',
            'Retour à l\'accueil'
          ]
        }]);
        setShowOptions(true);
      }, 1000);
    }
  };

  const playAudio = (text: string) => {
    // Simulation de lecture audio - à remplacer par Howler.js plus tard
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E5] to-[#F8F0E0] flex flex-col pb-16">
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
              {lesson.title}
            </h1>
            <p className="text-xs text-[#8B5E3C]">{lesson.description}</p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-[#8B5E3C] hover:text-[#3E2C1E] transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Assistant */}
          <ChatAssistant isTyping={isTyping} />

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.id}-${index}`}>
                <MessageBubble
                  text={message.text}
                  type={message.type}
                  arabic={message.arabic}
                  transliteration={message.transliteration}
                  pronunciation={message.pronunciation}
                />
                
                {/* Bouton audio pour les messages en arabe */}
                {message.arabic && message.type === 'ai' && (
                  <div className="flex justify-center mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => playAudio(message.arabic!)}
                      className="flex items-center gap-2 bg-[#CBA76A] text-white px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Écouter la prononciation</span>
                    </motion.button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Options */}
      {showOptions && currentMessage?.options && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-16 bg-white border-t border-[#CBA76A]/20 shadow-lg"
        >
          <div className="max-w-2xl mx-auto px-4 py-4 space-y-2">
            {currentMessage.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(option)}
                className="w-full bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] text-white font-medium py-3 px-6 rounded-xl shadow hover:shadow-md transition-shadow text-sm"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ChatPage;