import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bot, MapPin, Building2, Gavel, Scale, Star, Briefcase, Phone, ArrowRight, MessageSquare, User, ChevronDown, X, Send, Loader2, Shield, Users, Clock, FileText, CreditCard, Bell, Video, Globe, Headphones, Lock, BarChart3, Sparkles } from 'lucide-react';
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
    { role: 'assistant', content: {
      cards: [
        { type: 'greeting', title: 'Welcome to Nyaay Sathi', content: "Hello! I'm your AI legal assistant. I'm here to help you find the right lawyer for your case." },
        { type: 'question', title: 'Tell Me About Your Case', content: "What kind of legal issue are you facing? (Property dispute, Family matter, Criminal case, etc.)" },
        { type: 'location', title: 'Your Location', content: "Which state/city are you located in? This helps me find lawyers near you." }
      ]
    }}
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

  // Helper function to parse AI response into cards
  const parseResponseToCards = (response) => {
    // Try JSON parsing first
    try {
      const jsonMatch = response.match(/```json?\s*([\s\S]*?)```/) || response.match(/\{[\s\S]*"cards"[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        if (parsed.cards && Array.isArray(parsed.cards)) {
          return parsed.cards;
        }
      }
    } catch (e) {
      // JSON parsing failed, continue to text parsing
    }

    // Parse markdown/text response into cards
    const cards = [];
    const sections = response.split(/(?=##\s|###\s|\*\*[^*]+\*\*:)/);
    
    sections.forEach((section, idx) => {
      const trimmed = section.trim();
      if (!trimmed) return;

      let type = 'info';
      let title = 'Information';
      let content = trimmed;

      // Extract title from ## or ###
      const titleMatch = trimmed.match(/^#{1,3}\s*(.+?)[\n\r]/);
      if (titleMatch) {
        title = titleMatch[1].replace(/[#*]/g, '').trim();
        content = trimmed.replace(/^#{1,3}\s*.+?[\n\r]/, '').trim();
      }

      // Extract title from **bold**:
      const boldMatch = trimmed.match(/^\*\*(.+?)\*\*:?\s*/);
      if (boldMatch) {
        title = boldMatch[1].trim();
        content = trimmed.replace(/^\*\*(.+?)\*\*:?\s*/, '').trim();
      }

      // Determine card type
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('welcome') || lowerTitle.includes('hello') || idx === 0) {
        type = 'greeting';
      } else if (lowerTitle.includes('step') || lowerTitle.includes('action') || lowerTitle.includes('next')) {
        type = 'action';
      } else if (lowerTitle.includes('advice') || lowerTitle.includes('suggest') || lowerTitle.includes('recommend')) {
        type = 'advice';
      } else if (lowerTitle.includes('warning') || lowerTitle.includes('caution') || lowerTitle.includes('important')) {
        type = 'warning';
      } else if (lowerTitle.includes('question') || lowerTitle.includes('clarif')) {
        type = 'question';
      } else if (lowerTitle.includes('location') || lowerTitle.includes('area') || lowerTitle.includes('region')) {
        type = 'location';
      }

      // Clean up content
      content = content
        .replace(/^[-*•]\s*/gm, '• ')
        .replace(/^\d+\.\s*/gm, '• ')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .trim();

      if (content && content.length > 5) {
        cards.push({ type, title, content: content.substring(0, 300) });
      }
    });

    if (cards.length === 0) {
      const cleanContent = response
        .replace(/#{1,3}\s*/g, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/^[-*•]\s*/gm, '• ')
        .trim();
      cards.push({ type: 'info', title: 'Response', content: cleanContent.substring(0, 500) });
    }

    return cards.slice(0, 6);
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
        `ID:${l.id} | ${l.name} | ${l.specialization} | ${l.city}, ${l.state} | ${l.experience}yrs | Rating:${l.rating} | Fee:${l.fee}`
      ).join('\n');

      const systemPrompt = `You are Nyaay Sathi's AI Legal Assistant for Indian users. Your role:

1. UNDERSTAND the user's legal problem through empathetic conversation
2. ASK about their location (state/city in India) if not mentioned
3. IDENTIFY the type of lawyer needed (Criminal, Family, Property, Civil, Corporate, Cyber, Tax, Labour, Consumer, etc.)
4. RECOMMEND suitable lawyers from our database

AVAILABLE LAWYERS:
${lawyerContext}

RESPONSE FORMAT - Always respond with structured JSON cards:
{
  "cards": [
    {"type": "greeting", "title": "Title", "content": "Your message"},
    {"type": "question", "title": "Question", "content": "Your question"},
    {"type": "info", "title": "Understanding", "content": "What you understood"},
    {"type": "advice", "title": "Legal Insight", "content": "Brief advice"},
    {"type": "action", "title": "Next Steps", "content": "What to do"}
  ],
  "recommendedLawyers": [1, 2, 3]
}

RULES:
- Be empathetic and professional
- Use simple Hindi-English mix if user writes in Hindi
- Ask for location (state) to filter lawyers
- Identify case type from conversation
- When ready, include "recommendedLawyers" array with lawyer IDs (1-40)
- Keep each card content brief (2-3 lines max)
- Use 2-4 cards per response

CARD TYPES:
- greeting: Welcome/acknowledgment
- question: Asking for more info
- info: Sharing understanding of their case
- advice: Legal guidance
- action: Next steps to take
- warning: Important cautions
- location: Asking/confirming location`;

      const response = await axios.post(`${API}/chat/guest`, {
        message: userMessage,
        system_prompt: systemPrompt,
        session_id: `lawyer_search_${Date.now()}`
      });

      let aiResponse = response.data.response;
      
      // Parse response into cards
      const cards = parseResponseToCards(aiResponse);
      setMessages(prev => [...prev, { role: 'assistant', content: { cards } }]);

      // Check for lawyer IDs in response to recommend
      const idMatch = aiResponse.match(/ID:?\s*(\d+)/gi);
      if (idMatch) {
        const ids = idMatch.map(m => parseInt(m.replace(/ID:?\s*/i, ''))).filter(id => id >= 1 && id <= 40);
        if (ids.length > 0) {
          const recommended = lawyers.filter(l => ids.includes(l.id));
          if (recommended.length > 0) {
            setAiRecommendedLawyers(recommended);
            setShowAiResults(true);
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: { cards: [{ type: 'warning', title: 'Connection Error', content: "I'm having trouble connecting. Please try again or use the manual search option." }] }
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
              className="text-slate-400 hover:text-white mb-4"
            >
              ← Back to options
            </Button>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex-shrink-0">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  AI Legal Assistant
                </h2>
                <p className="text-purple-100 text-sm">Describe your legal issue and I'll find the right lawyer for you</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'user' ? (
                      <div className="max-w-[70%] bg-blue-600 text-white rounded-2xl px-4 py-3">
                        <p>{msg.content}</p>
                      </div>
                    ) : (
                      <div className="w-full max-w-[90%]">
                        {msg.content?.cards ? (
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {msg.content.cards.map((card, cardIdx) => (
                              <motion.div
                                key={cardIdx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: cardIdx * 0.1 }}
                                className={`rounded-xl p-4 border ${
                                  card.type === 'greeting' ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30' :
                                  card.type === 'question' ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30' :
                                  card.type === 'info' ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-600/30' :
                                  card.type === 'advice' ? 'bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-500/30' :
                                  card.type === 'action' ? 'bg-gradient-to-br from-amber-900/50 to-amber-800/30 border-amber-500/30' :
                                  card.type === 'warning' ? 'bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-500/30' :
                                  card.type === 'location' ? 'bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 border-cyan-500/30' :
                                  'bg-slate-800/50 border-slate-700/30'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  {card.type === 'greeting' && <Sparkles className="w-4 h-4 text-purple-400" />}
                                  {card.type === 'question' && <MessageSquare className="w-4 h-4 text-blue-400" />}
                                  {card.type === 'info' && <Scale className="w-4 h-4 text-slate-400" />}
                                  {card.type === 'advice' && <Shield className="w-4 h-4 text-emerald-400" />}
                                  {card.type === 'action' && <ArrowRight className="w-4 h-4 text-amber-400" />}
                                  {card.type === 'warning' && <Bell className="w-4 h-4 text-red-400" />}
                                  {card.type === 'location' && <MapPin className="w-4 h-4 text-cyan-400" />}
                                  <span className={`text-sm font-semibold ${
                                    card.type === 'greeting' ? 'text-purple-300' :
                                    card.type === 'question' ? 'text-blue-300' :
                                    card.type === 'info' ? 'text-slate-300' :
                                    card.type === 'advice' ? 'text-emerald-300' :
                                    card.type === 'action' ? 'text-amber-300' :
                                    card.type === 'warning' ? 'text-red-300' :
                                    card.type === 'location' ? 'text-cyan-300' :
                                    'text-slate-300'
                                  }`}>{card.title}</span>
                                </div>
                                <p className="text-slate-200 text-sm leading-relaxed">{card.content}</p>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-slate-800 text-slate-200 rounded-2xl px-4 py-3">
                            <p className="whitespace-pre-wrap">{typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                      <span className="text-slate-400 text-sm">Analyzing your query...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-slate-700 p-4 flex-shrink-0">
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

              {/* Feature 7 - Document Management */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-teal-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-teal-600/20 to-cyan-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-3">
                      <motion.div 
                        className="w-10 h-14 bg-slate-700 rounded shadow-lg flex items-center justify-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      >
                        <FileText className="w-5 h-5 text-teal-400" />
                      </motion.div>
                      <motion.div 
                        className="w-10 h-14 bg-slate-700 rounded shadow-lg flex items-center justify-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      >
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                      <motion.div 
                        className="w-10 h-14 bg-slate-700 rounded shadow-lg flex items-center justify-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      >
                        <FileText className="w-5 h-5 text-teal-400" />
                      </motion.div>
                    </div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Document Management</h3>
                  <p className="text-slate-400 text-sm">Upload, organize, and share legal documents securely. Auto-categorization and smart search.</p>
                </div>
              </motion.div>

              {/* Feature 8 - Payment Integration */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-green-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-green-600/20 to-emerald-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-18 bg-slate-800 rounded-lg shadow-xl border border-slate-600 p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="w-8 h-5 bg-green-500/40 rounded"></div>
                        <motion.div 
                          className="text-green-400 text-xs font-bold"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >₹</motion.div>
                      </div>
                      <div className="h-1.5 w-full bg-green-500/30 rounded"></div>
                    </div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Secure Payments</h3>
                  <p className="text-slate-400 text-sm">Pay consultation fees securely online. Multiple payment options including UPI, cards, and net banking.</p>
                </div>
              </motion.div>

              {/* Feature 9 - Push Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-orange-600/20 to-amber-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Bell className="w-12 h-12 text-orange-400" />
                    </motion.div>
                    <motion.div
                      className="absolute top-8 right-12 w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Smart Notifications</h3>
                  <p className="text-slate-400 text-sm">Never miss a hearing or deadline. Get timely reminders via push notifications, SMS, and email.</p>
                </div>
              </motion.div>

              {/* Feature 10 - Video Consultation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-sky-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-sky-600/20 to-blue-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-20 bg-slate-800 rounded-lg shadow-xl border border-slate-600 overflow-hidden">
                      <div className="h-14 bg-slate-700 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Video className="w-8 h-8 text-sky-400" />
                        </motion.div>
                      </div>
                      <div className="h-6 bg-slate-900 flex items-center justify-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Video Consultations</h3>
                  <p className="text-slate-400 text-sm">Consult with lawyers from anywhere via HD video calls. Screen sharing and recording available.</p>
                </div>
              </motion.div>

              {/* Feature 11 - Multi-language Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-violet-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-violet-600/20 to-purple-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Globe className="w-16 h-16 text-violet-400" />
                    </motion.div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Multi-language Support</h3>
                  <p className="text-slate-400 text-sm">Platform available in Hindi, English, and regional languages. Find lawyers who speak your language.</p>
                </div>
              </motion.div>

              {/* Feature 12 - 24/7 Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-pink-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-pink-600/20 to-rose-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Headphones className="w-14 h-14 text-pink-400" />
                    </motion.div>
                    <motion.div
                      className="absolute top-10 right-16 text-xs text-pink-300 font-bold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >24/7</motion.div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">24/7 Customer Support</h3>
                  <p className="text-slate-400 text-sm">Round-the-clock assistance via chat, call, or email. We're always here to help you.</p>
                </div>
              </motion.div>

              {/* Feature 13 - Data Privacy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-cyan-600/20 to-teal-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Lock className="w-14 h-14 text-cyan-400" />
                    </motion.div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Bank-grade Security</h3>
                  <p className="text-slate-400 text-sm">Your data is protected with 256-bit encryption. GDPR compliant and ISO certified security.</p>
                </div>
              </motion.div>

              {/* Feature 14 - Analytics Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-lime-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-lime-600/20 to-green-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-end gap-2 h-16">
                      <motion.div 
                        className="w-4 bg-lime-500 rounded-t"
                        animate={{ height: ['40%', '70%', '40%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        style={{ height: '40%' }}
                      />
                      <motion.div 
                        className="w-4 bg-green-500 rounded-t"
                        animate={{ height: ['60%', '90%', '60%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        style={{ height: '60%' }}
                      />
                      <motion.div 
                        className="w-4 bg-lime-500 rounded-t"
                        animate={{ height: ['50%', '80%', '50%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                        style={{ height: '50%' }}
                      />
                      <motion.div 
                        className="w-4 bg-green-500 rounded-t"
                        animate={{ height: ['70%', '100%', '70%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        style={{ height: '70%' }}
                      />
                    </div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Case Analytics</h3>
                  <p className="text-slate-400 text-sm">Get insights on your case progress, spending, and lawyer performance with detailed analytics.</p>
                </div>
              </motion.div>

              {/* Feature 15 - AI Case Summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-fuchsia-500/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-fuchsia-600/20 to-pink-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        boxShadow: ['0 0 20px rgba(217, 70, 239, 0.3)', '0 0 40px rgba(217, 70, 239, 0.6)', '0 0 20px rgba(217, 70, 239, 0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-4 rounded-xl bg-slate-800/50"
                    >
                      <Sparkles className="w-10 h-10 text-fuchsia-400" />
                    </motion.div>
                  </div>
                  <motion.div className="absolute top-2 right-2 w-8 h-8 bg-fuchsia-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">AI Case Summary</h3>
                  <p className="text-slate-400 text-sm">Get instant AI-generated summaries of your case documents. Understand complex legal terms easily.</p>
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
