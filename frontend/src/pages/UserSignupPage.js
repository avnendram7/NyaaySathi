import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Scale, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function UserSignupPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the lawyer info if redirected from booking
  const bookingLawyer = location.state?.bookingLawyer;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone || null,
        user_type: 'client'
      };
      
      const response = await axios.post(`${API}/auth/register`, payload);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Account created successfully! Welcome to Nyaay Sathi.');
      
      // If they were trying to book a consultation, redirect to dashboard with lawyer info
      if (bookingLawyer) {
        navigate('/user-dashboard', { state: { bookingLawyer } });
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed. Please try again.');
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
      
      {/* Signup Form */}
      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Scale className="w-10 h-10 text-blue-500" />
          <span className="text-2xl font-bold">Nyaay Sathi</span>
        </Link>
        
        <div className="glass rounded-3xl p-8">
          {bookingLawyer && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-blue-400 text-sm">
                Sign up to book consultation with <strong>{bookingLawyer.name}</strong>
              </p>
            </div>
          )}
          
          <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
          <p className="text-slate-400 text-center mb-6">
            Join Nyaay Sathi to connect with lawyers
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <Input
                data-testid="signup-fullname-input"
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                data-testid="signup-email-input"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
              <Input
                data-testid="signup-phone-input"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password *</label>
              <Input
                data-testid="signup-password-input"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Min 6 characters"
                required
                minLength={6}
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password *</label>
              <Input
                data-testid="signup-confirm-password-input"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                required
                className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
              />
            </div>
            
            <Button
              data-testid="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full py-3 btn-primary"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-slate-400">Already have an account? </span>
            <Link
              data-testid="login-link"
              to="/user-login"
              className="text-blue-500 font-semibold hover:text-blue-400 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/find-lawyer" className="text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Find Lawyer
          </Link>
        </div>
      </div>
    </div>
  );
}
