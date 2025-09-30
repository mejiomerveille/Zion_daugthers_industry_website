import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">✝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">La Grâce Divine</h3>
                <p className="text-gray-400">Église Apostolique</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Une communauté de foi fondée sur l'amour du Christ et les principes apostoliques. 
              Nous vous invitons à découvrir la grâce transformatrice de Dieu dans votre vie.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">Salle des temoins de Jehovah Jouvence,<br />Descente</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">+237 6 93 66 64 40</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">contact@gracedivine.com</span>
              </div>
            </div>
          </div>

          {/* Services Schedule */}
          <div>
            <h4 className="text-xl font-bold mb-6">Horaires</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-amber-400">Dimanche</h5>
                <p className="text-gray-300">École Dominicale: 9h00</p>
                <p className="text-gray-300">Service Matin: 10h00</p>
                <p className="text-gray-300">Service Soir: 17h00</p>
              </div>
              <div>
                <h5 className="font-semibold text-amber-400">Mercredi</h5>
                <p className="text-gray-300">Prière: 19h00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Église Apostolique La Grâce Divine. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Fait avec</span>
              <Heart size={16} className="text-red-500" />
              <span>pour glorifier Dieu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}