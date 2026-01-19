import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Scale, Building2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function RoleSelection() {
  const navigate = useNavigate();
  
  const roles = [
    {
      id: 'client',
      title: 'I am a User',
      subtitle: 'Seeking legal advice? Connect with top-tier professionals seamlessly.',
      icon: User,
      bg: 'from-slate-50 to-slate-100',
      textColor: 'text-slate-900',
      subtitleColor: 'text-slate-600',
      btnGradient: 'from-slate-800 via-slate-900 to-slate-800',
      btnHoverGradient: 'from-slate-700 via-slate-800 to-slate-700',
      btnGlow: 'shadow-slate-500/50',
      route: '/user-login',
      testId: 'role-user-card'
    },
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Join our network. Build your practice and reach clients effectively.',
      icon: Scale,
      bg: 'from-slate-950 to-slate-900',
      textColor: 'text-white',
      subtitleColor: 'text-slate-300',
      btnGradient: 'from-slate-100 via-white to-slate-100',
      btnHoverGradient: 'from-white via-slate-50 to-white',
      btnGlow: 'shadow-white/50',
      textOnBtn: 'text-slate-900',
      route: '/lawyer-login',
      testId: 'role-lawyer-card'
    },
    {
      id: 'law_firm',
      title: 'I am a Law Firm',
      subtitle: 'Manage your firm, onboard lawyers, and scale your legal operations.',
      icon: Building2,
      bg: 'from-blue-950 to-blue-900',
      textColor: 'text-white',
      subtitleColor: 'text-blue-200',
      btnGradient: 'from-blue-500 via-blue-600 to-blue-500',
      btnHoverGradient: 'from-blue-400 via-blue-500 to-blue-400',
      btnGlow: 'shadow-blue-500/50',
      textOnBtn: 'text-white',
      route: '/lawfirm-login',
      testId: 'role-lawfirm-card'
    }
  ];
  
  return (
    <div className="min-h-screen flex">
      {roles.map((role, index) => {
        const Icon = role.icon;
        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, x: index === 0 ? -100 : index === 2 ? 100 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            data-testid={role.testId}
            className={`flex-1 relative flex flex-col items-center justify-center p-12 bg-gradient-to-br ${role.bg} group cursor-pointer transition-all duration-500 hover:flex-[1.1] overflow-hidden`}
            onClick={() => navigate(role.route)}
          >
            {/* Animated background particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
            
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-8 max-w-md">
              {/* Icon with glow */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl"
              >
                <Icon className="w-16 h-16" style={{ color: role.textColor.includes('white') ? '#fff' : '#000' }} />
              </motion.div>
              
              {/* Title */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${role.textColor} mb-4`}>
                {role.title}
              </h1>
              
              {/* Subtitle */}
              <p className={`text-lg sm:text-xl ${role.subtitleColor} leading-relaxed`}>
                {role.subtitle}
              </p>
              
              {/* Floating Animated Button with Techy Aesthetic */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Glow effect behind button */}
                <motion.div
                  className={`absolute inset-0 rounded-full blur-xl ${role.btnGlow} opacity-50`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Button with gradient and floating effect */}
                <motion.button
                  data-testid={`${role.id}-get-started-btn`}
                  className={`relative bg-gradient-to-r ${role.btnGradient} hover:${role.btnHoverGradient} ${role.textOnBtn || 'text-white'} rounded-full px-10 py-5 text-lg font-bold shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 border-white/30 overflow-hidden group/btn`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.route);
                  }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  
                  {/* Sparkle icon */}
                  <Sparkles className="w-5 h-5 relative z-10" />
                  
                  {/* Text */}
                  <span className="relative z-10">Get Started</span>
                  
                  {/* Arrow with animation */}
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Pulsing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.button>
              </motion.div>
            </div>
            
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </motion.div>
        );
      })}
      
      {/* Back button (subtle) */}
      <button
        data-testid="back-to-home-btn"
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors duration-300 z-50"
      >
        ← Back
      </button>
    </div>
  );
}