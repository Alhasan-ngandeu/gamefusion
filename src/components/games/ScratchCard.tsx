"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Gift } from "lucide-react"
import StarryBackground from "../StarryBackground"

const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [prize, setPrize] = useState(0)
  const [isScratching, setIsScratching] = useState(false)
  const [scratchedPixels, setScratchedPixels] = useState(0)
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null)

  // Définir les probabilités pour chaque montant
  const prizes = [
    { amount: 0, probability: 0.5 }, // 50% de chance
    { amount: 100, probability: 0.3 }, // 30% de chance
    { amount: 200, probability: 0.1 }, // 10% de chance
    { amount: 300, probability: 0.05 }, // 5% de chance
    { amount: 500, probability: 0.03 }, // 3% de chance
    { amount: 1000, probability: 0.02 }, // 2% de chance
  ]

  // Fonction pour générer un montant en fonction des probabilités
  const generatePrize = () => {
    const random = Math.random()
    let cumulativeProbability = 0

    for (const prize of prizes) {
      cumulativeProbability += prize.probability
      if (random <= cumulativeProbability) {
        return prize.amount
      }
    }

    return 0 // Par défaut, retourne 0 FCFA
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 300
    canvas.height = 150

    // Draw scratch layer
    ctx.fillStyle = "#374151" // bg-gray-700
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some texture to the scratch layer
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
      ctx.fillRect(x, y, 1, 1)
    }

    // Add some stars to the scratch layer
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 0.5
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Generate random prize based on probabilities
    const randomPrize = generatePrize()
    setPrize(randomPrize)
  }, [])

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    if (!isScratching) return

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()

    if (lastPosition) {
      ctx.moveTo(lastPosition.x, lastPosition.y)
      ctx.lineTo(x, y)
    } else {
      ctx.moveTo(x, y)
      ctx.lineTo(x + 1, y + 1)
    }

    ctx.strokeStyle = "#000"
    ctx.lineWidth = 40
    ctx.lineCap = "round"
    ctx.stroke()

    setLastPosition({ x, y })

    // Calculate scratched area
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    const percentScratched = (transparent / (canvas.width * canvas.height)) * 100
    setScratchedPixels(percentScratched)

    if (percentScratched > 50 && !isRevealed) {
      setIsRevealed(true)
      const currentBalance = Number.parseInt(localStorage.getItem("gameBalance") || "0")
      localStorage.setItem("gameBalance", (currentBalance + prize).toString())
    }
  }

  const startScratching = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsScratching(true)
    scratch(e)
  }

  const stopScratching = () => {
    setIsScratching(false)
    setLastPosition(null)
  }

  const goBack = () => {
    window.location.href = "/"
  }

  const restartGame = () => {
    setIsRevealed(false)
    setPrize(generatePrize())
    setScratchedPixels(0)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Redraw scratch layer
    ctx.fillStyle = "#374151" // bg-gray-700
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some texture to the scratch layer
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
      ctx.fillRect(x, y, 1, 1)
    }

    // Add some stars to the scratch layer
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 0.5
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <>
      <StarryBackground />
      <div className="min-h-screen relative z-10 p-4">
        <button onClick={goBack} className="mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300">
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l'accueil</span>
        </button>

        <div className="max-w-md mx-auto bg-gray-800 bg-opacity-70 rounded-xl shadow-lg p-4 sm:p-6 glass-card glow-effect">
          <div className="text-center mb-6">
            <Gift className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white neon-text">Carte à Gratter</h2>
            <p className="text-gray-300">Grattez la carte pour découvrir votre gain !</p>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-[150px] border border-gray-600 rounded-lg cursor-pointer touch-none"
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
              onTouchStart={startScratching}
              onTouchMove={scratch}
              onTouchEnd={stopScratching}
            />
            {/* Afficher le montant uniquement après grattage */}
            {isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-blue-400 neon-text">{prize} FCFA</span>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            {isRevealed ? (
              <p className="text-green-400 font-semibold neon-text">Félicitations ! Vous avez gagné {prize} FCFA !</p>
            ) : (
              <p>Grattez la carte pour révéler votre gain</p>
            )}
          </div>

          {/* Boutons Retour et Rejouer */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4 w-full">
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
      </div>
    </>
  )
}

export default ScratchCard

