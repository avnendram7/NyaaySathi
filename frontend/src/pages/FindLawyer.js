import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Send, Bot, Star, Briefcase, MapPin, ArrowRight, User, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';
import { CorporateButton, CorporateInput, CorporateBadge } from '../components/CorporateComponents';

// Dummy lawyers data
const dummyLawyers = [
  {
    id: '1',
    name: 'Adv. Rajesh Kumar',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialization: 'Civil Law',
    experience: 15,
    rating: 4.8,
    cases_won: 150,
    state: 'Delhi',
    city: 'New Delhi',
    languages: ['Hindi', 'English'],
    fee: '₹10,000 - ₹25,000',
    bio: 'Specialized in civil litigation with 15 years of experience in property disputes and contract law.',
  },
  {
    id: '2',
    name: 'Adv. Priya Sharma',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialization: 'Family Law',
    experience: 12,
    rating: 4.9,
    cases_won: 120,
    state: 'Maharashtra',
    city: 'Mumbai',
    languages: ['Hindi', 'English', 'Marathi'],
    fee: '₹8,000 - ₹20,000',
    bio: 'Expert in family law matters including divorce, custody, and matrimonial disputes.',
  },
  {
    id: '3',
    name: 'Adv. Amit Verma',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
    specialization: 'Criminal Law',
    experience: 18,
    rating: 4.7,
    cases_won: 200,
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    languages: ['Hindi', 'English'],
    fee: '₹15,000 - ₹40,000',
    bio: 'Senior criminal lawyer with extensive experience in defending complex criminal cases.',
  },
  {
    id: '4',
    name: 'Adv. Sneha Patel',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    specialization: 'Corporate Law',
    experience: 10,
    rating: 4.6,
    cases_won: 85,
    state: 'Gujarat',
    city: 'Ahmedabad',
    languages: ['Hindi', 'English', 'Gujarati'],
    fee: '₹12,000 - ₹30,000',
    bio: 'Corporate law specialist handling business agreements, compliance, and corporate litigation.',
  },
  {
    id: '5',
    name: 'Adv. Vikram Singh',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    specialization: 'Property Law',
    experience: 14,
    rating: 4.8,
    cases_won: 130,
    state: 'Karnataka',
    city: 'Bangalore',
    languages: ['Hindi', 'English', 'Kannada'],
    fee: '₹10,000 - ₹28,000',
    bio: 'Property law expert specializing in real estate disputes and property transactions.',
  },
  {
    id: '6',
    name: 'Adv. Meera Reddy',
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
    specialization: 'Tax Law',
    experience: 11,
    rating: 4.5,
    cases_won: 95,
    state: 'Telangana',
    city: 'Hyderabad',
    languages: ['Telugu', 'English', 'Hindi'],
    fee: '₹9,000 - ₹22,000',
    bio: 'Tax law specialist with expertise in GST, income tax litigation, and tax planning.',
  }
];

