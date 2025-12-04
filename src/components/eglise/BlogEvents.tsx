"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

export default function BlogEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "Témoignage Puissant lors du Service Dominical",
      excerpt:
        "Découvrez comment Dieu a transformé la vie de Marie, une fidèle de notre communauté qui a vécu un miracle extraordinaire.",
      content:
        "Dimanche dernier, nous avons eu le privilège d'entendre le témoignage bouleversant de sœur Marie...",
      date: "2025-01-15",
      time: "10:30",
      author: "Pasteur Rodrigue",
      category: "Témoignage",
      image: "./images/worship.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Conférence Prophétique - Les Temps de la Fin",
      excerpt:
        "Une soirée exceptionnelle avec l'évangéliste Paul Mbarga sur les signes des temps et la préparation de l'Église.",
      content:
        "La conférence prophétique organisée le 20 janvier a rassemblé plus de 300 personnes...",
      date: "2025-01-20",
      time: "19:00",
      author: "Évangéliste Paul Mbarga",
      category: "Conférence",
      image: "https://images.pexels.com/photos/8674899/pexels-photo-8674899.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      featured: false,
    },
    {
      id: 3,
      title: "Baptême de 15 Nouveaux Convertis",
      excerpt:
        "Une cérémonie émouvante où 15 âmes ont décidé de suivre Jésus-Christ par le baptême d'eau.",
      content:
        "Ce dimanche 25 janvier, nous avons célébré le baptême de 15 nouveaux convertis...",
      date: "2025-01-25",
      time: "15:00",
      author: "Pasteur Marie-Claire",
      category: "Baptême",
      image: "https://images.pexels.com/photos/8468070/pexels-photo-8468070.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      featured: false,
    },
    {
      id: 4,
      title: "Retraite Spirituelle des Jeunes - Témoignages",
      excerpt:
        "Les jeunes de 16 à 35 ans partagent leurs expériences lors de la retraite spirituelle du weekend dernier.",
      content:
        "La retraite spirituelle des jeunes qui s'est déroulée du 1er au 3 février...",
      date: "2025-02-03",
      time: "Tout le weekend",
      author: "Responsable Jeunesse",
      category: "Jeunesse",
      image: "https://images.pexels.com/photos/7654693/pexels-photo-7654693.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      featured: true,
    },
    {
      id: 5,
      title: "Action Caritative - Distribution de Vivres",
      excerpt:
        "Notre église a organisé une grande distribution de vivres pour 200 familles nécessiteuses du quartier.",
      content:
        "Dans le cadre de notre mission sociale, l'église La Grâce Divine a organisé...",
      date: "2025-02-08",
      time: "10:00 - 16:00",
      author: "Comité Social",
      category: "Action Sociale",
      image: "https://images.pexels.com/photos/6646971/pexels-photo-6646971.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      featured: false,
    },
    {
      id: 6,
      title: "Séminaire sur le Mariage Chrétien",
      excerpt:
        "Un séminaire enrichissant sur les fondements bibliques du mariage animé par des couples expérimentés.",
      content:
        "Le séminaire sur le mariage chrétien organisé le 12 février a connu un grand succès...",
      date: "2025-02-12",
      time: "14:00 - 18:00",
      author: "Couples Conseillers",
      category: "Formation",
      image: "https://images.pexels.com/photos/8468068/pexels-photo-8468068.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      featured: false,
    },
  ];

  const categories = [
    "all",
    "Témoignage",
    "Conférence",
    "Baptême",
    "Jeunesse",
    "Action Sociale",
    "Formation",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
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
            Blog des Événements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les dernières nouvelles, témoignages et événements de
            notre communauté. Restez connectés à la vie spirituelle de La Grâce
            Divine.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Toutes les catégories" : category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden group">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-80 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    À la Une
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={16} className="mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <User size={16} />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                      <span>Lire Plus</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
