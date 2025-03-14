"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface WelcomeMessageProps {
  username: string
  isReturningUser: boolean
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ username, isReturningUser }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Animation de disparition progressive
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center transform transition-transform animate-welcome relative overflow-hidden glass-card">
        {/* Éléments décoratifs */}
        <div className="absolute -right-10 -top-10 w-20 h-20 bg-indigo-800 rounded-full opacity-50"></div>
        <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-purple-800 rounded-full opacity-50"></div>

        <div className="mb-4 text-indigo-400 relative">
          <Sparkles className="w-12 h-12 mx-auto animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 neon-text">
          {isReturningUser ? "Bienvenue" : "Bienvenue"} {username} !
        </h2>
        <p className="text-indigo-300">
          {isReturningUser ? "Nous sommes ravis de vous voir." : "Nous sommes ravis de faire votre connaissance."}
        </p>

        {/* Petites étoiles décoratives */}
        <div className="absolute top-4 right-4 text-yellow-400 text-xs">✦</div>
        <div className="absolute bottom-4 left-4 text-yellow-400 text-xs">✦</div>
        <div className="absolute top-1/2 left-4 text-yellow-400 text-xs">✦</div>
        <div className="absolute bottom-1/3 right-4 text-yellow-400 text-xs">✦</div>
      </div>
    </div>
  )
}

export default WelcomeMessage

