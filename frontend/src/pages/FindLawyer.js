import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bot, MapPin, Building2, Gavel, Scale, Star, Briefcase, Phone, ArrowRight, MessageSquare, User, ChevronDown, X, Send, Loader2, Shield, Users, Clock, FileText, CreditCard, Bell, Video, Globe, Headphones, Lock, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { lawyers as dummyLawyers, indianLocations, courtsByState, caseTypes } from '../data/lawyers';
import axios from 'axios';
import { API } from '../App';

export default function FindLawyer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null); // 'manual' or 'ai'
  
  // All lawyers (dummy + approved from DB)
  const [allLawyers, setAllLawyers] = useState(dummyLawyers);
  
  // Manual search state
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [sessionId, setSessionId] = useState(null);
  const [aiRecommendedLawyers, setAiRecommendedLawyers] = useState([]);
  const [showAiResults, setShowAiResults] = useState(false);
  
  // Lawyer profile modal
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  
  // Lawyer type selection (independent or firm)
  const [lawyerTypeSelection, setLawyerTypeSelection] = useState(null); // 'independent' or 'firm'
  const [lawFirms, setLawFirms] = useState([]);

  // Fetch approved lawyers from database on mount
  useEffect(() => {
    const fetchApprovedLawyers = async () => {
      try {
        const response = await axios.get(`${API}/lawyers`);
        if (response.data && Array.isArray(response.data)) {
          // Transform DB lawyers to match dummy lawyer format
          const dbLawyers = response.data.map((lawyer, idx) => ({
            id: `db_${lawyer.id || idx}`,
            name: `Adv. ${lawyer.full_name}`,
            photo: lawyer.photo || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${(idx % 99) + 1}.jpg`,
            specialization: lawyer.specialization || 'Civil Law',
            experience: lawyer.experience || 5,
            rating: lawyer.rating || 4.5,
            cases_won: lawyer.cases_won || 50,
            state: lawyer.state || 'Delhi',
            city: lawyer.city || 'New Delhi',
            court: lawyer.court || 'District Court',
            languages: lawyer.languages || ['Hindi', 'English'],
            fee: lawyer.fee_range || '₹5,000 - ₹15,000',
            bio: lawyer.bio || 'Experienced lawyer ready to help with your legal matters.',
            education: lawyer.education || 'LLB',
            bar_council: lawyer.bar_council_number || 'N/A',
            isVerified: true,
            isFromDB: true
          }));
          
          // Combine with dummy lawyers (DB lawyers first)
          setAllLawyers([...dbLawyers, ...dummyLawyers]);
        }
      } catch (error) {
        console.log('Using dummy lawyers only');
        setAllLawyers(dummyLawyers);
      }
    };
    
    fetchApprovedLawyers();
  }, []);

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
      } else if (lowerTitle.includes('step') || lowerTitle.includes('action') || lowerTitle.includes('next') || lowerTitle.includes('recommend')) {
        type = 'action';
      } else if (lowerTitle.includes('advice') || lowerTitle.includes('suggest')) {
        type = 'advice';
      } else if (lowerTitle.includes('warning') || lowerTitle.includes('caution') || lowerTitle.includes('important')) {
        type = 'warning';
      } else if (lowerTitle.includes('question') || lowerTitle.includes('clarif')) {
        type = 'question';
      } else if (lowerTitle.includes('location') || lowerTitle.includes('area') || lowerTitle.includes('region')) {
        type = 'location';
      } else if (lowerTitle.includes('lawyer') || lowerTitle.includes('match')) {
        type = 'action';
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
    let results = [...allLawyers];
    
    // Text search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(l => 
        l.name.toLowerCase().includes(query) ||
        l.specialization.toLowerCase().includes(query) ||
        l.city.toLowerCase().includes(query) ||
        l.state.toLowerCase().includes(query) ||
        l.bio.toLowerCase().includes(query)
      );
    }
    
    if (selectedState) {
      results = results.filter(l => l.state === selectedState);
    }
    if (selectedCity) {
      results = results.filter(l => l.city === selectedCity);
    }
    if (selectedCaseType) {
      results = results.filter(l => l.specialization === selectedCaseType);
    }
    
    // Sort: verified/DB lawyers first, then by rating
    results.sort((a, b) => {
      if (a.isFromDB && !b.isFromDB) return -1;
      if (!a.isFromDB && b.isFromDB) return 1;
      return b.rating - a.rating;
    });
    
    setFilteredLawyers(results);
    setShowResults(true);
  };

  // AI Chat function - uses conversation history via session
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Use existing session or create new one
      const currentSession = sessionId || `lawyer_search_${Date.now()}`;
      if (!sessionId) setSessionId(currentSession);
      
      // Build lawyer context (sample for AI - limit to 100 for token efficiency)
      const sampleLawyers = allLawyers.slice(0, 100);
      const lawyerContext = sampleLawyers.map(l => 
        `ID:${l.id} | ${l.name} | ${l.specialization} | ${l.city}, ${l.state} | ${l.experience}yrs | Rating:${l.rating} | Fee:${l.fee}${l.isFromDB ? ' | VERIFIED' : ''}`
      ).join('\n');

      const systemPrompt = `You are Nyaay Sathi's AI Legal Assistant helping Indian users find the right lawyer.

YOUR ROLE:
1. LISTEN and understand the user's legal problem with empathy
2. ASK clarifying questions about their case and location
3. IDENTIFY what type of lawyer they need
4. RECOMMEND specific lawyers from our database when you have enough info

CONVERSATION FLOW:
- First message: Understand their legal issue in detail
- Second: Confirm location (state/city in India)  
- Third: Recommend 2-3 suitable lawyers by mentioning their IDs

AVAILABLE LAWYERS (sample):
${lawyerContext}

RESPONSE FORMAT - Use JSON with cards:
{
  "cards": [
    {"type": "greeting", "title": "Title", "content": "Message"},
    {"type": "info", "title": "Understanding", "content": "What you understood about their case"},
    {"type": "question", "title": "Question", "content": "Clarifying question if needed"},
    {"type": "action", "title": "Recommended Lawyers", "content": "When ready: I found lawyers for you - ID:5, ID:12, ID:23"}
  ]
}

CARD TYPES: greeting, question, info, advice, action, warning, location

RULES:
- Be empathetic and professional
- Mix Hindi-English if user writes in Hindi
- Keep responses conversational, not too formal
- When recommending, ALWAYS include lawyer IDs like "ID:5" so system can show profiles
- Recommend 2-4 lawyers max
- Prioritize VERIFIED lawyers (marked with VERIFIED tag)`;

      const response = await axios.post(`${API}/chat/guest`, {
        message: userMessage,
        system_prompt: systemPrompt,
        session_id: currentSession
      });

      let aiResponse = response.data.response;
      
      // Parse response into cards
      const cards = parseResponseToCards(aiResponse);
      setMessages(prev => [...prev, { role: 'assistant', content: { cards } }]);

      // Extract lawyer IDs from response to show recommendations
      const idMatches = aiResponse.match(/ID:?\s*(\d+|db_[a-z0-9-]+)/gi);
      if (idMatches) {
        const ids = idMatches.map(m => {
          const match = m.match(/ID:?\s*(.+)/i);
          return match ? match[1] : null;
        }).filter(Boolean);
        
        if (ids.length > 0) {
          const recommended = allLawyers.filter(l => {
            const lawyerId = String(l.id);
            return ids.some(id => lawyerId === id || lawyerId.includes(id));
          }).slice(0, 5);
          
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

  // Handle booking consultation - redirect to signup if not logged in
  const handleBookConsultation = (lawyer) => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in - navigate to dashboard with booking info
      navigate('/user-dashboard', { state: { bookingLawyer: lawyer } });
    } else {
      // User not logged in - redirect to client signup page with lawyer info
      navigate('/user-signup', { state: { bookingLawyer: lawyer } });
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
        <div className="relative">
          <img 
            src={lawyer.photo} 
            alt={lawyer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30"
          />
          {lawyer.isFromDB && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
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
            <div className="relative">
              <img 
                src={lawyer.photo} 
                alt={lawyer.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500"
              />
              {lawyer.isFromDB && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>
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
              data-testid="book-consultation-btn"
              onClick={() => handleBookConsultation(lawyer)}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3"
            >
              <Phone className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
            <Button 
              variant="outline"
              data-testid="send-message-btn"
              onClick={() => handleBookConsultation(lawyer)}
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
              data-testid="login-btn"
              onClick={() => navigate('/role-selection?mode=login')}
              className="relative bg-slate-800 hover:bg-slate-700 text-white rounded-full px-6 py-2 flex items-center gap-2 border border-blue-500/50 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
          <p className="text-sm text-slate-500 mt-2">
            {allLawyers.length} lawyers available • {allLawyers.filter(l => l.isFromDB).length} verified
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
                Search by name, location, specialization, or browse through our {allLawyers.length}+ verified lawyers.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Search Bar</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Filter by State</span>
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
                Describe your legal problem and our AI will understand your needs and recommend the best lawyers for you.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">AI Powered</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Conversational</span>
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
              onClick={() => { setActiveTab(null); setShowResults(false); setSearchQuery(''); }}
              className="text-slate-400 hover:text-white mb-6"
            >
              ← Back to options
            </Button>

            {/* Search Filters */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                Search Lawyers
              </h2>
              
              {/* Search Bar */}
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Search by Name, Specialization, or Location</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    data-testid="lawyer-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                    placeholder="e.g., Criminal Law, Mumbai, Sharma..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* State Select */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">State</label>
                  <select
                    data-testid="state-select"
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
                    data-testid="city-select"
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
                    data-testid="court-select"
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
                    data-testid="case-type-select"
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
                data-testid="search-lawyers-btn"
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
                  {filteredLawyers.filter(l => l.isFromDB).length > 0 && (
                    <span className="text-sm text-green-400 ml-2">
                      ({filteredLawyers.filter(l => l.isFromDB).length} verified)
                    </span>
                  )}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLawyers.slice(0, 50).map(lawyer => (
                    <LawyerCard 
                      key={lawyer.id} 
                      lawyer={lawyer} 
                      onClick={setSelectedLawyer}
                    />
                  ))}
                </div>
                {filteredLawyers.length > 50 && (
                  <p className="text-center text-slate-400 mt-6">
                    Showing 50 of {filteredLawyers.length} results. Use filters to narrow down.
                  </p>
                )}
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
              onClick={() => { 
                setActiveTab(null); 
                setShowAiResults(false); 
                setMessages([messages[0]]); 
                setSessionId(null);
                setAiRecommendedLawyers([]);
              }}
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
                          <div className="grid gap-3 sm:grid-cols-2">
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
                      <span className="text-slate-400 text-sm">Understanding your case...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-slate-700 p-4 flex-shrink-0">
                <div className="flex gap-3">
                  <Input
                    data-testid="ai-chat-input"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe your legal issue..."
                    className="flex-1 bg-slate-800 border-slate-700 rounded-full px-6"
                  />
                  <Button
                    data-testid="ai-send-btn"
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

        {/* Features Section - Only show on main screen */}
        {!activeTab && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Features We Provide</h2>
                <p className="text-slate-400 text-lg">Everything you need to manage your legal journey</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature Cards */}
                {[
                  { icon: Scale, title: 'Real-time Case Tracking', desc: 'Track case status, hearings, and important dates', color: 'blue' },
                  { icon: Bot, title: 'AI Legal Assistant', desc: 'Get instant answers to legal queries', color: 'purple' },
                  { icon: Shield, title: 'Secure Document Vault', desc: 'Store legal documents securely with encryption', color: 'emerald' },
                  { icon: Users, title: 'Verified Lawyer Network', desc: `Access ${allLawyers.length}+ lawyers across India`, color: 'amber' },
                  { icon: Clock, title: 'Easy Booking', desc: 'Book video or in-person consultations', color: 'rose' },
                  { icon: Video, title: 'Video Consultations', desc: 'Consult from anywhere via HD video calls', color: 'sky' }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-${feature.color}-500/50 transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
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
