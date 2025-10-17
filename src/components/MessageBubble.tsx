import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  text: string;
  type: 'ai' | 'user';
  arabic?: string;
  transliteration?: string;
  pronunciation?: string;
  isFromScannedText?: boolean;
}

const MessageBubble = ({
  text,
  type,
  arabic,
  transliteration,
  pronunciation,
  isFromScannedText = false
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
            ? `bg-white text-[#53B16F] shadow-lg border ${
                isFromScannedText 
                  ? 'border-[#53B16F] border-2 bg-[#53B16F]/5' 
                  : 'border-[#53B16F]/20'
              }`
            : 'bg-gradient-to-r from-[#53B16F] to-[#53B16F] text-white'
        }`}
      >
        {isFromScannedText && (
          <div className="flex items-center gap-1 mb-2 text-xs text-[#53B16F] font-medium">
            <span>📖</span>
            <span>Texte scanné analysé</span>
          </div>
        )}
        
        <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>

        {arabic && (
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mt-4 p-4 bg-[#53B16F]/5 rounded-2xl text-center border border-[#53B16F]/20"
          >
            <div className="text-6xl font-arabic text-[#53B16F] mb-2">
              {arabic}
            </div>
            {transliteration && (
              <div className="text-sm text-[#53B16F] font-medium mb-1">
                {transliteration}
              </div>
            )}
            {pronunciation && (
              <div className="text-xs text-[#53B16F] opacity-70">
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