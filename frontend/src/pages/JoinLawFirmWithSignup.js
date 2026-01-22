import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, CreditCard, Check, ArrowRight, Shield, Lock, Building2, Star, ArrowLeft, Users, Award } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function JoinLawFirmWithSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const selectedFirm = location.state?.firm || null;

  const [signupData, setSignupData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    case_type: 'civil'
  });

  const [caseDetails, setCase Details] = useState({
    description: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const caseTypes = [
    { value: 'civil', label: 'Civil Law' },
    { value: 'criminal', label: 'Criminal Law' },
    { value: 'family', label: 'Family Law' },
    { value: 'corporate', label: 'Corporate Law' },
    { value: 'property', label: 'Property Law' }
  ];

  useEffect(() => {
    if (!selectedFirm) {
      toast.error('Please select a law firm first');
      navigate('/find-lawfirm/manual');
    }
  }, [selectedFirm, navigate]);

  if (!selectedFirm) return null;

  const consultationFee = selectedFirm.consultation_fee || 2999;

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (!signupData.full_name || !signupData.email || !signupData.phone || !signupData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setStep(2); // Move to case details
  };

  const handleCaseDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Move to payment
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create user account
      const userPayload = {
        ...signupData,
        user_type: 'client'
      };
      
      const signupResponse = await axios.post(`${API}/auth/signup`, userPayload);
      
      // Store token
      localStorage.setItem('token', signupResponse.data.token);
      localStorage.setItem('user', JSON.stringify(signupResponse.data.user));

      // Create firm client application
      const applicationPayload = {
        law_firm_id: selectedFirm.id,
        law_firm_name: selectedFirm.firm_name,
        case_type: signupData.case_type,
        description: caseDetails.description,
        status: 'approved', // Auto-approve after payment
        payment_amount: consultationFee,
        payment_status: 'paid'
      };

      await axios.post(`${API}/firm-clients/apply`, applicationPayload, {
        headers: { Authorization: `Bearer ${signupResponse.data.token}` }
      });

      toast.success('Account created and payment successful!');
      setStep(4); // Success
      
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.detail?.includes('already exists')) {
        toast.error('Email already registered. Please login instead.');
      } else {
        toast.error(error.response?.data?.detail || 'Process failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFirmClientLogin = () => {
    navigate('/firm-client-login', { 
      state: { 
        message: 'Login to view your case details and updates from the law firm',
        email: signupData.email
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                  {step > num ? <Check className="w-6 h-6" /> : num}
                </div>
                {num < 4 && (
                  <div className={`w-20 h-1 mx-2 transition-all ${
                    step > num ? 'bg-blue-600' : 'bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm text-slate-400 gap-16">
            <span className={step === 1 ? 'text-blue-400 font-semibold' : ''}>Signup</span>
            <span className={step === 2 ? 'text-blue-400 font-semibold' : ''}>Case Details</span>
            <span className={step === 3 ? 'text-blue-400 font-semibold' : ''}>Payment</span>
            <span className={step === 4 ? 'text-blue-400 font-semibold' : ''}>Done</span>
          </div>
        </div>

        {/* Selected Law Firm Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-sm font-medium text-slate-400 mb-3">Selected Law Firm</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">{selectedFirm.firm_name}</h4>
              <p className="text-blue-400 text-sm">{selectedFirm.city}, {selectedFirm.state}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {selectedFirm.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {selectedFirm.total_lawyers}+ lawyers
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Since {selectedFirm.established_year}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Consultation Fee</p>
              <p className="text-2xl font-bold text-white">₹{consultationFee}</p>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Signup */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
            <p className="text-slate-400 mb-8">Sign up to join {selectedFirm.firm_name}</p>

            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={signupData.full_name}
                    onChange={(e) => setSignupData({ ...signupData, full_name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Case Type</label>
                <select
                  value={signupData.case_type}
                  onChange={(e) => setSignupData({ ...signupData, case_type: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {caseTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Continue to Case Details
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/firm-client-login', { state: { firm: selectedFirm } })}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Login
                </button>
              </p>
            </form>
          </motion.div>
        )}

        {/* Step 2: Case Details - Continue in next part due to length */}
