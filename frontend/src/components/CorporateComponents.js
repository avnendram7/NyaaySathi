import React from 'react';
import { motion } from 'framer-motion';

export const FloatingCard = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3 } 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingIcon = ({ icon: Icon, color = 'blue', size = 'md' }) => {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  const colors = {
    blue: 'from-blue-600 to-blue-500 shadow-blue-500/40',
    cyan: 'from-cyan-600 to-cyan-500 shadow-cyan-500/40',
    purple: 'from-purple-600 to-purple-500 shadow-purple-500/40',
    indigo: 'from-indigo-600 to-indigo-500 shadow-indigo-500/40',
  };

  return (
    <motion.div
      className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-xl`}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.3 } 
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-1/2 h-1/2 text-white" />
    </motion.div>
  );
};

export const GlowCard = ({ children, glowColor = 'blue', className = '' }) => {
  const glowColors = {
    blue: 'hover:shadow-blue-500/30',
    cyan: 'hover:shadow-cyan-500/30',
    purple: 'hover:shadow-purple-500/30',
    green: 'hover:shadow-green-500/30',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
      }}
      transition={{ duration: 0.3 }}
      className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl transition-all duration-300 hover:border-blue-500/50 ${glowColors[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const CorporateButton = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) => {
  const variants = {
    primary: 'px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50',
    secondary: 'px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700 hover:border-blue-500/50',
    outline: 'px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all duration-300',
    ghost: 'px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-all duration-300',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export const CorporateInput = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon className="w-5 h-5 text-slate-500" />
          </div>
        )}
        <input
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-slate-900/50 border ${
            error ? 'border-red-500/50' : 'border-slate-700'
          } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    green: 'from-green-600/20 to-green-500/10 border-green-500/30',
    purple: 'from-purple-600/20 to-purple-500/10 border-purple-500/30',
    orange: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-6 rounded-xl bg-gradient-to-br ${colors[color]} border backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${
          color === 'blue' ? 'from-blue-600 to-blue-500' :
          color === 'green' ? 'from-green-600 to-green-500' :
          color === 'purple' ? 'from-purple-600 to-purple-500' :
          'from-orange-600 to-orange-500'
        } shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${
            trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-slate-400 text-sm">{title}</p>
    </motion.div>
  );
};

export const CorporateBadge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default {
  FloatingCard,
  FloatingIcon,
  GlowCard,
  CorporateButton,
  CorporateInput,
  StatCard,
  CorporateBadge,
};