export default function FindLawyer() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI legal assistant. Tell me about your legal issue, and I'll recommend the best lawyers for your case."
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedLawyers, setRecommendedLawyers] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [allLawyers, setAllLawyers] = useState(dummyLawyers);
  const [conversationState, setConversationState] = useState({
    caseType: null,
    location: null,
    hasRecommended: false
  });

  // Fetch real lawyers from DB
  useEffect(() => {
    fetchApprovedLawyers();
  }, []);

  const fetchApprovedLawyers = async () => {
    try {
      const response = await axios.get(`${API}/lawyers`);
      if (response.data && Array.isArray(response.data)) {
        const dbLawyers = response.data.map((lawyer, idx) => ({
          id: `db_${lawyer.id || idx}`,
          name: `Adv. ${lawyer.full_name}`,
          photo: lawyer.photo || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${(idx % 99) + 1}.jpg`,
          specialization: lawyer.specialization || 'General Law',
          experience: lawyer.experience || 5,
          rating: lawyer.rating || 4.5,
          cases_won: lawyer.cases_won || 50,
          state: lawyer.state || 'Delhi',
          city: lawyer.city || 'New Delhi',
          languages: lawyer.languages || ['Hindi', 'English'],
          fee: lawyer.fee_range || '₹5,000 - ₹15,000',
          bio: lawyer.bio || 'Experienced lawyer ready to help with your legal matters.',
          isVerified: true
        }));
        setAllLawyers([...dbLawyers, ...dummyLawyers]);
      }
    } catch (error) {
      console.log('Using dummy lawyers');
      setAllLawyers(dummyLawyers);
    }
  };

  const analyzeCaseAndRecommend = (userMessage) => {
    const message = userMessage.toLowerCase();
    let caseType = null;
    let location = null;

    // Detect case type
    if (message.includes('property') || message.includes('land') || message.includes('real estate')) {
      caseType = 'Property Law';
    } else if (message.includes('divorce') || message.includes('custody') || message.includes('family') || message.includes('marriage')) {
      caseType = 'Family Law';
    } else if (message.includes('criminal') || message.includes('fir') || message.includes('police') || message.includes('arrest')) {
      caseType = 'Criminal Law';
    } else if (message.includes('business') || message.includes('company') || message.includes('corporate') || message.includes('contract')) {
      caseType = 'Corporate Law';
    } else if (message.includes('civil') || message.includes('dispute') || message.includes('compensation')) {
      caseType = 'Civil Law';
    } else if (message.includes('tax') || message.includes('gst') || message.includes('income tax')) {
      caseType = 'Tax Law';
    }

    // Detect location
    const states = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'lucknow', 'ahmedabad', 'kolkata', 'chennai', 'pune'];
    states.forEach(state => {
      if (message.includes(state)) {
        location = state.charAt(0).toUpperCase() + state.slice(1);
      }
    });

    return { caseType, location };
  };

  const recommendLawyers = (caseType, location) => {
    let filtered = [...allLawyers];

    // Filter by case type
    if (caseType) {
      filtered = filtered.filter(l => 
        l.specialization.toLowerCase().includes(caseType.toLowerCase()) ||
        caseType.toLowerCase().includes(l.specialization.toLowerCase())
      );
    }

    // Filter by location if provided
    if (location) {
      filtered = filtered.filter(l => 
        l.city.toLowerCase().includes(location.toLowerCase()) ||
        l.state.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(l.city.toLowerCase())
      );
    }

    // If no matches, fallback to case type only
    if (filtered.length === 0 && caseType) {
      filtered = allLawyers.filter(l => 
        l.specialization.toLowerCase().includes(caseType.toLowerCase())
      );
    }

    // Sort by rating and limit to top 3
    filtered.sort((a, b) => b.rating - a.rating);
    return filtered.slice(0, 3);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Analyze user message
      const { caseType, location } = analyzeCaseAndRecommend(userMessage);
      
      // Update conversation state
      const newState = {
        caseType: caseType || conversationState.caseType,
        location: location || conversationState.location,
        hasRecommended: false
      };
      setConversationState(newState);

      // If we have case type, recommend lawyers
      if (newState.caseType && !conversationState.hasRecommended) {
        const lawyers = recommendLawyers(newState.caseType, newState.location);
        
        if (lawyers.length > 0) {
          setRecommendedLawyers(lawyers);
          setShowRecommendations(true);
          
          const response = `Great! Based on your ${newState.caseType} case${newState.location ? ` in ${newState.location}` : ''}, I've found ${lawyers.length} highly-rated lawyers for you.\n\n✅ ${lawyers.map(l => l.name).join('\n✅ ')}\n\nYou can view their profiles and book a consultation below. Sign up to connect with them!`;
          
          setMessages(prev => [...prev, { role: 'assistant', content: response }]);
          setConversationState(prev => ({ ...prev, hasRecommended: true }));
        } else {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "I understand your case. Could you tell me which city you're located in? This will help me find the best lawyers near you." 
          }]);
        }
      } else if (!newState.caseType) {
        // Ask for more details
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I'd be happy to help! Could you tell me more about your legal issue? For example:\n• Property dispute\n• Family matter (divorce, custody)\n• Criminal case\n• Business/Corporate issue\n• Tax matter\n• Other legal concern" 
        }]);
      } else {
        // Already recommended, offer more help
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I've already recommended lawyers for you. Would you like me to search for lawyers in a different location or for a different type of case?" 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to process your message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookConsultation = (lawyer) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/user-dashboard', { state: { bookingLawyer: lawyer } });
    } else {
      navigate('/user-signup', { state: { bookingLawyer: lawyer } });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 text-white hover:text-blue-500 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">Nyaay Sathi</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/role-selection?mode=login')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Login
              </button>
              <CorporateButton
                variant="primary"
                onClick={() => navigate('/user-signup')}
              >
                Sign Up
              </CorporateButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg mb-6">
            <Bot className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500 text-sm font-medium">AI Legal Assistant</span>
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4">
            Find the Right Lawyer
          </h1>
          <p className="text-slate-400 text-lg">
            Tell me about your case, and I'll recommend the best lawyers for you
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-black border border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe your legal issue..."
                className="flex-1 px-4 py-3 bg-black border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Lawyers */}
        {showRecommendations && recommendedLawyers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Recommended Lawyers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendedLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={lawyer.photo}
                      alt={lawyer.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{lawyer.name}</h3>
                      <p className="text-sm text-slate-400">{lawyer.specialization}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-white">{lawyer.rating}</span>
                      <span className="text-slate-500">({lawyer.cases_won} cases)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Briefcase className="w-4 h-4" />
                      {lawyer.experience} years experience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4" />
                      {lawyer.city}, {lawyer.state}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-400 line-clamp-2">{lawyer.bio}</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedLawyer(lawyer)}
                      className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBookConsultation(lawyer)}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      Book Consultation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Lawyer Profile Modal */}
      {selectedLawyer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-white">Lawyer Profile</h2>
                <button
                  onClick={() => setSelectedLawyer(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <img
                  src={selectedLawyer.photo}
                  alt={selectedLawyer.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedLawyer.name}</h3>
                  <p className="text-slate-400 mb-2">{selectedLawyer.specialization}</p>
                  <div className="flex items-center gap-4">
                    <CorporateBadge variant="info">
                      {selectedLawyer.experience} Years
                    </CorporateBadge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-white">{selectedLawyer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">About</h4>
                  <p className="text-white">{selectedLawyer.bio}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Location</h4>
                  <p className="text-white">{selectedLawyer.city}, {selectedLawyer.state}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Languages</h4>
                  <p className="text-white">{selectedLawyer.languages.join(', ')}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Consultation Fee</h4>
                  <p className="text-white">{selectedLawyer.fee}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Cases Won</h4>
                  <p className="text-white">{selectedLawyer.cases_won}+ successful cases</p>
                </div>
              </div>

              <CorporateButton
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleBookConsultation(selectedLawyer)}
              >
                Book Consultation
                <ArrowRight className="w-5 h-5" />
              </CorporateButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
