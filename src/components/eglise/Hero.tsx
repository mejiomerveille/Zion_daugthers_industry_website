import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIr15sFrJKUepPQRI6dlqmT3FvSrKRiNm1og&s)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/85 to-purple-700/70"></div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-amber-400/30 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-6 h-6 bg-blue-300/20 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-5 h-5 bg-amber-300/25 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bienvenue à
          <motion.span
            className="block text-amber-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            La Grâce Divine
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Une communauté apostolique où la foi, l'amour et l'espoir se
          rencontrent. Rejoignez-nous dans notre voyage spirituel vers la grâce
          divine.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>Rejoindre un Service</span>
            <ArrowRight size={20} />
          </button>

          <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
            En Savoir Plus
          </button>
        </motion.div>

        {/* Floating Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { title: "Services Dominicaux", text: "Dimanche 10h00 & 17h00" },
            { title: "Prière du Mercredi", text: "Mercredi 19h00" },
            { title: "École Dominicale", text: "Dimanche 9h00" },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
            >
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-blue-100">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
