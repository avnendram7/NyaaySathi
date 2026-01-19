import { motion } from 'framer-motion';

export const DiagonalWave = () => {
  // Generate sparkle positions along the diagonal
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${10 + (i * 8)}%`,
    top: `${5 + (i * 7)}%`,
    delay: i * 0.3,
  }));

  return (
    <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
      {/* Diagonal Wave Line */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="30%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated diagonal wave path */}
        <motion.path
          d="M -10,10 Q 20,8 40,12 T 80,10 L 110,40"
          fill="none"
          stroke="url(#diagonalGradient)"
          strokeWidth="0.3"
          filter="url(#waveGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />
        
        {/* Second wave with offset */}
        <motion.path
          d="M -5,15 Q 25,13 45,17 T 85,15 L 115,45"
          fill="none"
          stroke="url(#diagonalGradient)"
          strokeWidth="0.2"
          filter="url(#waveGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
            repeatDelay: 1
          }}
        />
      </svg>

      {/* Sparkles along the diagonal path */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-2 h-2"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1.5, 0],
            opacity: [0, 1, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: sparkle.delay,
            repeatDelay: 2,
            ease: "easeOut"
          }}
        >
          {/* Star sparkle shape */}
          <svg viewBox="0 0 20 20" className="w-full h-full">
            <path
              d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
              fill="#93c5fd"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Additional random sparkles */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`extra-${i}`}
          className="absolute w-1 h-1 bg-blue-300 rounded-full"
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${10 + (i * 12)}%`,
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.4 + 1,
            repeatDelay: 3,
          }}
        />
      ))}
    </div>
  );
};
