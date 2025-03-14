"use client"

import type React from "react"

import { useEffect, useRef } from "react"

const StarryBackground: React.FC = () => {
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!starsRef.current) return

    // Nettoyer les étoiles existantes
    starsRef.current.innerHTML = ""

    // Créer des étoiles
    const starCount = window.innerWidth < 768 ? 100 : 200

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"

      // Taille aléatoire
      const size = Math.random() * 2 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Position aléatoire
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Animation aléatoire
      star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`)
      star.style.setProperty("--delay", `${Math.random() * 5}s`)
      star.style.setProperty("--opacity", `${Math.random() * 0.7 + 0.3}`)

      starsRef.current.appendChild(star)
    }

    // Créer des particules flottantes
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "floating-particles"

    const particleCount = window.innerWidth < 768 ? 15 : 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Position aléatoire
      particle.style.left = `${Math.random() * 100}%`
      particle.style.bottom = `-${Math.random() * 20}%`

      // Animation aléatoire
      particle.style.setProperty("--float-duration", `${Math.random() * 20 + 15}s`)
      particle.style.setProperty("--float-delay", `${Math.random() * 10}s`)
      particle.style.setProperty("--float-opacity", `${Math.random() * 0.5 + 0.1}`)
      particle.style.setProperty("--float-distance", `${Math.random() * 40 - 20}vw`)

      particlesContainer.appendChild(particle)
    }

    document.body.appendChild(particlesContainer)

    return () => {
      if (document.body.contains(particlesContainer)) {
        document.body.removeChild(particlesContainer)
      }
    }
  }, [])

  return (
    <div className="starry-background">
      <div ref={starsRef} className="stars"></div>
    </div>
  )
}

export default StarryBackground

