import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, MessageSquare, UserCheck, Scale, Home, HelpCircle, Info, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function CinematicHero() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const floatingCards = [
    {
      position: 'top-left',
      icon: BarChart3,
      title: 'Smart Legal Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      style: { top: '10%', left: '8%' }
    },
    {
      position: 'top-right',
      icon: MessageSquare,
      title: 'AI Legal Assistant',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      style: { top: '10%', right: '8%' }
    },
    {
      position: 'bottom-left',
      icon: UserCheck,
      title: 'Happy Clients',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      style: { bottom: '10%', left: '8%' }
    },
    {
      position: 'bottom-right',
      icon: Scale,
      title: 'Instant Legal Consultation',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
      style: { bottom: '10%', right: '8%' }
    }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-blue-950">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scale className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Nyaay Sathi</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <button
              data-testid="nav-home"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-300"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            
            <button
              data-testid="nav-about"
              onClick={() => navigate('/about')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-300"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
            
            <button
              data-testid="nav-features"
              onClick={() => navigate('/features')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>Features</span>
            </button>
            
            <button
              data-testid="nav-help"
              onClick={() => navigate('/contact')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-300"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      {/* Floating Feature Cards */}
      {floatingCards.map((card, index) => {
        const Icon = card.icon;
        const parallaxX = mousePosition.x * (index % 2 === 0 ? 1 : -1) * 0.5;
        const parallaxY = mousePosition.y * (index < 2 ? 1 : -1) * 0.5;
        
        return (
          <motion.div
            key={card.position}
            data-testid={`floating-card-${card.position}`}
            className="absolute z-10"
            style={card.style}
            animate={{
              x: parallaxX,
              y: parallaxY,
              rotateY: mousePosition.x * 0.5,
              rotateX: -mousePosition.y * 0.5,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }
              }}
            >
              <div className="w-64 h-48 rounded-2xl overflow-hidden glass border border-blue-500/30 shadow-2xl relative">
                {/* Card glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card image */}
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover opacity-60"
                />
                
                {/* Card content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-slate-950/90 to-transparent">
                  <Icon className="w-12 h-12 text-blue-400 mb-3" />
                  <h3 className="text-white font-semibold text-center">{card.title}</h3>
                </div>
                
                {/* Neon border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Central Logo Section */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        {/* Shield Logo with Orbiting Line */}
        <div className="relative mb-12">
          {/* Ambient glow behind shield */}
          <div className="absolute inset-0 blur-3xl opacity-50">
            <div className="w-full h-full bg-blue-500 rounded-full animate-pulse" />
          </div>
          
          {/* Orbiting line container */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Orbiting neon line */}
            <motion.div
              className="absolute w-72 h-72"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#orbitGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="100 400"
                  filter="url(#glow)"
                />
              </svg>
            </motion.div>
            
            {/* Flowing wave animation */}
            <motion.div
              className="absolute w-80 h-80"
              animate={{ rotate: -360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg className="w-full h-full opacity-40" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="waveGradient">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="2"
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                    }}
                  />
                ))}
              </svg>
            </motion.div>
            
            {/* 4K Shield Logo */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center border-4 border-blue-400/30 shadow-2xl">
                <Scale className="w-24 h-24 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Typography */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            ⚖️ Nyaay Sathi
          </h1>
          <p className="text-2xl sm:text-3xl text-blue-200 font-light tracking-wide">
            Justice, Powered by Intelligence.
          </p>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Get Started Button */}
          <div className="relative group">
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
            
            <Button
              data-testid="cinematic-hero-cta"
              onClick={() => navigate('/role-selection')}
              className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl px-12 py-6 rounded-full font-semibold shadow-2xl flex items-center space-x-3 border-2 border-blue-400/50"
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
          
          {/* AI Chat Button */}
          <div className="relative group">
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
            
            <Button
              data-testid="cinematic-ai-chat-btn"
              onClick={() => navigate('/quick-chat')}
              className="relative bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white text-xl px-12 py-6 rounded-full font-semibold shadow-2xl flex items-center space-x-3 border-2 border-emerald-400/50"
            >
              <MessageSquare className="w-6 h-6" />
              <span>AI Chat</span>
            </Button>
          </div>
        </motion.div>
        
        {/* Navigation hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 text-sm"
        >
          Scroll to explore more
        </motion.div>
      </div>
      
      <style jsx>{`
        .glass {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
