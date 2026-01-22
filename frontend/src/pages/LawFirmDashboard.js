import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Building2, LogOut, LayoutDashboard, Users, Calendar, FileText, TrendingUp, MessageSquare, Settings, Search, MoreVertical, Clock, CheckCircle, AlertCircle, Star, Phone, Video, Mail, MapPin, Briefcase, Scale, Shield, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function LawFirmDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dummy Data
  const firmStats = {
    totalLawyers: 12,
    activeCases: 48,
    monthlyRevenue: '₹4,85,000',
    clientSatisfaction: '94%',
    pendingConsultations: 8,
    casesWon: 156
  };

  const firmLawyers = [
    { id: 1, name: 'Adv. Rajesh Sharma', specialization: 'Criminal Law', experience: 15, rating: 4.8, activeCases: 8, status: 'active', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Adv. Priya Verma', specialization: 'Family Law', experience: 10, rating: 4.9, activeCases: 6, status: 'active', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Adv. Amit Kumar', specialization: 'Corporate Law', experience: 12, rating: 4.7, activeCases: 10, status: 'active', photo: 'https://randomuser.me/api/portraits/men/55.jpg' },
    { id: 4, name: 'Adv. Neha Singh', specialization: 'Property Law', experience: 8, rating: 4.6, activeCases: 5, status: 'active', photo: 'https://randomuser.me/api/portraits/women/67.jpg' },
    { id: 5, name: 'Adv. Vikram Patel', specialization: 'Tax Law', experience: 14, rating: 4.8, activeCases: 7, status: 'active', photo: 'https://randomuser.me/api/portraits/men/78.jpg' },
    { id: 6, name: 'Adv. Sunita Gupta', specialization: 'Labour Law', experience: 9, rating: 4.5, activeCases: 4, status: 'on_leave', photo: 'https://randomuser.me/api/portraits/women/89.jpg' },
    { id: 7, name: 'Adv. Rohit Mehta', specialization: 'Civil Law', experience: 11, rating: 4.7, activeCases: 6, status: 'active', photo: 'https://randomuser.me/api/portraits/men/91.jpg' },
    { id: 8, name: 'Adv. Kavita Reddy', specialization: 'Consumer Law', experience: 7, rating: 4.4, activeCases: 3, status: 'active', photo: 'https://randomuser.me/api/portraits/women/22.jpg' }
  ];

  const firmCases = [
    { id: 1, title: 'Sharma vs. Builder Corp', client: 'Rajesh Sharma', lawyer: 'Adv. Neha Singh', type: 'Property Law', status: 'Active', nextHearing: 'Jan 25, 2026', priority: 'high' },
    { id: 2, title: 'Gupta Divorce Case', client: 'Meena Gupta', lawyer: 'Adv. Priya Verma', type: 'Family Law', status: 'Active', nextHearing: 'Jan 28, 2026', priority: 'medium' },
    { id: 3, title: 'Patel vs. Employer', client: 'Amit Patel', lawyer: 'Adv. Sunita Gupta', type: 'Labour Law', status: 'Pending', nextHearing: 'Feb 2, 2026', priority: 'high' },
    { id: 4, title: 'Kumar Criminal Defense', client: 'Rahul Kumar', lawyer: 'Adv. Rajesh Sharma', type: 'Criminal Law', status: 'Active', nextHearing: 'Jan 22, 2026', priority: 'urgent' },
    { id: 5, title: 'Tech Corp Tax Appeal', client: 'Tech Corp Pvt Ltd', lawyer: 'Adv. Vikram Patel', type: 'Tax Law', status: 'Active', nextHearing: 'Feb 5, 2026', priority: 'medium' },
    { id: 6, title: 'Consumer Forum - Defective Product', client: 'Sunita Devi', lawyer: 'Adv. Kavita Reddy', type: 'Consumer Law', status: 'Won', nextHearing: '-', priority: 'low' }
  ];

  const upcomingHearings = [
    { date: 'Jan 22', day: 'Wed', case: 'Kumar Criminal Defense', court: 'Sessions Court, Saket', time: '10:30 AM', lawyer: 'Adv. Rajesh Sharma' },
    { date: 'Jan 25', day: 'Sat', case: 'Sharma vs. Builder Corp', court: 'Delhi High Court', time: '11:00 AM', lawyer: 'Adv. Neha Singh' },
    { date: 'Jan 28', day: 'Tue', case: 'Gupta Divorce Case', court: 'Family Court, Dwarka', time: '09:30 AM', lawyer: 'Adv. Priya Verma' },
    { date: 'Feb 2', day: 'Sun', case: 'Patel vs. Employer', court: 'Labour Court', time: '02:00 PM', lawyer: 'Adv. Sunita Gupta' }
  ];

  const recentActivity = [
    { type: 'case_update', message: 'Case hearing completed: Kumar Criminal Defense', time: '2 hours ago', icon: Scale },
    { type: 'client_message', message: 'New message from Rajesh Sharma', time: '4 hours ago', icon: MessageSquare },
    { type: 'document', message: 'Documents uploaded for Gupta Divorce Case', time: '6 hours ago', icon: FileText },
    { type: 'payment', message: 'Payment received: ₹25,000 from Tech Corp', time: 'Yesterday', icon: TrendingUp },
    { type: 'lawyer', message: 'Adv. Sunita Gupta marked as on leave', time: 'Yesterday', icon: Users }
  ];

  const clientMessages = [
    { name: 'Rajesh Sharma', message: 'When is my next hearing date?', time: '10 min', unread: true, avatar: 'R', color: 'bg-blue-500' },
    { name: 'Meena Gupta', message: 'Thank you for the update on my case', time: '1 hr', unread: false, avatar: 'M', color: 'bg-purple-500' },
    { name: 'Tech Corp (Vikram)', message: 'Please review the tax documents', time: '3 hr', unread: true, avatar: 'T', color: 'bg-amber-500' },
    { name: 'Sunita Devi', message: 'Case won! Thank you so much!', time: 'Yesterday', unread: false, avatar: 'S', color: 'bg-green-500' }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-blue-500/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold block text-white">NyaaySathi</span>
              <span className="text-xs text-blue-400">LAW FIRM PORTAL</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="px-6 py-3">
          <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">MENU</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'lawyers', icon: Users, label: 'Manage Lawyers' },
            { id: 'clients', icon: Shield, label: 'Client Applications', badge: 3 },
            { id: 'cases', icon: FileText, label: 'Cases' },
            { id: 'calendar', icon: Calendar, label: 'Calendar' },
            { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 2 },
            { id: 'reports', icon: TrendingUp, label: 'Reports' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(item => (
            <button
              key={item.id}
              data-testid={`lawfirm-${item.id}-nav`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Add Lawyer Button */}
        <div className="p-4">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl py-6 shadow-lg shadow-blue-500/50">
            <Plus className="w-5 h-5 mr-2" /> Add Lawyer
          </Button>
        </div>

        {/* Firm Profile */}
        <div className="p-4 border-t border-blue-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{user?.firm_name || user?.full_name || 'Law Firm'}</p>
              <p className="text-xs text-blue-400">Premium Partner</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors">
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
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-green-400 flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Monday, January 20, 2026
                </p>
                <h1 className="text-4xl font-bold text-white">
                  Welcome, <span className="text-blue-400">{user?.firm_name || 'Law Firm'}</span>
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input placeholder="Search..." className="pl-10 bg-slate-900/50 border-slate-700 rounded-xl w-64 text-white" />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                  + New Case
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Lawyers', value: firmStats.totalLawyers, icon: Users, color: 'blue', subtext: '2 on leave' },
                { label: 'Active Cases', value: firmStats.activeCases, icon: FileText, color: 'purple', subtext: '+5 this month' },
                { label: 'Monthly Revenue', value: firmStats.monthlyRevenue, icon: TrendingUp, color: 'green', subtext: '+18% growth' },
                { label: 'Client Rating', value: firmStats.clientSatisfaction, icon: Star, color: 'amber', subtext: 'Excellent' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`glass rounded-2xl p-6 border border-${stat.color}-500/20 relative overflow-hidden group hover:border-${stat.color}-500/40 transition-all duration-300`}
                >
                  <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:bg-${stat.color}-500/20 transition-all duration-500`}></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-700 rounded-xl flex items-center justify-center shadow-lg shadow-${stat.color}-500/50`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    </div>
                  </div>
                  <p className={`text-sm text-${stat.color}-400 relative z-10`}>{stat.subtext}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Hearings */}
              <div className="lg:col-span-2 glass rounded-2xl border border-blue-500/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Upcoming Hearings</h2>
                  <Button variant="ghost" className="text-slate-400 hover:text-white">View All</Button>
                </div>
                <div className="space-y-4">
                  {upcomingHearings.map((hearing, idx) => (
                    <div key={idx} className={`flex items-center space-x-4 p-4 rounded-xl ${idx === 0 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-slate-900/50 border border-slate-800/50'} hover:bg-slate-800/50 transition-all`}>
                      <div className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-center min-w-[60px]">
                        <p className="text-lg font-bold">{hearing.date.split(' ')[1]}</p>
                        <p className="text-xs">{hearing.date.split(' ')[0]}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{hearing.case}</p>
                        <p className="text-sm text-slate-400">📍 {hearing.court}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300">{hearing.time}</p>
                        <p className="text-xs text-blue-400">{hearing.lawyer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Top Performing Lawyers */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Top Performing Lawyers</h2>
                <div className="space-y-3">
                  {firmLawyers.slice(0, 4).map((lawyer, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all">
                      <img src={lawyer.photo} alt={lawyer.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{lawyer.name}</p>
                        <p className="text-xs text-slate-400">{lawyer.specialization}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-sm font-semibold">{lawyer.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Messages */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Client Messages</h2>
                <div className="space-y-3">
                  {clientMessages.map((msg, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer">
                      <div className={`w-10 h-10 ${msg.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold">{msg.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">{msg.name}</p>
                        <p className="text-xs text-slate-400 truncate">{msg.message}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500">{msg.time}</span>
                        {msg.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lawyers Tab */}
        {activeTab === 'lawyers' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Our Lawyers</h1>
                <p className="text-slate-400">Manage your firm's legal team</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                <Plus className="w-4 h-4 mr-2" /> Add Lawyer
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <p className="text-xs text-slate-400 uppercase mb-2">Total Lawyers</p>
                <h3 className="text-3xl font-bold text-white">{firmLawyers.length}</h3>
              </div>
              <div className="glass rounded-2xl border border-green-500/20 p-6">
                <p className="text-xs text-slate-400 uppercase mb-2">Active</p>
                <h3 className="text-3xl font-bold text-white">{firmLawyers.filter(l => l.status === 'active').length}</h3>
              </div>
              <div className="glass rounded-2xl border border-amber-500/20 p-6">
                <p className="text-xs text-slate-400 uppercase mb-2">On Leave</p>
                <h3 className="text-3xl font-bold text-white">{firmLawyers.filter(l => l.status === 'on_leave').length}</h3>
              </div>
              <div className="glass rounded-2xl border border-purple-500/20 p-6">
                <p className="text-xs text-slate-400 uppercase mb-2">Total Cases</p>
                <h3 className="text-3xl font-bold text-white">{firmLawyers.reduce((sum, l) => sum + l.activeCases, 0)}</h3>
              </div>
            </div>

            {/* Lawyers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firmLawyers.map(lawyer => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img src={lawyer.photo} alt={lawyer.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/30" />
                      <div>
                        <h3 className="font-semibold text-white">{lawyer.name}</h3>
                        <p className="text-sm text-blue-400">{lawyer.specialization}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lawyer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {lawyer.status === 'active' ? 'Active' : 'On Leave'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{lawyer.experience}</p>
                      <p className="text-xs text-slate-400">Years Exp</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{lawyer.activeCases}</p>
                      <p className="text-xs text-slate-400">Active Cases</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-amber-400 flex items-center justify-center">
                        <Star className="w-4 h-4 fill-amber-400 mr-1" />{lawyer.rating}
                      </p>
                      <p className="text-xs text-slate-400">Rating</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button size="sm" className="flex-1 bg-slate-700/50 text-slate-300 hover:bg-slate-700 rounded-lg">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Cases Tab */}
        {activeTab === 'cases' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Case Management</h1>
                <p className="text-slate-400">Track all firm cases and their progress</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-500/50">
                + New Case
              </Button>
            </div>

            {/* Cases Table */}
            <div className="glass rounded-2xl border border-blue-500/20 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-800/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Case</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Client</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Lawyer</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Type</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Next Hearing</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {firmCases.map(caseItem => (
                    <tr key={caseItem.id} className="border-b border-slate-800/30 hover:bg-slate-900/30 transition-all">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{caseItem.title}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{caseItem.client}</td>
                      <td className="px-6 py-4 text-blue-400">{caseItem.lawyer}</td>
                      <td className="px-6 py-4 text-slate-400">{caseItem.type}</td>
                      <td className="px-6 py-4 text-slate-300">{caseItem.nextHearing}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseItem.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          caseItem.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                          caseItem.status === 'Won' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-slate-700/50 text-slate-400'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseItem.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                          caseItem.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                          caseItem.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-slate-700/50 text-slate-400'
                        }`}>
                          {caseItem.priority}
                        </span>
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
                <h1 className="text-3xl font-bold text-white mb-2">Firm Calendar</h1>
                <p className="text-slate-400">All hearings and appointments across your firm</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl px-6">
                + Add Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Grid */}
              <div className="lg:col-span-2 glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-lg font-bold text-white mb-4">January 2026</h2>
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-xs text-slate-500 font-semibold py-2">{day}</div>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const hasEvent = [20, 22, 25, 28].includes(day);
                    const isToday = day === 20;
                    return (
                      <div
                        key={day}
                        className={`py-3 text-sm rounded-lg cursor-pointer transition-all ${
                          isToday ? 'bg-blue-600 text-white font-bold' :
                          hasEvent ? 'bg-blue-500/20 text-blue-400 font-semibold' :
                          'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {day}
                        {hasEvent && !isToday && <div className="w-1 h-1 bg-blue-400 rounded-full mx-auto mt-1"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-lg font-bold text-white mb-4">This Week</h2>
                <div className="space-y-4">
                  {upcomingHearings.map((hearing, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-blue-400 font-semibold">{hearing.date} • {hearing.time}</span>
                      </div>
                      <p className="font-semibold text-white text-sm">{hearing.case}</p>
                      <p className="text-xs text-slate-400">{hearing.lawyer}</p>
                      <p className="text-xs text-slate-500">📍 {hearing.court}</p>
                    </div>
                  ))}
                </div>
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
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center">
                    <Shield className="w-3 h-3 mr-1" /> Encrypted
                  </span>
                </div>
                <p className="text-slate-400">Communication with clients and team</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Conversations List */}
              <div className="glass rounded-2xl border border-blue-500/20 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-800/50">
                  <div className="relative">
                    <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input placeholder="Search messages..." className="pl-10 bg-slate-900/50 border-slate-700 rounded-xl text-white" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {clientMessages.concat([
                    { name: 'Internal: Legal Team', message: 'Meeting tomorrow at 10 AM', time: '2 hr', unread: false, avatar: 'L', color: 'bg-indigo-500' },
                    { name: 'Rahul Kumar', message: 'Bail was granted, thank you!', time: '3 hr', unread: true, avatar: 'R', color: 'bg-red-500' }
                  ]).map((chat, idx) => (
                    <div key={idx} className={`flex items-center space-x-3 p-4 cursor-pointer transition-all ${
                      idx === 0 ? 'bg-blue-500/10 border-l-4 border-blue-500' : 'hover:bg-slate-800/50 border-l-4 border-transparent'
                    }`}>
                      <div className={`w-12 h-12 ${chat.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold">{chat.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-white truncate">{chat.name}</p>
                          <span className="text-xs text-slate-500">{chat.time}</span>
                        </div>
                        <p className="text-sm text-slate-400 truncate">{chat.message}</p>
                      </div>
                      {chat.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="lg:col-span-2 glass rounded-2xl border border-blue-500/20 flex flex-col">
                <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Rajesh Sharma</p>
                      <p className="text-xs text-green-400">Online • Property Dispute Case</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700">
                      <Phone className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700">
                      <Video className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-500">Today</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4">
                        <p className="text-white text-sm">When is my next hearing date? I need to prepare the documents.</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end">
                    <div className="max-w-[70%]">
                      <div className="bg-blue-600 rounded-2xl rounded-tr-none p-4">
                        <p className="text-white text-sm">Your next hearing is on January 25th at Delhi High Court. I'll send you the document checklist shortly.</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 text-right">10:45 AM ✓✓</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-800/50">
                  <div className="flex items-center space-x-3">
                    <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700">
                      <span className="text-xl">📎</span>
                    </button>
                    <Input placeholder="Type your message..." className="flex-1 bg-slate-900/50 border-slate-700 rounded-full px-5 text-white" />
                    <Button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center">
                      <span className="text-xl">➤</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab - Now Reports */}
        {activeTab === 'reports' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Firm Reports</h1>
                <p className="text-slate-400">Comprehensive reports on lawyers, tasks, and performance</p>
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300">
                Download Report
              </Button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <p className="text-sm text-slate-400 mb-2">Total Lawyers</p>
                <h3 className="text-4xl font-bold text-white">{firmLawyers.length}</h3>
                <p className="text-sm text-green-400 mt-2">{firmLawyers.filter(l => l.status === 'active').length} active</p>
              </div>
              <div className="glass rounded-2xl border border-green-500/20 p-6">
                <p className="text-sm text-slate-400 mb-2">Tasks Completed</p>
                <h3 className="text-4xl font-bold text-white">156</h3>
                <p className="text-sm text-green-400 mt-2">+12 this week</p>
              </div>
              <div className="glass rounded-2xl border border-amber-500/20 p-6">
                <p className="text-sm text-slate-400 mb-2">Pending Tasks</p>
                <h3 className="text-4xl font-bold text-white">23</h3>
                <p className="text-sm text-amber-400 mt-2">5 urgent</p>
              </div>
              <div className="glass rounded-2xl border border-purple-500/20 p-6">
                <p className="text-sm text-slate-400 mb-2">Completion Rate</p>
                <h3 className="text-4xl font-bold text-white">87%</h3>
                <p className="text-sm text-green-400 mt-2">+5% vs last month</p>
              </div>
            </div>

            {/* Lawyer Performance Report */}
            <div className="glass rounded-2xl border border-blue-500/20 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Lawyer Performance Report</h2>
              <table className="w-full">
                <thead className="border-b border-slate-800/50">
                  <tr>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Lawyer</th>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Specialization</th>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Tasks</th>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Completion</th>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Active Cases</th>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Rating</th>
                    <th className="text-left py-3 text-xs text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {firmLawyers.map((lawyer, idx) => (
                    <tr key={idx} className="border-b border-slate-800/30 hover:bg-slate-900/30">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img src={lawyer.photo} alt="" className="w-10 h-10 rounded-full border-2 border-blue-500/30" />
                          <span className="text-white font-medium">{lawyer.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-blue-400">{lawyer.specialization}</td>
                      <td className="py-4 text-slate-300">{15 + idx * 3} / {20 + idx * 3}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                              style={{ width: `${75 + idx * 3}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-400 text-sm">{75 + idx * 3}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-white font-semibold">{lawyer.activeCases}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>{lawyer.rating}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lawyer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {lawyer.status === 'active' ? 'Active' : 'On Leave'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Revenue & Cases Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Revenue by Practice Area</h2>
                <div className="space-y-4">
                  {[
                    { area: 'Criminal Law', revenue: '₹12,50,000', percent: 25 },
                    { area: 'Corporate Law', revenue: '₹15,00,000', percent: 30 },
                    { area: 'Family Law', revenue: '₹8,00,000', percent: 16 },
                    { area: 'Property Law', revenue: '₹10,50,000', percent: 21 },
                    { area: 'Tax Law', revenue: '₹4,00,000', percent: 8 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.area}</span>
                        <span className="text-slate-400">{item.revenue}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Case Status Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-3xl font-bold text-white">156</h3>
                    <p className="text-sm text-green-400">Cases Won</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="text-3xl font-bold text-white">48</h3>
                    <p className="text-sm text-blue-400">Active Cases</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h3 className="text-3xl font-bold text-white">12</h3>
                    <p className="text-sm text-amber-400">Pending Review</p>
                  </div>
                  <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-4 text-center">
                    <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <h3 className="text-3xl font-bold text-white">216</h3>
                    <p className="text-sm text-slate-400">Total Cases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Firm Settings</h1>
                <p className="text-slate-400">Manage your firm profile and preferences</p>
              </div>
            </div>

            <div className="max-w-2xl space-y-6">
              <div className="glass rounded-2xl border border-blue-500/20 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Firm Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Firm Name</label>
                    <Input defaultValue={user?.firm_name || user?.full_name || 'Sharma & Associates'} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Contact Email</label>
                    <Input defaultValue={user?.email || 'contact@sharmaassociates.com'} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Phone</label>
                    <Input defaultValue="+91 98765 43210" className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Address</label>
                    <Input defaultValue="123 Legal Complex, Connaught Place, New Delhi - 110001" className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>
                <Button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white">Save Changes</Button>
              </div>

              <div className="glass rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Subscription</h2>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl border border-blue-500/30">
                  <div>
                    <p className="font-semibold text-white">Premium Partner Plan</p>
                    <p className="text-sm text-slate-400">₹25,000/month • Unlimited lawyers</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
