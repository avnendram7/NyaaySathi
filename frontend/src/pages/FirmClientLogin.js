import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Mail, Lock, ArrowRight, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';
import { motion } from 'framer-motion';
import { CorporateInput, CorporateButton } from '../components/CorporateComponents';

export default function FirmClientLogin() {
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
      const response = await axios.post(`${API}/firm-clients/login`, formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userRole', 'firm_client');
      
      toast.success('Welcome back!');
      navigate('/firm-client-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center px-4">
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34, 197, 94) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all">
            <UserCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Nyaay Sathi</span>
        </Link>
        
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Firm Client Login</h2>
            <p className="text-slate-400">Track your case progress</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <CorporateInput
              label="Email Address"
              type="email"
              data-testid="firm-client-email-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="client@example.com"
              icon={Mail}
              required
            />
            
            <CorporateInput
              label="Password"
              type="password"
              data-testid="firm-client-password-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              icon={Lock}
              required
            />
            
            <CorporateButton
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
              disabled={loading}
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </CorporateButton>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have access?{' '}
              <Link to="/lawfirm-role" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Apply to join a firm
              </Link>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/lawfirm-role" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">
              Back to role selection
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}