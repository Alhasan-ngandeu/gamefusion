"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Trophy, Clock } from "lucide-react"
import { allQuestions, type Question } from "./questions" // Importez les questions
import StarryBackground from "../StarryBackground"

const QuizGame: React.FC = () => {
  // Sélectionner 10 questions aléatoires
  const getRandomQuestions = (): Question[] => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10)
  }

  const [questions, setQuestions] = useState<Question[]>(getRandomQuestions())
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isGameLocked, setIsGameLocked] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  useEffect(() => {
    checkGameAvailability()

    // Mettre à jour le temps restant toutes les minutes
    const interval = setInterval(() => {
      checkGameAvailability()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const checkGameAvailability = () => {
    const lastPlayedTime = localStorage.getItem("quizGameLastPlayed")

    if (lastPlayedTime) {
      const lastPlayed = new Date(lastPlayedTime)
      const now = new Date()
      const timeDiff = now.getTime() - lastPlayed.getTime()
      const hoursDiff = timeDiff / (1000 * 60 * 60)

      if (hoursDiff < 12) {
        setIsGameLocked(true)

        // Calculer le temps restant
        const remainingMs = 12 * 60 * 60 * 1000 - timeDiff
        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60))
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))

        setTimeRemaining(`${remainingHours}h ${remainingMinutes}m`)
      } else {
        setIsGameLocked(false)
      }
    } else {
      setIsGameLocked(false)
    }
  }

  const handleAnswerClick = (answerIndex: number) => {
    if (isAnswered || isGameLocked) return;
  
    // Ouvrir la publicité dans un nouvel onglet
    window.open("https://www.effectiveratecpm.com/zac6n5ezy0?key=37f69ccc316bae2d772431a23971e5e3", "_blank");
  
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
  
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
        const currentBalance = Number.parseInt(localStorage.getItem("gameBalance") || "0");
        const newBalance = currentBalance + (score + 1) * 50;
        localStorage.setItem("gameBalance", newBalance.toString());
        localStorage.setItem("quizGameLastPlayed", new Date().toISOString());
        setIsGameLocked(true);
        setTimeRemaining("12h 0m");
      }
    }, 1000);
  };
  

  const restartGame = () => {
    if (isGameLocked) return

    setQuestions(getRandomQuestions()) // Sélectionner de nouvelles questions aléatoires
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const goBack = () => {
    window.location.href = "/"
  }

  return (
    <>
      <StarryBackground />
      <div className="min-h-screen relative z-10 p-4">
        <button onClick={goBack} className="mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300">
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l'accueil</span>
        </button>

        <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-70 rounded-xl shadow-lg p-4 sm:p-6 glass-card glow-effect">
          {isGameLocked && !showScore ? (
            <div className="text-center py-8">
              <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Quiz temporairement indisponible</h3>
              <p className="text-gray-300 mb-4">
                Vous avez déjà joué à ce quiz récemment. Il sera à nouveau disponible dans :
              </p>
              <div className="text-2xl font-bold text-indigo-400 neon-text mb-6">{timeRemaining}</div>
              <button
                onClick={goBack}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors w-full sm:w-auto sm:px-8 gradient-button"
              >
                Retour à l'accueil
              </button>
            </div>
          ) : showScore ? (
            <div className="text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white neon-text">Quiz terminé !</h2>
              <p className="text-xl mb-4 text-white">
                Votre score : {score} sur {questions.length}
              </p>
              <p className="text-lg mb-4 text-green-400 neon-text">Gains : {score * 50} FCFA</p>
              <p className="text-sm text-gray-400 mb-6">Ce quiz sera à nouveau disponible dans 12 heures.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
                <button
                  onClick={goBack}
                  className="bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors w-full"
                >
                  Retour
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-300">
                    Question {currentQuestion + 1}/{questions.length}
                  </span>
                  <span className="text-sm text-gray-300">Score: {score}</span>
                </div>
                <h2 className="text-xl font-semibold mb-6 text-white">{questions[currentQuestion].question}</h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 text-left rounded-lg transition-all ${
                        isAnswered
                          ? index === questions[currentQuestion].correctAnswer
                            ? "bg-green-900 bg-opacity-30 border-green-500"
                            : index === selectedAnswer
                              ? "bg-red-900 bg-opacity-30 border-red-500"
                              : "bg-gray-700 bg-opacity-50"
                          : "bg-gray-800 bg-opacity-50 hover:bg-gray-700"
                      } border ${selectedAnswer === index ? "border-blue-500" : "border-gray-600"} glass-card`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-8">
                <button
                  onClick={goBack}
                  className="bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors w-full"
                >
                  Retour
                </button>
                <button
                  onClick={restartGame}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors w-full gradient-button"
                >
                  Rejouer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default QuizGame

