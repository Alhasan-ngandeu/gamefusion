"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CheckCircle, Clock, Play, Video } from "lucide-react"
import Swal from "sweetalert2"
import StarryBackground from "../StarryBackground"

interface TasksScreenProps {
  balance: number
  onBalanceUpdate: (newBalance: number) => void
}

interface AdCompletionData {
  completed: boolean
  timestamp: string | null
}

const TasksScreen: React.FC<TasksScreenProps> = ({ balance, onBalanceUpdate }) => {
  // État pour suivre les publicités déjà visionnées avec leur timestamp
  const [completedAds, setCompletedAds] = useState<Record<number, AdCompletionData>>(() => {
    const saved = localStorage.getItem("completedAds")
    if (!saved) return {}

    try {
      const parsed = JSON.parse(saved)
      // Convertir l'ancien format si nécessaire
      if (typeof parsed === "object") {
        const newFormat: Record<number, AdCompletionData> = {}
        Object.keys(parsed).forEach((key) => {
          const id = Number.parseInt(key)
          if (typeof parsed[key] === "boolean") {
            // Ancien format
            newFormat[id] = {
              completed: parsed[key],
              timestamp: parsed[key] ? new Date().toISOString() : null,
            }
          } else {
            // Déjà au nouveau format
            newFormat[id] = parsed[key]
          }
        })
        return newFormat
      }
    } catch (e) {
      console.error("Erreur lors du parsing des données de publicités:", e)
    }
    return {}
  })

  // État pour stocker les temps restants
  const [remainingTimes, setRemainingTimes] = useState<Record<number, string>>({})

  // Remplacer les tâches par 5 publicités de 100 FCFA chacune
  const advertisements = [
    {
      id: 1,
      title: "Publicité 1 - Jeu mobile",
      description: "Regardez une publicité de 30 secondes pour un jeu mobile populaire",
      reward: 100,
    },
    {
      id: 2,
      title: "Publicité 2 - Application de fitness",
      description: "Découvrez cette nouvelle application de fitness en regardant une vidéo de 30 secondes",
      reward: 100,
    },
    {
      id: 3,
      title: "Publicité 3 - Service de streaming",
      description: "Regardez cette publicité pour un service de streaming vidéo",
      reward: 100,
    },
    {
      id: 4,
      title: "Publicité 4 - Produit alimentaire",
      description: "Découvrez ce nouveau produit alimentaire en regardant cette courte vidéo",
      reward: 100,
    },
    {
      id: 5,
      title: "Publicité 5 - Application de livraison",
      description: "Regardez cette publicité pour une application de livraison de repas",
      reward: 100,
    },
  ]
  // Ouvrir l'URL de la publicité dans un nouvel onglet
  const adUrl = "https://www.effectiveratecpm.com/zac6n5ezy0?key=37f69ccc316bae2d772431a23971e5e3"
  window.open(adUrl, "_blank")

  // Vérifier la disponibilité des publicités et mettre à jour les temps restants
  useEffect(() => {
    const checkAdsAvailability = () => {
      const now = new Date()
      const newRemainingTimes: Record<number, string> = {}

      Object.keys(completedAds).forEach((key) => {
        const id = Number.parseInt(key)
        const adData = completedAds[id]

        if (adData.completed && adData.timestamp) {
          const lastViewed = new Date(adData.timestamp)
          const timeDiff = now.getTime() - lastViewed.getTime()
          const hoursDiff = timeDiff / (1000 * 60 * 60)

          if (hoursDiff < 24) {
            // Calculer le temps restant
            const remainingMs = 24 * 60 * 60 * 1000 - timeDiff
            const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60))
            const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))
            newRemainingTimes[id] = `${remainingHours}h ${remainingMinutes}m`
          } else {
            // Réinitialiser si 24 heures se sont écoulées
            const updatedCompletedAds = { ...completedAds }
            updatedCompletedAds[id] = { completed: false, timestamp: null }
            setCompletedAds(updatedCompletedAds)
            localStorage.setItem("completedAds", JSON.stringify(updatedCompletedAds))
          }
        }
      })

      setRemainingTimes(newRemainingTimes)
    }

    // Vérifier immédiatement
    checkAdsAvailability()

    // Puis vérifier toutes les minutes
    const interval = setInterval(checkAdsAvailability, 60000)
    return () => clearInterval(interval)
  }, [completedAds])

  // Fonction pour vérifier si une publicité est disponible
  const isAdAvailable = (adId: number): boolean => {
    if (!completedAds[adId]) return true
    if (!completedAds[adId].completed) return true
    if (!completedAds[adId].timestamp) return true

    const lastViewed = new Date(completedAds[adId].timestamp!)
    const now = new Date()
    const timeDiff = now.getTime() - lastViewed.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    return hoursDiff >= 24
  }

  // Fonction pour simuler le visionnage d'une publicité
  const watchAd = (adId: number, reward: number) => {
    // Vérifier si la publicité est disponible
    if (!isAdAvailable(adId)) {
      Swal.fire({
        icon: "info",
        title: "Publicité non disponible",
        text: `Cette publicité sera à nouveau disponible dans ${remainingTimes[adId]}.`,
        confirmButtonColor: "#6366f1",
        confirmButtonText: "OK",
        background: "#1f2937",
        color: "#fff",
        customClass: {
          popup: "rounded-xl shadow-lg border border-gray-700",
          title: "text-xl font-semibold text-white",
          confirmButton:
            "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white px-4 py-2 rounded-lg",
          htmlContainer: "text-gray-300",
        },
      })
      return
    }

    // Simuler le chargement et le visionnage d'une publicité
    Swal.fire({
      title: "Chargement de la publicité...",
      html: "La publicité va commencer dans quelques secondes",
      timer: 3000,
      timerProgressBar: true,
      background: "#1f2937",
      color: "#fff",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-700",
        title: "text-xl font-semibold text-white",
        htmlContainer: "text-gray-300",
      },
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
        background: "#1f2937",
        color: "#fff",
        customClass: {
          popup: "rounded-xl shadow-lg border border-gray-700",
          title: "text-xl font-semibold text-white",
          htmlContainer: "text-gray-300",
        },
        didOpen: () => {
          Swal.showLoading()
        },
      }).then(() => {
        // Marquer la publicité comme visionnée avec timestamp
        const now = new Date()
        const newCompletedAds = {
          ...completedAds,
          [adId]: { completed: true, timestamp: now.toISOString() },
        }
        setCompletedAds(newCompletedAds)
        localStorage.setItem("completedAds", JSON.stringify(newCompletedAds))

        // Calculer le temps restant initial
        const remainingHours = 24
        const remainingMinutes = 0
        setRemainingTimes({
          ...remainingTimes,
          [adId]: `${remainingHours}h ${remainingMinutes}m`,
        })

        // Ajouter la récompense au solde
        const newBalance = balance + reward
        onBalanceUpdate(newBalance)

        // Afficher un message de succès
        Swal.fire({
          icon: "success",
          title: "Félicitations !",
          text: `Vous avez gagné ${reward} FCFA !`,
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Super !",
          background: "#1f2937",
          color: "#fff",
          customClass: {
            popup: "rounded-xl shadow-lg border border-gray-700",
            title: "text-xl font-semibold text-white",
            confirmButton:
              "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white px-4 py-2 rounded-lg",
            htmlContainer: "text-gray-300",
          },
        })
      })
    })
  }

  return (
    <>
      <StarryBackground />
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
              // Vérifier si la publicité est disponible
              const adAvailable = isAdAvailable(ad.id)
              const isCompleted = completedAds[ad.id]?.completed || false
              const timeRemaining = remainingTimes[ad.id] || ""

              return (
                <div
                  key={ad.id}
                  className={`bg-gray-800 bg-opacity-70 rounded-xl shadow-sm p-4 social-card glass-card glow-effect ${
                    isCompleted && !adAvailable
                      ? "border-l-4 border-gray-500"
                      : isCompleted
                        ? "border-l-4 border-green-500"
                        : "border-l-4 border-blue-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-white">{ad.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{ad.description}</p>
                      {isCompleted && !adAvailable && (
                        <p className="text-yellow-400 text-sm mt-2">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Disponible dans {timeRemaining}
                        </p>
                      )}
                    </div>
                    {isCompleted && !adAvailable ? (
                      <Clock className="w-6 h-6 text-yellow-400" />
                    ) : isCompleted ? (
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
                      onClick={() => {
                        window.open("https://www.effectiveratecpm.com/zac6n5ezy0?key=37f69ccc316bae2d772431a23971e5e3", "_blank")
                        watchAd(ad.id, ad.reward)
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                        isCompleted && !adAvailable
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white gradient-button"
                      }`}
                      disabled={isCompleted && !adAvailable}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      {isCompleted && !adAvailable ? "Indisponible" : "Regarder"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default TasksScreen
