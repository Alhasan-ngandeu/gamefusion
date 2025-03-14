"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Trophy } from "lucide-react"
import { allQuestions, type Question } from "./questions" // Importez les questions

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <button onClick={goBack} className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-5 h-5" />
        Retour à l'accueil
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {showScore ? (
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
            <p className="text-xl mb-4">
              Votre score : {score} sur {questions.length}
            </p>
            <p className="text-lg mb-6 text-green-600">Gains : {score * 50} FCFA</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
              <button
                onClick={goBack}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors w-full"
              >
                Retour
              </button>
              <button
                onClick={restartGame}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
              >
                Rejouer
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-sm text-gray-600">Score: {score}</span>
              </div>
              <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      isAnswered
                        ? index === questions[currentQuestion].correctAnswer
                          ? "bg-green-100 border-green-500"
                          : index === selectedAnswer
                            ? "bg-red-100 border-red-500"
                            : "bg-gray-100"
                        : "bg-white hover:bg-gray-50"
                    } border ${selectedAnswer === index ? "border-blue-500" : "border-gray-200"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-8">
              <button
                onClick={goBack}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors w-full"
              >
                Retour
              </button>
              <button
                onClick={restartGame}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
              >
                Rejouer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizGame

