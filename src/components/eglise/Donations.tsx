import { Heart, Smartphone, CreditCard, Building, Target, Users, TrendingUp, Gift } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
// import havilah from '../../havilah.jpeg';

export default function Donations() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [phoneNumber, setPhoneNumber] = useState('');

  const predefinedAmounts = ['50000', '100000', '250000','150000', '1100000', '1000000'];

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || customAmount;
    console.log('Donation:', { amount, paymentMethod, phoneNumber });
    // Intégration API de paiement ici
  };

  return (
    <section
      id="dons"
      className="relative py-20 overflow-hidden bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(./images/havilah.jpeg)` }}
    >
      {/* Overlay gradient moins intense */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-blue-800/70"></div>

      {/* Éléments animés en arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-blue-300/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-amber-300/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-14 h-14 bg-purple-300/10 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Building className="text-white" size={40} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Soutenez la Construction de Notre Église
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Votre générosité nous aide à bâtir un lieu de culte permanent pour notre communauté.
            Chaque don, petit ou grand, contribue à la réalisation de ce projet divin.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target className="mr-3 text-amber-400" size={28} />
                Objectif du Projet
              </h3>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-white mb-2">
                  <span>Collecté: 45,000,000 FCFA</span>
                  <span>Objectif: 100,000,000 FCFA</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full animate-pulse"
                    style={{ width: '45%' }}
                  ></div>
                </div>
                <p className="text-blue-100 text-sm mt-2">45% de l'objectif atteint</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Construction du Sanctuaire</h4>
                    <p className="text-blue-100">
                      Un espace de culte moderne pouvant accueillir 500 fidèles avec équipements audiovisuels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Salles Annexes</h4>
                    <p className="text-blue-100">
                      Espaces pour l'école dominicale, réunions de prière et activités communautaires.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Équipements Modernes</h4>
                    <p className="text-blue-100">
                      Système de sonorisation, éclairage, climatisation et parking sécurisé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <Gift className="text-blue-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Faire un Don</h3>
                <p className="text-gray-600">Choisissez le montant et la méthode de paiement</p>
              </div>

              <form onSubmit={handleDonation} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Montant du don (FCFA)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                          selectedAmount === amount
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {parseInt(amount).toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Montant personnalisé"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Méthode de paiement
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'momo'
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-300 hover:border-yellow-300'
                      }`}
                    >
                      <Smartphone className="mx-auto mb-2 text-yellow-600" size={24} />
                      <span className="font-semibold">Mobile Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('om')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'om'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      <CreditCard className="mx-auto mb-2 text-orange-600" size={24} />
                      <span className="font-semibold">Orange Money</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Heart size={20} />
                  <span>Faire le Don</span>
                </button>
              </form>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 text-center">
                  🔒 Paiement sécurisé via Mobile Money et Orange Money
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Témoignages de Généreux Donateurs
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Frère Paul M.',
                amount: '50,000 FCFA',
                message: "Heureux de contribuer à la maison de Dieu. Que Sa gloire remplisse ce lieu !",
                image:
                  'https://images.pexels.com/photos/8468068/pexels-photo-8468068.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              },
              {
                name: 'Sœur Marie K.',
                amount: '25,000 FCFA',
                message: "C'est un privilège de participer à cette œuvre divine. Dieu nous bénira !",
                image:
                  'https://images.pexels.com/photos/8468070/pexels-photo-8468070.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              },
              {
                name: 'Famille Nguema',
                amount: '100,000 FCFA',
                message: 'Notre famille est fière de soutenir la construction de notre église.',
                image:
                  'https://images.pexels.com/photos/7654693/pexels-photo-7654693.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-amber-400 text-sm">{testimonial.amount}</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">"{testimonial.message}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
