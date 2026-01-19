import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

export const RotatingGlobe = () => {
  // Connection points representing global network (latitude/longitude style positions)
  const connectionPoints = [
    { x: 100, y: 40, id: 1 },   // North
    { x: 140, y: 80, id: 2 },   // East
    { x: 100, y: 120, id: 3 },  // South
    { x: 60, y: 80, id: 4 },    // West
    { x: 120, y: 60, id: 5 },   // NE
    { x: 120, y: 100, id: 6 },  // SE
    { x: 80, y: 100, id: 7 },   // SW
    { x: 80, y: 60, id: 8 },    // NW
  ];

  // Generate connection lines between points
  const connections = [
    { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 1 },
    { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 }, { from: 4, to: 8 },
    { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 }, { from: 8, to: 5 },
  ];

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 blur-3xl opacity-60">
        <div className="w-full h-full bg-blue-600 rounded-full animate-pulse" />
      </div>
      
      {/* Main rotating globe sphere with latitude lines */}
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
            <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#globeGrad)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          
          {/* Latitude lines */}
          <ellipse cx="100" cy="100" rx="85" ry="20" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.4" />
          <ellipse cx="100" cy="100" rx="85" ry="40" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.4" />
          <ellipse cx="100" cy="100" rx="85" ry="60" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.4" />
        </svg>
      </motion.div>
      
      {/* Longitude lines - vertical rotation */}
      <motion.div
        className="absolute w-64 h-64"
        animate={{ rotateX: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg className="w-full h-full opacity-50" viewBox="0 0 200 200">
          {/* Vertical longitude lines */}
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="50" ry="80" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="70" ry="80" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
        </svg>
      </motion.div>
      
      {/* Network connection lines - Global connectivity */}
      <motion.div
        className="absolute w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Draw connection lines */}
          {connections.map((conn, index) => {
            const from = connectionPoints.find(p => p.id === conn.from);
            const to = connectionPoints.find(p => p.id === conn.to);
            return (
              <motion.line
                key={index}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="url(#connectionGrad)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Connection nodes/points */}
          {connectionPoints.map((point) => (
            <motion.circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#60a5fa"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: point.id * 0.15,
              }}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Orbiting data packets */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
            style={{
              transformOrigin: '100px 100px',
              left: '50%',
              top: '50%',
            }}
          >
            <div 
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              style={{
                transform: `rotate(${angle}deg) translate(90px)`,
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Pulsing rings indicating signal/connectivity */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute inset-0 rounded-full border border-blue-400"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.4, 1.6],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Central logo with connectivity icon */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center border-4 border-blue-400/40 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Inner network pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern id="network" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#60a5fa" />
                <line x1="10" y1="10" x2="20" y2="10" stroke="#60a5fa" strokeWidth="0.5" />
                <line x1="10" y1="10" x2="10" y2="20" stroke="#60a5fa" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#network)" />
            </svg>
          </div>
          
          {/* Scale icon */}
          <Scale className="w-20 h-20 text-white relative z-10" strokeWidth={1.5} />
          
          {/* Subtle pulse overlay */}
          <motion.div
            className="absolute inset-0 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
      {/* Rotating gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};
