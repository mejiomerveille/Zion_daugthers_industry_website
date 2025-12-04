import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Maximize,
  Settings,
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  Star,
  Download,
  MessageCircle,
  ThumbsUp,
  Share2,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  FileText,
  Video,
  Headphones
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  resources: Array<{
    title: string;
    type: 'pdf' | 'doc' | 'link';
    url: string;
  }>;
  completed: boolean;
  type: 'video' | 'text' | 'quiz';
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  totalDuration: string;
  totalLessons: number;
  rating: number;
  students: number;
  image: string;
  lessons: Lesson[];
  sections: Array<{
    id: string;
    title: string;
    lessons: string[];
  }>;
}

const mockCourse: Course = {
  id: '1',
  title: 'Fondements de la Foi Chrétienne',
  instructor: 'Pasteur Emmanuel',
  description: 'Un cours complet sur les fondements bibliques de la foi chrétienne, couvrant les doctrines essentielles et l\'histoire biblique.',
  totalDuration: '12h 30min',
  totalLessons: 24,
  rating: 4.8,
  students: 156,
  image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
  sections: [
    {
      id: 'section1',
      title: 'Introduction aux Écritures',
      lessons: ['lesson1', 'lesson2', 'lesson3']
    },
    {
      id: 'section2',
      title: 'Les Doctrines Fondamentales',
      lessons: ['lesson4', 'lesson5', 'lesson6']
    },
    {
      id: 'section3',
      title: 'Histoire Biblique',
      lessons: ['lesson7', 'lesson8', 'lesson9']
    }
  ],
  lessons: [
    {
      id: 'lesson1',
      title: 'Introduction à la Bible',
      duration: '15:30',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: 'Une introduction complète à la Bible, son origine, sa structure et son importance dans la foi chrétienne.',
      resources: [
        { title: 'Guide d\'étude - Introduction', type: 'pdf', url: '#' },
        { title: 'Références bibliques', type: 'doc', url: '#' }
      ],
      completed: false,
      type: 'video'
    },
    {
      id: 'lesson2',
      title: 'L\'inspiration des Écritures',
      duration: '18:45',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: 'Comprendre comment Dieu a inspiré les auteurs bibliques et l\'autorité des Écritures.',
      resources: [
        { title: 'Versets sur l\'inspiration', type: 'pdf', url: '#' }
      ],
      completed: false,
      type: 'video'
    },
    {
      id: 'lesson3',
      title: 'Canon biblique',
      duration: '22:15',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: 'L\'histoire de la formation du canon biblique et les critères de sélection des livres.',
      resources: [],
      completed: false,
      type: 'video'
    }
  ]
};

export const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course] = useState<Course>(mockCourse);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['section1']));

  const currentLesson = course.lessons[currentLessonIndex];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const goToLesson = (lessonId: string) => {
    const index = course.lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      setCurrentLessonIndex(index);
    }
  };

  const nextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const markAsCompleted = () => {
    // Ici vous pourriez mettre à jour la base de données
    console.log('Leçon marquée comme terminée:', currentLesson.id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/school')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Retour à l'école
            </button>
            <div>
              <h1 className="text-xl font-semibold">{course.title}</h1>
              <p className="text-gray-400 text-sm">par {course.instructor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              {currentLessonIndex + 1} / {course.lessons.length}
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${showSidebar ? 'lg:mr-80' : ''}`}>
          {/* Video Player */}
          <div className="relative bg-black flex-1 flex items-center justify-center">
            <div className="w-full h-full max-w-6xl mx-auto relative">
              {/* Video Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {isPlaying ? (
                      <Pause className="w-12 h-12 text-white" />
                    ) : (
                      <Play className="w-12 h-12 text-white ml-2" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                  <p className="text-blue-200 mb-4">Durée: {currentLesson.duration}</p>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    {currentLesson.description}
                  </p>
                </motion.div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-600 rounded-full h-1 mb-2">
                      <motion.div
                        className="bg-blue-500 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0:00</span>
                      <span>{currentLesson.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={prevLesson}
                        disabled={currentLessonIndex === 0}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                      >
                        <SkipBack className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </button>
                      
                      <button
                        onClick={nextLesson}
                        disabled={currentLessonIndex === course.lessons.length - 1}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                      >
                        <SkipForward className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                      
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-800 p-6 border-t border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{currentLesson.title}</h2>
                <p className="text-gray-400">{currentLesson.description}</p>
              </div>
              <button
                onClick={markAsCompleted}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Marquer comme terminé
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                Notes
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <ThumbsUp className="w-4 h-4" />
                J'aime
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>

            {/* Notes Section */}
            <AnimatePresence>
              {showNotes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-700 rounded-lg"
                >
                  <h3 className="font-semibold mb-2">Mes Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Prenez des notes pendant le cours..."
                    className="w-full h-32 bg-gray-600 text-white p-3 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Sauvegarder
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              className="fixed right-0 top-20 bottom-0 w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto z-40 lg:relative lg:top-0"
            >
              <div className="p-6">
                {/* Course Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Progression du cours</h3>
                    <span className="text-sm text-gray-400">
                      {Math.round((currentLessonIndex / course.lessons.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentLessonIndex / course.lessons.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Course Sections */}
                <div className="space-y-4">
                  {course.sections.map((section) => (
                    <div key={section.id} className="border border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-medium">{section.title}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedSections.has(section.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.has(section.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-700"
                          >
                            {section.lessons.map((lessonId) => {
                              const lesson = course.lessons.find(l => l.id === lessonId);
                              if (!lesson) return null;
                              
                              const isActive = lesson.id === currentLesson.id;
                              
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => goToLesson(lesson.id)}
                                  className={`w-full flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors ${
                                    isActive ? 'bg-blue-600/20 border-r-2 border-blue-500' : ''
                                  }`}
                                >
                                  <div className="flex-shrink-0">
                                    {lesson.type === 'video' ? (
                                      <Video className="w-4 h-4 text-gray-400" />
                                    ) : lesson.type === 'quiz' ? (
                                      <FileText className="w-4 h-4 text-gray-400" />
                                    ) : (
                                      <BookOpen className="w-4 h-4 text-gray-400" />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 text-left">
                                    <div className={`font-medium ${isActive ? 'text-blue-400' : ''}`}>
                                      {lesson.title}
                                    </div>
                                    <div className="text-sm text-gray-400 flex items-center gap-2">
                                      <Clock className="w-3 h-3" />
                                      {lesson.duration}
                                    </div>
                                  </div>
                                  
                                  {lesson.completed && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Resources */}
                {currentLesson.resources.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Ressources
                    </h3>
                    <div className="space-y-2">
                      {currentLesson.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};