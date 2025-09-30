"use client";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, Music } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Service Dominical du Matin",
      time: "9h00 - 12h00",
      day: "Dimanche",
      description:
        "Culte principal avec prédication, louange et communion fraternelle",
      icon: <Users className="text-blue-600" size={24} />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Service Dominical du Soir",
      time: "17h00 - 19h00",
      day: "Dimanche",
      description:
        "Service d'adoration et de prière avec témoignages et enseignement",
      icon: <Music className="text-amber-600" size={24} />,
      color: "bg-amber-50 border-amber-200",
    },
    {
      title: "Prière du Mercredi",
      time: "19h00 - 21h00",
      day: "Mercredi",
      description:
        "Soirée dédiée à la prière, l'intercession et la recherche de Dieu",
      icon: <Clock className="text-green-600" size={24} />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "École Dominicale",
      time: "09h00 - 10h00",
      day: "Dimanche",
      description:
        "Formation biblique pour tous les âges, enfants et adultes",
      icon: <MapPin className="text-purple-600" size={24} />,
      color: "bg-purple-50 border-purple-200",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Services & Horaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez-nous pour des moments de communion, d'adoration et de
            croissance spirituelle tout au long de la semaine.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`${service.color} border-2 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {service.icon}
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {service.day}
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {service.time}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Première Visite ?</h3>
          <p className="text-xl mb-8 opacity-90">
            Nous serions ravis de vous accueillir ! Venez comme vous êtes, vous
            trouverez ici une famille spirituelle chaleureuse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors">
              Planifier une Visite
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Nous Contacter
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
