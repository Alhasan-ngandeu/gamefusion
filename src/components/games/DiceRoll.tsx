"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Dice5 } from "lucide-react"

const DiceRoll: React.FC = () => {
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(1)
  const [result, setResult] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [win, setWin] = useState(false)

  const rollDice = () => {
    if (isRolling) return

    setIsRolling(true)
    setResult(null)
    setWin(false)

    const targetSum = 7 // La somme cible pour gagner
    const rolls = 20 // Nombre de rotations avant de s'arrêter

    let count = 0
    const interval = setInterval(() => {
      const newDice1 = Math.floor(Math.random() * 6) + 1
      const newDice2 = Math.floor(Math.random() * 6) + 1
      setDice1(newDice1)
      setDice2(newDice2)

      count++
      if (count >= rolls) {
        clearInterval(interval)
        setIsRolling(false)
        const sum = newDice1 + newDice2
        setResult(sum)

        if (sum === targetSum) {
          setWin(true)
          const prize = 100 // Gains en FCFA
          const currentBalance = Number.parseInt(localStorage.getItem("gameBalance") || "0")
          localStorage.setItem("gameBalance", (currentBalance + prize).toString())
        }
      }
    }, 100)
  }

  const goBack = () => {
    window.location.href = "/"
  }

  const restartGame = () => {
    setDice1(1)
    setDice2(1)
    setResult(null)
    setWin(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <button onClick={goBack} className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-5 h-5" />
        Retour à l'accueil
      </button>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="text-center mb-8">
          <Dice5 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Lancer de Dés</h2>
          <p className="text-gray-600">Lancez les dés et gagnez si la somme est 7 !</p>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg text-3xl font-bold">
            {dice1}
          </div>
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg text-3xl font-bold">
            {dice2}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            <Dice5 className="w-5 h-5" />
            {isRolling ? "Lancement en cours..." : "Lancer les dés"}
          </button>

          {result !== null && (
            <div className="mt-4">
              <p className="text-xl font-bold">
                Résultat : {dice1} + {dice2} = {result}
              </p>
              {win ? (
                <p className="text-green-600 font-semibold mt-2">Félicitations ! Vous avez gagné 100 FCFA !</p>
              ) : (
                <p className="text-red-600 font-semibold mt-2">Dommage, essayez encore !</p>
              )}
            </div>
          )}

          {/* Boutons Retour et Rejouer */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4 w-full">
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
      </div>
    </div>
  )
}

export default DiceRoll

