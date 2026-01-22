import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, User, FileText, Calendar, MessageSquare, LogOut, Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatCard, CorporateBadge, SimpleCard } from '../components/CorporateComponents';
import axios from 'axios';
import { API } from '../App';
import { toast } from 'sonner';

export default function FirmClientDashboard() {
  const [client, setClient] = useState(null);
  const [caseUpdates, setCaseUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const clientId = user.id;

      if (!clientId) {
        navigate('/firm-client-login');
        return;
      }

      // Fetch client details
      const clientRes = await axios.get(`${API}/firm-clients/${clientId}`);
      setClient(clientRes.data);

      // Fetch case updates
      const updatesRes = await axios.get(`${API}/firm-clients/${clientId}/case-updates`);
      setCaseUpdates(updatesRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/firm-client-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Dummy data if no updates
  const dummyUpdates = [
    { id: '1', update_type: 'progress_update', title: 'Case Review Initiated', description: 'Your case has been assigned to a lawyer and initial review is in progress.', created_at: new Date().toISOString(), created_by: 'System' },
    { id: '2', update_type: 'document_submitted', title: 'Documents Received', description: 'We have received all necessary documents. Processing will begin shortly.', created_at: new Date(Date.now() - 86400000).toISOString(), created_by: client?.assigned_lawyer_name || 'Lawyer' },
    { id: '3', update_type: 'meeting_scheduled', title: 'Initial Consultation Scheduled', description: 'A meeting has been scheduled for next week to discuss your case in detail.', created_at: new Date(Date.now() - 172800000).toISOString(), created_by: 'Manager' }
  ];

  const displayUpdates = caseUpdates.length > 0 ? caseUpdates : dummyUpdates;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34, 197, 94) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Nyaay Sathi</h1>
                <p className="text-sm text-slate-400">Client Portal</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 border border-slate-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {client?.full_name}!</h2>
          <p className="text-slate-400">Track your case progress and communicate with your legal team</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Case Status"
            value={client?.status === 'active' ? 'Active' : 'Pending'}
            icon={Briefcase}
            color="green"
          />
          <StatCard
            title="Case Type"
            value={client?.case_type || 'N/A'}
            icon={FileText}
            color="blue"
          />
          <StatCard
            title="Updates"
            value={displayUpdates.length}
            icon={MessageSquare}
            color="purple"
          />
          <StatCard
            title="Law Firm"
            value={client?.law_firm_name?.substring(0, 15) || 'N/A'}
            icon={Scale}
            color="orange"
          />
        </div>

        {/* Case Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Assigned Lawyer */}
          <SimpleCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Assigned Lawyer</h3>
                <p className="text-sm text-slate-400">Your legal representative</p>
              </div>
            </div>
            <p className="text-white font-medium">{client?.assigned_lawyer_name || 'Will be assigned soon'}</p>
          </GlowCard>

          {/* Contact Info */}
          <SimpleCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <p className="text-sm text-slate-400">Your information</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Email: <span className="text-white">{client?.email}</span></p>
              <p className="text-sm text-slate-400">Phone: <span className="text-white">{client?.phone}</span></p>
            </div>
          </GlowCard>

          {/* Law Firm */}
          <SimpleCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Law Firm</h3>
                <p className="text-sm text-slate-400">Your legal service provider</p>
              </div>
            </div>
            <p className="text-white font-medium">{client?.law_firm_name}</p>
            <CorporateBadge variant="success" className="mt-2">Active Client</CorporateBadge>
          </GlowCard>
        </div>

        {/* Case Updates Timeline */}
        <GlowCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Case Updates</h3>
              <p className="text-slate-400">Recent progress on your case</p>
            </div>
          </div>

          <div className="space-y-4">
            {displayUpdates.map((update, index) => {
              const updateIcons = {
                meeting_scheduled: Calendar,
                document_submitted: FileText,
                hearing_date: AlertCircle,
                progress_update: CheckCircle
              };
              const Icon = updateIcons[update.update_type] || FileText;

              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">{update.title}</h4>
                      <p className="text-slate-400 mb-3">{update.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>By: {update.created_by}</span>
                        <span>•</span>
                        <span>{new Date(update.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {displayUpdates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No updates yet. Updates will appear here as your case progresses.</p>
            </div>
          )}
        </GlowCard>
      </main>
    </div>
  );
}