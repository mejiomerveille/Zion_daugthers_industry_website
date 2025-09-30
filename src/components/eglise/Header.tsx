import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+237 6 93 66 64 40</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@gracedivine.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Salle des temoins de Jehovah Jouvence, Descente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">✝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">La Grâce Divine</h1>
                <p className="text-sm text-gray-600">Église Apostolique</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Accueil</a>
              <a href="#apropos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">À Propos</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#evenements" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Événements</a>
              <a href="#blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Blog</a>
              <a href="#dons" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Dons</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>Accueil</a>
                <a href="#apropos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>À Propos</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>Services</a>
                <a href="#evenements" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>Événements</a>
                <a href="#blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>Blog</a>
                <a href="#dons" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>Dons</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={toggleMenu}>Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}