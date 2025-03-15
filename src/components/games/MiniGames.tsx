"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Brain } from "lucide-react"
import StarryBackground from "../StarryBackground"

interface Card {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

const MiniGames: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const emojis = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🥳️", "💣️"]

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return
    }

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [firstId, secondId] = newFlippedCards

      if (cards[firstId].value === cards[secondId].value) {
        // Match found
        newCards[firstId].isMatched = true
        newCards[secondId].isMatched = true
        setCards(newCards)
        setFlippedCards([])

        // Check if game is complete
        if (newCards.every((card) => card.isMatched)) {
          setGameComplete(true)
          const score = Math.max(1000 - moves * 50, 100) // Calculate score based on moves
          const currentBalance = Number.parseInt(localStorage.getItem("gameBalance") || "0")
          localStorage.setItem("gameBalance", (currentBalance + score).toString())
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstId].isFlipped = false
          newCards[secondId].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
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

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Brain className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white neon-text">Memory Game</h2>
            <p className="text-gray-300">Trouvez toutes les paires d'emojis !</p>
            <p className="text-sm text-gray-400 mt-2">Coups joués : {moves}</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square text-4xl flex items-center justify-center rounded-lg transition-all transform ${
                  card.isFlipped || card.isMatched
                    ? "bg-gray-800 bg-opacity-70 rotate-0 glass-card"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 rotate-180 gradient-button"
                } ${card.isMatched ? "bg-green-900 bg-opacity-30" : ""}`}
                disabled={card.isMatched}
              >
                {(card.isFlipped || card.isMatched) && card.value}
              </button>
            ))}
          </div>

          {gameComplete && (
            <div className="text-center bg-gray-800 bg-opacity-70 p-4 rounded-xl glass-card">
              <p className="text-xl font-bold text-green-400 mb-4 neon-text">
                Félicitations ! Vous avez terminé en {moves} coups !
              </p>
              <p className="text-lg text-blue-400">Gains : {Math.max(1000 - moves * 50, 100)} FCFA</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-6">
            <button
              onClick={goBack}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors w-full"
            >
              Retour
            </button>
            <button
              onClick={initializeGame}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors w-full gradient-button"
            >
              Rejouer
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MiniGames

