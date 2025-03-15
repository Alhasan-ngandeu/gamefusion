"use client"

import type React from "react"
import { Play, ListTodo, Share2, Wallet } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  // URL de la publicité
  const adUrl = "https://www.effectiveratecpm.com/zac6n5ezy0?key=37f69ccc316bae2d772431a23971e5e3"

  // Fonction pour gérer le clic sur un bouton de navigation
  const handleNavigationClick = (tab: string) => {
    // Ouvrir l'URL de la publicité dans un nouvel onglet
    window.open(adUrl, "_blank")

    // Rediriger vers l'onglet sélectionné
    onTabChange(tab)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 border-t border-gray-700 shadow-lg z-50 glass-card">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => handleNavigationClick("play")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "play" ? "text-purple-400 neon-text" : "text-gray-500"
          }`}
        >
          <Play className="w-5 h-5" />
          <span className="text-xs mt-1">Jouer</span>
        </button>

        <button
          onClick={() => handleNavigationClick("tasks")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "tasks" ? "text-blue-400 neon-text" : "text-gray-500"
          }`}
        >
          <ListTodo className="w-5 h-5" />
          <span className="text-xs mt-1">Tâches</span>
        </button>

        <button
          onClick={() => handleNavigationClick("network")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "network" ? "text-orange-400 neon-text" : "text-gray-500"
          }`}
        >
          <Share2 className="w-5 h-5" />
          <span className="text-xs mt-1">Nos réseaux</span>
        </button>

        <button
          onClick={() => handleNavigationClick("withdraw")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "withdraw" ? "text-green-400 neon-text" : "text-gray-500"
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-xs mt-1">Retirer</span>
        </button>
      </div>
    </div>
  )
}

export default Navigation