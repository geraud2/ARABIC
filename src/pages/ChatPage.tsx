import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Volume2, Scan, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Message de bienvenue au démarrage
  useEffect(() => {
    const userData = localStorage.getItem('fisabilUser');
    const userName = userData ? JSON.parse(userData).name : 'cher apprenant';
    const teacher = userData ? JSON.parse(userData).teacher || 'Leila' : 'Leila';

    setTimeout(() => {
      addAIMessage(`Salam ${userName} ! 👋 Je suis ${teacher}, ton professeur d'arabe. 
      
Je peux t'aider à :
• Apprendre du vocabulaire arabe
• Traduire des phrases
• Expliquer la grammaire
• Corriger ta prononciation

De quoi as-tu envie de parler aujourd'hui ?`);
    }, 1000);
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
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text
    }]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Ajouter le message de l'utilisateur
    addUserMessage(userInput);
    const userMessage = userInput.toLowerCase();
    setUserInput('');
    setIsTyping(true);

    // Réponses de l'IA selon le contexte
    setTimeout(() => {
      if (userMessage.includes('salut') || userMessage.includes('bonjour') || userMessage.includes('hello')) {
        addAIMessage(
          "Salam ! 🌟 Comment vas-tu aujourd'hui ?",
          "السلام عليكم",
          "As-salamu alaykum",
          "Assalamou alaïkoum"
        );
      }
      else if (userMessage.includes('merci') || userMessage.includes('thank')) {
        addAIMessage(
          "Avec plaisir ! 😊 De quoi d'autre veux-tu parler ?",
          "شكرا",
          "Shukran",
          "Choukran"
        );
      }
      else if (userMessage.includes('apprendre') || userMessage.includes('apprend') || userMessage.includes('apprentissage')) {
        addAIMessage(
          "Excellent ! Voici quelques mots utiles pour commencer :",
          "ممتاز",
          "Mumtaz",
          "Moumtaaz"
        );
        
        // Enseigner quelques mots
        setTimeout(() => {
          addAIMessage(
            "🔤 **Vocabulaire de base :**",
            "كتاب - قلم - مدرسة",
            "Kitab - Qalam - Madrasa",
            "Kitab - Kalam - Madrassa"
          );
          
          setTimeout(() => {
            addAIMessage(
              "• **Livre** = كتاب (Kitab)\n• **Stylo** = قلم (Qalam)\n• **École** = مدرسة (Madrasa)\n\nVeux-tu apprendre d'autres mots ?",
              "هل تريد تعلم كلمات أخرى؟",
              "Hal turid ta'allum kalimat ukhra?",
              "Hal touride ta'aloum kalimate oukhra ?"
            );
          }, 1500);
        }, 1500);
      }
      else if (userMessage.includes('traduire') || userMessage.includes('traduction') || userMessage.includes('comment dit-on')) {
        if (userMessage.includes('français') || userMessage.includes('francais')) {
          addAIMessage(
            "Bien sûr ! Donne-moi un mot ou une phrase en arabe et je te la traduirai en français. 🎯"
          );
        } else if (userMessage.includes('arabe')) {
          addAIMessage(
            "Avec plaisir ! Donne-moi un mot ou une phrase en français et je te la traduirai en arabe. 📝"
          );
        } else {
          addAIMessage(
            "Je peux traduire du français vers l'arabe et vice-versa. Quelle traduction souhaites-tu ?",
            "أيمكنني الترجمة من الفرنسية إلى العربية وبالعكس",
            "A yumkinuni al-tarjama min al-faransiya ila al-arabiya wa bil-'aks",
            "A youmkinnouni attarjama min alfaransia ila al arabiya wa bil aks"
          );
        }
      }
      else if (userMessage.includes('alphabet') || userMessage.includes('lettre') || userMessage.includes('lettres')) {
        addAIMessage(
          "Voici les premières lettres de l'alphabet arabe :",
          "ا ب ت ث",
          "Alif, Ba, Ta, Tha",
          "Alif, Ba, Ta, Tha"
        );
        
        setTimeout(() => {
          addAIMessage(
            "• **ا** = Alif (comme le 'a')\n• **ب** = Ba (comme le 'b')\n• **ت** = Ta (comme le 't')\n• **ث** = Tha (comme le 'th')\n\nVeux-tu voir d'autres lettres ?"
          );
        }, 1500);
      }
      else if (userMessage.includes('nombre') || userMessage.includes('chiffre') || userMessage.includes('compter')) {
        addAIMessage(
          "Comptons ensemble ! Voici les nombres de 1 à 5 :",
          "١ ٢ ٣ ٤ ٥",
          "Wahid, Ithnan, Thalatha, Arba'a, Khamsa",
          "Wahid, Ithnane, Thalatha, Arbaa, Khamsa"
        );
        
        setTimeout(() => {
          addAIMessage(
            "• **1** = واحد (Wahid)\n• **2** = اثنان (Ithnan)\n• **3** = ثلاثة (Thalatha)\n• **4** = أربعة (Arba'a)\n• **5** = خمسة (Khamsa)"
          );
        }, 1500);
      }
      else if (userMessage.includes('quoi') && userMessage.includes('faire')) {
        addAIMessage(
          "Je peux t'aider à :\n\n📚 **Apprendre du vocabulaire**\n🔤 **Découvrir l'alphabet arabe**\n🗣️ **Pratiquer la conversation**\n📝 **Traduire des phrases**\n🎯 **Réviser tes leçons**\n\nQue souhaites-tu faire ?"
        );
      }
      else if (userMessage.includes('scan') || userMessage.includes('scanner')) {
        addAIMessage(
          "Tu veux scanner un texte arabe ? Excellente idée ! 📸\n\nJe peux t'envoyer vers la page de scan pour analyser tes documents.",
          "مسح النص",
          "Mas'h an-nass",
          "Mass'h annass"
        );
        
        setTimeout(() => {
          addAIMessage(
            "Veux-tu que je t'envoie vers la page de scan maintenant ?",
            "هل تريد الذهاب إلى صفحة المسح الآن؟",
            "Hal turid al-thahab ila safhat al-mas'h al-aan?",
            "Hal touride attahab ila safhati al mass'h al an ?"
          );
        }, 1500);
      }
      else {
        // Réponse par défaut - conversation libre
        const defaultResponses = [
          "Intéressant ! Peux-tu m'en dire plus ? 🤔",
          "Je vois ! Veux-tu que nous approfondissions ce sujet ? 🎯",
          "Très bien ! Parlons de ça. De quoi veux-tu discuter exactement ? 💬",
          "D'accord ! Je peux t'aider avec ça. As-tu une question précise ? 📝",
          "Super ! Choisis ce que tu veux apprendre : vocabulaire, grammaire, conversation... 🌟"
        ];
        
        const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        addAIMessage(randomResponse);
      }
    }, 1500);
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

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16">
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
              Chat Arabe
            </h1>
            <p className="text-xs text-[#53B16F]/70">Discute avec ton professeur IA</p>
          </div>

          <button
            onClick={() => navigate('/scan')}
            className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
            title="Scanner un texte"
          >
            <Scan className="w-5 h-5" />
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
                      className="flex items-center gap-2 bg-[#53B16F] text-white px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Écouter la prononciation</span>
                    </motion.button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input message */}
      <div className="sticky bottom-16 bg-white border-t border-[#53B16F]/20 p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tape ton message ici..."
            className="flex-1 px-4 py-3 border border-[#53B16F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent text-[#53B16F] placeholder-[#53B16F]/40"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!userInput.trim() || isTyping}
            className="bg-[#53B16F] text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ChatPage;