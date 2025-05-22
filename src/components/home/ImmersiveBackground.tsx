
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ImmersiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate floating elements
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Clear any existing particles
    const existingParticles = container.querySelectorAll('.floating-card, .floating-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create floating cards
    const createFloatingCards = () => {
      const cardTypes = [
        { width: 80, height: 100, className: 'bg-blue-500/10 border border-blue-200/30' },
        { width: 100, height: 80, className: 'bg-purple-500/10 border border-purple-200/30' },
        { width: 120, height: 90, className: 'bg-indigo-500/10 border border-indigo-200/30' },
        { width: 90, height: 110, className: 'bg-violet-500/10 border border-violet-200/30' },
        { width: 70, height: 90, className: 'bg-pink-500/10 border border-pink-200/30' }
      ];
      
      const symbolTypes = ['∑', '∫', '∞', 'π', '√', '∆', 'Ω', 'θ', 'σ', 'μ', 'λ', 'α', 'β'];
      
      // Create cards
      for (let i = 0; i < 12; i++) {
        const card = document.createElement('div');
        
        // Random card type
        const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        
        // Random position within container
        const posX = Math.random() * (containerRect.width - cardType.width);
        const posY = Math.random() * (containerRect.height - cardType.height);
        
        // Random rotation
        const rotation = Math.random() * 360;
        
        // Random animation duration
        const duration = 30 + Math.random() * 40;
        
        // Set card style
        card.className = `absolute rounded-md ${cardType.className} floating-card`;
        card.style.width = `${cardType.width}px`;
        card.style.height = `${cardType.height}px`;
        card.style.left = `${posX}px`;
        card.style.top = `${posY}px`;
        card.style.transform = `rotate(${rotation}deg)`;
        card.style.backdropFilter = 'blur(2px)';
        card.style.animation = `float ${duration}s infinite linear`;
        card.style.animationDelay = `${Math.random() * -40}s`;
        
        // Add mathematical symbol
        if (Math.random() > 0.5) {
          const symbol = document.createElement('div');
          const symbolText = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
          symbol.className = 'absolute text-2xl text-indigo-600/50 font-bold';
          symbol.style.left = `${Math.random() * 70}%`;
          symbol.style.top = `${Math.random() * 70}%`;
          symbol.textContent = symbolText;
          card.appendChild(symbol);
        }
        
        container.appendChild(card);
      }
      
      // Create particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        
        // Random size (3-8px)
        const size = 3 + Math.random() * 5;
        
        // Random position
        const posX = Math.random() * containerRect.width;
        const posY = Math.random() * containerRect.height;
        
        // Random color
        const colors = [
          'bg-blue-400/30', 'bg-purple-400/30', 'bg-indigo-400/30', 
          'bg-pink-400/30', 'bg-violet-400/30', 'bg-teal-400/30'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set particle style
        particle.className = `absolute rounded-full ${color} floating-particle`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animation = `float ${15 + Math.random() * 30}s infinite linear`;
        particle.style.animationDelay = `${Math.random() * -30}s`;
        
        container.appendChild(particle);
      }
    };
    
    createFloatingCards();
    
    // Add animation styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 40 - 20}deg);
        }
        50% {
          transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 80 - 40}deg);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 40 - 20}deg);
        }
        100% {
          transform: translate(0, 0) rotate(0deg);
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
      
      {/* Moving gradient overlays */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-40"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(124, 58, 237, 0.3), transparent 35%), radial-gradient(circle at 70% 60%, rgba(37, 99, 235, 0.3), transparent 35%)'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear"
        }}
      />
      
      {/* Floating elements container */}
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Mesh gradients */}
      <div className="absolute -top-1/2 -left-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-r from-blue-300/10 to-purple-300/10 blur-3xl" />
      <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-r from-indigo-300/10 to-pink-300/10 blur-3xl" />
      
      {/* Extra glass cards that follow mouse */}
      <div className="glass-card absolute w-32 h-40 rounded-xl 
                      bg-white/5 backdrop-blur-md border border-white/20 
                      top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 
                      shadow-lg shadow-purple-500/5 rotate-6" 
      />
      
      <div className="glass-card absolute w-40 h-32 rounded-xl 
                     bg-white/5 backdrop-blur-md border border-white/20 
                     top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 
                     shadow-lg shadow-blue-500/5 -rotate-12" 
      />
    </div>
  );
};

export default ImmersiveBackground;
