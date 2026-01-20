import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Scale } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function UserLoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = { email: formData.email, password: formData.password, user_type: 'client' };
      const response = await axios.post(`${API}/auth/login`, payload);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Welcome back!');
      navigate('/user-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-1731-large.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Scale className="w-10 h-10 text-blue-500" />
          <span className="text-2xl font-bold">Nyaay Sathi</span>
        </Link>
        
        <div className="glass rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center">Client Login</h2>
          <p className="text-slate-400 text-center mb-6">Welcome back! Sign in to continue</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                data-testid="user-email-input"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                data-testid="user-password-input"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <Button
              data-testid="user-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full py-3 btn-primary"
            >
              {loading ? 'Please wait...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-slate-400">Don't have an account? </span>
            <Link
              data-testid="user-signup-link"
              to="/user-signup"
              className="text-blue-500 font-semibold hover:text-blue-400 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/lawyer-login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Are you a lawyer? Login here
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}