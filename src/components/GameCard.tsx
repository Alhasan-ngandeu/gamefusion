"use client"

import type React from "react"

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: "purple" | "blue" | "green"
  onClick: () => void
}

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, color, onClick }) => {
  const getColors = () => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-gray-800 bg-opacity-70",
          button: "bg-gradient-to-r from-indigo-600 to-purple-600",
          iconBg: "bg-purple-600",
          text: "text-white",
        }
      case "blue":
        return {
          bg: "bg-gray-800 bg-opacity-70",
          button: "bg-gradient-to-r from-blue-600 to-indigo-600",
          iconBg: "bg-blue-600",
          text: "text-white",
        }
      case "green":
        return {
          bg: "bg-gray-800 bg-opacity-70",
          button: "bg-gradient-to-r from-green-600 to-teal-600",
          iconBg: "bg-green-600",
          text: "text-white",
        }
      default:
        return {
          bg: "bg-gray-800 bg-opacity-70",
          button: "bg-gradient-to-r from-gray-600 to-gray-700",
          iconBg: "bg-gray-600",
          text: "text-white",
        }
    }
  }

  const colors = getColors()

  // Fonction pour gérer le clic sur le bouton "Jouer maintenant"
  const handlePlayNowClick = () => {
    // Ouvrir l'URL de la publicité dans un nouvel onglet
    window.open("https://www.effectiveratecpm.com/zac6n5ezy0?key=37f69ccc316bae2d772431a23971e5e3", "_blank")

    // Exécuter la fonction onClick pour rediriger vers le jeu
    onClick()
  }

  return (
    <div
      className={`${colors.bg} rounded-xl p-4 relative overflow-hidden shadow-md social-card glass-card glow-effect`}
    >
      <div className="flex items-start gap-4">
        {/* Icône du jeu */}
        <div className={`${colors.iconBg} p-3 rounded-xl`}>
          <div className="w-12 h-12 text-white">{icon}</div>
        </div>

        <div className="flex-1">
          <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <button
            onClick={handlePlayNowClick} // Utiliser la nouvelle fonction handlePlayNowClick
            className={`${colors.button} text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90 gradient-button`}
          >
            Jouer Maintenant
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameCard