"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Trophy } from "lucide-react"
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

  const handleAnswerClick = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setShowScore(true)
        // Sauvegarder le score dans localStorage
        const currentBalance = Number.parseInt(localStorage.getItem("gameBalance") || "0")
        const newBalance = currentBalance + (score + 1) * 50 // 50 FCFA par bonne réponse
        localStorage.setItem("gameBalance", newBalance.toString())
      }
    }, 1000)
  }

  const restartGame = () => {
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
          {showScore ? (
            <div className="text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white neon-text">Quiz terminé !</h2>
              <p className="text-xl mb-4 text-white">
                Votre score : {score} sur {questions.length}
              </p>
              <p className="text-lg mb-6 text-green-400 neon-text">Gains : {score * 50} FCFA</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
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

