import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface EventPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  author: string | null;
  featured: boolean | null;
  published: boolean | null;
  created_at: string;
}

export default function BlogEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<EventPost | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts((data as EventPost[]) || []);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const categories = [
    "all",
    "Actualité de l'Église",
    "Conférence",
    "Baptême",
    "Jeunesse",
    "Action Sociale",
    "Formation",
    "Témoignage",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post !== featuredPost);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
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
            Découvrez les dernières nouvelles, témoignages et événements de notre communauté.
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
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
                    src={featuredPost.image_url || "/images/blanc.jpeg"}
                    alt={featuredPost.title}
                    className="w-full h-80 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    À la Une
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={16} className="mr-1" />
                      {new Date(featuredPost.created_at).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <User size={16} />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPost(featuredPost)}
                      className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Lire l'article <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={post.image_url || "/images/blanc.jpeg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar size={14} className="mr-1" />
                    {new Date(post.created_at).toLocaleDateString("fr-FR")}
                    <span className="mx-2">•</span>
                    <User size={14} className="mr-1" />
                    {post.author}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Lire Plus <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              {selectedPost.image_url && (
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {selectedPost.category}
                    </span>
                  </div>
                </div>
              )}
              {!selectedPost.image_url && (
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(selectedPost.created_at).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  {selectedPost.author && (
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {selectedPost.author}
                    </div>
                  )}
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content || selectedPost.excerpt || "Aucun contenu disponible."}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
