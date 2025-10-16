import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  text: string;
  type: 'ai' | 'user';
  arabic?: string;
  transliteration?: string;
  pronunciation?: string;
}

const MessageBubble = ({
  text,
  type,
  arabic,
  transliteration,
  pronunciation
}: MessageBubbleProps) => {
  const isAI = type === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-3xl px-6 py-4 ${
          isAI
            ? 'bg-white text-[#3E2C1E] shadow-lg border border-[#CBA76A]/20'
            : 'bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] text-white'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>

        {arabic && (
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mt-4 p-4 bg-[#FFF6E5] rounded-2xl text-center border border-[#CBA76A]/10"
          >
            <div className="text-6xl font-arabic text-[#3E2C1E] mb-2">
              {arabic}
            </div>
            {transliteration && (
              <div className="text-sm text-[#8B5E3C] font-medium mb-1">
                {transliteration}
              </div>
            )}
            {pronunciation && (
              <div className="text-xs text-[#8B5E3C] opacity-70">
                Prononciation: {pronunciation}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;