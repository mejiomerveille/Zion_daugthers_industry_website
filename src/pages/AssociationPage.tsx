import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/HeroSection';
import { Heart, Gift, Music, Camera, ArrowRight } from 'lucide-react';
import interview from '../../public/images/association/Image interview crtv.png'
import interview2 from '../../public/images/association/image interview 2.png'

export const AssociationPage: React.FC = () => {
  const { t } = useLanguage();

  const activities = [
    {
      icon: Gift,
      title: t('association.activities.donations'),
      description: 'Aide aux orphelins et aux nécessiteux, distributions de vivres et de vêtements',
      image: interview
    },
    {
      icon: Music,
      title: t('association.activities.concerts'),
      description: 'Événements spirituels et musicaux pour l\'évangélisation et l\'espoir',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Camera,
      title: t('association.activities.visits'),
      description: 'Visites dans les communautés, témoignages et partage de la Parole',
      image: interview2
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t('association.hero.title')}
        subtitle={t('association.hero.subtitle')}
        backgroundImage="/images/estro.jpg"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/donate"
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Soutenir l'Association
            <Heart className="w-5 h-5" />
          </Link>
        </motion.div>
      </HeroSection>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                À Propos de l'Association
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('association.description')}
              </p>
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-2xl">
                <p className="text-lg font-semibold text-pink-800">
                  {t('association.president')}
                </p>
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
                src="/images/asso.jpeg"
                alt="Association activities"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Notre Histoire
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-pink-400 to-rose-600"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                <motion.div
                  className="relative flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl shadow-lg">
                      <h3 className="text-2xl font-bold text-pink-800 mb-2">2019</h3>
                      <p className="text-gray-700">Légalisation officielle de l'Association Zion Daughters au Cameroun</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative flex items-center md:flex-row-reverse"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl shadow-lg">
                      <h3 className="text-2xl font-bold text-rose-800 mb-2">2020-2024</h3>
                      <p className="text-gray-700">Expansion des activités d'évangélisation, concerts prophétiques et aide humanitaire</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t('association.activities.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
              >
                <div className="relative h-58 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-600/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article de Presse Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Article de Presse
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              L'association Zion Daughter’s Int’l redonne du sourire aux orphelins — reportage paru dans le journal <strong>Médiation</strong>.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/association/Médiation-article sur Zion.jpg"
              alt="Article de presse sur Zion Daughter’s Int’l"
              className="w-full rounded-2xl transform hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Visite à l’Orphelinat
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez en images notre action humanitaire en faveur des orphelins de la Fondation Mont Sinaï à Yaoundé.
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Si tu as un lien YouTube */}
            {/* <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/TA_REMPLACER_PAR_TON_LIEN"
                title="Visite à l’Orphelinat"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-2xl"
              ></iframe>
            </div> */}

            {/* OU si tu as une vidéo locale */}
            
            <video controls className="w-full rounded-2xl">
              <source src="/videos/CRTV Télé-Visite de Zion-Mont Sinai- 2022-09-23 at 15.02.38.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video> 
           
          </motion.div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Soutenez Notre Mission
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Votre soutien nous permet de continuer notre œuvre d'évangélisation et d'aide aux plus nécessiteux
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/donate"
                  className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  Faire un Don
                  <Heart className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Nous Rejoindre
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};