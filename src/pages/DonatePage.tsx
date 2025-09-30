import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Church, BookOpen, CreditCard, Shield, CheckCircle } from 'lucide-react';
import havilah from '../../public/images/havilah.jpeg';

export const DonatePage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedStructure, setSelectedStructure] = useState('');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    anonymous: false
  });

  const structures = [
    {
      id: 'association',
      name: 'Association Zion Daughters',
      description: 'Soutenir l\'évangélisation et l\'aide aux orphelins',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      image: 'https://images.pexels.com/photos/6143557/pexels-photo-6143557.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'church',
      name: 'Église Apostolique',
      description: 'Contribuer à la construction du lieu de culte',
      icon: Church,
      color: 'from-blue-500 to-indigo-600',
      image: 'https://images.pexels.com/photos/3738988/pexels-photo-3738988.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'school',
      name: 'École Biblique',
      description: 'Financer la formation biblique des étudiants',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const predefinedAmounts = ['25', '50', '100', '200', '500'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = customAmount || amount;
    console.log('Donation:', { structure: selectedStructure, amount: donationAmount, donor: donorInfo });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section
       style={{
    backgroundImage: `url(/images/havilah.jpeg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed", 
  }}
       className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('donate.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Votre générosité nous permet de continuer notre mission d'évangélisation, de formation et de service. Chaque don, petit ou grand, fait une différence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Structure Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t('donate.structure')}
            </h2>
            <p className="text-xl text-gray-600">
              Sélectionnez la structure que vous souhaitez soutenir
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {structures.map((structure, index) => (
              <motion.div
                key={structure.id}
                className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedStructure === structure.id
                    ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                    : 'shadow-lg hover:shadow-xl hover:scale-102'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => setSelectedStructure(structure.id)}
                viewport={{ once: true }}
              >
                <div className="relative h-48">
                  <img
                    src={structure.image}
                    alt={structure.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${structure.color} opacity-80`} />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <structure.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {selectedStructure === structure.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {structure.name}
                  </h3>
                  <p className="text-gray-600">
                    {structure.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Donation Form */}
          {selectedStructure && (
            <motion.div
              className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    {t('donate.amount')} (FCFA)
                  </h3>
                  
                  {/* Predefined Amounts */}
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {predefinedAmounts.map((predAmount) => (
                      <motion.button
                        key={predAmount}
                        type="button"
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          amount === predAmount && !customAmount
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => {
                          setAmount(predAmount);
                          setCustomAmount('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {predAmount}€
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant personnalisé
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount('');
                      }}
                      placeholder="Entrez votre montant"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      min="1"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Vos Informations
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom Complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={donorInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={!donorInfo.anonymous}
                        disabled={donorInfo.anonymous}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={donorInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={!donorInfo.anonymous}
                        disabled={donorInfo.anonymous}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={donorInfo.anonymous}
                        onChange={(e) => setDonorInfo({ ...donorInfo, anonymous: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        Je souhaite rester anonyme
                      </span>
                    </label>
                  </div>
                </div>

                {/* Payment Security */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800">
                      Paiement Sécurisé
                    </h4>
                  </div>
                  <p className="text-green-700 text-sm">
                    Vos informations de paiement sont protégées par un cryptage SSL de niveau bancaire. 
                    Nous ne stockons jamais vos données de carte bancaire.
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedStructure || (!amount && !customAmount)}
                >
                  <CreditCard className="w-5 h-5" />
                  Procéder au Paiement - {customAmount || amount}€
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Impact Section */}
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
              L'Impact de Votre Don
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment vos contributions transforment des vies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                amount: '25€',
                impact: 'Nourrit 5 orphelins pendant une semaine',
                icon: Heart,
                color: 'from-pink-500 to-rose-600'
              },
              {
                amount: '100€',
                impact: 'Finance un mois de formation pour un étudiant',
                icon: BookOpen,
                color: 'from-green-500 to-emerald-600'
              },
              {
                amount: '500€',
                impact: 'Contribue significativement à la construction',
                icon: Church,
                color: 'from-blue-500 to-indigo-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {item.amount}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.impact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Merci pour Votre Générosité
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Grâce à votre soutien, nous pouvons continuer à transformer des vies et à répandre l'espoir. 
              Que Dieu vous bénisse abondamment.
            </p>
            <motion.div
              className="inline-flex items-center gap-2 text-white/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5" />
              <span>Avec gratitude et bénédictions</span>
              <Heart className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};