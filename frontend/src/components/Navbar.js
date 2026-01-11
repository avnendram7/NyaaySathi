import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Scale, Menu, X } from 'lucide-react';
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
            <span className="text-xl font-bold">Nyaay Sathi</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
            <Link to="/features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
            <Link to="/for-clients" className="text-slate-300 hover:text-white transition-colors">For Clients</Link>
            <Link to="/for-lawyers" className="text-slate-300 hover:text-white transition-colors">For Lawyers</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
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
              <>
                <Link to="/user-login">
                  <Button 
                    data-testid="client-login-btn"
                    variant="outline"
                    className="border-slate-700 text-slate-200 hover:bg-slate-800 rounded-full px-6 py-2"
                  >
                    Client Login
                  </Button>
                </Link>
                <Link to="/lawyer-login">
                  <Button 
                    data-testid="lawyer-login-btn"
                    className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-6 py-2 btn-primary"
                  >
                    Lawyer Login
                  </Button>
                </Link>
              </>
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
            <Link to="/" className="block text-slate-300 hover:text-white py-2">Home</Link>
            <Link to="/about" className="block text-slate-300 hover:text-white py-2">About</Link>
            <Link to="/how-it-works" className="block text-slate-300 hover:text-white py-2">How It Works</Link>
            <Link to="/features" className="block text-slate-300 hover:text-white py-2">Features</Link>
            <Link to="/for-clients" className="block text-slate-300 hover:text-white py-2">For Clients</Link>
            <Link to="/for-lawyers" className="block text-slate-300 hover:text-white py-2">For Lawyers</Link>
            <Link to="/contact" className="block text-slate-300 hover:text-white py-2">Contact</Link>
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Button 
                    onClick={() => navigate(user.user_type === 'lawyer' ? '/lawyer-dashboard' : '/user-dashboard')}
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
                  <Link to="/user-login" className="block">
                    <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 rounded-full">
                      Client Login
                    </Button>
                  </Link>
                  <Link to="/lawyer-login" className="block">
                    <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full">
                      Lawyer Login
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