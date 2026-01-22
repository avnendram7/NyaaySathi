import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Scale, Menu, X, Home, Info, Sparkles, HelpCircle, LogIn } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Nyaay Sathi</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors">
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/how-it-works" className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  data-testid="dashboard-btn"
                  onClick={() => navigate(user.user_type === 'lawyer' ? '/lawyer-dashboard' : '/user-dashboard')}
                  className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-6 py-2"
                >
                  Dashboard
                </Button>
                <Button 
                  data-testid="logout-btn"
                  onClick={handleLogout}
                  variant="outline"
                  className="border-slate-700 text-slate-200 hover:bg-slate-800 rounded-full px-6 py-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/role-selection?mode=login" className="relative group">
                <Button 
                  data-testid="login-btn"
                  className="relative bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-2 flex items-center space-x-2 border border-blue-500/50 overflow-hidden shadow-lg shadow-blue-500/20"
                >
                  {/* Glowing light effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Floating light orbs */}
                  <motion.div
                    className="absolute w-10 h-10 bg-blue-400/40 rounded-full blur-lg"
                    animate={{
                      x: [-30, 70, -30],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute w-6 h-6 bg-cyan-400/50 rounded-full blur-md"
                    animate={{
                      x: [60, -20, 60],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <LogIn className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 font-semibold">Login</span>
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div data-testid="mobile-menu" className="md:hidden glass border-t border-slate-800">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="flex items-center space-x-2 text-slate-300 hover:text-white py-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-slate-300 hover:text-white py-2">
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/how-it-works" className="flex items-center space-x-2 text-slate-300 hover:text-white py-2">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Button 
                    onClick={() => navigate(user.user_type === 'lawyer' ? '/lawyer-dashboard' : user.user_type === 'law_firm' ? '/lawfirm-dashboard' : '/user-dashboard')}
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 rounded-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/role-selection" className="block">
                    <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/quick-chat" className="block">
                    <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 rounded-full">
                      AI Chat
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};