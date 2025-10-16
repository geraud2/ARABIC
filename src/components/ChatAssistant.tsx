import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface ChatAssistantProps {
  isTyping?: boolean;
}

const ChatAssistant = ({ isTyping = false }: ChatAssistantProps) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-3 mb-6 p-4 bg-white rounded-2xl shadow-lg border border-[#CBA76A]/20"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CBA76A] to-[#8B5E3C] flex items-center justify-center shadow-lg">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-[#3E2C1E] font-semibold text-sm">Arabika Assistant</h3>
        {isTyping && (
          <div className="flex gap-1 mt-1">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 rounded-full bg-[#CBA76A]"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-[#CBA76A]"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-[#CBA76A]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatAssistant;