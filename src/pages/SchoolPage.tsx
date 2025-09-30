import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/HeroSection';
import { BookOpen, GraduationCap, Users, Award, Calendar, Mail, User, Phone } from 'lucide-react';

export const SchoolPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });

  const programs = [
    {
      year: '1ère Année',
      title: 'Fondements Bibliques',
      description: 'Introduction à la théologie, histoire biblique et principes de la foi',
      duration: '6 mois + 3 mois de stage',
      color: 'from-green-500 to-emerald-600'
    },
    {
      year: '2ème Année',
      title: 'Ministère et Leadership',
      description: 'Formation au leadership chrétien, homilétique et pastorale',
      duration: '6 mois + 3 mois de stage',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      year: '3ème Année',
      title: 'Évangélisation et Missions',
      description: 'Stratégies d\'évangélisation, missions et soutenance de mémoire',
      duration: '6 mois + 3 mois de stage',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t('school.hero.title')}
        subtitle={t('school.hero.subtitle')}
        backgroundImage="/images/ecole/ecole.jpeg"
      >
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="#inscription"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              {t('school.register')}
              <GraduationCap className="w-5 h-5" />
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 inline-flex items-center gap-2"
            >
              En Savoir Plus
              <BookOpen className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </HeroSection>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Formation Biblique d'Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('school.created')}, notre école biblique forme des disciples équipés pour le ministère et l'évangélisation.
              </p>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl mb-6">
                <p className="text-lg font-semibold text-green-800 mb-2">
                  {t('school.current')}
                </p>
                <p className="text-green-700">
                  {t('school.programs.description')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="text-center p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-green-600 mb-1">5</div>
                  <p className="text-gray-600 text-sm">Promotions</p>
                </motion.div>
                <motion.div
                  className="text-center p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-1">200+</div>
                  <p className="text-gray-600 text-sm">Diplômés</p>
                </motion.div>
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
                src="/images/ecole/school.jpeg"
                alt="Bible school students"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl" />
              
              {/* Floating achievement */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-800">Diplôme</div>
                    <div className="text-sm text-gray-600">Accrédité</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
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
              {t('school.programs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Formation complète en 3 années avec stages pratiques et soutenance de mémoire
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-green-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-sm font-semibold text-green-600 mb-2">
                  {program.year}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {program.description}
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {program.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="inscription" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Inscription en Ligne
              </h2>
              <p className="text-xl text-gray-600">
                Rejoignez notre prochaine promotion et commencez votre formation biblique
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-2" />
                      Programme Souhaité
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Choisir un programme</option>
                      <option value="1ere-annee">1ère Année - Fondements Bibliques</option>
                      <option value="2eme-annee">2ème Année - Ministère et Leadership</option>
                      <option value="3eme-annee">3ème Année - Évangélisation et Missions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Parlez-nous de votre motivation..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Soumettre ma Candidature
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Témoignages d'Étudiants
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Frere Stive',
                promotion: '3ème Promotion',
                text: 'Cette formation m\'a équipée pour servir dans le ministère des femmes. Je recommande vivement !',
                image: '/images/ecole/stive.jpeg'
              },
              {
                name: 'Soeur Nsangou',
                promotion: '4ème Promotion',
                text: 'Grâce à l\'école biblique, j\'ai pu approfondir ma connaissance de la Parole et développer mes dons.',
                image: '/images/ecole/soeur.jpeg'
              },
              {
                name: 'Grace Mballa',
                promotion: '2ème Promotion',
                text: 'Un enseignement de qualité qui m\'a préparée pour l\'évangélisation. Merci à tous les formateurs !',
                image: '/images/ecole/ecole.jpeg'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-green-600">{testimonial.promotion}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Commencez Votre Formation
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez notre prochaine promotion et équipez-vous pour servir Dieu efficacement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#inscription"
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  S'inscrire Maintenant
                  <GraduationCap className="w-5 h-5" />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/donate"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Soutenir l'École
                  <BookOpen className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};