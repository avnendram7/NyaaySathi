import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Scale, LogOut, LayoutDashboard, Calendar, MessageSquare, FileText, Send, User, Star, Clock, MapPin, Shield, FileCheck, Mic, CheckCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your AI Legal Assistant. I can help you understand legal terms, draft documents, or answer questions about your ongoing case. How can I assist you today?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchData();
    }
  }, []);
  
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [casesRes, docsRes, bookingsRes, lawyersRes] = await Promise.all([
        axios.get(`${API}/cases`, { headers }),
        axios.get(`${API}/documents`, { headers }),
        axios.get(`${API}/bookings`, { headers }),
        axios.get(`${API}/lawyers`)
      ]);
      setCases(casesRes.data);
      setDocuments(docsRes.data);
      setBookings(bookingsRes.data);
      setLawyers(lawyersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  
  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/chat`, { message: chatInput }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      toast.error('Chat error');
      setChatMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };
  
  const exampleQuestions = [
    "What are my rights in this case?",
    "Draft a request for adjournment",
    "Explain 'Anticipatory Bail'",
    "Summarize my last hearing"
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">NyaaySathi</span>
              <p className="text-xs text-blue-600 font-medium">LEGAL PARTNER</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            data-testid="dashboard-nav-btn"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            data-testid="consultation-nav-btn"
            onClick={() => setActiveTab('consultation')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'consultation' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Consultation</span>
          </button>
          
          <button
            data-testid="chatbot-nav-btn"
            onClick={() => setActiveTab('chatbot')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'chatbot' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">ChatBot</span>
          </button>
          
          <button
            data-testid="documents-nav-btn"
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'documents' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Documents</span>
          </button>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{user?.full_name || 'Client User'}</p>
              <p className="text-xs text-gray-500">Client Account</p>
            </div>
            <button
              data-testid="logout-btn"
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Next Hearing Date */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-xl shadow-blue-200">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-center mb-2 text-white">March 15, 2026</h2>
                  <p className="text-center text-blue-100">Next Hearing Date</p>
                </div>
                
                {/* Upcoming Event */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-2 font-medium tracking-wider">Upcoming Event</p>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">District Court Hearing</h3>
                      <p className="text-gray-600 text-sm">Mark your calendar and prepare necessary documents for the hearing.</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-500 font-semibold">URGENT</span>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">45 Days</p>
                      <p className="text-xs text-gray-500">Until Hearing</p>
                    </div>
                  </div>
                </div>
                
                {/* Documents Required */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Documents Required</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Identification Proof</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Address Verification</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Signed Affidavits</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-xl border border-gray-200">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                      <span className="text-gray-500 font-medium">Witness Statements</span>
                    </div>
                  </div>
                </div>
                
                {/* Court Location */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Court You Must Report To</h3>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">District Court Sonipat</h4>
                  <p className="text-gray-600 text-sm mb-4">Gohana Road, Sonipat, Haryana 131001, India</p>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl w-full shadow-lg shadow-amber-200">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Location
                  </Button>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Discussion Summary */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Discussion Summary</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    The initial consultation covered the case background, key evidence, and established the preliminary legal strategy moving forward...
                  </p>
                  <button className="text-blue-600 text-sm font-semibold flex items-center space-x-1 hover:underline">
                    <span>View Full Summary</span>
                    <span>→</span>
                  </button>
                </div>
                
                {/* Case Timeline */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Case Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600">Next hearing date scheduled</p>
                        <p className="text-xs text-gray-500">Jan 28, 2026</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Court discussion summary added</p>
                        <p className="text-xs text-gray-500">Jan 25, 2026</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Consultation completed</p>
                        <p className="text-xs text-gray-500">Jan 20, 2026</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Case filed</p>
                        <p className="text-xs text-gray-500">Jan 15, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Consultation Transcript */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Consultation Transcript</h3>
                  <p className="text-gray-600 text-sm mb-4">Access your encrypted consultation records.</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl w-full shadow-lg shadow-blue-200">
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Consultation Tab */}
        {activeTab === 'consultation' && (
          <div className="p-8 bg-white min-h-full">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Find Your Legal Expert</h1>
            
            {/* Consultation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600" 
                  alt="Consultation"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Direct Consultation</h3>
                  <p className="text-gray-200 text-sm mb-4">Browse our directory of vetted lawyers. Filter by specialization, experience, and location to find your perfect match.</p>
                  <Button className="bg-white hover:bg-gray-100 text-gray-900 rounded-xl shadow-lg">
                    Find a Lawyer →
                  </Button>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500 p-6 flex flex-col shadow-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">AI-Powered Recommendation</h3>
                <p className="text-blue-100 text-sm mb-4 flex-1">Answer a few questions and let our advanced AI match you with the best lawyer for your specific case instantly.</p>
                <Button className="bg-white hover:bg-gray-100 text-blue-700 rounded-xl shadow-lg">
                  Start Matching 🔒
                </Button>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">End-to-End Encrypted</h4>
                <p className="text-gray-600 text-sm">Your privacy is guaranteed. No recordings, ever.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">PDF Transcripts</h4>
                <p className="text-gray-600 text-sm">Receive a searchable PDF transcript of your call.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-7 h-7 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">Voice Assistant</h4>
                <p className="text-gray-600 text-sm">Easily navigate and control your call with voice.</p>
              </div>
            </div>
            
            {/* Top Rated Lawyers */}
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Top Rated Lawyers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lawyers.length > 0 ? lawyers.slice(0, 3).map((lawyer, idx) => (
                <div key={lawyer.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{lawyer.full_name}</h4>
                      <p className="text-sm text-blue-600 font-medium">Civil & Criminal Law</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{12 + idx}+</p>
                      <p className="text-xs text-gray-500 font-medium">YEARS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{350 + idx * 50}+</p>
                      <p className="text-xs text-gray-500 font-medium">CASES</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold flex items-center justify-center text-gray-900">
                        {4.9 - idx * 0.1} <Star className="w-4 h-4 text-yellow-500 ml-1" />
                      </p>
                      <p className="text-xs text-gray-500 font-medium">RATING</p>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl w-full mb-2 shadow-lg shadow-blue-200">
                    Book Consultation
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl w-full">
                    View Profile
                  </Button>
                </div>
              )) : (
                <div className="col-span-3 bg-white rounded-2xl p-8 border border-gray-200 text-center">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No lawyers available at the moment. Check back later!</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* ChatBot Tab */}
        {activeTab === 'chatbot' && (
          <div className="h-full flex flex-col bg-white">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1 text-white">Legal AI Assistant</h1>
                  <p className="text-blue-100 text-sm">24/7 Instant legal support and drafting.</p>
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">PRO USER</div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-lg">
                      <Scale className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-2xl rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === 'assistant' && (
                      <p className="text-xs text-gray-400 mt-2">10:30 AM ✓</p>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Example Questions */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {exampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChatInput(q)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm text-gray-700 whitespace-nowrap border border-gray-200 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
              
              <form onSubmit={handleChat} className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    data-testid="chatbot-input"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="bg-gray-100 border-gray-200 rounded-xl py-6 pr-12 text-gray-800 placeholder-gray-500"
                    disabled={loading}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                <Button 
                  data-testid="chatbot-send-btn"
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl px-6 shadow-lg shadow-blue-200"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        )}
        
        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="p-8 bg-white min-h-full">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">My Documents</h1>
            
            {documents.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">No documents uploaded yet.</p>
                <p className="text-gray-500 text-sm">Upload your first document to get started.</p>
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg shadow-blue-200">
                  Upload Document
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {documents.map(doc => (
                  <div key={doc.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold mb-2 text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">Type: {doc.file_type}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
