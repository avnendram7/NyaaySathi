import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Scale, LogOut, LayoutDashboard, Calendar as CalendarIcon, MessageSquare, FileText, Users, TrendingUp, Search, MoreVertical, User, Clock, Phone, Video, CheckCircle, AlertCircle, Archive, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
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
          <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">MENU</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <button
            data-testid="lawyer-dashboard-nav"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            data-testid="lawyer-cases-nav"
            onClick={() => setActiveTab('cases')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'cases' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Cases</span>
          </button>
          
          <button
            data-testid="lawyer-calendar-nav"
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'calendar' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">Calendar</span>
          </button>
          
          <button
            data-testid="lawyer-messages-nav"
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'messages' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Messages</span>
          </button>
          
          <button
            data-testid="lawyer-documents-nav"
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'documents' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Documents</span>
          </button>
          
          <button
            data-testid="lawyer-network-nav"
            onClick={() => setActiveTab('network')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'network' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Lawyer Network</span>
            <span className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
          </button>
          
          <button
            data-testid="lawyer-earnings-nav"
            onClick={() => setActiveTab('earnings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'earnings' 
                ? 'bg-blue-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Earnings</span>
          </button>
        </nav>
        
        {/* New Case Button */}
        <div className="p-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-6">
            <span className="mr-2 text-2xl">+</span> New Case
          </Button>
        </div>
        
        {/* User Profile */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{user?.full_name || 'Lawyer'}</p>
              <p className="text-xs text-zinc-400">Criminal Law</p>
            </div>
            <button
              data-testid="lawyer-logout-btn"
              onClick={handleLogout}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-black">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-green-400 flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Wednesday, January 14
                </p>
                <h1 className="text-4xl font-bold text-white">
                  Good Morning, <span className="text-blue-400">Lawyer</span>
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all">
                  <Search className="w-5 h-5 text-zinc-400" />
                </button>
                <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all relative">
                  <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></span>
                  <span className="text-xl">🔔</span>
                </button>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6">
                  + New Case
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Active Cases</p>
                    <h3 className="text-4xl font-bold text-white">12</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-blue-400 font-semibold">+2 New</span>
                  <span className="ml-2 text-zinc-600">→</span>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Pending Actions</p>
                    <h3 className="text-4xl font-bold text-white">4</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm relative z-10">
                  <span className="text-amber-400 font-semibold">Urgent</span>
                  <span className="ml-2 text-zinc-500">→</span>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-500/40 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <span className="text-2xl text-white">₹</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Total Earnings</p>
                    <h3 className="text-4xl font-bold text-white">₹8,500</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm relative z-10">
                  <span className="text-green-400 font-semibold">+15% Growth</span>
                  <span className="ml-2 text-zinc-500">→</span>
                </div>
              </div>
            </div>
            
            {/* Schedule and Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Today's Schedule</h2>
                    <p className="text-sm text-zinc-400">You have 5 sessions remaining today</p>
                  </div>
                  <button className="text-zinc-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {todaySchedule.map((session, idx) => (
                    <div key={idx} className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      idx === 0 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-zinc-900/50 border border-zinc-800/50'
                    } hover:bg-zinc-800/70`}>
                      <div className="flex-shrink-0">
                        <div className={`w-1 h-12 rounded-full ${idx === 0 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-lg text-white">{session.time}</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-wider">{session.timeLabel}</p>
                          </div>
                          <div className="text-right flex-1 px-4">
                            <div className="flex items-center justify-end space-x-2 mb-1">
                              {session.type === 'Video' && <Video className="w-4 h-4 text-blue-400" />}
                              {session.type === 'Call' && <Phone className="w-4 h-4 text-zinc-400" />}
                              {session.type === 'In-Person' && <Users className="w-4 h-4 text-purple-400" />}
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                session.type === 'Video' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                session.type === 'Call' ? 'bg-slate-700/50 text-zinc-300 border border-slate-600/30' :
                                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              }`}>
                                {session.type}
                              </span>
                            </div>
                            <p className="font-semibold text-white">{session.client}</p>
                            <p className="text-xs text-zinc-400">{session.matter}</p>
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
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Messages</h2>
                  <button className="text-zinc-400 hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex items-start space-x-3 hover:bg-zinc-800/30 p-2 rounded-xl transition-all duration-300 cursor-pointer">
                      <div className={`w-10 h-10 ${msg.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <span className="text-white font-bold">{msg.initial}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-white">{msg.name}</p>
                          <span className="text-xs text-zinc-500">{msg.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate">{msg.message}</p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2 shadow-lg shadow-green-400/50" />
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl py-3 border border-zinc-800/50">
                  View All Messages →
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Cases Tab - Dark Theme */}
        {activeTab === 'cases' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white">Case Management</h1>
                <p className="text-zinc-400">Track your active cases, clients, and legal proceedings.</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                + New Case
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">124</h3>
                    <p className="text-xs text-zinc-400 uppercase">Total Cases</p>
                  </div>
                </div>
                <p className="text-xs text-blue-400 relative z-10">All Time</p>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-green-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">12</h3>
                    <p className="text-xs text-zinc-400 uppercase">Active</p>
                  </div>
                </div>
                <p className="text-xs text-green-400 relative z-10">Current</p>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-amber-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">8</h3>
                    <p className="text-xs text-zinc-400 uppercase">Pending</p>
                  </div>
                </div>
                <p className="text-xs text-amber-400 relative z-10">Needs Action</p>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-slate-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg flex items-center justify-center shadow-lg shadow-slate-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <Archive className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">104</h3>
                    <p className="text-xs text-zinc-400 uppercase">Archived</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 relative z-10">Closed</p>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search cases, clients..."
                  className="pl-10 bg-zinc-900/50 border-zinc-800/50 rounded-xl text-white placeholder-slate-500"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-zinc-800/50 text-zinc-300 hover:bg-zinc-800 rounded-xl">
                  <span className="mr-2">⚙️</span> Filter
                </Button>
                <select className="px-4 py-2 border border-zinc-800/50 rounded-xl bg-zinc-900/50 text-white">
                  <option>Sort by Date</option>
                </select>
              </div>
            </div>
            
            {/* Cases Table */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-900/50 border-b border-zinc-800/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Case Details</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Activity</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyCases.map((caseItem) => (
                    <tr key={caseItem.id} className="border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-all duration-200">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{caseItem.title}</p>
                        <p className="text-sm text-zinc-400">👤 {caseItem.client}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-300">{caseItem.type}</td>
                      <td className="px-6 py-4 text-sm text-zinc-400">{caseItem.activity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseItem.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          caseItem.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-slate-700/50 text-zinc-400 border border-slate-600/30'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-zinc-400 hover:text-white transition-colors">
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
        
        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
                <p className="text-zinc-400">Manage your hearings, consultations and appointments</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                + Add Event
              </Button>
            </div>
            
            {/* Calendar Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <p className="text-xs text-zinc-400 uppercase mb-2">Today</p>
                <h3 className="text-3xl font-bold text-white">3</h3>
                <p className="text-sm text-blue-400">Appointments</p>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/20">
                <p className="text-xs text-zinc-400 uppercase mb-2">This Week</p>
                <h3 className="text-3xl font-bold text-white">12</h3>
                <p className="text-sm text-amber-400">Hearings</p>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-6 border border-purple-500/20">
                <p className="text-xs text-zinc-400 uppercase mb-2">Upcoming</p>
                <h3 className="text-3xl font-bold text-white">8</h3>
                <p className="text-sm text-purple-400">Client Meetings</p>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-6 border border-green-500/20">
                <p className="text-xs text-zinc-400 uppercase mb-2">Completed</p>
                <h3 className="text-3xl font-bold text-white">156</h3>
                <p className="text-sm text-green-400">This Month</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mini Calendar */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                <h2 className="text-lg font-bold text-white mb-4">January 2026</h2>
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-xs text-zinc-500 font-semibold py-2">{day}</div>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const hasEvent = [5, 12, 14, 18, 20, 25, 28].includes(day);
                    const isToday = day === 20;
                    return (
                      <div
                        key={day}
                        className={`py-2 text-sm rounded-lg cursor-pointer transition-all ${
                          isToday ? 'bg-blue-600 text-white font-bold' :
                          hasEvent ? 'bg-blue-500/20 text-blue-400 font-semibold' :
                          'text-zinc-400 hover:bg-zinc-800'
                        }`}
                      >
                        {day}
                        {hasEvent && !isToday && <div className="w-1 h-1 bg-blue-400 rounded-full mx-auto mt-1"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Today's Schedule */}
              <div className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                <h2 className="text-lg font-bold text-white mb-4">Today's Schedule - January 20, 2026</h2>
                <div className="space-y-4">
                  {[
                    { time: '09:00 AM', title: 'Court Hearing - Property Dispute', client: 'Rajesh Kumar', location: 'Delhi High Court', type: 'hearing', status: 'upcoming' },
                    { time: '11:30 AM', title: 'Client Consultation', client: 'Priya Sharma', location: 'Video Call', type: 'video', status: 'upcoming' },
                    { time: '02:00 PM', title: 'Case Discussion', client: 'Amit Patel', location: 'Office', type: 'meeting', status: 'upcoming' },
                    { time: '04:30 PM', title: 'Document Review Meeting', client: 'Neha Gupta', location: 'Chamber', type: 'meeting', status: 'upcoming' },
                    { time: '06:00 PM', title: 'Bail Hearing Preparation', client: 'Vikram Singh', location: 'Tis Hazari Court', type: 'preparation', status: 'upcoming' }
                  ].map((event, idx) => (
                    <div key={idx} className={`flex items-center space-x-4 p-4 rounded-xl border ${
                      idx === 0 ? 'bg-blue-500/10 border-blue-500/30' : 'bg-zinc-900/50 border-zinc-800/50'
                    } hover:bg-zinc-800/50 transition-all`}>
                      <div className="flex-shrink-0 text-center w-20">
                        <p className="text-sm font-bold text-white">{event.time}</p>
                      </div>
                      <div className={`w-1 h-12 rounded-full ${
                        event.type === 'hearing' ? 'bg-red-500' :
                        event.type === 'video' ? 'bg-blue-500' :
                        event.type === 'meeting' ? 'bg-green-500' :
                        'bg-amber-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{event.title}</p>
                        <p className="text-sm text-zinc-400">👤 {event.client} • 📍 {event.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.type === 'video' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4">
                            <Video className="w-4 h-4 mr-1" /> Join
                          </Button>
                        )}
                        <button className="text-zinc-400 hover:text-white">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Upcoming Hearings */}
            <div className="mt-6 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Upcoming Court Hearings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { date: 'Jan 22', day: 'Wed', case: 'Kumar vs Builder Corp', court: 'Delhi High Court', time: '10:30 AM', type: 'Property' },
                  { date: 'Jan 24', day: 'Fri', case: 'Sharma Divorce Case', court: 'Family Court, Saket', time: '11:00 AM', type: 'Family' },
                  { date: 'Jan 27', day: 'Mon', case: 'Patel Consumer Rights', court: 'Consumer Forum', time: '02:00 PM', type: 'Consumer' },
                  { date: 'Jan 29', day: 'Wed', case: 'Singh vs Employer', court: 'Labour Court', time: '10:00 AM', type: 'Employment' },
                  { date: 'Feb 3', day: 'Mon', case: 'Gupta Bail Application', court: 'Sessions Court', time: '09:30 AM', type: 'Criminal' },
                  { date: 'Feb 5', day: 'Wed', case: 'Mehta Property Suit', court: 'Civil Court, Dwarka', time: '11:30 AM', type: 'Property' }
                ].map((hearing, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-center">
                        <p className="text-lg font-bold">{hearing.date.split(' ')[1]}</p>
                        <p className="text-xs">{hearing.date.split(' ')[0]}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        hearing.type === 'Property' ? 'bg-purple-500/20 text-purple-400' :
                        hearing.type === 'Family' ? 'bg-pink-500/20 text-pink-400' :
                        hearing.type === 'Consumer' ? 'bg-green-500/20 text-green-400' :
                        hearing.type === 'Employment' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{hearing.type}</span>
                    </div>
                    <h4 className="font-semibold text-white mb-1">{hearing.case}</h4>
                    <p className="text-xs text-zinc-400 mb-2">📍 {hearing.court}</p>
                    <p className="text-xs text-zinc-500">🕐 {hearing.time} • {hearing.day}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Messages Tab */}
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
                <p className="text-zinc-400">Secure communication with your clients</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                + New Message
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Conversations List */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-zinc-800/50">
                  <div className="relative">
                    <Search className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input placeholder="Search conversations..." className="pl-10 bg-zinc-900/50 border-zinc-800 rounded-xl text-white" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {[
                    { name: 'Rajesh Kumar', message: 'Sir, I have uploaded all the property documents...', time: '2 min', unread: 3, online: true, avatar: 'R', color: 'bg-blue-500' },
                    { name: 'Priya Sharma', message: 'Thank you for the update on my divorce case', time: '15 min', unread: 0, online: true, avatar: 'P', color: 'bg-purple-500' },
                    { name: 'Amit Patel', message: 'When is the next hearing date?', time: '1 hr', unread: 1, online: false, avatar: 'A', color: 'bg-amber-500' },
                    { name: 'Neha Gupta', message: 'Can we reschedule to next week?', time: '3 hr', unread: 0, online: true, avatar: 'N', color: 'bg-green-500' },
                    { name: 'Vikram Singh', message: 'The witness statement is ready', time: 'Yesterday', unread: 0, online: false, avatar: 'V', color: 'bg-red-500' },
                    { name: 'Sunita Devi', message: 'Please review the settlement amount', time: 'Yesterday', unread: 2, online: false, avatar: 'S', color: 'bg-pink-500' },
                    { name: 'Mohit Verma', message: 'FIR copy attached for your reference', time: '2 days', unread: 0, online: false, avatar: 'M', color: 'bg-cyan-500' },
                    { name: 'Kavita Sharma', message: 'Child custody papers signed', time: '3 days', unread: 0, online: true, avatar: 'K', color: 'bg-orange-500' }
                  ].map((chat, idx) => (
                    <div key={idx} className={`flex items-center space-x-3 p-4 cursor-pointer transition-all ${
                      idx === 0 ? 'bg-blue-500/10 border-l-4 border-blue-500' : 'hover:bg-zinc-800/50 border-l-4 border-transparent'
                    }`}>
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 ${chat.color} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold">{chat.avatar}</span>
                        </div>
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-white truncate">{chat.name}</p>
                          <span className="text-xs text-zinc-500">{chat.time}</span>
                        </div>
                        <p className="text-sm text-zinc-400 truncate">{chat.message}</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-bold">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Window */}
              <div className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">R</span>
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Rajesh Kumar</p>
                      <p className="text-xs text-green-400">Online • Property Dispute Case</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                      <Phone className="w-5 h-5 text-zinc-400" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                      <Video className="w-5 h-5 text-zinc-400" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                      <MoreVertical className="w-5 h-5 text-zinc-400" />
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Date Separator */}
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-500">Today</span>
                  </div>
                  
                  {/* Received Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4">
                        <p className="text-white text-sm">Namaste Sir, I wanted to update you on the property documents.</p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">10:30 AM</p>
                    </div>
                  </div>
                  
                  {/* Received Message with attachment */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4">
                        <p className="text-white text-sm mb-3">I have uploaded all the property documents as requested:</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-2">
                            <FileText className="w-5 h-5 text-red-400" />
                            <span className="text-sm text-zinc-300">Sale_Deed_2020.pdf</span>
                            <span className="text-xs text-zinc-500 ml-auto">2.4 MB</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-2">
                            <FileText className="w-5 h-5 text-red-400" />
                            <span className="text-sm text-zinc-300">Property_Registration.pdf</span>
                            <span className="text-xs text-zinc-500 ml-auto">1.8 MB</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">10:32 AM</p>
                    </div>
                  </div>
                  
                  {/* Sent Message */}
                  <div className="flex items-start justify-end space-x-3">
                    <div className="max-w-[70%]">
                      <div className="bg-blue-600 rounded-2xl rounded-tr-none p-4">
                        <p className="text-white text-sm">धन्यवाद Rajesh ji. I have received the documents. I will review them and get back to you by tomorrow.</p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 text-right">10:45 AM ✓✓</p>
                    </div>
                  </div>
                  
                  {/* Received Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4">
                        <p className="text-white text-sm">Sir, what are the chances of winning this case? The builder is very influential.</p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">11:00 AM</p>
                    </div>
                  </div>
                  
                  {/* Sent Message */}
                  <div className="flex items-start justify-end space-x-3">
                    <div className="max-w-[70%]">
                      <div className="bg-blue-600 rounded-2xl rounded-tr-none p-4">
                        <p className="text-white text-sm">Don't worry about that. We have strong documentation. The RERA Act is clearly in our favor. I am confident about a positive outcome. 👍</p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 text-right">11:15 AM ✓✓</p>
                    </div>
                  </div>
                  
                  {/* Received Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4">
                        <p className="text-white text-sm">That's a relief Sir. When is our next hearing?</p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">Just now</p>
                    </div>
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-zinc-800/50">
                  <div className="flex items-center space-x-3">
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                      <span className="text-xl">📎</span>
                    </button>
                    <Input
                      placeholder="Type your message..."
                      className="flex-1 bg-zinc-900/50 border-zinc-800 rounded-full px-5 text-white"
                    />
                    <Button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center">
                      <span className="text-xl">➤</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Documents Tab */}
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
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 "></span>
                  Secure encrypted vault
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                Upload Document
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Total Documents</p>
                    <h3 className="text-3xl font-bold text-white">12</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-purple-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl">💾</span>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Storage Used</p>
                    <h3 className="text-3xl font-bold text-white">15.2 GB</h3>
                    <p className="text-xs text-zinc-500">/ 50 GB</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-green-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Recent Uploads</p>
                    <h3 className="text-3xl font-bold text-white">12</h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Documents Table */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-900/50 border-b border-zinc-800/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Document Name</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Associated Case</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Size</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, idx) => (
                    <tr key={idx} className="border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-all duration-200">
                      <td className="px-6 py-4 flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-white">{doc.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">{doc.case}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-zinc-800/50 text-zinc-300 rounded-full text-xs border border-zinc-800/50">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">{doc.date}</td>
                      <td className="px-6 py-4 text-sm text-zinc-400">{doc.size}</td>
                      <td className="px-6 py-4">
                        <button className="text-zinc-400 hover:text-white transition-colors">
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
        
        {/* Lawyer Network Tab */}
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
                <p className="text-zinc-400">Connect, collaborate, and learn from fellow legal professionals</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right mr-4">
                  <p className="text-sm text-zinc-400">Active Lawyers</p>
                  <p className="text-2xl font-bold text-white">247</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                  + New Discussion
                </Button>
              </div>
            </div>
            
            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <Users className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">247</h3>
                  <p className="text-xs text-zinc-400 uppercase">Active Members</p>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">1,423</h3>
                  <p className="text-xs text-zinc-400 uppercase">Discussions</p>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl p-6 border border-green-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">892</h3>
                  <p className="text-xs text-zinc-400 uppercase">Resolved</p>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl p-6 border border-amber-500/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <FileText className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-1">156</h3>
                  <p className="text-xs text-zinc-400 uppercase">Resources Shared</p>
                </div>
              </div>
            </div>
            
            {/* Recent Discussions */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Discussions</h2>
              
              <div className="space-y-4">
                {networkMessages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/70 transition-all duration-300 cursor-pointer">
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
                          <span className="text-xs text-zinc-500">{msg.time}</span>
                        </div>
                        
                        <p className="text-zinc-300 text-sm mb-3">{msg.message}</p>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <button className="flex items-center space-x-1 text-zinc-400 hover:text-blue-400 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>{msg.replies} Replies</span>
                          </button>
                          <button className="flex items-center space-x-1 text-zinc-400 hover:text-blue-400 transition-colors">
                            <span>💬</span>
                            <span>Reply</span>
                          </button>
                          <button className="flex items-center space-x-1 text-zinc-400 hover:text-blue-400 transition-colors">
                            <span>🔖</span>
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl py-3 border border-zinc-800/50">
                Load More Discussions →
              </Button>
            </div>
          </div>
        )}
        
        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Earnings & Billing</h1>
                <p className="text-zinc-400">Track your income and manage your finances</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                Generate Report
              </Button>
            </div>
            
            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <p className="text-sm text-zinc-400 mb-2 relative z-10">Total Revenue</p>
                <h3 className="text-4xl font-bold text-white relative z-10">₹2,56,789.50</h3>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-green-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <p className="text-sm text-zinc-400 mb-2 relative z-10">This Month</p>
                <h3 className="text-4xl font-bold text-white relative z-10">₹15,430.00</h3>
              </div>
              
              <div className="bg-zinc-900 rounded-2xl border border-amber-500/20 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
                <p className="text-sm text-zinc-400 mb-2 relative z-10">Pending Payments</p>
                <h3 className="text-4xl font-bold text-white relative z-10">₹8,200.00</h3>
              </div>
            </div>
            
            {/* Billing History */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800">
              <div className="p-6 border-b border-zinc-800/50">
                <h2 className="text-xl font-bold text-white">Billing History</h2>
              </div>
              
              <table className="w-full">
                <thead className="bg-zinc-900/50 border-b border-zinc-800/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Invoice ID</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Client Name</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Case</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((bill, idx) => (
                    <tr key={idx} className="border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-all duration-200">
                      <td className="px-6 py-4 font-medium text-white">{bill.invoice}</td>
                      <td className="px-6 py-4 text-white">{bill.client}</td>
                      <td className="px-6 py-4 text-sm text-zinc-400">{bill.case}</td>
                      <td className="px-6 py-4 text-sm text-zinc-400">{bill.date}</td>
                      <td className="px-6 py-4 font-semibold text-white">{bill.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bill.status === 'Paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          bill.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
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
