import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bot, MapPin, Building2, Gavel, Scale, Star, Briefcase, Phone, ArrowRight, MessageSquare, User, ChevronDown, X, Send, Loader2, Shield, Users, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { lawyers, indianLocations, courtsByState, caseTypes } from '../data/lawyers';
import axios from 'axios';
import { API } from '../App';

export default function FindLawyer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null); // 'manual' or 'ai'
  
  // Manual search state
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // AI Chat state
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI legal assistant. I'll help you find the right lawyer for your case. To get started, could you please tell me:\n\n1. Which state/city are you located in?\n2. What kind of legal issue are you facing?\n\nFeel free to describe your situation in detail." }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecommendedLawyers, setAiRecommendedLawyers] = useState([]);
  const [showAiResults, setShowAiResults] = useState(false);
  
  // Lawyer profile modal
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  // Get cities based on selected state
  const getCities = () => {
    if (!selectedState) return [];
    return indianLocations[selectedState] || [];
  };

  // Get courts based on selected state
  const getCourts = () => {
    if (!selectedState) return [];
    return courtsByState[selectedState] || [];
  };

  // Manual search function
  const handleManualSearch = () => {
    let results = [...lawyers];
    
    if (selectedState) {
      results = results.filter(l => l.state === selectedState);
    }
    if (selectedCity) {
      results = results.filter(l => l.city === selectedCity);
    }
    if (selectedCaseType) {
      results = results.filter(l => l.specialization === selectedCaseType);
    }
    
    // If no filters, show all
    if (!selectedState && !selectedCity && !selectedCaseType) {
      results = lawyers;
    }
    
    setFilteredLawyers(results);
    setShowResults(true);
  };

  // AI Chat function
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build context for AI
      const lawyerContext = lawyers.map(l => 
        `${l.name} - ${l.specialization} - ${l.city}, ${l.state} - ${l.experience} years exp - Rating: ${l.rating}`
      ).join('\n');

      const systemPrompt = `You are a helpful legal assistant for Nyaay Sathi, an Indian legal tech platform. Your job is to:
1. Understand the user's legal problem
2. Ask clarifying questions about their location (state/city) and case details
3. Identify the type of lawyer they need
4. Once you have enough information, recommend suitable lawyers from our database

Available lawyers:
${lawyerContext}

Based on the conversation, when you're ready to recommend lawyers:
1. Identify the case type (Criminal, Family, Property, Civil, Corporate, etc.)
2. Consider the user's location
3. Recommend 2-3 best matching lawyers with brief explanations

Always be empathetic and professional. If the user's issue is urgent, acknowledge that.
When recommending lawyers, format them clearly with name, specialization, location, and why they're a good match.

If you identify lawyers to recommend, end your response with: [RECOMMEND: lawyer_ids] where lawyer_ids are comma-separated IDs (1-15).`;

      const response = await axios.post(`${API}/chat`, {
        message: userMessage,
        system_prompt: systemPrompt,
        conversation_history: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      });

      const aiResponse = response.data.response;
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

      // Check if AI recommended lawyers
      const recommendMatch = aiResponse.match(/\[RECOMMEND:\s*([\d,\s]+)\]/);
      if (recommendMatch) {
        const ids = recommendMatch[1].split(',').map(id => parseInt(id.trim()));
        const recommended = lawyers.filter(l => ids.includes(l.id));
        setAiRecommendedLawyers(recommended);
        setShowAiResults(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting. Please try again or use the manual search option." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Lawyer Card Component
  const LawyerCard = ({ lawyer, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => onClick(lawyer)}
      className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 cursor-pointer hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div className="flex items-start gap-4">
        <img 
          src={lawyer.photo} 
          alt={lawyer.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg truncate">{lawyer.name}</h3>
          <p className="text-blue-400 text-sm">{lawyer.specialization}</p>
          <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {lawyer.city}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {lawyer.experience} yrs
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              {lawyer.rating}
            </span>
          </div>
        </div>
      </div>
      <p className="text-slate-400 text-sm mt-3 line-clamp-2">{lawyer.bio}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-green-400 text-sm font-medium">{lawyer.fee}</span>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-4">
          View Profile
        </Button>
      </div>
    </motion.div>
  );

  // Lawyer Profile Modal
  const LawyerProfileModal = ({ lawyer, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-start gap-6">
            <img 
              src={lawyer.photo} 
              alt={lawyer.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{lawyer.name}</h2>
              <p className="text-blue-400 text-lg">{lawyer.specialization}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {lawyer.rating} Rating
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-300">{lawyer.cases_won} Cases Won</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">About</h3>
            <p className="text-slate-300">{lawyer.bio}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Experience</p>
              <p className="text-white font-semibold">{lawyer.experience} Years</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Fee Range</p>
              <p className="text-green-400 font-semibold">{lawyer.fee}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Location</p>
              <p className="text-white font-semibold">{lawyer.city}, {lawyer.state}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Court</p>
              <p className="text-white font-semibold">{lawyer.court}</p>
            </div>
          </div>

          {/* Education & Bar Council */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Education</h3>
              <p className="text-slate-300">{lawyer.education}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Bar Council Registration</h3>
              <p className="text-slate-300">{lawyer.bar_council}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Languages</h3>
              <p className="text-slate-300">{lawyer.languages.join(', ')}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={() => navigate('/user-login')}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3"
            >
              <Phone className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/user-login')}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 rounded-full py-3"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Nyaay Sathi
          </button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/user-login')}
              className="relative bg-slate-800 hover:bg-slate-700 text-white rounded-full px-6 py-2 flex items-center gap-2 border border-blue-500/50 overflow-hidden"
            >
              {/* Glowing light effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <User className="w-4 h-4 relative z-10" />
              <span className="relative z-10 font-medium">Login</span>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Find Your Perfect Lawyer
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose how you'd like to find legal help - search manually or let our AI assistant guide you
          </p>
        </motion.div>

        {/* Selection Cards */}
        {!activeTab && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Manual Search Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setActiveTab('manual')}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Find Lawyer Manually</h2>
              <p className="text-slate-400 mb-6">
                Search by selecting your state, city, court, and type of case. Browse through our verified lawyers and choose the best fit.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Select State</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Select City</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Select Court</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Case Type</span>
              </div>
              <div className="flex items-center text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                <span>Start Searching</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </motion.div>

            {/* AI Search Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setActiveTab('ai')}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 cursor-pointer hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Find Lawyer with AI</h2>
              <p className="text-slate-400 mb-6">
                Chat with our AI assistant who will understand your problem, identify the type of lawyer you need, and recommend the best matches.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">AI Powered</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Smart Matching</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Personalized</span>
              </div>
              <div className="flex items-center text-purple-400 font-semibold group-hover:gap-3 transition-all">
                <span>Start Chat</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Manual Search Interface */}
        {activeTab === 'manual' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <Button
              variant="ghost"
              onClick={() => { setActiveTab(null); setShowResults(false); }}
              className="text-slate-400 hover:text-white mb-6"
            >
              ← Back to options
            </Button>

            {/* Search Filters */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                Search Filters
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* State Select */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity('');
                      setSelectedCourt('');
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                  >
                    <option value="">All States</option>
                    {Object.keys(indianLocations).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* City Select */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                    disabled={!selectedState}
                  >
                    <option value="">All Cities</option>
                    {getCities().map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Court Select */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Court</label>
                  <select
                    value={selectedCourt}
                    onChange={(e) => setSelectedCourt(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                    disabled={!selectedState}
                  >
                    <option value="">All Courts</option>
                    {getCourts().map(court => (
                      <option key={court} value={court}>{court}</option>
                    ))}
                  </select>
                </div>

                {/* Case Type Select */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Case Type</label>
                  <select
                    value={selectedCaseType}
                    onChange={(e) => setSelectedCaseType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                  >
                    <option value="">All Types</option>
                    {caseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={handleManualSearch}
                className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-8 py-3"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Lawyers
              </Button>
            </div>

            {/* Results */}
            {showResults && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Found {filteredLawyers.length} Lawyers
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLawyers.map(lawyer => (
                    <LawyerCard 
                      key={lawyer.id} 
                      lawyer={lawyer} 
                      onClick={setSelectedLawyer}
                    />
                  ))}
                </div>
                {filteredLawyers.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <Scale className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No lawyers found matching your criteria. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* AI Chat Interface */}
        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Button
              variant="ghost"
              onClick={() => { setActiveTab(null); setShowAiResults(false); setMessages([messages[0]]); }}
              className="text-slate-400 hover:text-white mb-6"
            >
              ← Back to options
            </Button>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  AI Legal Assistant
                </h2>
                <p className="text-purple-100 text-sm">Describe your legal issue and I'll find the right lawyer for you</p>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 text-slate-200'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content.replace(/\[RECOMMEND:.*?\]/g, '')}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-slate-700 p-4">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe your legal issue..."
                    className="flex-1 bg-slate-800 border-slate-700 rounded-full px-6"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 rounded-full px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Recommended Lawyers */}
            {showAiResults && aiRecommendedLawyers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  AI Recommended Lawyers
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiRecommendedLawyers.map(lawyer => (
                    <LawyerCard 
                      key={lawyer.id} 
                      lawyer={lawyer} 
                      onClick={setSelectedLawyer}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          {/* Features Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Features We Provide</h2>
              <p className="text-slate-400 text-lg">Everything you need to manage your legal journey</p>
            </div>

            {/* Floating Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 - Case Tracking */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-24 bg-slate-800 rounded-lg shadow-xl border border-slate-600 p-2">
                      <div className="h-2 w-16 bg-blue-500 rounded mb-2"></div>
                      <div className="h-2 w-12 bg-slate-600 rounded mb-2"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 bg-green-500/30 rounded"></div>
                        <div className="h-8 w-8 bg-yellow-500/30 rounded"></div>
                        <div className="h-8 w-8 bg-blue-500/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Scale className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Real-time Case Tracking</h3>
                  <p className="text-slate-400 text-sm">Track your case status, upcoming hearings, and important dates. Get instant notifications on case updates.</p>
                </div>
              </motion.div>

              {/* Feature 2 - AI Legal Assistant */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-24 bg-slate-800 rounded-lg shadow-xl border border-slate-600 p-2">
                      <div className="flex gap-1 mb-2">
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 w-20 bg-purple-500/50 rounded"></div>
                        <div className="h-2 w-16 bg-slate-600 rounded ml-auto"></div>
                        <div className="h-2 w-18 bg-purple-500/50 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Bot className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">AI Legal Assistant</h3>
                  <p className="text-slate-400 text-sm">Get instant answers to legal queries. Our AI understands your problem and suggests the right course of action.</p>
                </div>
              </motion.div>

              {/* Feature 3 - Document Vault */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-emerald-600/20 to-green-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-2">
                      <motion.div 
                        className="w-12 h-16 bg-slate-700 rounded shadow-lg border border-slate-600"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-12 h-16 bg-slate-700 rounded shadow-lg border border-slate-600"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.div 
                        className="w-12 h-16 bg-slate-700 rounded shadow-lg border border-slate-600"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Shield className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Secure Document Vault</h3>
                  <p className="text-slate-400 text-sm">Store all your legal documents securely. End-to-end encrypted storage with easy access anytime.</p>
                </div>
              </motion.div>

              {/* Feature 4 - Lawyer Network */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-amber-600/20 to-orange-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-10 h-10 bg-amber-500 rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
                      <div className="w-8 h-8 bg-orange-500 rounded-full absolute top-8 left-0"></div>
                      <div className="w-8 h-8 bg-yellow-500 rounded-full absolute top-8 right-0"></div>
                      <motion.div
                        className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-8"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-full h-[1px] bg-amber-400 rotate-45 origin-left"></div>
                        <div className="w-full h-[1px] bg-amber-400 -rotate-45 origin-right"></div>
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Verified Lawyer Network</h3>
                  <p className="text-slate-400 text-sm">Access 500+ verified lawyers across India. Filter by specialization, location, and ratings.</p>
                </div>
              </motion.div>

              {/* Feature 5 - Consultation Booking */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-rose-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-rose-600/20 to-pink-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-24 bg-slate-800 rounded-lg shadow-xl border border-slate-600 p-2">
                      <div className="grid grid-cols-7 gap-[2px]">
                        {[...Array(21)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-2 w-2 rounded-sm ${i === 10 ? 'bg-rose-500' : 'bg-slate-600'}`}
                            animate={i === 10 ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center"
                  >
                    <Clock className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Easy Consultation Booking</h3>
                  <p className="text-slate-400 text-sm">Book video or in-person consultations with lawyers. Flexible scheduling with calendar integration.</p>
                </div>
              </motion.div>

              {/* Feature 6 - Case Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 bg-indigo-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      />
                      <div className="w-8 h-[2px] bg-indigo-400"></div>
                      <motion.div
                        className="w-4 h-4 bg-indigo-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      />
                      <div className="w-8 h-[2px] bg-indigo-400"></div>
                      <motion.div
                        className="w-4 h-4 bg-indigo-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                      />
                      <div className="w-8 h-[2px] bg-slate-600"></div>
                      <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Visual Case Timeline</h3>
                  <p className="text-slate-400 text-sm">See your complete case journey visually. Track progress from filing to resolution with milestones.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lawyer Profile Modal */}
      <AnimatePresence>
        {selectedLawyer && (
          <LawyerProfileModal 
            lawyer={selectedLawyer} 
            onClose={() => setSelectedLawyer(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
