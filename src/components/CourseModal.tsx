import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, SkipForward, SkipBack, BookOpen, Download, CheckCircle } from 'lucide-react';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    description: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
      videoUrl: string;
      content: string;
      completed: boolean;
    }>;
  };
}

export const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, course }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextLesson = () => {
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                  <p className="text-blue-100">
                    Leçon {currentLesson + 1} sur {course.lessons.length}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(90vh-120px)]">
              {/* Video Player */}
              <div className="flex-1 bg-black relative">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      {isPlaying ? (
                        <Pause className="w-10 h-10" />
                      ) : (
                        <Play className="w-10 h-10 ml-1" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {course.lessons[currentLesson]?.title}
                    </h3>
                    <p className="text-blue-200">
                      Durée: {course.lessons[currentLesson]?.duration}
                    </p>
                  </motion.div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={prevLesson}
                      disabled={currentLesson === 0}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50"
                    >
                      <SkipBack className="w-6 h-6 text-white" />
                    </button>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                    
                    <button
                      onClick={nextLesson}
                      disabled={currentLesson === course.lessons.length - 1}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50"
                    >
                      <SkipForward className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 bg-gray-50 overflow-y-auto">
                {/* Lesson Content */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Contenu de la leçon
                  </h4>
                  <div className="prose prose-sm text-gray-600">
                    <p>{course.lessons[currentLesson]?.content}</p>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="border-t border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Toutes les leçons
                  </h4>
                  <div className="space-y-2">
                    {course.lessons.map((lesson, index) => (
                      <motion.button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(index)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          index === currentLesson
                            ? 'bg-blue-100 border-2 border-blue-300'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800 text-sm">
                              {lesson.title}
                            </h5>
                            <p className="text-xs text-gray-500 mt-1">
                              {lesson.duration}
                            </p>
                          </div>
                          {lesson.completed && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 p-6">
                  <motion.button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold mb-3 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Télécharger les ressources
                  </motion.button>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Marquer comme terminé
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};