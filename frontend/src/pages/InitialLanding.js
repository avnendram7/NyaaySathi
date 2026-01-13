import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function InitialLanding() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-blue-950" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Main button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Glow effect behind button */}
        <div className="absolute inset-0 blur-2xl opacity-50">
          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-pulse" />
        </div>
        
        {/* Animated gradient border */}
        <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-border">
          <button
            data-testid="initial-get-started-btn"
            onClick={() => navigate('/role-selection')}
            className="relative px-12 py-6 bg-slate-950 rounded-full text-white font-semibold text-xl flex items-center space-x-3 group transition-all duration-300 hover:bg-slate-900"
          >
            <span>Get Started</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
      
      {/* Subtle branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 text-sm"
      >
        Nyaay Sathi
      </motion.div>
      
      <style jsx>{`
        @keyframes gradient-border {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-border 3s ease infinite;
        }
      `}</style>
    </div>
  );
}