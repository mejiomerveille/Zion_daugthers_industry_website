import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/HeroSection';
import About from '../components/eglise/About';
import Services from '../components/eglise/Services';
import Events from '../components/eglise/Events';
import { Church, Facebook, Users, SprayCan as Pray, Building, Heart, Instagram, TicketCheckIcon, Youtube } from 'lucide-react';

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

            {/* Vision Leaders Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nos Porteurs de Vision
            </h2>
            <p className="text-lg text-gray-600">
              Des serviteurs passionnés par la mission de Dieu et le développement spirituel de la communauté.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-20">
            {[
              {
                image: '/images/im3.jpeg',
                name: 'Apotre Rodrigues  Minfoumou',
                title: 'Fondateur & Visionnaire Principal',
                facebook: 'https://facebook.com/pasteur.jeanclaude',
                youtube: 'https://youtube.com/@eglisejeanclaude',
                tiktok: 'https://tiktok.com/@pasteurjeanclaude',
                instagram: 'https://instagram.com/pasteur.jeanclaude'
              },
              {
                image: '/images/im5.jpeg',
                name: 'Prophetesse Esther Minfoumou',
                title: 'Coordinatrice des Ministères',
                facebook: 'https://www.facebook.com/esther.sikati.94?rdid=0GjlWcqEM0HTxYjb&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19yBtSndnX%2F#',
                youtube: 'https://youtube.com/@ministeremarie',
                tiktok: 'https://tiktok.com/@soeurmarie',
                instagram: 'https://instagram.com/soeur.marie'
              },
            ].map((leader, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-92 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">{leader.title}</p>
                  <div className="flex justify-center gap-4 text-gray-500">
                    <a href={leader.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
                      <Facebook/>
                    </a>
                    <a href={leader.youtube} target="_blank" rel="noreferrer" className="hover:text-red-600 transition">
                      <Youtube/>
                    </a>
                    <a href={leader.tiktok} target="_blank" rel="noreferrer" className="hover:text-gray-800 transition">
                      <TicketCheckIcon/>
                    </a>
                    <a href={leader.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-600 transition">
                      <Instagram/>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}

      <Services/>
      {/* Activities Section */}
      <Events/>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Témoignages des Fidèles
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez comment Dieu agit puissamment dans la vie de nos membres.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: '/images/ecole/soeur.jpeg',
                name: 'Sœur Grâce M.',
                testimony: "J'étais malade depuis des mois, mais après la prière du dimanche, j'ai été complètement guérie ! Gloire à Dieu !"
              },
              {
                image: '/images/ecole/sa.jpeg',
                name: 'Frère Samuel T.',
                testimony: "Dieu a transformé ma vie spirituelle depuis que j’ai rejoint cette église. J’ai retrouvé la paix et la joie intérieure."
              },
              {
                image: '/images//ecole/na.jpeg',
                name: 'Sœur Nadège L.',
                testimony: "Pendant le culte de louange, j’ai ressenti une présence divine incroyable. Cette communauté est une vraie bénédiction."
              }
            ].map((testimony, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={testimony.image}
                  alt={testimony.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 shadow-md"
                />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{testimony.name}</h4>
                <p className="text-gray-600 italic leading-relaxed">“{testimony.testimony}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              '/images/fonce.jpeg',
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