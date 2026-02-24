import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, SkipForward, SkipBack, 
  BookOpen, CheckCircle, Menu, Video
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  duration: string | null;
  sort_order: number;
}

interface CourseData {
  id: string;
  title: string;
  description: string | null;
  program: string;
  image_url: string | null;
  duration: string | null;
  lessons_count: number | null;
}

// Helper to convert YouTube/Vimeo URLs to embeddable URLs
function getEmbedUrl(url: string): string | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  // Direct video URL
  return url;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

export const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      const { data: courseData } = await supabase
        .from('courses_admin')
        .select('*')
        .eq('id', courseId)
        .single();

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('sort_order', { ascending: true });

      setCourse(courseData as CourseData | null);
      setLessons((lessonsData as Lesson[]) || []);
      setLoading(false);
    };
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cours non trouvé</h2>
          <button onClick={() => navigate('/school')} className="text-blue-400 hover:underline">
            Retour à l'école
          </button>
        </div>
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex];
  const nextLesson = () => { if (currentLessonIndex < lessons.length - 1) setCurrentLessonIndex(currentLessonIndex + 1); };
  const prevLesson = () => { if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1); };
  const markCompleted = () => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set(prev).add(currentLesson.id));
    }
  };

  const embedUrl = currentLesson?.video_url ? getEmbedUrl(currentLesson.video_url) : null;
  const isDirect = currentLesson?.video_url ? isDirectVideo(currentLesson.video_url) : false;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/school')} className="text-gray-400 hover:text-white transition-colors">
              ← Retour à l'école
            </button>
            <div>
              <h1 className="text-xl font-semibold">{course.title}</h1>
              <p className="text-gray-400 text-sm">{lessons.length} leçons • {course.duration || ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lessons.length > 0 && (
              <div className="text-sm text-gray-400">
                {currentLessonIndex + 1} / {lessons.length}
              </div>
            )}
            <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Aucune leçon disponible</h2>
            <p>Les leçons de ce cours n'ont pas encore été ajoutées.</p>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)]">
          {/* Main Content */}
          <div className={`flex-1 flex flex-col ${showSidebar ? 'lg:mr-80' : ''}`}>
            {/* Video Player */}
            <div className="relative bg-black flex-1 flex items-center justify-center">
              {isDirect && embedUrl ? (
                <video
                  ref={videoRef}
                  key={currentLesson.id}
                  src={embedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : embedUrl && !isDirect ? (
                <iframe
                  key={currentLesson.id}
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentLesson.title}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Play className="w-12 h-12 text-white ml-2" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                    <p className="text-blue-200">Aucune vidéo disponible pour cette leçon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="bg-gray-800 p-6 border-t border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{currentLesson.title}</h2>
                  {currentLesson.description && (
                    <p className="text-gray-400">{currentLesson.description}</p>
                  )}
                  {currentLesson.duration && (
                    <span className="text-sm text-gray-500 mt-1 inline-block">Durée : {currentLesson.duration}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={prevLesson} disabled={currentLessonIndex === 0} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-30 transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button onClick={nextLesson} disabled={currentLessonIndex === lessons.length - 1} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-30 transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button
                    onClick={markCompleted}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                      completedLessons.has(currentLesson.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    {completedLessons.has(currentLesson.id) ? 'Terminé' : 'Marquer terminé'}
                  </button>
                </div>
              </div>
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
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Progression</h3>
                      <span className="text-sm text-gray-400">
                        {completedLessons.size}/{lessons.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <motion.div
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedLessons.size / lessons.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Lessons List */}
                  <h3 className="font-semibold mb-4">Contenu du cours</h3>
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => {
                      const isActive = index === currentLessonIndex;
                      const isCompleted = completedLessons.has(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonIndex(index)}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl transition-colors text-left ${
                            isActive ? 'bg-blue-600/20 border border-blue-500/50' : 'hover:bg-gray-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                            isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                              {lesson.title}
                            </h4>
                            {lesson.duration && (
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                            )}
                            {lesson.description && (
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{lesson.description}</p>
                            )}
                          </div>
                          {lesson.video_url && <Video className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
