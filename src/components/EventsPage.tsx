import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const events = [
    {
      title: 'Conférence de Leadership Chrétien',
      date: '12 Novembre 2025',
      time: '09h00 - 17h00',
      location: 'Campus Central, Yaoundé',
      description:
        "Une journée de formation intensive avec des orateurs inspirants sur le thème du leadership et du ministère.",
      image: '/images/worship.jpg',
      participants: 120,
    },
    {
      title: 'Retraite Spirituelle Annuelle',
      date: 'Du 20 au 24 Décembre 2025',
      time: 'Toute la journée',
      location: 'Centre Biblique de Mbankomo',
      description:
        "Un moment de ressourcement spirituel, de prière et de communion fraternelle. Places limitées !",
      image: './images/ecole/re.jpeg',
      participants: 80,
    },
    {
      title: 'Cérémonie de Remise de Diplômes',
      date: '5 Janvier 2026',
      time: '14h00 - 18h00',
      location: 'Salle Polyvalente, Yaoundé',
      description:
        "Venez célébrer la réussite de nos diplômés de la 5ᵉ promotion dans une ambiance festive et reconnaissante.",
      image: './images/ecole/retraite.jpeg',
      participants: 200,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Section Héro */}
      {/* <HeroSection
        title="Événements de l'École"
        subtitle="Découvrez nos activités, conférences et célébrations à venir"
        backgroundImage="/images/events/hero.jpg"
      >
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="#evenements"
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300"
          >
            Voir les Événements à venir
          </a>
        </motion.div>
      </HeroSection> */}

      {/* Liste des Événements */}
      <section id="evenements" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Événements à venir
            </h2>
            <p className="text-lg text-gray-600">
              Participez à nos activités et développez votre foi et vos compétences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-green-600 font-semibold gap-2">
                      <Calendar className="w-5 h-5" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-green-500" />
                    {event.location}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 gap-2">
                      <Users className="w-4 h-4" />
                      {event.participants} participants
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      S’inscrire
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages Rapides */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ils ont participé à nos événements
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['Grâce', 'Stive', 'Nsangou'].map((name, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 max-w-xs shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <p className="text-gray-600 italic mb-3">
                    “Un moment inoubliable de foi, d’unité et d’apprentissage.”
                  </p>
                  <p className="font-semibold text-green-700">— {name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};
