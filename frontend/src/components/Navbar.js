import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Scale, Menu, X, Home, Info, Sparkles, HelpCircle } from 'lucide-react';
import { useState } from 'react';

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
            <Scale className="w-8 h-8 text-blue-500" />
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
            <Link to="/contact" className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors">
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
              <Link to="/role-selection">
                <Button 
                  data-testid="login-btn"
                  className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-8 py-2 btn-primary"
                >
                  Login
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
        <div data-testid="mobile-menu" className={`md:hidden border-t transition-colors ${
          theme === 'dark' ? 'glass border-slate-800' : 'bg-white border-indigo-200'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className={`flex items-center space-x-2 py-2 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-indigo-700'
            }`}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`flex items-center space-x-2 py-2 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-indigo-700'
            }`}>
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className={`flex items-center space-x-2 py-2 transition-colors ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-indigo-700'
            }`}>
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>
            
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Button 
                    onClick={() => navigate(user.user_type === 'lawyer' ? '/lawyer-dashboard' : user.user_type === 'law_firm' ? '/lawfirm-dashboard' : '/user-dashboard')}
                    className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}>
                    Dashboard
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'border-indigo-300 text-indigo-700 hover:bg-indigo-50'
                    }`}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/role-selection" className="block">
                    <Button className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}>
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/quick-chat" className="block">
                    <Button variant="outline" className={`w-full rounded-full ${
                      theme === 'dark'
                        ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'border-indigo-300 text-indigo-700 hover:bg-indigo-50'
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