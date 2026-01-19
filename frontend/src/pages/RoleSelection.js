import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Scale, Building2, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();
  
  const roles = [
    {
      id: 'client',
      title: 'I am a User',
      subtitle: 'Seeking legal advice? Connect with top-tier professionals seamlessly.',
      icon: User,
      accentIcon: Shield,
      bg: 'from-slate-900 via-gray-900 to-slate-950',
      overlayColor: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      textColor: 'text-white',
      subtitleColor: 'text-cyan-100',
      btnGradient: 'from-cyan-500 via-cyan-600 to-cyan-700',
      btnHoverGradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
      btnGlow: 'shadow-cyan-500/50',
      borderColor: 'border-cyan-500/30',
      particleColor: 'bg-cyan-400',
      route: '/user-login',
      testId: 'role-user-card'
    },
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Join our network. Build your practice and reach clients effectively.',
      icon: Scale,
      accentIcon: Sparkles,
      bg: 'from-black via-gray-950 to-black',
      overlayColor: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      textColor: 'text-white',
      subtitleColor: 'text-gray-200',
      btnGradient: 'from-purple-500 via-indigo-600 to-purple-700',
      btnHoverGradient: 'from-purple-400 via-indigo-500 to-purple-600',
      btnGlow: 'shadow-purple-500/50',
      borderColor: 'border-purple-500/30',
      particleColor: 'bg-purple-400',
      route: '/lawyer-login',
      testId: 'role-lawyer-card'
    },
    {
      id: 'law_firm',
      title: 'I am a Law Firm',
      subtitle: 'Manage your firm, onboard lawyers, and scale your legal operations.',
      icon: Building2,
      accentIcon: Zap,
      bg: 'from-blue-950 via-indigo-950 to-blue-900',
      overlayColor: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      textColor: 'text-white',
      subtitleColor: 'text-blue-100',
      btnGradient: 'from-blue-500 via-indigo-600 to-blue-700',
      btnHoverGradient: 'from-blue-400 via-indigo-500 to-blue-600',
      btnGlow: 'shadow-blue-500/50',
      borderColor: 'border-blue-500/30',
      particleColor: 'bg-blue-400',
      route: '/lawfirm-login',
      testId: 'role-lawfirm-card'
    }
  ];
  
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating orbs in background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? 'rgba(6, 182, 212, 0.1)' : i % 3 === 1 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {roles.map((role, index) => {
        const Icon = role.icon;
        const AccentIcon = role.accentIcon;
        
        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, x: index === 0 ? -100 : index === 2 ? 100 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            data-testid={role.testId}
            className={`flex-1 relative flex flex-col items-center justify-center p-12 bg-gradient-to-br ${role.bg} group cursor-pointer transition-all duration-500 hover:flex-[1.15] border-r last:border-r-0 ${role.borderColor} overflow-hidden`}
            onClick={() => navigate(role.route)}
          >
            {/* Diagonal animated gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${role.overlayColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Tech grid lines that appear on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `
                  linear-gradient(${role.particleColor.replace('bg-', 'rgba(')}0.2) 2px, transparent 2px),
                  linear-gradient(90deg, ${role.particleColor.replace('bg-', 'rgba(')}0.2) 2px, transparent 2px)
                `,
                backgroundSize: '30px 30px',
              }}
            />
            
            {/* Animated particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${role.particleColor} rounded-full opacity-40`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -200, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
            
            {/* Scan line effect - REMOVED */}
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-8 max-w-md">
              {/* Icon with tech hexagon frame */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative inline-flex"
              >
                {/* Hexagon background */}
                <div className={`absolute inset-0 flex items-center justify-center`}>
                  <svg width="120" height="120" viewBox="0 0 100 100" className="animate-spin-slow">
                    <polygon
                      points="50,5 90,25 90,75 50,95 10,75 10,25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className={role.textColor}
                      opacity="0.3"
                    />
                  </svg>
                </div>
                
                {/* Icon container */}
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${role.btnGradient} backdrop-blur-sm border ${role.borderColor} shadow-2xl`}>
                  <Icon className="w-14 h-14 text-white" />
                  
                  {/* Accent icon floating */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <AccentIcon className={`w-6 h-6 ${role.particleColor.replace('bg-', 'text-')}`} />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Title with glitch effect on hover */}
              <motion.h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${role.textColor} mb-4 tracking-tight`}
                whileHover={{ scale: 1.02 }}
              >
                {role.title}
              </motion.h1>
              
              {/* Subtitle */}
              <p className={`text-lg sm:text-xl ${role.subtitleColor} leading-relaxed font-light`}>
                {role.subtitle}
              </p>
              
              {/* Futuristic Floating Button */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Multi-layer glow */}
                <motion.div
                  className={`absolute inset-0 rounded-full blur-2xl ${role.btnGlow} opacity-60`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                {/* Button */}
                <motion.button
                  data-testid={`${role.id}-get-started-btn`}
                  className={`relative bg-gradient-to-r ${role.btnGradient} text-white rounded-full px-12 py-6 text-lg font-bold shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 ${role.borderColor} overflow-hidden group/btn`}
                  whileHover={{ scale: 1.08, boxShadow: `0 0 40px ${role.btnGlow}` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.route);
                  }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
                      `,
                    }}
                    animate={{
                      x: [0, 40],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  
                  {/* Text */}
                  <span className="relative z-10 tracking-wide">LOGIN</span>
                  
                  {/* Animated arrow */}
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="relative z-10"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 rounded-tl" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 rounded-tr" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 rounded-bl" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 rounded-br" />
                </motion.button>
              </motion.div>
            </div>
            
            {/* Side accent lines */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        );
      })}
      
      {/* Back button (subtle) */}
      <button
        data-testid="back-to-home-btn"
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors duration-300 z-50 flex items-center space-x-2 group"
      >
        <motion.div
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ←
        </motion.div>
        <span>Back</span>
      </button>
    </div>
  );
}

// Add custom animation in global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;
document.head.appendChild(style);