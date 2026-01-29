import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, User, Mail, Phone, Lock, MapPin, Briefcase, GraduationCap, Languages, IndianRupee, FileText, Camera, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

const states = ["Delhi", "Uttar Pradesh", "Haryana", "Maharashtra"];
const citiesByState = {
  "Delhi": ["New Delhi"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Varanasi"],
  "Haryana": ["Gurugram", "Chandigarh", "Faridabad"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"]
};
const courtsByState = {
  "Delhi": ["Delhi High Court", "Tis Hazari Courts", "Saket District Court", "Patiala House Court"],
  "Uttar Pradesh": ["Allahabad High Court", "District Court Lucknow", "Gautam Budh Nagar District Court"],
  "Haryana": ["Punjab & Haryana High Court", "Gurugram District Court", "Faridabad District Court"],
  "Maharashtra": ["Bombay High Court", "Pune District Court", "NCLT Mumbai"]
};
const specializations = [
  "Criminal Law", "Family Law", "Property Law", "Corporate Law", "Civil Law",
  "Cyber Law", "Tax Law", "Labour Law", "Constitutional Law", "Consumer Law",
  "Banking Law", "Immigration Law", "Intellectual Property", "Medical Negligence", "Environmental Law"
];
const languageOptions = ["Hindi", "English", "Marathi", "Punjabi", "Gujarati", "Tamil", "Telugu", "Bengali", "Kannada", "Malayalam", "Urdu"];

export default function LawyerApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    photo: '',
    
    // Professional Info
    barCouncilNumber: '',
    specialization: '',
    experience: '',
    casesWon: '',
    
    // Location
    state: '',
    city: '',
    court: '',
    
    // Additional Info
    education: '',
    languages: [],
    feeMin: '',
    feeMax: '',
    bio: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (lang) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const validateStep = (stepNum) => {
    if (stepNum === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        toast.error('Please fill all required fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }
    }
    if (stepNum === 2) {
      if (!formData.barCouncilNumber || !formData.specialization || !formData.experience) {
        toast.error('Please fill all required fields');
        return false;
      }
    }
    if (stepNum === 3) {
      if (!formData.state || !formData.city || !formData.court) {
        toast.error('Please select your location details');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.education || formData.languages.length === 0 || !formData.bio) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/lawyer-applications`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        photo: formData.photo || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`,
        bar_council_number: formData.barCouncilNumber,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
        cases_won: parseInt(formData.casesWon) || 0,
        state: formData.state,
        city: formData.city,
        court: formData.court,
        education: formData.education,
        languages: formData.languages,
        fee_range: `₹${formData.feeMin} - ₹${formData.feeMax}`,
        bio: formData.bio
      });
      
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
          <p className="text-slate-400 mb-6">
            Thank you for applying to join Lxwyer Up. Our team will review your application and get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            You will receive an email at <span className="text-blue-400">{formData.email}</span> once your application is approved.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-500 rounded-full px-8"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/role-selection')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-purple-500" />
            <span className="font-semibold text-white">Lxwyer Up</span>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                s === step ? 'bg-purple-600 text-white' :
                s < step ? 'bg-green-600 text-white' :
                'bg-slate-800 text-slate-500'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && (
                <div className={`w-16 h-1 mx-2 rounded ${
                  s < step ? 'bg-green-600' : 'bg-slate-800'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
        >
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                <p className="text-slate-400">Let's start with your basic details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Adv. Rajesh Kumar"
                      className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="advocate@example.com"
                      className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Profile Photo URL (Optional)</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      value={formData.photo}
                      onChange={(e) => updateField('photo', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Professional Details</h2>
                <p className="text-slate-400">Tell us about your legal practice</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Bar Council Registration Number *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      value={formData.barCouncilNumber}
                      onChange={(e) => updateField('barCouncilNumber', e.target.value)}
                      placeholder="D/1234/2015"
                      className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Specialization *</label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => updateField('specialization', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="">Select your specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Years of Experience *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => updateField('experience', e.target.value)}
                        placeholder="10"
                        className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Cases Won (Approx)</label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input
                        type="number"
                        value={formData.casesWon}
                        onChange={(e) => updateField('casesWon', e.target.value)}
                        placeholder="150"
                        className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Practice Location</h2>
                <p className="text-slate-400">Where do you practice law?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => {
                      updateField('state', e.target.value);
                      updateField('city', '');
                      updateField('court', '');
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {formData.state && citiesByState[formData.state]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Primary Court *</label>
                  <select
                    value={formData.court}
                    onChange={(e) => updateField('court', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    disabled={!formData.state}
                  >
                    <option value="">Select Court</option>
                    {formData.state && courtsByState[formData.state]?.map(court => (
                      <option key={court} value={court}>{court}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Additional Info */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Additional Information</h2>
                <p className="text-slate-400">Complete your profile</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Education & Qualifications *</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <Input
                      value={formData.education}
                      onChange={(e) => updateField('education', e.target.value)}
                      placeholder="LLB from Delhi University, LLM from NLS"
                      className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Languages *</label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          formData.languages.includes(lang)
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Consultation Fee Range *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input
                        type="number"
                        value={formData.feeMin}
                        onChange={(e) => updateField('feeMin', e.target.value)}
                        placeholder="Min (e.g., 3000)"
                        className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                      />
                    </div>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input
                        type="number"
                        value={formData.feeMax}
                        onChange={(e) => updateField('feeMax', e.target.value)}
                        placeholder="Max (e.g., 10000)"
                        className="pl-10 bg-slate-800 border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Professional Bio *</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    placeholder="Write a brief description about your practice, expertise, and achievements..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-full px-6"
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-500 rounded-full px-8"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Info Note */}
        <p className="text-center text-slate-500 text-sm mt-6">
          By submitting, you agree to our verification process. Applications are typically reviewed within 24-48 hours.
        </p>
      </div>
    </div>
  );
}
