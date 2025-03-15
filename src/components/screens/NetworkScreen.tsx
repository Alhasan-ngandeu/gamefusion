"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  YoutubeIcon as BrandYoutube,
  ArrowRight,
  Share2,
} from "lucide-react"

interface NetworkScreenProps {
  balance: number
  onBalanceUpdate: (newBalance: number) => void
}

const NetworkScreen: React.FC<NetworkScreenProps> = ({ balance, onBalanceUpdate }) => {
  // État pour suivre les réseaux déjà visités
  const [visitedNetworks, setVisitedNetworks] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem("visitedNetworks")
    return saved ? JSON.parse(saved) : {}
  })

  // Sauvegarder les réseaux visités dans localStorage
  useEffect(() => {
    localStorage.setItem("visitedNetworks", JSON.stringify(visitedNetworks))
  }, [visitedNetworks])

  const socialNetworks = [
    {
      id: 1,
      title: "Abonnez-vous à notre compte TikTok",
      description:
        "Découvrez nos vidéos exclusives et restez connecté avec notre communauté TikTok pour des contenus uniques.",
      icon: (
        <div className="w-12 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="46" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
          </svg>
        </div>
      ),
      iconBg: "bg-black",
      reward: 1000,
      link: "https://tiktok.com/@earningsx",
    },
    {
      id: 2,
      title: "Abonnez-vous à notre chaîne YouTube",
      description: "Découvrez nos tutoriels et vidéos de gameplay sur notre chaîne YouTube officielle.",
      icon: <BrandYoutube className="w-12 h-12 text-red-500" />,
      iconBg: "bg-white",
      reward: 1000,
      link: "https://www.youtube.com/@earningsx?sub_confirmation=1",
    },
    {
      id: 3,
      title: "Rejoignez la communauté sur Telegram",
      description:
        "Rejoignez notre groupe Telegram pour des discussions en direct, des offres flash et un accès direct à notre équipe.",
      icon: (
        <div className="w-12 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
          </svg>
        </div>
      ),
      iconBg: "bg-blue-500",
      reward: 1000,
      link: "https://t.me/canalgamefusion",
    },
    {
      id: 4,
      title: "Partagez à 5 amis et 3 groupes",
      description:
        "Partagez notre contenu avec 5 de vos amis et dans 3 groupes WhatsApp pour faire connaître notre communauté et gagner votre récompense.",
      icon: (
        <div className="w-12 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
          </svg>
        </div>
      ),
      iconBg: "bg-green-500",
      reward: 500,
      link: "https://wa.me/?text=Rejoignez%20Game%20Fusion%20et%20gagnez%20des%20récompenses%20!",
    },
  ]

  // Fonction pour gérer le clic sur un lien de réseau social
  const handleNetworkClick = (id: number, reward: number, link: string) => {
    // Vérifier si l'utilisateur a déjà visité ce réseau
    if (!visitedNetworks[id]) {
      // Mettre à jour le solde
      const newBalance = balance + reward
      onBalanceUpdate(newBalance)

      // Marquer ce réseau comme visité
      setVisitedNetworks((prev) => ({
        ...prev,
        [id]: true,
      }))
    }

    // Ouvrir le lien dans un nouvel onglet
    window.open(link, "_blank")
  }

  return (
    <div className="min-h-screen pb-24 relative z-10">
      <div className="px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white neon-text">Game Fusion</h1>
      </div>

      <div className="container mx-auto px-3 py-4">
        <div className="flex items-center mb-4">
          <Share2 className="w-6 h-6 text-orange-400 mr-2" />
          <h1 className="text-2xl font-bold text-white neon-text">Nos réseaux sociaux</h1>
        </div>

        {/* Texte introductif */}
        <div className="bg-gray-800 bg-opacity-70 rounded-xl p-5 mb-6 border-l-4 border-orange-500 glass-card">
          <p className="text-gray-300">
            Rejoignez notre communauté sur les réseaux sociaux pour découvrir des astuces, participer à des événements
            exclusifs et gagner des récompenses supplémentaires. Chaque réseau social que vous suivez vous rapporte des
            FCFA directement sur votre compte !
          </p>
        </div>

        <div className="space-y-4">
          {socialNetworks.map((network) => (
            <div
              key={network.id}
              className="bg-gray-800 bg-opacity-70 rounded-2xl p-6 relative overflow-hidden social-card glass-card glow-effect"
            >
              {/* Fond décoratif */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white"></div>
                <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full bg-white"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`rounded-2xl p-3 ${network.iconBg}`}>{network.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-1">{network.title}</h2>
                  </div>
                </div>

                {/* Badge de récompense */}
                <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 rounded-full px-4 py-1 text-white font-semibold mb-3">
                  {network.reward} FCFA
                </div>

                <p className="text-gray-400 mb-4">{network.description}</p>

                <button
                  onClick={() => handleNetworkClick(network.id, network.reward, network.link)}
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity hover-arrow gradient-button"
                  disabled={visitedNetworks[network.id]}
                >
                  {visitedNetworks[network.id] ? "Déjà visité" : "Aller"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                {visitedNetworks[network.id] && (
                  <p className="text-green-500 text-sm mt-2 text-center">Récompense déjà réclamée</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NetworkScreen

