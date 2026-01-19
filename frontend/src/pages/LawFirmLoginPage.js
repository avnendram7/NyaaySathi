import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Building2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function LawFirmLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    firm_name: '',
    phone: ''
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password, user_type: 'law_firm' }
        : { ...formData, user_type: 'law_firm' };
      
      const response = await axios.post(`${API}${endpoint}`, payload);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success(isLogin ? 'Welcome back!' : 'Law firm account created successfully!');
      navigate('/lawfirm-dashboard');
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
        <source src="https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-modern-office-4345-large.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <Link to="/role-selection" className="flex items-center justify-center space-x-2 mb-8">
          <Building2 className="w-10 h-10 text-blue-500" />
          <span className="text-2xl font-bold">Nyaay Sathi</span>
        </Link>
        
        <div className="glass rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center">
            {isLogin ? 'Law Firm Login' : 'Register Your Firm'}
          </h2>
          <p className="text-slate-400 text-center mb-6">
            {isLogin ? 'Welcome back! Sign in to continue' : 'Join our network of legal firms'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Firm Name</label>
                  <Input
                    data-testid="lawfirm-firmname-input"
                    type="text"
                    value={formData.firm_name}
                    onChange={(e) => setFormData({ ...formData, firm_name: e.target.value })}
                    placeholder="Your law firm name"
                    required
                    className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Person Name</label>
                  <Input
                    data-testid="lawfirm-fullname-input"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Contact person full name"
                    required
                    className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                data-testid="lawfirm-email-input"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="firm@example.com"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  data-testid="lawfirm-phone-input"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  required={!isLogin}
                  className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                data-testid="lawfirm-password-input"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <Button
              data-testid="lawfirm-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full py-3 btn-primary"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-slate-400">Don't have an account? </span>
            <Link
              data-testid="lawfirm-signup-link"
              to="/role-selection"
              className="text-blue-500 font-semibold hover:text-blue-400 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/role-selection" className="text-sm text-slate-400 hover:text-white transition-colors">
              Choose a different role
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