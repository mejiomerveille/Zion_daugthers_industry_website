import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Church, BookOpen, Shield, CheckCircle } from 'lucide-react';
// import havilah from '../../public/images/havilah.jpeg';

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
      image: '/images/asso.jpeg'
    },
    {
      id: 'church',
      name: 'Église Apostolique',
      description: 'Contribuer à la construction du lieu de culte',
      icon: Church,
      color: 'from-blue-500 to-indigo-600',
      image: './images/estro.jpg'
    },
    {
      id: 'school',
      name: 'École Biblique',
      description: 'Financer la formation biblique des étudiants',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      image: './images/ecole/ecole.jpeg'
    }
  ];

  const predefinedAmounts = ['25000', '50000', '100000', '200000', '500000'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = customAmount || amount;
    console.log('Donation:', { structure: selectedStructure, amount: donationAmount, donor: donorInfo });
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDonorInfo({
  //     ...donorInfo,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handlePayment = (method: string) => {
    const payAmount = customAmount || amount;
    if (!payAmount) {
      alert("Veuillez d'abord entrer un montant.");
      return;
    }

    // Numéros de compte (remplace-les par tes vrais numéros)
    const orangeNumber = "680837590";
    const mtnNumber = "674987734";

    if (method === "orange") {
      // Code USSD Orange Money Cameroun
      // Format: *150*1*1*NUMERO*Montant#
      window.location.href = `tel:*150*1*1*${orangeNumber}*${payAmount}%23`;
    } else if (method === "mtn") {
      // Code USSD MTN MoMo Cameroun
      // Format: *126*1*NUMERO*Montant#
      window.location.href = `tel:*126*1*${mtnNumber}*${payAmount}%23`;
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                {/* Sélection du montant */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Montant à verser (FCFA)
                  </h3>

                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {predefinedAmounts.map((predAmount) => (
                      <motion.button
                        key={predAmount}
                        type="button"
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          amount === predAmount && !customAmount
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => {
                          setAmount(predAmount);
                          setCustomAmount('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {predAmount}FCFA
                      </motion.button>
                    ))}
                  </div>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      min="100"
                    />
                  </div>
                </div>

                {/* Choix du moyen de paiement */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Choisissez votre moyen de paiement
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Orange Money */}
                    <motion.button
                      type="button"
                      onClick={() => handlePayment("orange")}
                      className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-2xl p-6 transition-all shadow-sm hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src="data:image/png;base64,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" alt="Orange Money" className="w-16 mb-3" />
                      <p className="text-orange-600 font-semibold">Orange Money</p>
                      <p className="text-sm text-gray-600 mt-2">Compte : 680837590</p>
                    </motion.button>

                    {/* MTN Mobile Money */}
                    <motion.button
                      type="button"
                      onClick={() => handlePayment("mtn")}
                      className="flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-2xl p-6 transition-all shadow-sm hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src="data:image/png;base64,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" alt="MTN Mobile Money" className="w-16 mb-3" />
                      <p className="text-yellow-600 font-semibold">MTN Mobile Money</p>
                      <p className="text-sm text-gray-600 mt-2">Compte : 674987734</p>
                    </motion.button>
                  </div>
                </div>

                {/* Sécurité */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800">
                      Paiement Sécurisé
                    </h4>
                  </div>
                  <p className="text-green-700 text-sm">
                    Vous serez redirigé vers le menu officiel de votre opérateur pour valider le paiement.
                    Aucun mot de passe n’est saisi sur notre site.
                  </p>
                </div>
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
                amount: '25000 FCFA',
                impact: 'Nourrit 5 orphelins pendant une semaine',
                icon: Heart,
                color: 'from-pink-500 to-rose-600'
              },
              {
                amount: '100000 FCFA',
                impact: 'Finance un mois de formation pour un étudiant',
                icon: BookOpen,
                color: 'from-green-500 to-emerald-600'
              },
              {
                amount: '500000 FCFA',
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