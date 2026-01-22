// Corporate Design System for Nyaay Sathi
// Inspired by Harvey.ai - Professional Legal Tech Aesthetic

export const corporateTheme = {
  colors: {
    // Primary blacks and dark tones
    primaryBlack: '#000000',
    deepBlack: '#0a0a0a',
    
    // Midnight blues
    midnightBlue: '#0f172a',
    darkBlue: '#1e293b',
    slateBlue: '#334155',
    
    // Accent blues
    brightBlue: '#3b82f6',
    electricBlue: '#2563eb',
    lightBlue: '#60a5fa',
    
    // Whites and lights
    pureWhite: '#ffffff',
    offWhite: '#f8fafc',
    lightGray: '#f1f5f9',
    
    // Grays for text
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    textTertiary: '#64748b',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    blue: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    subtle: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0) 100%)',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  spacing: {
    section: '6rem',
    container: '5rem',
    card: '2rem',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

// Utility classes for consistent styling
export const corporateClasses = {
  // Page containers
  page: 'min-h-screen bg-black',
  pageGradient: 'min-h-screen bg-gradient-to-br from-black via-slate-900 to-black',
  
  // Card styles
  card: 'bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:bg-slate-900/70 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20',
  cardFloating: 'bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900/70 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/30',
  cardGlow: 'bg-slate-900/80 backdrop-blur-md border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/20',
  
  // Button styles
  buttonPrimary: 'px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5',
  buttonSecondary: 'px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700 hover:border-blue-500/50',
  buttonOutline: 'px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all duration-300',
  buttonGhost: 'px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-all duration-300',
  
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
