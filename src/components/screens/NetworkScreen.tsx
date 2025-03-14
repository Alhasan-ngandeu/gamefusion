"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  InstagramIcon as BrandTiktok,
  BellIcon as BrandTelegram,
  YoutubeIcon as BrandYoutube,
  PhoneIcon as BrandWhatsapp,
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
      icon: <BrandTiktok className="w-12 h-12 text-white" />,
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
      icon: <BrandTelegram className="w-12 h-12 text-white" />,
      iconBg: "bg-blue-500",
      reward: 1000,
      link: "https://t.me/earningsx",
    },
    {
      id: 4,
      title: "Partagez à 5 amis et 3 groupes",
      description:
        "Partagez notre contenu avec 5 de vos amis et dans 3 groupes WhatsApp pour faire connaître notre communauté et gagner votre récompense.",
      icon: <BrandWhatsapp className="w-12 h-12 text-white" />,
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

