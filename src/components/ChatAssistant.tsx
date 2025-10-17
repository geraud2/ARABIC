import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Scan } from 'lucide-react';

interface ChatAssistantProps {
  isTyping?: boolean;
  teacher?: string;
}

const ChatAssistant = ({ isTyping = false, teacher = "Fisabil" }: ChatAssistantProps) => {
  // Récupérer le professeur de l'utilisateur
  React.useEffect(() => {
    const userData = localStorage.getItem('fisabilUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.teacher) {
        teacher = parsedData.teacher;
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-3 mb-6 p-4 bg-white rounded-2xl shadow-lg border border-[#53B16F]/20"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#53B16F] to-[#53B16F] flex items-center justify-center shadow-lg">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-[#53B16F] font-semibold text-sm">{teacher} - Fisabil IA</h3>
        <p className="text-[#53B16F]/70 text-xs mt-1">Votre professeur d'arabe intelligent</p>
        {isTyping && (
          <div className="flex gap-1 mt-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 rounded-full bg-[#53B16F]"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-[#53B16F]"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-[#53B16F]"
            />
          </div>
        )}
      </div>
      
      {/* Indicateur de textes scannés */}
      <div className="flex items-center gap-1 text-[#53B16F]/60">
        <Scan className="w-4 h-4" />
        <span className="text-xs">Scan actif</span>
      </div>
    </motion.div>
  );
};

export default ChatAssistant;