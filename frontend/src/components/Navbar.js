import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Scale, Menu, X, Home, Info, Sparkles, HelpCircle, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const { theme, toggleTheme } = useTheme();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
      theme === 'dark' 
        ? 'glass border-slate-800/50' 
        : 'bg-white/90 backdrop-blur-md border-indigo-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-500' : 'text-indigo-600'}`} />
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-950'}`}>Nyaay Sathi</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`flex items-center space-x-1 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-indigo-700'
            }`}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`flex items-center space-x-1 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-indigo-700'
            }`}>
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className={`flex items-center space-x-1 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-indigo-700'
            }`}>
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>
          </div>
          
          {/* Auth Buttons + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {user ? (
              <>
                <Button 
                  data-testid="dashboard-btn"
                  onClick={() => navigate(user.user_type === 'lawyer' ? '/lawyer-dashboard' : '/user-dashboard')}
                  className={`rounded-full px-6 py-2 ${
                    theme === 'dark'
                      ? 'bg-blue-700 hover:bg-blue-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  Dashboard
                </Button>
                <Button 
                  data-testid="logout-btn"
                  onClick={handleLogout}
                  variant="outline"
                  className={`rounded-full px-6 py-2 ${
                    theme === 'dark'
                      ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'border-indigo-300 text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/role-selection">
                <Button 
                  data-testid="login-btn"
                  className={`rounded-full px-8 py-2 btn-primary ${
                    theme === 'dark'
                      ? 'bg-blue-700 hover:bg-blue-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className={theme === 'dark' ? 'md:hidden text-white' : 'md:hidden text-slate-900'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div data-testid="mobile-menu" className={`md:hidden border-t transition-colors ${
          theme === 'dark' ? 'glass border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className={`flex items-center space-x-2 py-2 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`flex items-center space-x-2 py-2 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}>
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className={`flex items-center space-x-2 py-2 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}>
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>
            
            {/* Theme Toggle in Mobile */}
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-2 py-2 transition-colors ${
                theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Button 
                    onClick={() => navigate(user.user_type === 'lawyer' ? '/lawyer-dashboard' : user.user_type === 'law_firm' ? '/lawfirm-dashboard' : '/user-dashboard')}
                    className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/role-selection" className="block">
                    <Button className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}>
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/quick-chat" className="block">
                    <Button variant="outline" className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}>
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