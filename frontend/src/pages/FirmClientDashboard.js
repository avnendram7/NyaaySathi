import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, LogOut, User, Briefcase, Calendar, FileText, Clock, CheckCircle, MessageSquare, Phone, Mail, Building2, MapPin, Bell, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function FirmClientDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [caseUpdates, setCaseUpdates] = useState([]);

  // Dummy data for demo
  const dummyClient = {
    id: 'demo123',
    full_name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    law_firm_name: 'Shah & Associates',
    law_firm_id: '1',
    case_type: 'Civil Law',
    case_description: 'Property dispute case involving ancestral property in Delhi.',
    assigned_lawyer_name: 'Adv. Priya Sharma',
    assigned_lawyer_id: 'lawyer123',
    status: 'active',
    payment_status: 'paid',
    payment_amount: 2999,
    created_at: '2025-01-10T00:00:00'
  };

  const dummyCaseUpdates = [
    {
      id: '1',
      update_type: 'hearing_date',
      title: 'Court Hearing Scheduled',
      description: 'Your court hearing has been scheduled for February 15, 2025 at 10:00 AM in Civil Court, Delhi',
      created_at: '2025-01-22T10:00:00',
      created_by: 'Adv. Priya Sharma'
    },
    {
      id: '2',
      update_type: 'document_submitted',
      title: 'Documents Submitted to Court',
      description: 'All required documents including property papers and affidavits have been submitted. Waiting for court review.',
      created_at: '2025-01-20T15:30:00',
      created_by: 'Adv. Priya Sharma'
    },
    {
      id: '3',
      update_type: 'meeting_scheduled',
      title: 'Initial Consultation Completed',
      description: 'Initial consultation meeting completed. Case strategy discussed. Next review meeting scheduled for January 28, 2025.',
      created_at: '2025-01-18T09:00:00',
      created_by: 'Shah & Associates'
    },
    {
      id: '4',
      update_type: 'progress_update',
      title: 'Case Filed Successfully',
      description: 'Your case has been filed in the Delhi High Court. Case number: DHC/2025/CIV/1234',
      created_at: '2025-01-15T11:00:00',
      created_by: 'Adv. Priya Sharma'
    }
  ];

  const dummyLawyer = {
    name: 'Adv. Priya Sharma',
    specialization: 'Civil & Property Law',
    experience: '12+ years',
    phone: '+91 98765 43210',
    email: 'priya@shahandassociates.com',
    cases_won: 450,
    rating: 4.9
  };

  const upcomingEvents = [
    { date: 'Jan 28', title: 'Review Meeting', time: '3:00 PM', type: 'meeting' },
    { date: 'Feb 15', title: 'Court Hearing', time: '10:00 AM', type: 'hearing' },
    { date: 'Feb 20', title: 'Document Submission', time: '11:00 AM', type: 'deadline' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'firm_client') {
      // Use demo mode
      setClient(dummyClient);
      setCaseUpdates(dummyCaseUpdates);
      setLoading(false);
      return;
    }

    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (user && user.id) {
        setClient(user);
        
        // Fetch case updates
        try {
          const updatesRes = await axios.get(`${API}/firm-clients/${user.id}/case-updates`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCaseUpdates(updatesRes.data?.length > 0 ? updatesRes.data : dummyCaseUpdates);
        } catch {
          setCaseUpdates(dummyCaseUpdates);
        }
      } else {
        setClient(dummyClient);
        setCaseUpdates(dummyCaseUpdates);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setClient(dummyClient);
      setCaseUpdates(dummyCaseUpdates);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getUpdateIcon = (type) => {
    switch(type) {
      case 'hearing_date': return Calendar;
      case 'document_submitted': return FileText;
      case 'meeting_scheduled': return Clock;
      default: return Bell;
    }
  };

  const getUpdateColor = (type) => {
    switch(type) {
      case 'hearing_date': return 'from-blue-500 to-blue-600';
      case 'document_submitted': return 'from-green-500 to-green-600';
      case 'meeting_scheduled': return 'from-purple-500 to-purple-600';
      default: return 'from-orange-500 to-orange-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const displayClient = client || dummyClient;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
                <p className="text-xs text-blue-400">{displayClient.law_firm_name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">{displayClient.full_name}</p>
                <p className="text-xs text-slate-400">{displayClient.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {displayClient.full_name?.split(' ')[0]}!
          </h2>
          <p className="text-slate-400">
            Here's an overview of your case with {displayClient.law_firm_name}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="w-8 h-8 text-white/80" />
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-green-100 text-sm mb-1">Case Status</p>
            <p className="text-2xl font-bold text-white capitalize">{displayClient.status || 'Active'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-blue-100 text-sm mb-1">Next Hearing</p>
            <p className="text-xl font-bold text-white">Feb 15, 2025</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-purple-100 text-sm mb-1">Documents</p>
            <p className="text-2xl font-bold text-white">8</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Bell className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-orange-100 text-sm mb-1">Updates</p>
            <p className="text-2xl font-bold text-white">{caseUpdates.length}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Case Updates - Main Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Updates */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Case Updates</h3>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                  {caseUpdates.length} Updates
                </span>
              </div>

              <div className="space-y-4">
                {caseUpdates.map((update, index) => {
                  const Icon = getUpdateIcon(update.update_type);
                  const colorClass = getUpdateColor(update.update_type);
                  return (
                    <div 
                      key={update.id || index}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-white font-semibold">{update.title}</h4>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {new Date(update.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{update.description}</p>
                          <p className="text-xs text-slate-500">By: {update.created_by}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        event.type === 'hearing' ? 'bg-red-500/20 text-red-400' :
                        event.type === 'meeting' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{event.title}</p>
                        <p className="text-sm text-slate-400">{event.date} at {event.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Lawyer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Lawyer</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{displayClient.assigned_lawyer_name || dummyLawyer.name}</p>
                    <p className="text-sm text-indigo-400">{dummyLawyer.specialization}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-slate-400">{dummyLawyer.rating} ({dummyLawyer.cases_won} cases)</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-700 space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{dummyLawyer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{dummyLawyer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{dummyLawyer.experience} experience</span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message Lawyer
                </button>
              </div>
            </div>

            {/* Case Information */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Case Details</h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Law Firm</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <p className="text-white font-semibold">{displayClient.law_firm_name}</p>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Case Type</p>
                  <p className="text-white font-semibold capitalize">{displayClient.case_type}</p>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold capitalize">
                    {displayClient.status || 'Active'}
                  </span>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Started On</p>
                  <p className="text-white font-semibold">
                    {new Date(displayClient.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {displayClient.payment_status && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                    <p className="text-xs text-green-400 mb-1">Payment Status</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold capitalize">{displayClient.payment_status}</span>
                      <span className="text-green-400 font-bold">₹{displayClient.payment_amount}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upload Documents
                </button>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Request Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
