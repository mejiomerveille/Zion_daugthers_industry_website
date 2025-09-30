import { Heart, Users, BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";
// import worship from "../../worship.jpg";

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            À Propos de Notre Église
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fondée sur les principes apostoliques, notre église est un lieu de
            communion, de croissance spirituelle et de service à la communauté.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/blanc.jpeg"
              alt="Communauté en prière"
              className="rounded-lg shadow-2xl w-full h-full object-cover"
            />
            <motion.div
              className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-2xl font-bold">25+</p>
              <p className="text-sm">Années de Service</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Notre Mission
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              L'Église Apostolique La Grâce Divine a pour mission de répandre
              l'amour du Christ et de former des disciples authentiques. Nous
              croyons en la puissance transformatrice de l'Évangile et nous nous
              efforçons de vivre selon les enseignements apostoliques.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <BookOpen className="text-blue-600" size={24} />,
                  title: "Enseignement Biblique",
                  text: "Formation solide dans la Parole de Dieu",
                  bg: "bg-blue-100",
                },
                {
                  icon: <Heart className="text-amber-600" size={24} />,
                  title: "Amour et Compassion",
                  text: "Service désintéressé à la communauté",
                  bg: "bg-amber-100",
                },
                {
                  icon: <Users className="text-green-600" size={24} />,
                  title: "Communauté Unie",
                  text: "Fraternité authentique et soutien mutuel",
                  bg: "bg-green-100",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <BookOpen className="text-white" size={32} />,
              title: "Vérité",
              text: "Fondés sur la Parole de Dieu",
              bg: "from-blue-500 to-blue-600",
            },
            {
              icon: <Heart className="text-white" size={32} />,
              title: "Amour",
              text: "L'amour du Christ nous guide",
              bg: "from-amber-500 to-amber-600",
            },
            {
              icon: <Users className="text-white" size={32} />,
              title: "Unité",
              text: "Un seul corps en Christ",
              bg: "from-green-500 to-green-600",
            },
            {
              icon: <Zap className="text-white" size={32} />,
              title: "Puissance",
              text: "La puissance du Saint-Esprit",
              bg: "from-purple-500 to-purple-600",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${value.bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {value.title}
              </h4>
              <p className="text-gray-600">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
