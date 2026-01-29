import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, User, Phone, Mail, MapPin, FileText, Users, CheckCircle, ArrowRight, ArrowLeft, Briefcase, Globe, Shield, Scale } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

const SimpleNavbar = ({ navigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2">
            <Scale className="w-6 h-6 text-[#0F2944]" />
            <span className="text-xl font-bold text-[#0F2944]">Lxwyer Up</span>
          </button>
          
          <button
            onClick={() => navigate('/lawfirm-role')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0F2944] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    </nav>
  );
};

export default function LawFirmApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firm_name: '',
    registration_number: '',
    established_year: '',
    website: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_designation: '',
    password: '',
    confirm_password: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    practice_areas: [],
    total_lawyers: '',
    total_staff: '',
    description: '',
    achievements: ''
  });

  const states = [
    "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat",
    "Uttar Pradesh", "Haryana", "West Bengal", "Telangana", "Rajasthan",
    "Punjab", "Kerala"
  ];

  const practiceAreas = [
    "Criminal Law", "Family Law", "Property Law", "Corporate Law",
    "Civil Law", "Tax Law", "Labour Law", "Intellectual Property",
    "Banking Law", "Consumer Law", "Immigration Law", "Environmental Law"
  ];

  const handlePracticeAreaToggle = (area) => {
    setFormData(prev => ({
      ...prev,
      practice_areas: prev.practice_areas.includes(area)
        ? prev.practice_areas.filter(a => a !== area)
        : [...prev.practice_areas, area]
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.firm_name || !formData.registration_number || !formData.established_year) {
          toast.error('Please fill all required fields');
          return false;
        }
        break;
      case 2:
        if (!formData.contact_name || !formData.contact_email || !formData.contact_phone || !formData.password) {
          toast.error('Please fill all required fields');
          return false;
        }
        if (formData.password !== formData.confirm_password) {
          toast.error('Passwords do not match');
          return false;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          return false;
        }
        break;
      case 3:
        if (!formData.city || !formData.state || formData.practice_areas.length === 0) {
          toast.error('Please fill location and select at least one practice area');
          return false;
        }
        break;
      case 4:
        if (!formData.total_lawyers || !formData.description) {
          toast.error('Please fill all required fields');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    try {
      await axios.post(`${API}/lawfirm-applications`, {
        firm_name: formData.firm_name,
        registration_number: formData.registration_number,
        established_year: parseInt(formData.established_year),
        website: formData.website,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        contact_designation: formData.contact_designation,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        practice_areas: formData.practice_areas,
        total_lawyers: parseInt(formData.total_lawyers),
        total_staff: parseInt(formData.total_staff) || 0,
        description: formData.description,
        achievements: formData.achievements
      });
      
      toast.success('Application submitted successfully! We will review and get back to you.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, title: 'Firm Details', icon: Building2 },
    { num: 2, title: 'Contact Person', icon: User },
    { num: 3, title: 'Location & Practice', icon: MapPin },
    { num: 4, title: 'Firm Info', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <SimpleNavbar navigate={navigate} />

      <div className="pt-24 pb-12 max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F2944] mb-3">Register Your Law Firm</h1>
          <p className="text-gray-600">Join India's leading legal platform and grow your practice</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex items-center">
                <div className={`flex flex-col items-center ${idx !== steps.length - 1 ? 'flex-1' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= s.num
                      ? 'bg-[#0F2944] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs mt-2 ${step >= s.num ? 'text-[#0F2944] font-medium' : 'text-gray-500'}`}>
                    {s.title}
                  </span>
                </div>
                {idx !== steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${step > s.num ? 'bg-[#0F2944]' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Firm Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Building2 className="w-8 h-8 text-[#0F2944]" />
                  <h2 className="text-2xl font-bold text-[#0F2944]">Firm Details</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">Firm Name *</label>
                  <Input
                    data-testid="firm-name-input"
                    value={formData.firm_name}
                    onChange={(e) => setFormData({ ...formData, firm_name: e.target.value })}
                    placeholder="e.g., Sharma & Associates"
                    className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">Registration Number *</label>
                  <Input
                    data-testid="registration-number-input"
                    value={formData.registration_number}
                    onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                    placeholder="Bar Council Registration Number"
                    className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Established Year *</label>
                    <Input
                      data-testid="established-year-input"
                      type="number"
                      value={formData.established_year}
                      onChange={(e) => setFormData({ ...formData, established_year: e.target.value })}
                      placeholder="e.g., 2010"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Website (Optional)</label>
                    <Input
                      data-testid="website-input"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourfirm.com"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact Person */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-8 h-8 text-[#0F2944]" />
                  <h2 className="text-2xl font-bold text-[#0F2944]">Contact Person</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Full Name *</label>
                    <Input
                      data-testid="contact-name-input"
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      placeholder="Contact person name"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Designation</label>
                    <Input
                      data-testid="contact-designation-input"
                      value={formData.contact_designation}
                      onChange={(e) => setFormData({ ...formData, contact_designation: e.target.value })}
                      placeholder="e.g., Managing Partner"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">Email *</label>
                  <Input
                    data-testid="contact-email-input"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    placeholder="contact@yourfirm.com"
                    className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">Phone *</label>
                  <Input
                    data-testid="contact-phone-input"
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Password *</label>
                    <Input
                      data-testid="firm-password-input"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Confirm Password *</label>
                    <Input
                      data-testid="firm-confirm-password-input"
                      type="password"
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                      placeholder="Re-enter password"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location & Practice */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-8 h-8 text-[#0F2944]" />
                  <h2 className="text-2xl font-bold text-[#0F2944]">Location & Practice Areas</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">Office Address</label>
                  <Input
                    data-testid="firm-address-input"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full office address"
                    className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">State *</label>
                    <select
                      data-testid="firm-state-select"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F2944]/20 focus:border-[#0F2944]"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">City *</label>
                    <Input
                      data-testid="firm-city-input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Pincode</label>
                    <Input
                      data-testid="firm-pincode-input"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="110001"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-3">Practice Areas * (Select all that apply)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {practiceAreas.map(area => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handlePracticeAreaToggle(area)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          formData.practice_areas.includes(area)
                            ? 'bg-[#0F2944] text-white border-[#0F2944]'
                            : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        } border`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Firm Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="w-8 h-8 text-[#0F2944]" />
                  <h2 className="text-2xl font-bold text-[#0F2944]">Firm Information</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Total Lawyers *</label>
                    <Input
                      data-testid="total-lawyers-input"
                      type="number"
                      value={formData.total_lawyers}
                      onChange={(e) => setFormData({ ...formData, total_lawyers: e.target.value })}
                      placeholder="Number of lawyers"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2944] mb-2">Total Staff</label>
                    <Input
                      data-testid="total-staff-input"
                      type="number"
                      value={formData.total_staff}
                      onChange={(e) => setFormData({ ...formData, total_staff: e.target.value })}
                      placeholder="Support staff count"
                      className="bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">About Your Firm *</label>
                  <textarea
                    data-testid="firm-description-input"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your firm's expertise, values, and approach..."
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#0F2944]/20 focus:border-[#0F2944]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2944] mb-2">Key Achievements (Optional)</label>
                  <textarea
                    data-testid="firm-achievements-input"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="Notable cases won, awards, recognitions..."
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#0F2944]/20 focus:border-[#0F2944]"
                  />
                </div>

                <div className="bg-[#0F2944]/10 border border-[#0F2944]/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-[#0F2944] mt-0.5" />
                    <div>
                      <p className="text-[#0F2944] font-semibold">Verification Process</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Your application will be reviewed by our team. You'll receive an email once approved.
                        After approval, you can login and manage your firm on Lxwyer Up.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button
                data-testid="firm-back-btn"
                onClick={handleBack}
                variant="outline"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <Link to="/lawfirm-role">
                <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl px-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>
            )}

            {step < 4 ? (
              <Button
                data-testid="firm-next-btn"
                onClick={handleNext}
                className="bg-[#0F2944] hover:bg-[#0F2944]/90 text-white rounded-xl px-6"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                data-testid="firm-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#0F2944] hover:bg-[#0F2944]/90 text-white rounded-xl px-8"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </div>

        {/* Already have account */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Already registered? </span>
          <Link to="/lawfirm-login" className="text-[#0F2944] hover:underline font-semibold">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
