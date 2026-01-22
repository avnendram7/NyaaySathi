import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Mail, Phone, Building2, FileText, ArrowRight, Briefcase, User } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';
import { motion } from 'framer-motion';
import { CorporateInput, CorporateButton } from '../components/CorporateComponents';

export default function FirmClientApplication() {
  const [loading, setLoading] = useState(false);
  const [lawFirms, setLawFirms] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    case_type: '',
    case_description: '',
    law_firm_id: '',
    law_firm_name: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchLawFirms();
  }, []);

  const fetchLawFirms = async () => {
    try {
      const response = await axios.get(`${API}/lawfirms/all`);
      setLawFirms(response.data || []);
    } catch (error) {
      console.error('Error fetching law firms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/firm-clients/applications`, formData);
      toast.success('Application submitted successfully! Wait for approval from the law firm.');
      navigate('/lawfirm-role');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const caseTypes = [
    'Civil Law',
    'Criminal Law',
    'Corporate Law',
    'Family Law',
    'Property Law',
    'Tax Law',
    'Labour Law',
    'Intellectual Property',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black py-12 px-4">
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34, 197, 94) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <Link to="/lawfirm-role" className="flex items-center justify-center space-x-3 mb-8 group">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Nyaay Sathi</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
                <User className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">Client Application</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Apply to Join a Law Firm</h2>
              <p className="text-slate-400">Fill in your details to get started with professional legal services</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-green-400" />
                  Personal Information
                </h3>

                <CorporateInput
                  label="Full Name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="John Doe"
                  icon={User}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
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
                    placeholder="+91 9876543210"
                    icon={Phone}
                    required
                  />
                </div>

                <CorporateInput
                  label="Company Name (Optional)"
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Your Company Name"
                  icon={Briefcase}
                />
              </div>

              {/* Law Firm Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-400" />
                  Select Law Firm
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Choose Law Firm
                  </label>
                  <select
                    value={formData.law_firm_id}
                    onChange={(e) => {
                      const selectedFirm = lawFirms.find(f => f.id === e.target.value);
                      setFormData({
                        ...formData,
                        law_firm_id: e.target.value,
                        law_firm_name: selectedFirm ? selectedFirm.firm_name : ''
                      });
                    }}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    required
                  >
                    <option value="">Select a law firm</option>
                    {lawFirms.map((firm) => (
                      <option key={firm.id} value={firm.id}>
                        {firm.firm_name} - {firm.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Case Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  Case Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Case Type
                  </label>
                  <select
                    value={formData.case_type}
                    onChange={(e) => setFormData({ ...formData, case_type: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    required
                  >
                    <option value="">Select case type</option>
                    {caseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Case Description
                  </label>
                  <textarea
                    value={formData.case_description}
                    onChange={(e) => setFormData({ ...formData, case_description: e.target.value })}
                    placeholder="Describe your legal matter in detail..."
                    rows="6"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
                    required
                  />
                </div>
              </div>

              <CorporateButton
                type="submit"
                variant="primary"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
                disabled={loading}
              >
                {loading ? 'Submitting...' : (
                  <>
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </CorporateButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Already approved?{' '}
                <Link to="/firm-client-login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
