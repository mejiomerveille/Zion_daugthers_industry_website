import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <motion.div 
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="w-4 h-4 text-white" />
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'fr' 
            ? 'bg-white text-blue-900' 
            : 'text-white/80 hover:text-white'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en' 
            ? 'bg-white text-blue-900' 
            : 'text-white/80 hover:text-white'
        }`}
      >
        EN
      </button>
    </motion.div>
  );
};