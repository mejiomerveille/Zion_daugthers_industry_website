import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizService } from '../lib/supabase';
import { X, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent?: any;
}

const quizQuestions: Question[] = [
  {
    id: '1',
    question: 'Qui a écrit le livre de l\'Apocalypse ?',
    options: ['Paul', 'Jean', 'Pierre', 'Matthieu'],
    correctAnswer: 1,
    explanation: 'L\'apôtre Jean a écrit le livre de l\'Apocalypse alors qu\'il était exilé sur l\'île de Patmos.'
  },
  {
    id: '2',
    question: 'Combien de livres contient la Bible ?',
    options: ['64', '66', '68', '70'],
    correctAnswer: 1,
    explanation: 'La Bible contient 66 livres au total : 39 dans l\'Ancien Testament et 27 dans le Nouveau Testament.'
  },
  {
    id: '3',
    question: 'Quel est le premier commandement ?',
    options: [
      'Tu ne tueras point',
      'Tu aimeras ton prochain comme toi-même',
      'Tu n\'auras pas d\'autres dieux devant ma face',
      'Honore ton père et ta mère'
    ],
    correctAnswer: 2,
    explanation: 'Le premier commandement est "Tu n\'auras pas d\'autres dieux devant ma face" (Exode 20:3).'
  },
  {
    id: '4',
    question: 'Combien de disciples Jésus a-t-il choisis ?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: 'Jésus a choisi 12 disciples, aussi appelés apôtres, pour l\'accompagner dans son ministère.'
  },
  {
    id: '5',
    question: 'Dans quelle ville Jésus est-il né ?',
    options: ['Nazareth', 'Jérusalem', 'Bethléem', 'Capharnaüm'],
    correctAnswer: 2,
    explanation: 'Jésus est né à Bethléem, accomplissant ainsi la prophétie de Michée 5:2.'
  }
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, currentStudent }) => {
  const [studentName, setStudentName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
    setShowExplanation(false);
    setStudentName('');
  };

  const startQuiz = () => {
    if (studentName.trim()) {
      setQuizStarted(true);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveQuizResults();
    }
  };

  const saveQuizResults = async () => {
    if (!currentStudent) {
      setShowResults(true);
      return;
    }

    setIsSaving(true);
    try {
      await quizService.saveQuizResult({
        student_id: currentStudent.id,
        student_name: studentName,
        score: calculateScore(),
        total_questions: quizQuestions.length,
        answers: selectedAnswers.map((answer, index) => ({
          question: quizQuestions[index].question,
          selected: answer,
          correct: quizQuestions[index].correctAnswer,
          isCorrect: answer === quizQuestions[index].correctAnswer
        }))
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent ! Vous maîtrisez bien les fondements bibliques.';
    if (score >= 60) return 'Bien ! Continuez à étudier pour approfondir vos connaissances.';
    return 'Il est recommandé de revoir les cours avant de repasser l\'évaluation.';
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
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Évaluation Biblique</h2>
                  {quizStarted && !showResults && (
                    <p className="text-purple-100">
                      Question {currentQuestion + 1} sur {quizQuestions.length}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              {!quizStarted ? (
                /* Start Screen */
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Bienvenue à l'évaluation
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Cette évaluation contient {quizQuestions.length} questions sur les fondements bibliques. 
                    Prenez votre temps pour réfléchir à chaque réponse.
                  </p>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre nom complet
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Entrez votre nom..."
                    />
                  </div>

                  <motion.button
                    onClick={startQuiz}
                    disabled={!studentName.trim()}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: studentName.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: studentName.trim() ? 0.95 : 1 }}
                  >
                    Commencer l'évaluation
                  </motion.button>
                </motion.div>
              ) : showResults ? (
                /* Results Screen */
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className={`w-24 h-24 bg-gradient-to-br ${getScoreColor(calculateScore())} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Félicitations {studentName} !
                  </h3>
                  
                  {isSaving && (
                    <p className="text-blue-600 mb-4">Sauvegarde des résultats...</p>
                  )}
                  
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    {calculateScore()}%
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    {getScoreMessage(calculateScore())}
                  </p>

                  {/* Detailed Results */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Résultats détaillés
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-white rounded-xl">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length}
                        </div>
                        <div className="text-gray-600">Bonnes réponses</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-xl">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedAnswers.filter((answer, index) => answer !== quizQuestions[index].correctAnswer).length}
                        </div>
                        <div className="text-gray-600">Erreurs</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Recommencer
                    </motion.button>
                    
                    <motion.button
                      onClick={onClose}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Terminer
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Question Screen */
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progression</span>
                      <span className="text-sm font-medium text-purple-600">
                        {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3 mb-8">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => selectAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedAnswers[currentQuestion] === index
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : showExplanation && index === quizQuestions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                        whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                        whileTap={{ scale: showExplanation ? 1 : 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          {showExplanation && selectedAnswers[currentQuestion] === index && (
                            index === quizQuestions[currentQuestion].correctAnswer ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )
                          )}
                          {showExplanation && selectedAnswers[currentQuestion] !== index && index === quizQuestions[currentQuestion].correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {showExplanation && (
                    <motion.div
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">Explication :</h4>
                      <p className="text-blue-700">
                        {quizQuestions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}

                  {showExplanation && (
                    <motion.button
                      onClick={nextQuestion}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Voir les résultats' : 'Question suivante'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};