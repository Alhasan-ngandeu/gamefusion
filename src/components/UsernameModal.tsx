"use client"

import type React from "react"

import { useState } from "react"
import { User } from "lucide-react"

interface UsernameModalProps {
  onSubmit: (username: string) => void
}

const UsernameModal: React.FC<UsernameModalProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Veuillez entrer un nom d'utilisateur")
      return
    }

    onSubmit(username)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Bienvenue sur Game Fusion</h2>
          <p className="text-gray-400 mt-2">Veuillez entrer votre nom d'utilisateur pour continuer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Votre nom d'utilisateur"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Commencer à jouer
          </button>
        </form>
      </div>
    </div>
  )
}

export default UsernameModal

