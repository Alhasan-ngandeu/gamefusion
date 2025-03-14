"use client"

import type React from "react"

interface BalanceCardProps {
  balance: number
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  // Générer un numéro de carte aléatoire masqué
  const generateMaskedNumber = () => {
    const lastFour = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `•••• •••• •••• ${lastFour}`
  }

  // Obtenir la date d'expiration (6 mois à partir de maintenant)
  const getExpiryDate = () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 6)
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Carte principale */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl overflow-hidden glass-card glow-effect">
        {/* Cercles décoratifs */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        </div>

        {/* Puce de carte */}
        <div className="absolute top-4 right-4">
          <div className="w-8 h-6 rounded bg-yellow-400"></div>
        </div>

        {/* Contenu de la carte */}
        <div className="mt-8">
          <p className="text-indigo-200 mb-1">Solde :</p>
          <p className="text-[2.5rem] font-bold text-white mb-6 neon-text">{balance.toLocaleString()} F CFA</p>

          {/* Numéro de carte masqué */}
          <p className="font-mono text-indigo-200 mb-4 tracking-wider">{generateMaskedNumber()}</p>

          {/* Pied de carte */}
          <div className="flex justify-between items-center">
            <p className="text-indigo-200 font-medium">Game Card</p>
            <p className="text-indigo-100">{getExpiryDate()}</p>
          </div>
        </div>

        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-20"></div>

        {/* Effet de scintillement */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-white opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute -left-20 -bottom-20 w-40 h-40 bg-white opacity-10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Motifs décoratifs */}
        <div className="absolute -right-12 -bottom-8 w-40 h-40 rounded-full bg-indigo-500 opacity-30"></div>
        <div className="absolute -left-12 -top-8 w-40 h-40 rounded-full bg-purple-500 opacity-30"></div>
      </div>
    </div>
  )
}

export default BalanceCard

