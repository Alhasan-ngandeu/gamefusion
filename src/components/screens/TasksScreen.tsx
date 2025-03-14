"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, Clock, Play, Video } from "lucide-react"
import Swal from "sweetalert2"

interface TasksScreenProps {
  balance: number
  onBalanceUpdate: (newBalance: number) => void
}

const TasksScreen: React.FC<TasksScreenProps> = ({ balance, onBalanceUpdate }) => {
  // État pour suivre les publicités déjà visionnées
  const [completedAds, setCompletedAds] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem("completedAds")
    return saved ? JSON.parse(saved) : {}
  })

  // Remplacer les tâches par 5 publicités de 100 FCFA chacune
  const advertisements = [
    {
      id: 1,
      title: "Publicité 1 - Jeu mobile",
      description: "Regardez une publicité de 30 secondes pour un jeu mobile populaire",
      reward: 100,
      completed: completedAds[1] || false,
    },
    {
      id: 2,
      title: "Publicité 2 - Application de fitness",
      description: "Découvrez cette nouvelle application de fitness en regardant une vidéo de 30 secondes",
      reward: 100,
      completed: completedAds[2] || false,
    },
    {
      id: 3,
      title: "Publicité 3 - Service de streaming",
      description: "Regardez cette publicité pour un service de streaming vidéo",
      reward: 100,
      completed: completedAds[3] || false,
    },
    {
      id: 4,
      title: "Publicité 4 - Produit alimentaire",
      description: "Découvrez ce nouveau produit alimentaire en regardant cette courte vidéo",
      reward: 100,
      completed: completedAds[4] || false,
    },
    {
      id: 5,
      title: "Publicité 5 - Application de livraison",
      description: "Regardez cette publicité pour une application de livraison de repas",
      reward: 100,
      completed: completedAds[5] || false,
    },
  ]

  // Fonction pour simuler le visionnage d'une publicité
  const watchAd = (adId: number, reward: number) => {
    // Vérifier si la publicité a déjà été visionnée
    if (completedAds[adId]) {
      Swal.fire({
        icon: "info",
        title: "Déjà visionné",
        text: "Vous avez déjà visionné cette publicité aujourd'hui.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      })
      return
    }

    // Simuler le chargement et le visionnage d'une publicité
    Swal.fire({
      title: "Chargement de la publicité...",
      html: "La publicité va commencer dans quelques secondes",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    }).then(() => {
      // Simuler le visionnage de la publicité
      Swal.fire({
        title: "Publicité en cours...",
        html: "Veuillez regarder la publicité jusqu'à la fin pour recevoir votre récompense",
        timer: 5000, // Normalement 30 secondes, mais réduit pour la démo
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading()
        },
      }).then(() => {
        // Marquer la publicité comme visionnée
        const newCompletedAds = { ...completedAds, [adId]: true }
        setCompletedAds(newCompletedAds)
        localStorage.setItem("completedAds", JSON.stringify(newCompletedAds))

        // Ajouter la récompense au solde
        const newBalance = balance + reward
        onBalanceUpdate(newBalance)

        // Afficher un message de succès
        Swal.fire({
          icon: "success",
          title: "Félicitations !",
          text: `Vous avez gagné ${reward} FCFA !`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Super !",
        })
      })
    })
  }

  return (
    <div className="min-h-screen pb-24 relative z-10">
      <div className="px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white neon-text">Game Fusion</h1>
      </div>
      <div className="container mx-auto px-3 py-4">
        <div className="flex items-center mb-6">
          <Video className="w-6 h-6 text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-white neon-text">Publicités rémunérées</h1>
        </div>

        <p className="text-gray-400 mb-6">Regardez ces publicités pour gagner 100 FCFA par vidéo visionnée.</p>

        <div className="space-y-4">
          {advertisements.map((ad) => {
            // Mettre à jour l'état completed en fonction de completedAds
            const isCompleted = completedAds[ad.id] || false

            return (
              <div
                key={ad.id}
                className={`bg-gray-800 bg-opacity-70 rounded-xl shadow-sm p-4 social-card glass-card glow-effect ${
                  isCompleted ? "border-l-4 border-green-500" : "border-l-4 border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{ad.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{ad.description}</p>
                  </div>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Clock className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 rounded-full px-4 py-1 text-white font-medium text-sm">
                    {ad.reward} FCFA
                  </div>
                  <button
                    onClick={() => watchAd(ad.id, ad.reward)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                      isCompleted
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white gradient-button"
                    }`}
                    disabled={isCompleted}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {isCompleted ? "Complété" : "Regarder"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TasksScreen

