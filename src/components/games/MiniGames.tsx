"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Brain } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <button onClick={goBack} className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-5 h-5" />
        Retour à l'accueil
      </button>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Memory Game</h2>
          <p className="text-gray-600">Trouvez toutes les paires d'emojis !</p>
          <p className="text-sm text-gray-500 mt-2">Coups joués : {moves}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square text-4xl flex items-center justify-center rounded-lg transition-all transform ${
                card.isFlipped || card.isMatched ? "bg-white rotate-0" : "bg-blue-600 rotate-180"
              } ${card.isMatched ? "bg-green-100" : ""}`}
              disabled={card.isMatched}
            >
              {(card.isFlipped || card.isMatched) && card.value}
            </button>
          ))}
        </div>

        {gameComplete && (
          <div className="text-center">
            <p className="text-xl font-bold text-green-600 mb-4">
              Félicitations ! Vous avez terminé en {moves} coups !
            </p>
            <p className="text-lg text-blue-600">Gains : {Math.max(1000 - moves * 50, 100)} FCFA</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
          <button
            onClick={goBack}
            className="bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors w-full"
          >
            Retour
          </button>
          <button
            onClick={initializeGame}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  )
}

export default MiniGames

