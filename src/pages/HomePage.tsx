import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/HeroSection';
import { BlogSection } from '../components/BlogSection';
import { FeatureCard } from '../components/FeatureCard';
import { Heart, BookOpen, Church, Users, ArrowRight } from 'lucide-react';
import BlogEvents from '../components/eglise/BlogEvents';
import Donations from '../components/eglise/Donations';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const structures = [
    {
      title: t('nav.association'),
      description: t('association.description'),
      icon: Heart,
      path: '/association',
      image: '/images/asso.jpeg',
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: t('nav.church'),
      description: t('church.project.description'),
      icon: Church,
      path: '/church',
      image: './images/estro.jpg',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: t('nav.school'),
      description: t('school.programs.description'),
      icon: BookOpen,
      path: '/school',
      image: './images/ecole/ecole.jpeg',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
        backgroundImage="/images/blanc.jpeg"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            {t('home.hero.cta')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </HeroSection>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.about.description')}
            </p>
          </motion.div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">2019</div>
              <p className="text-gray-600">Légalisation Association</p>
            </motion.div>
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-green-600 mb-2">2021</div>
              <p className="text-gray-600">Ouverture École Biblique</p>
            </motion.div>
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">5ème</div>
              <p className="text-gray-600">Promotion en Cours</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structures Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nos Structures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos trois piliers dédiés à l'évangélisation, la formation et le service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {structures.map((structure, index) => (
              <motion.div
                key={structure.path}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
              >
                <Link to={structure.path} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={structure.image}
                        alt={structure.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${structure.color} opacity-70`} />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <structure.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {structure.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {structure.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                        {t('learn.more')}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nos Valeurs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Heart}
              title="Amour"
              description="L'amour de Dieu guide toutes nos actions et notre service"
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Communauté"
              description="Nous créons une famille spirituelle unie dans la foi"
              delay={0.2}
            />
            <FeatureCard
              icon={BookOpen}
              title="Formation"
              description="L'éducation biblique pour équiper les disciples"
              delay={0.4}
            />
            <FeatureCard
              icon={Church}
              title="Service"
              description="Servir Dieu et notre communauté avec excellence"
              delay={0.6}
            />
          </div>
        </div>
      </section>
      {/* blog */}
      <BlogEvents/>
            {/* Blog Section */}
      <BlogSection />
      <Donations/>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Rejoignez-nous
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Participez à notre mission d'évangélisation et de transformation des vies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-block"
                >
                  Nous Contacter
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/donate"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-block"
                >
                  {t('nav.donate')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};