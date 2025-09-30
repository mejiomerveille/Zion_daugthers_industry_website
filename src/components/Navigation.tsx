import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Heart, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/association', label: t('nav.association') },
    { path: '/church', label: t('nav.church') },
    { path: '/school', label: t('nav.school') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 backdrop-blur-md z-50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-lg font-bold">Zion Daughters</h1>
              <p className="text-xs text-white/80">Ministries</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ scale: 1.05 }}>
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-white/90 hover:text-yellow-400'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/donate"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
              >
                {t('nav.donate')}
              </Link>
            </motion.div>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-white/20"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'text-yellow-400'
                      : 'text-white/90 hover:text-yellow-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold w-fit"
              >
                {t('nav.donate')}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};