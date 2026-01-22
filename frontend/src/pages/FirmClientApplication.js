import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Building2, ArrowRight, Mail, Phone, Briefcase, FileText, User, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';
import { CorporateInput, CorporateButton } from '../components/CorporateComponents';
import { dummyLawFirms } from '../data/lawFirmsData';
import NavigationHeader from '../components/NavigationHeader';

export default function FirmClientApplication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lawFirms, setLawFirms] = useState(dummyLawFirms); // Use dummy data as default
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    company_name: '',
    case_type: 'civil',
    case_description: '',
    law_firm_id: '',
    law_firm_name: ''
  });

  useEffect(() => {
    fetchLawFirms();
  }, []);

  const fetchLawFirms = async () => {
    try {
      const response = await axios.get(`${API}/lawfirms`);
      if (response.data && response.data.length > 0) {
        // Combine API data with dummy data
        const approvedFirms = response.data.filter(firm => firm.status === 'approved');
        setLawFirms([...approvedFirms, ...dummyLawFirms]);
      }
    } catch (error) {
      console.log('Using dummy law firms data');
      // Already set to dummy data
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const selectedFirm = lawFirms.find(f => f.id === formData.law_firm_id);
      if (!selectedFirm) {
        toast.error('Please select a law firm');
        setLoading(false);
        return;
      }

      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        company_name: formData.company_name,
        case_type: formData.case_type,
        case_description: formData.case_description,
        law_firm_id: formData.law_firm_id,
        law_firm_name: selectedFirm.firm_name
      };

      await axios.post(`${API}/firm-clients/applications`, payload);
      
      toast.success('Application submitted successfully! You will receive an email once approved.');
      setTimeout(() => navigate('/lawfirm-role'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <NavigationHeader 
        backPath="/lawfirm-role"
        showBack={true}
        showHome={true}
        showLogout={false}
      />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg mb-6">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500 text-sm font-medium">Firm Client Application</span>
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4">
            Join a Law Firm as Client
          </h1>
          <p className="text-slate-400 text-lg">
            Apply to work with a law firm and get professional legal assistance
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="space-y-4">
                <CorporateInput
                  label="Full Name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="John Doe"
                  icon={User}
                  required
                />

                <CorporateInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  icon={Mail}
                  required
                />

                <CorporateInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  icon={Phone}
                  required
                />

                <CorporateInput
                  label="Company Name (Optional)"
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Your Company Ltd."
                  icon={Briefcase}
                />
              </div>
            </div>

            {/* Account Credentials */}
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-4">Account Credentials</h3>
              <p className="text-sm text-slate-400 mb-4">
                Set your password for login after approval
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter password (min 6 characters)"
                      className="w-full pl-12 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirm_password && formData.password !== formData.confirm_password && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-4">Case Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Select Law Firm
                  </label>
                  <select
                    value={formData.law_firm_id}
                    onChange={(e) => setFormData({ ...formData, law_firm_id: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    required
                  >
                    <option value="">Choose a law firm</option>
                    {lawFirms.map(firm => (
                      <option key={firm.id} value={firm.id}>
                        {firm.firm_name} - {firm.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Case Type
                  </label>
                  <select
                    value={formData.case_type}
                    onChange={(e) => setFormData({ ...formData, case_type: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    required
                  >
                    <option value="civil">Civil</option>
                    <option value="criminal">Criminal</option>
                    <option value="corporate">Corporate</option>
                    <option value="family">Family</option>
                    <option value="property">Property</option>
                    <option value="tax">Tax</option>
                    <option value="intellectual_property">Intellectual Property</option>
                    <option value="labor">Labor & Employment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Case Description
                  </label>
                  <textarea
                    value={formData.case_description}
                    onChange={(e) => setFormData({ ...formData, case_description: e.target.value })}
                    placeholder="Describe your case in detail..."
                    rows="6"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Please provide as much detail as possible to help us understand your case
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <CorporateButton
                type="submit"
                variant="primary"
                className="w-full flex items-center justify-center gap-2 py-4"
                disabled={loading}
              >
                {loading ? 'Submitting Application...' : (
                  <>
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </CorporateButton>

              <p className="text-sm text-slate-500 text-center mt-4">
                Your application will be reviewed by the law firm. You'll receive an email once approved.
              </p>
            </div>
          </form>
        </div>

        {/* Already Applied */}
        <div className="text-center mt-8">
          <p className="text-slate-400">
            Already applied?{' '}
            <button 
              onClick={() => navigate('/firm-client-login')}
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
