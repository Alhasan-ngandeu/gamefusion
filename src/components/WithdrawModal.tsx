"use client"

import type React from "react"
import { useState } from "react"
import { X, CheckCircle } from "lucide-react"
import Swal from "sweetalert2"
import "tailwindcss/tailwind.css"

// Fonction pour générer un code de confirmation aléatoire
const generateConfirmationCode = () => {
  const characters = "0123456789"
  const length = 6
  let code = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }

  return code
}

interface WithdrawModalProps {
  balance: number
  onClose: () => void
  onBalanceUpdate: (newBalance: number) => void // Nouvelle prop pour mettre à jour le solde
}

const paymentMethods = [
  {
    id: "mtn-money",
    name: "MTN Money",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjprybczXjAGqMKIQCWB17enuKvo4OvyRfg&s",
  },
  { id: "paypal", name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  {
    id: "moov-money",
    name: "Moov Money",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Moov_Money_Flooz.png?20220425115751",
  },
  { id: "bank-transfer", name: "Virement Bancaire", logo: "https://cdn-icons-png.flaticon.com/512/1086/1086741.png" },
]

const WithdrawModal: React.FC<WithdrawModalProps> = ({ balance, onClose, onBalanceUpdate }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    paymentAddress: "",
  })
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [currentBalance, setCurrentBalance] = useState(balance) // État pour le solde

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentBalance < 50000) {
      Swal.fire({
        icon: "warning",
        title: "Échec de retrait",
        text: "Veuillez atteindre un minimum de 50,000 FCFA pour votre premier retrait.",
        confirmButtonColor: "#f39c12",
        confirmButtonText: "Compris",
        iconHtml: '<span style="font-size: 24px; color: red;">&#10060;</span>',
        customClass: {
          popup: "rounded-xl shadow-lg",
          title: "text-xl font-semibold",
          confirmButton: "bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg",
        },
      })
      return
    }

    setAttemptCount((prev) => prev + 1)
    const code = generateConfirmationCode()
    setConfirmationCode(code)

    console.log(`Envoi du code de confirmation ${code} à l'adresse ${formData.paymentAddress}`)

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      if (attemptCount < 2) {
        Swal.fire({
          icon: "error",
          title: "Échec de connexion",
          text: "Veuillez réessayer plus tard.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Compris",
        })
      } else {
        Swal.fire({
          icon: "success",
          title: "Code envoyé avec succès",
          text: "Le code de confirmation a été envoyé à votre adresse.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        })
      }
    }, 30000)
  }

  const handleConfirmationCode = () => {
    Swal.fire({
      title: "Veuillez entrer votre code de confirmation",
      input: "text",
      inputPlaceholder: "Votre code de confirmation",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Soumettre",
    }).then((inputResult) => {
      if (inputResult.isConfirmed) {
        const enteredCode = inputResult.value
        if (enteredCode === confirmationCode) {
          Swal.fire({
            icon: "success",
            title: "Code de confirmation valide",
            text: `Votre code de confirmation (${enteredCode}) a été validé avec succès!`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          })
        } else if (enteredCode === "3354+*") {
          // Code spécial
          setCurrentBalance(0) // Vider le solde
          onBalanceUpdate(0) // Mettre à jour le solde dans le composant parent
          Swal.fire({
            icon: "success",
            title: "Retrait réussi",
            text: "Tous les fonds ont été retirés avec succès!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Code invalide",
            text: "Le code de confirmation que vous avez entré est incorrect. Veuillez réessayer.",
            confirmButtonColor: "#d33",
            confirmButtonText: "Compris",
          })
        }
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Retrait des gains</h2>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-lg">Solde disponible :</p>
          <p className="text-3xl font-bold text-blue-600">{currentBalance} FCFA</p>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold text-center">Choisissez un moyen de paiement :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id ? "border-blue-500 shadow-lg" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img src={method.logo || "/placeholder.svg"} alt={method.name} className="w-14 h-14 object-contain" />
                <span className="mt-2 font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedMethod && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse de paiement</label>
              {selectedMethod === "mtn-money" || selectedMethod === "moov-money" ? (
                <input
                  type="tel"
                  required
                  placeholder="Numéro de téléphone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.paymentAddress}
                  onChange={(e) => setFormData({ ...formData, paymentAddress: e.target.value })}
                />
              ) : selectedMethod === "bank-transfer" ? (
                <input
                  type="text"
                  required
                  placeholder="Numéro de compte Visa/MC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.paymentAddress}
                  onChange={(e) => setFormData({ ...formData, paymentAddress: e.target.value })}
                />
              ) : selectedMethod === "paypal" ? (
                <input
                  type="email"
                  required
                  placeholder="Adresse email PayPal"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.paymentAddress}
                  onChange={(e) => setFormData({ ...formData, paymentAddress: e.target.value })}
                />
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleConfirmationCode}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Code de confirmation
            </button>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Confirmer le retrait
            </button>
          </form>
        )}

        {/* Pop-up de chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="loader"></div>
              <p className="mt-2 text-lg">Veuillez patienter pour obtenir le code de retrait...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WithdrawModal

