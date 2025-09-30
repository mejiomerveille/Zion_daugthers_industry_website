import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/HeroSection';
import About from '../components/eglise/About';
import Services from '../components/eglise/Services';
import Events from '../components/eglise/Events';
import { Church, Calendar, Users, SprayCan as Pray, Building, Heart } from 'lucide-react';

export const ChurchPage: React.FC = () => {
  const { t } = useLanguage();

  const activities = [
    {
      icon: Church,
      title: t('church.activities.worship'),
      description: 'Cultes dominicaux avec prédication, louange et communion',
      time: 'Dimanche 9h00',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Pray,
      title: t('church.activities.prayer'),
      description: 'Temps de prière collective et intercession',
      time: 'Mercredi 18h00',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Users,
      title: t('church.activities.fellowship'),
      description: 'Moments de partage, d\'entraide et de fraternité',
      time: 'Vendredi 19h00',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t('church.hero.title')}
        subtitle={t('church.hero.subtitle')}
        backgroundImage="/images/jaune.jpeg"
      >
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Nous Rejoindre
              <Users className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/donate"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center gap-2"
            >
              Soutenir le Projet
              <Building className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </HeroSection>

      {/* About Section0 */}
      <About/>
      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Notre Église
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('church.opened')}, notre église est devenue un lieu de culte, de prière et de communion fraternelle où les fidèles se rassemblent pour adorer Dieu et grandir dans la foi.
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {t('church.project.title')}
                </h3>
                <p className="text-blue-700">
                  {t('church.project.description')}
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progression du Projet</span>
                  <span className="text-sm font-medium text-blue-600">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '35%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/jaune.jpeg"
                alt="Church interior"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
              
              {/* Floating stats */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-800">100+</div>
                    <div className="text-sm text-gray-600">Fidèles</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}

      <Services/>
      {/* Activities Section */}
      <Events/>
      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Galerie
      </h2>
      <p className="text-xl text-gray-600">
        Découvrez quelques moments de notre vie d'église
      </p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
        '/images/im1.jpeg',
        '/images/im2.jpeg',
        '/images/im3.jpeg',
        '/images/im4.jpeg',
        '/images/im5.jpeg',
        '/images/im6.jpeg',
        '/images/im1.jpeg',
        '/images/im1.jpeg'
      ].map((image, index) => (
        <motion.div
          key={index}
          className="relative h-48 overflow-hidden rounded-2xl group cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
        >
          <img
            src={image}
            alt={`Galerie ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Aidez-nous à Construire
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Votre contribution nous aidera à construire un lieu de culte permanent pour notre communauté
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/donate"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  Contribuer au Projet
                  <Building className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Nous Rejoindre
                  <Heart className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};