"use client"

import { useState, useEffect } from "react"
import { Brain, HelpCircle, WalletCardsIcon as Cards, Dice5 } from "lucide-react"
import GameCard from "./components/GameCard"
import QuizGame from "./components/games/QuizGame"
import ScratchCard from "./components/games/ScratchCard"
import MiniGames from "./components/games/MiniGames"
import DiceRoll from "./components/games/DiceRoll"
import Navigation from "./components/Navigation"
import BalanceCard from "./components/BalanceCard"
import TasksScreen from "./components/screens/TasksScreen"
import NetworkScreen from "./components/screens/NetworkScreen"
import WithdrawScreen from "./components/screens/WithdrawScreen"
import UsernameModal from "./components/UsernameModal"
import WelcomeMessage from "./components/WelcomeMessage"
import StarryBackground from "./components/StarryBackground"

function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("gameBalance")
    return saved ? Number.parseInt(saved) : 0
  })
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("play")
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("username") || ""
  })
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    localStorage.setItem("gameBalance", balance.toString())
  }, [balance])

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà entré un nom d'utilisateur
    if (!username) {
      setShowUsernameModal(true)
    } else {
      // Si l'utilisateur a déjà un nom, c'est un utilisateur qui revient
      setIsReturningUser(true)
      setShowWelcome(true)

      // Masquer le message de bienvenue après 3 secondes
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [username])

  useEffect(() => {
    const path = window.location.pathname
    const gamePath = path.slice(1) // Remove the leading slash

    if (gamePath && ["quiz", "scratch", "mini-games", "dice-roll"].includes(gamePath)) {
      setCurrentGame(gamePath)
    } else {
      // Si ce n'est pas un jeu, vérifier si c'est un onglet de navigation
      const tab = path.slice(1)
      if (["play", "tasks", "network", "withdraw"].includes(tab)) {
        setActiveTab(tab)
      } else {
        setActiveTab("play") // Par défaut
      }
    }
  }, [])

  const handleBalanceUpdate = (newBalance: number) => {
    setBalance(newBalance)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    window.history.pushState({}, "", `/${tab === "play" ? "" : tab}`)
  }

  const handleUsernameSubmit = (name: string) => {
    // Vérifier si c'est la première fois que l'utilisateur entre son nom
    const isFirstTime = !localStorage.getItem("username")

    setUsername(name)
    localStorage.setItem("username", name)
    setShowUsernameModal(false)

    // Définir isReturningUser en fonction de si c'est la première fois
    setIsReturningUser(!isFirstTime)
    setShowWelcome(true)

    // Masquer le message de bienvenue après 3 secondes
    setTimeout(() => {
      setShowWelcome(false)
    }, 3000)
  }

  const games = [
    {
      title: "Quiz Challenge",
      description: "Teste tes connaissances et réponds aux questions. Gagne 50 FCFA par bonne réponse!",
      icon: <HelpCircle className="w-full h-full" />,
      color: "purple" as const,
      path: "/quiz",
    },
    {
      title: "Cartes à Gratter",
      description: "Gratte la carte virtuelle et découvre ton gain instantané. Jusqu'à 1000 FCFA à gagner!",
      icon: <Cards className="w-full h-full" />,
      color: "blue" as const,
      path: "/scratch",
    },
    {
      title: "Memory Game",
      description: "Trouve toutes les paires de cartes identiques. Gagne des points selon ta performance!",
      icon: <Brain className="w-full h-full" />,
      color: "green" as const,
      path: "/mini-games",
    },
    {
      title: "Lancer de Dés",
      description: "Lance les dés et gagne si la somme est 7! Tente ta chance pour gagner 100 FCFA.",
      icon: <Dice5 className="w-full h-full" />,
      color: "purple" as const,
      path: "/dice-roll",
    },
  ]

  // Render the appropriate game component based on the current path
  const renderGame = () => {
    switch (currentGame) {
      case "quiz":
        return <QuizGame />
      case "scratch":
        return <ScratchCard />
      case "mini-games":
        return <MiniGames />
      case "dice-roll":
        return <DiceRoll />
      default:
        return renderMainContent()
    }
  }

  // Assurez-vous que toutes les sections ont le même padding-bottom pour la navigation
  const renderMainContent = () => {
    switch (activeTab) {
      case "play":
        return (
          <div className="min-h-screen pb-24 relative z-10">
            <div className="px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white neon-text">Game Fusion</h1>
            </div>
            <main className="container mx-auto px-3 py-2">
              {/* Username display */}
              <div className="flex justify-center mb-4">
                <div className="bg-gray-800 bg-opacity-50 rounded-full px-6 py-2 shadow-sm glass-card">
                  <span className="text-white font-medium">{username}</span>
                </div>
              </div>

              {/* Balance Card */}
              <div className="floating-card">
                <BalanceCard balance={balance} />
              </div>

              {/* Games Grid */}
              <div className="space-y-4 mt-8">
                {games.map((game, index) => (
                  <GameCard
                    key={index}
                    title={game.title}
                    description={game.description}
                    icon={game.icon}
                    color={game.color}
                    onClick={() => (window.location.href = game.path)}
                  />
                ))}
              </div>
            </main>
          </div>
        )
      case "tasks":
        return <TasksScreen balance={balance} onBalanceUpdate={handleBalanceUpdate} />
      case "network":
        return <NetworkScreen balance={balance} onBalanceUpdate={handleBalanceUpdate} />
      case "withdraw":
        return <WithdrawScreen balance={balance} onBalanceUpdate={handleBalanceUpdate} />
      default:
        return null
    }
  }

  return (
    <>
      <StarryBackground />
      <div className="relative z-10">
        {renderGame()}

        {/* Navigation Bar (only show on main screens, not in games) */}
        {!currentGame && <Navigation activeTab={activeTab} onTabChange={handleTabChange} />}

        {/* Username Modal */}
        {showUsernameModal && <UsernameModal onSubmit={handleUsernameSubmit} />}

        {/* Welcome Message */}
        {showWelcome && <WelcomeMessage username={username} isReturningUser={isReturningUser} />}
      </div>
    </>
  )
}

export default App

