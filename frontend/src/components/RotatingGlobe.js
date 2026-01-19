import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

export const RotatingGlobe = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 blur-3xl opacity-60">
        <div className="w-full h-full bg-blue-600 rounded-full animate-pulse" />
      </div>
      
      {/* Orbiting rings - creates 3D globe effect */}
      <motion.div
        className="absolute w-72 h-72"
        animate={{ rotateY: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>
      </motion.div>
      
      {/* Second rotating ring */}
      <motion.div
        className="absolute w-64 h-64"
        animate={{ rotateX: 360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg className="w-full h-full opacity-60" viewBox="0 0 200 200">
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="40"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />
        </svg>
      </motion.div>
      
      {/* Third rotating ring */}
      <motion.div
        className="absolute w-56 h-56"
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg className="w-full h-full opacity-40" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="15 10"
          />
        </svg>
      </motion.div>
      
      {/* Particles/dots around globe */}
      {[...Array(20)].map((_, i) => {
        const angle = (i * 360) / 20;
        const radius = 90;
        const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 100 + radius * Math.sin((angle * Math.PI) / 180);
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        );
      })}
      
      {/* Central logo with scale effect */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center border-4 border-blue-400/40 shadow-2xl backdrop-blur-sm">
          <Scale className="w-20 h-20 text-white" strokeWidth={1.5} />
        </div>
      </motion.div>
      
      {/* Subtle rotating gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};
