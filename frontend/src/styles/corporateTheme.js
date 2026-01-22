// Harvey.ai Inspired Design System
// Dark, Professional, Minimal

export const corporateTheme = {
  colors: {
    // Backgrounds
    primaryBlack: '#000000',
    darkSlate: '#0f172a',
    cardDark: '#1e293b',
    
    // Single accent color
    accentBlue: '#3b82f6',
    accentBlueHover: '#2563eb',
    
    // Text colors
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    
    // Borders
    borderSubtle: '#334155',
    borderLight: '#475569',
    
    // Status (minimal use)
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  
  shadows: {
    subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    hover: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
  },
};

// Harvey-style utility classes
export const corporateClasses = {
  // Page
  page: 'min-h-screen bg-black',
  
  // Cards - simple, clean, no glow
  card: 'bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-300',
  cardHover: 'bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300',
  
  // Buttons - solid, no gradients
  buttonPrimary: 'px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors duration-200',
  buttonSecondary: 'px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors duration-200',
  buttonOutline: 'px-6 py-3 border border-slate-700 hover:border-blue-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200',
  
  // Input styles
  input: 'w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300',
  inputError: 'w-full px-4 py-3 bg-slate-900/50 border-2 border-red-500/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20',
  
  // Text styles
  textPrimary: 'text-white',
  textSecondary: 'text-slate-400',
  textAccent: 'text-blue-500',
  heading: 'text-white font-bold',
  subheading: 'text-slate-300 font-semibold',
  
  // Container styles
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerTight: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
  containerNarrow: 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Grid styles
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  gridWide: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
  
  // Badge styles
  badge: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
  badgeSuccess: 'bg-green-500/20 text-green-400 border border-green-500/30',
  badgeWarning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  badgeError: 'bg-red-500/20 text-red-400 border border-red-500/30',
  badgeInfo: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  
  // Icon container
  iconContainer: 'w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30',
  iconContainerLarge: 'w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-xl shadow-blue-500/40',
};

export default corporateTheme;
