import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Scale, LogOut, LayoutDashboard, Calendar as CalendarIcon, MessageSquare, FileText, Users, TrendingUp, Search, MoreVertical, User, Clock, Phone, Video, CheckCircle, AlertCircle, Archive } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function LawyerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem('token');
  
  // Dummy data for demonstration
  const todaySchedule = [
    { time: '03:29 AM', timeLabel: 'IN 2 HOURS', client: 'Rajesh Kumar', matter: 'Property Dispute', type: 'Video', status: 'upcoming' },
    { time: '06:29 AM', timeLabel: 'TODAY', client: 'Priya Sharma', matter: 'Divorce Case', type: 'Call', status: 'upcoming' },
    { time: '01:29 AM', timeLabel: 'TOMORROW', client: 'Amit Patel', matter: 'Consumer Rights', type: 'In-Person', status: 'upcoming' },
    { time: '05:29 AM', timeLabel: 'TOMORROW', client: 'Neha Gupta', matter: 'Employment Dispute', type: 'Video', status: 'upcoming' },
    { time: '01:29 AM', timeLabel: 'WED', client: 'Vikram Singh', matter: 'Property Agreement', type: 'In-Person', status: 'upcoming' }
  ];
  
  const messages = [
    { name: 'Rajesh Kumar', message: 'Hi, I have uploaded the documents we discussed...', time: '12m', initial: 'R', color: 'bg-blue-500' },
    { name: 'Priya Sharma', message: 'Thanks for the update. I will review and get back...', time: '12m', initial: 'P', color: 'bg-purple-500' },
    { name: 'Amit Patel', message: 'Quick question about the upcoming hearing...', time: '12m', initial: 'A', color: 'bg-amber-500' },
    { name: 'Neha Gupta', message: 'Can we reschedule our meeting to next week...', time: '12m', initial: 'N', color: 'bg-blue-400' }
  ];
  
  const dummyCases = [
    { id: '1', title: 'Kumar vs. Builder Corp', client: 'Rajesh Kumar', type: 'Property Dispute', activity: '2 hours ago', status: 'Active' },
    { id: '2', title: 'Sharma Divorce Case', client: 'Priya Sharma', type: 'Family Law', activity: 'Yesterday', status: 'Active' },
    { id: '3', title: 'Patel Consumer Rights', client: 'Amit Patel', type: 'Consumer Law', activity: '3 days ago', status: 'Pending' },
    { id: '4', title: 'Singh Employment Dispute', client: 'Vikram Singh', type: 'Employment Law', activity: 'June 5, 2026', status: 'Closed' }
  ];
  
  const documents = [
    { name: 'Client_Agreement_Kumar.pdf', case: 'Case #K102-B vs. Builder Corp', type: 'Contract', date: 'Feb 24, 2026', size: '2.4 MB' },
    { name: 'Divorce_Petition_Sharma.docx', case: 'Case #S231-C vs. Sharma', type: 'Petition', date: 'Feb 22, 2026', size: '1.8 MB' },
    { name: 'Evidence_Photos_Patel.png', case: 'Case #P102-B vs. Shop', type: 'Evidence', date: 'Feb 20, 2026', size: '15.2 MB' },
    { name: 'Witness_Statement_Singh.pdf', case: 'Case #V102-B vs. Company', type: 'Statement', date: 'Feb 15, 2026', size: '1.2 MB' }
  ];
  
  const billingHistory = [
    { invoice: 'INV-00125', client: 'Rajesh Kumar', case: 'Case #K102-B vs. Builder', date: '2026-02-25', amount: '₹5,250.00', status: 'Paid' },
    { invoice: 'INV-00124', client: 'Priya Sharma', case: 'Case #S231-C vs. Sharma', date: '2026-02-22', amount: '₹8,200.00', status: 'Pending' },
    { invoice: 'INV-00123', client: 'Amit Patel', case: 'Case #P102-B vs. Shop', date: '2026-02-15', amount: '₹3,500.00', status: 'Paid' },
    { invoice: 'INV-00122', client: 'Neha Gupta', case: 'Case #N198-A vs. Employer', date: '2026-02-10', amount: '₹12,000.00', status: 'Overdue' },
    { invoice: 'INV-00121', client: 'Vikram Singh', case: 'Case #V342-A vs. Company', date: '2026-02-05', amount: '₹1,500.00', status: 'Paid' }
  ];
  
  const networkMessages = [
    { id: 1, sender: 'Adv. Mehra', message: 'Anyone has experience with property dispute appeals in Delhi HC?', time: '10:30 AM', replies: 3, online: true },
    { id: 2, sender: 'Adv. Kapoor', message: 'Need urgent help: Client asking about anticipatory bail procedure. Anyone free for quick call?', time: '10:15 AM', replies: 7, online: true },
    { id: 3, sender: 'Adv. Desai', message: 'Sharing latest Supreme Court judgment on Section 498A - very helpful!', time: '09:45 AM', replies: 12, online: false },
    { id: 4, sender: 'Adv. Verma', message: 'Looking for junior associate for consumer court case in Sonipat. DM if interested.', time: '09:20 AM', replies: 5, online: true },
    { id: 5, sender: 'Adv. Reddy', message: 'Question: How long does it typically take for bail hearing in Sessions Court?', time: 'Yesterday', replies: 15, online: false }
  ];
  
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
      const [casesRes, bookingsRes] = await Promise.all([
        axios.get(`${API}/cases`, { headers }),
        axios.get(`${API}/bookings`, { headers })
      ]);
      setCases(casesRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  
  const handleBookingStatus = async (bookingId, status) => {
    setLoading(true);
    try {
      await axios.patch(`${API}/bookings/${bookingId}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Booking ${status}!`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update booking');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-blue-500/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <span className="text-xl font-bold block text-white">NyaaySathi</span>
              <span className="text-xs text-blue-400">LEGAL PARTNER</span>
            </div>
          </div>
        </div>
        
        {/* Menu Label */}
        <div className="px-6 py-3">
          <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">MENU</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <button
            data-testid="lawyer-dashboard-nav"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            data-testid="lawyer-cases-nav"
            onClick={() => setActiveTab('cases')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'cases' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Cases</span>
          </button>
          
          <button
            data-testid="lawyer-calendar-nav"
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'calendar' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">Calendar</span>
          </button>
          
          <button
            data-testid="lawyer-messages-nav"
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'messages' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Messages</span>
          </button>
          
          <button
            data-testid="lawyer-documents-nav"
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'documents' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Documents</span>
          </button>
          
          <button
            data-testid="lawyer-network-nav"
            onClick={() => setActiveTab('network')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'network' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Lawyer Network</span>
            <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </button>
          
          <button
            data-testid="lawyer-earnings-nav"
            onClick={() => setActiveTab('earnings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'earnings' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Earnings</span>
          </button>
        </nav>
        
        {/* New Case Button */}
        <div className="p-4">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-6 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70">
            <span className="mr-2 text-2xl">+</span> New Case
          </Button>
        </div>
        
        {/* User Profile */}
        <div className="p-4 border-t border-blue-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">L</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{user?.full_name || 'Lawyer'}</p>
              <p className="text-xs text-blue-400">Criminal Law</p>
            </div>
            <button
              data-testid="lawyer-logout-btn"
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-slate-950">
        {activeTab === 'dashboard' && (
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-green-400 flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Wednesday, January 14
                </p>
                <h1 className="text-4xl font-bold text-white">
                  Good Morning, <span className="text-blue-400">Lawyer</span>
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 rounded-full glass border border-blue-500/20 flex items-center justify-center hover:bg-slate-800/50 transition-all">
                  <Search className="w-5 h-5 text-slate-400" />
                </button>
                <button className="w-10 h-10 rounded-full glass border border-blue-500/20 flex items-center justify-center hover:bg-slate-800/50 transition-all relative">
                  <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 animate-pulse"></span>
                  <span className="text-xl">🔔</span>
                </button>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                  + New Case
                </Button>
              </div>
            </div>
            
            {/* Stats Cards with Floating Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Active Cases</p>
                    <h3 className="text-4xl font-bold text-white">12</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm relative z-10">
                  <span className="text-blue-400 font-semibold">+2 New</span>
                  <span className="ml-2 text-slate-500">→</span>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Pending Actions</p>
                    <h3 className="text-4xl font-bold text-white">4</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm relative z-10">
                  <span className="text-amber-400 font-semibold">Urgent</span>
                  <span className="ml-2 text-slate-500">→</span>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-500/40 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <span className="text-2xl text-white">₹</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Earnings</p>
                    <h3 className="text-4xl font-bold text-white">₹8,500</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm relative z-10">
                  <span className="text-green-400 font-semibold">+15% Growth</span>
                  <span className="ml-2 text-slate-500">→</span>
                </div>
              </div>
            </div>
            
            {/* Schedule and Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2 glass rounded-2xl border border-blue-500/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Today's Schedule</h2>
                    <p className="text-sm text-slate-400">You have 5 sessions remaining today</p>
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {todaySchedule.map((session, idx) => (
                    <div key={idx} className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      idx === 0 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-slate-900/50 border border-slate-800/50'
                    } hover:bg-slate-800/70`}>
                      <div className="flex-shrink-0">
                        <div className={`w-1 h-12 rounded-full ${idx === 0 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-lg text-white">{session.time}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">{session.timeLabel}</p>
                          </div>
                          <div className="text-right flex-1 px-4">
                            <div className="flex items-center justify-end space-x-2 mb-1">
                              {session.type === 'Video' && <Video className="w-4 h-4 text-blue-400" />}
                              {session.type === 'Call' && <Phone className="w-4 h-4 text-slate-400" />}
                              {session.type === 'In-Person' && <Users className="w-4 h-4 text-purple-400" />}
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                session.type === 'Video' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                session.type === 'Call' ? 'bg-slate-700/50 text-slate-300 border border-slate-600/30' :
                                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              }`}>
                                {session.type}
                              </span>
                            </div>
                            <p className="font-semibold text-white">{session.client}</p>
                            <p className="text-xs text-slate-400">{session.matter}</p>
                          </div>
                          {idx === 2 && (
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-4 py-2 text-sm shadow-lg shadow-blue-500/50">
                              Join
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Messages */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Messages</h2>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex items-start space-x-3 hover:bg-slate-800/30 p-2 rounded-xl transition-all duration-300 cursor-pointer">
                      <div className={`w-10 h-10 ${msg.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <span className="text-white font-bold">{msg.initial}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-white">{msg.name}</p>
                          <span className="text-xs text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{msg.message}</p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2 shadow-lg shadow-green-400/50" />
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl py-3 border border-slate-700/50">
                  View All Messages →
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'cases' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Case Management</h1>
                <p className="text-slate-600">Track your active cases, clients, and legal proceedings.</p>
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6">
                + New Case
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">124</h3>
                    <p className="text-xs text-slate-500 uppercase">Total Cases</p>
                  </div>
                </div>
                <p className="text-xs text-blue-700">All Time</p>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">12</h3>
                    <p className="text-xs text-slate-500 uppercase">Active</p>
                  </div>
                </div>
                <p className="text-xs text-green-700">Current</p>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">8</h3>
                    <p className="text-xs text-slate-500 uppercase">Pending</p>
                  </div>
                </div>
                <p className="text-xs text-amber-700">Needs Action</p>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Archive className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">104</h3>
                    <p className="text-xs text-slate-500 uppercase">Archived</p>
                  </div>
                </div>
                <p className="text-xs text-slate-700">Closed</p>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search cases, clients..."
                  className="pl-10 bg-white border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-slate-200 rounded-xl">
                  <span className="mr-2">⚙️</span> Filter
                </Button>
                <select className="px-4 py-2 border border-slate-200 rounded-xl bg-white">
                  <option>Sort by Date</option>
                </select>
              </div>
            </div>
            
            {/* Cases Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Case Details</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Type</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Activity</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyCases.map((caseItem) => (
                    <tr key={caseItem.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold">{caseItem.title}</p>
                        <p className="text-sm text-slate-500">👤 {caseItem.client}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{caseItem.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{caseItem.activity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseItem.status === 'Active' ? 'bg-green-100 text-green-700' :
                          caseItem.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'network' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">Lawyer Network</h1>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    End-to-End Encrypted
                  </span>
                </div>
                <p className="text-slate-400">Connect, collaborate, and learn from fellow legal professionals</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right mr-4">
                  <p className="text-sm text-slate-400">Active Lawyers</p>
                  <p className="text-2xl font-bold text-white">247</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                  + New Discussion
                </Button>
              </div>
            </div>
            
            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <Users className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">247</h3>
                  <p className="text-xs text-slate-400 uppercase">Active Members</p>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">1,423</h3>
                  <p className="text-xs text-slate-400 uppercase">Discussions</p>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-6 border border-green-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">892</h3>
                  <p className="text-xs text-slate-400 uppercase">Resolved</p>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-6 border border-amber-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <FileText className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">156</h3>
                  <p className="text-xs text-slate-400 uppercase">Resources Shared</p>
                </div>
              </div>
            </div>
            
            {/* Recent Discussions */}
            <div className="glass rounded-2xl border border-blue-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Discussions</h2>
              
              <div className="space-y-4">
                {networkMessages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg relative">
                        <span className="text-white font-bold">{msg.sender.split(' ')[1][0]}</span>
                        {msg.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 shadow-lg shadow-green-400/50"></span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-white">{msg.sender}</h4>
                            {msg.online && (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">
                                Online
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{msg.time}</span>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-3">{msg.message}</p>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>{msg.replies} Replies</span>
                          </button>
                          <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors">
                            <span>💬</span>
                            <span>Reply</span>
                          </button>
                          <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors">
                            <span>🔖</span>
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl py-3 border border-slate-700/50">
                Load More Discussions →
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">Messages</h1>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    End-to-End Encrypted
                  </span>
                </div>
                <p className="text-slate-400">Secure communication with your clients</p>
              </div>
            </div>
            <div className="glass rounded-2xl border border-blue-500/20 p-8 text-center">
              <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Message system coming soon</p>
            </div>
          </div>
        )}
        
        {activeTab === 'calendar' && (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Calendar</h1>
            <div className="glass rounded-2xl border border-blue-500/20 p-8 text-center">
              <CalendarIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Calendar feature coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
        
        {activeTab === 'documents' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">Document Management</h1>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    End-to-End Encrypted
                  </span>
                </div>
                <p className="text-sm text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Secure encrypted vault
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                Upload Document
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass rounded-2xl border border-blue-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">Total Documents</p>
                    <h3 className="text-3xl font-bold text-white">12</h3>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-2xl border border-purple-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl">💾</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">Storage Used</p>
                    <h3 className="text-3xl font-bold text-white">15.2 GB</h3>
                    <p className="text-xs text-slate-500">/ 50 GB</p>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-2xl border border-green-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">Recent Uploads</p>
                    <h3 className="text-3xl font-bold text-white">12</h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Documents Table */}
            <div className="glass rounded-2xl border border-blue-500/20 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-800/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Document Name</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Associated Case</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Size</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, idx) => (
                    <tr key={idx} className="border-b border-slate-800/30 hover:bg-slate-900/30 transition-all duration-200">
                      <td className="px-6 py-4 flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-white">{doc.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{doc.case}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-xs border border-slate-700/50">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{doc.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{doc.size}</td>
                      <td className="px-6 py-4">
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Earnings</h1>
                <p className="text-slate-600">Track your income and manage your finances.</p>
              </div>
              <Button className="bg-blue-700 hover:bg-blue-600 text-white rounded-xl px-6">
                Generate Report
              </Button>
            </div>
            
            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-2">Total Revenue</p>
                <h3 className="text-4xl font-bold">₹2,56,789.50</h3>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-2">This Month</p>
                <h3 className="text-4xl font-bold">₹15,430.00</h3>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-2">Pending Payments</p>
                <h3 className="text-4xl font-bold">₹8,200.00</h3>
              </div>
            </div>
            
            {/* Billing History */}
            <div className="bg-white rounded-2xl border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold">Billing History</h2>
              </div>
              
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Invoice ID</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Client Name</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Case</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Amount</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((bill, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{bill.invoice}</td>
                      <td className="px-6 py-4">{bill.client}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{bill.case}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{bill.date}</td>
                      <td className="px-6 py-4 font-semibold">{bill.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bill.status === 'Paid' ? 'bg-green-100 text-green-700' :
                          bill.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
