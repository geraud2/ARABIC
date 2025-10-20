import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Volume2, Scan, Send, Menu, Book, Mic, Square } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatAssistant from '../components/ChatAssistant';
import MessageBubble from '../components/MessageBubble';
import BottomNav from '../components/BottomNav';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  arabic?: string;
  transliteration?: string;
  pronunciation?: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Récupération des données utilisateur
  const userData = JSON.parse(localStorage.getItem('fisabilUser') || '{}');
  const { name, gender, language, teacher } = userData;

  // Textes multilingues
  const translations = {
    fr: {
      header: {
        title: "Chat Arabe",
        subtitle: "Discute avec ton professeur IA"
      },
      menu: {
        back: "Retour",
        home: "Accueil",
        scan: "Scanner un texte",
        library: "Ma Bibliothèque"
      },
      input: {
        placeholder: "Tape ton message ici...",
        listen: "Écouter la prononciation",
        listenShort: "Écouter",
        speak: "Parler",
        recording: "Enregistrement...",
        stop: "Arrêter"
      }
    },
    en: {
      header: {
        title: "Arabic Chat",
        subtitle: "Chat with your AI teacher"
      },
      menu: {
        back: "Back",
        home: "Home",
        scan: "Scan text",
        library: "My Library"
      },
      input: {
        placeholder: "Type your message here...",
        listen: "Listen to pronunciation",
        listenShort: "Listen",
        speak: "Speak",
        recording: "Recording...",
        stop: "Stop"
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.fr;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gestion du texte scanné venant de la bibliothèque
  useEffect(() => {
    if (location.state?.scannedText) {
      const { scannedText } = location.state;
      addUserMessage(`Je veux étudier ce texte : "${scannedText.arabicText}"`);
      handleScannedText(scannedText);
    }
  }, [location.state]);

  // UN SEUL message de bienvenue simple
  useEffect(() => {
    const userName = name || 'cher apprenant';
    const teacherName = teacher || 'Leila';

    setTimeout(() => {
      addAIMessage(`Salam ${userName} ! 👋 Je suis ${teacherName}. Comment puis-je t'aider ?`);
    }, 500);
  }, []);

  // Nettoyage du timer d'enregistrement
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const addAIMessage = (text: string, arabic?: string, transliteration?: string, pronunciation?: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text,
        arabic,
        transliteration,
        pronunciation
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text
    }]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        handleAudioSubmission(audioBlob);
        
        // Arrêter tous les tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer pour l'affichage du temps d'enregistrement
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erreur accès microphone:', error);
      addAIMessage("Je n'ai pas pu accéder à votre microphone. Vérifiez les permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleAudioSubmission = (audioBlob: Blob) => {
    // Simulation de transcription vocale
    // En production, vous utiliseriez un service comme Google Speech-to-Text
    setIsTyping(true);
    
    setTimeout(() => {
      // Messages simulés basés sur la durée d'enregistrement
      let transcribedText = "";
      
      if (recordingTime < 3) {
        transcribedText = "Bonjour !";
      } else if (recordingTime < 6) {
        transcribedText = "Je veux apprendre l'arabe";
      } else {
        transcribedText = "Pouvez-vous m'expliquer l'alphabet arabe ?";
      }

      addUserMessage(transcribedText);
      setRecordingTime(0);
      
      // Réponse automatique de l'IA
      setTimeout(() => {
        if (transcribedText.includes('alphabet') || transcribedText.includes('alphabet')) {
          addAIMessage(
            "Voici les premières lettres de l'alphabet arabe :\n• ا = Alif\n• ب = Ba\n• ت = Ta",
            "ا ب ت ث",
            "Alif, Ba, Ta, Tha"
          );
        } else if (transcribedText.includes('apprendre') || transcribedText.includes('learn')) {
          addAIMessage(
            "Excellent ! Commençons par du vocabulaire de base :\n• Livre = كتاب\n• Stylo = قلم\n• Maison = بيت",
            "كتاب - قلم - بيت",
            "Kitab - Qalam - Bayt"
          );
        } else {
          addAIMessage(`J'ai bien reçu votre message : "${transcribedText}". Comment puis-je vous aider ?`);
        }
      }, 1000);
      
    }, 1000);
  };

  const handleScannedText = (scannedText: any) => {
    setIsTyping(true);
    
    setTimeout(() => {
      addAIMessage(
        `Texte à étudier : ${scannedText.arabicText}`,
        scannedText.arabicText
      );
    }, 800);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    const userMessage = userInput.toLowerCase();
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      if (userMessage.includes('salut') || userMessage.includes('bonjour') || userMessage.includes('hello')) {
        addAIMessage(
          `Salam ${name} ! 🌟 Comment vas-tu ?`,
          "السلام عليكم",
          "As-salamu alaykum"
        );
      }
      else if (userMessage.includes('merci') || userMessage.includes('thank')) {
        addAIMessage("Avec plaisir ! 😊");
      }
      else if (userMessage.includes('apprendre') || userMessage.includes('learn') || userMessage.includes('vocabulaire')) {
        addAIMessage(
          "Voici du vocabulaire de base :\n• Livre = كتاب (Kitab)\n• Stylo = قلم (Qalam)\n• École = مدرسة (Madrasa)",
          "كتاب - قلم - مدرسة",
          "Kitab - Qalam - Madrasa"
        );
      }
      else if (userMessage.includes('traduire') || userMessage.includes('translate')) {
        addAIMessage("Je traduis français ↔ arabe. Donne-moi un mot ou une phrase !");
      }
      else if (userMessage.includes('alphabet') || userMessage.includes('lettre')) {
        addAIMessage(
          "Alphabet arabe :\n• ا = Alif\n• ب = Ba\n• ت = Ta\n• ث = Tha",
          "ا ب ت ث",
          "Alif, Ba, Ta, Tha"
        );
      }
      else if (userMessage.includes('nombre') || userMessage.includes('number') || userMessage.includes('chiffre')) {
        addAIMessage(
          "Nombres 1-5 :\n• 1 = واحد (Wahid)\n• 2 = اثنان (Ithnan)\n• 3 = ثلاثة (Thalatha)",
          "١ ٢ ٣ ٤ ٥",
          "Wahid, Ithnan, Thalatha, Arba'a, Khamsa"
        );
      }
      else if (userMessage.includes('quoi faire') || userMessage.includes('help')) {
        addAIMessage("Je peux t'aider avec : vocabulaire, alphabet, conversation, traduction 📚");
      }
      else if (userMessage.includes('scan')) {
        addAIMessage(
          "Tu veux scanner un texte ? Je t'envoie vers la page scan !",
          "مسح النص",
          "Mas'h an-nass"
        );
        setTimeout(() => {
          navigate('/scan');
        }, 1500);
      }
      else if (userMessage.includes('bibliothèque') || userMessage.includes('library')) {
        addAIMessage("Je t'envoie vers ta bibliothèque 📚");
        setTimeout(() => {
          navigate('/library');
        }, 1500);
      }
      else {
        const defaultResponses = [
          "Intéressant ! Dis-m'en plus 🤔",
          "D'accord, parlons de ça 💬", 
          "Super ! Quelle est ta question ? 📝",
          "Je peux t'aider avec ça 🌟",
          "Très bien ! De quoi veux-tu parler ? 🎯"
        ];
        const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        addAIMessage(randomResponse);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 safe-area-bottom">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#53B16F]/20 sticky top-0 z-20 safe-area-top">
        <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-2 text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{t.menu.back}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="text-center flex-1 sm:flex-none">
            <h1 className="text-lg font-semibold text-[#53B16F]">
              {t.header.title}
            </h1>
            <p className="text-xs text-gray-600 hidden xs:block">
              {t.header.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/library')}
              className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
              title={t.menu.library}
            >
              <Book className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/scan')}
              className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
              title={t.menu.scan}
            >
              <Scan className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/')}
              className="sm:hidden text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
              title={t.menu.home}
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-t border-[#53B16F]/10 px-4 py-3"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate(-1);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-gray-700 py-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t.menu.back}</span>
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-gray-700 py-2"
              >
                <Home className="w-5 h-5" />
                <span>{t.menu.home}</span>
              </button>
              <button
                onClick={() => {
                  navigate('/scan');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-gray-700 py-2"
              >
                <Scan className="w-5 h-5" />
                <span>{t.menu.scan}</span>
              </button>
              <button
                onClick={() => {
                  navigate('/library');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-gray-700 py-2"
              >
                <Book className="w-5 h-5" />
                <span>{t.menu.library}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Assistant */}
          <div className="mb-4 sm:mb-6">
            <ChatAssistant isTyping={isTyping} />
          </div>

          {/* Messages */}
          <div className="space-y-3 sm:space-y-4">
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
                  <div className="flex justify-center my-3 sm:my-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => playAudio(message.arabic!)}
                      className="flex items-center gap-2 bg-[#53B16F] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{t.input.listen}</span>
                      <span className="xs:hidden">{t.input.listenShort}</span>
                    </motion.button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input message avec enregistrement vocal */}
      <div className="sticky bottom-16 bg-white border-t border-[#53B16F]/20 p-3 sm:p-4 safe-area-bottom">
        <div className="max-w-2xl mx-auto">
          {/* Indicateur d'enregistrement */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-3 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-medium text-sm">
                  {t.input.recording} {formatTime(recordingTime)}
                </span>
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  <Square className="w-3 h-3" />
                  {t.input.stop}
                </button>
              </div>
            </motion.div>
          )}

          {/* Zone de saisie */}
          <div className="flex gap-2">
            {/* Bouton d'enregistrement vocal */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex-shrink-0 p-3 rounded-xl transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'bg-[#53B16F] text-white hover:bg-[#53B16F]/90'
              }`}
              title={isRecording ? t.input.stop : t.input.speak}
            >
              {isRecording ? (
                <Square className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </motion.button>

            {/* Champ de texte */}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.input.placeholder}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-[#53B16F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            />

            {/* Bouton d'envoi */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!userInput.trim() || isTyping}
              className="bg-[#53B16F] text-white p-2 sm:p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ChatPage;