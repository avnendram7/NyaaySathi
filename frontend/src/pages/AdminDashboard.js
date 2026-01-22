import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Scale, Users, CheckCircle, XCircle, Clock, Eye, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Star, ArrowLeft, Loader2, RefreshCw, LogOut, Building2, Globe, FileText, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('lawyers'); // 'lawyers', 'lawfirms', 'firmlawyers', or 'firmclients'
  
  // Lawyer applications state
  const [lawyerApplications, setLawyerApplications] = useState([]);
  const [lawyerStats, setLawyerStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  
  // Law Firm applications state
  const [lawfirmApplications, setLawfirmApplications] = useState([]);
  const [lawfirmStats, setLawfirmStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  
  // Firm Lawyer applications state
  const [firmLawyerApplications, setFirmLawyerApplications] = useState([]);
  const [firmLawyerStats, setFirmLawyerStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  
  // Firm Client applications state
  const [firmClientApplications, setFirmClientApplications] = useState([]);
  const [firmClientStats, setFirmClientStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [filter, setFilter] = useState('pending');

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
    } else {
      fetchAllApplications();
    }
  }, [navigate]);

  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch lawyer applications
      const lawyerRes = await axios.get(`${API}/admin/lawyer-applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLawyerApplications(lawyerRes.data.applications || []);
      setLawyerStats(lawyerRes.data.stats || { pending: 0, approved: 0, rejected: 0 });
      
      // Fetch law firm applications
      try {
        const firmRes = await axios.get(`${API}/admin/lawfirm-applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLawfirmApplications(firmRes.data.applications || []);
        setLawfirmStats(firmRes.data.stats || { pending: 0, approved: 0, rejected: 0 });
      } catch (e) {
        // Law firm endpoint might not exist yet
        setLawfirmApplications([]);
        setLawfirmStats({ pending: 0, approved: 0, rejected: 0 });
      }
      
      // Fetch firm lawyer applications
      try {
        const firmLawyerRes = await axios.get(`${API}/firm-lawyers/applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const apps = firmLawyerRes.data || [];
        setFirmLawyerApplications(apps);
        setFirmLawyerStats({
          pending: apps.filter(a => a.status === 'pending').length,
          approved: apps.filter(a => a.status === 'approved').length,
          rejected: apps.filter(a => a.status === 'rejected').length
        });
      } catch (e) {
        setFirmLawyerApplications([]);
        setFirmLawyerStats({ pending: 0, approved: 0, rejected: 0 });
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
      } else {
        toast.error('Failed to fetch applications');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLawyerAction = async (appId, action) => {
    setActionLoading(appId);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API}/admin/lawyer-applications/${appId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Lawyer application ${action}ed successfully!`);
      setSelectedApp(null);
      fetchAllApplications();
    } catch (error) {
      toast.error(`Failed to ${action} application`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLawfirmAction = async (appId, action) => {
    setActionLoading(appId);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API}/admin/lawfirm-applications/${appId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Law firm application ${action}ed successfully!`);
      setSelectedApp(null);
      fetchAllApplications();
    } catch (error) {
      toast.error(`Failed to ${action} application`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleFirmLawyerAction = async (appId, action) => {
    setActionLoading(appId);
    try {
      const token = localStorage.getItem('adminToken');
      const status = action === 'approve' ? 'approved' : 'rejected';
      await axios.put(`${API}/firm-lawyers/applications/${appId}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Firm lawyer application ${action}d successfully!`);
      setSelectedApp(null);
      fetchAllApplications();
    } catch (error) {
      toast.error(`Failed to ${action} application`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  // Get current applications based on active section
  const currentApplications = activeSection === 'lawyers' ? lawyerApplications : 
                              activeSection === 'lawfirms' ? lawfirmApplications : firmLawyerApplications;
  const currentStats = activeSection === 'lawyers' ? lawyerStats : 
                       activeSection === 'lawfirms' ? lawfirmStats : firmLawyerStats;

  const filteredApps = currentApplications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  // Lawyer Application Card
  const LawyerApplicationCard = ({ app }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 cursor-pointer hover:border-purple-500/50 transition-all"
      onClick={() => setSelectedApp({ ...app, type: 'lawyer' })}
    >
      <div className="flex items-start gap-4">
        <img
          src={app.photo || `https://randomuser.me/api/portraits/men/${parseInt(app._id?.slice(-2) || '10', 16) % 90}.jpg`}
          alt={app.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-slate-600"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white truncate">{app.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
              app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
            </span>
          </div>
          <p className="text-purple-400 text-sm">{app.specialization}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {app.city}, {app.state}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {app.experience} yrs
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
        <span className="text-xs text-slate-500">
          Applied: {new Date(app.created_at).toLocaleDateString()}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </Button>
      </div>
    </motion.div>
  );

  // Law Firm Application Card
  const LawFirmApplicationCard = ({ app }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 cursor-pointer hover:border-blue-500/50 transition-all"
      onClick={() => setSelectedApp({ ...app, type: 'lawfirm' })}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
          <Building2 className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white truncate">{app.firm_name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
              app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
            </span>
          </div>
          <p className="text-blue-400 text-sm">{app.practice_areas?.slice(0, 2).join(', ')}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {app.city}, {app.state}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {app.total_lawyers} lawyers
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
        <span className="text-xs text-slate-500">
          Applied: {new Date(app.created_at).toLocaleDateString()}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </Button>
      </div>
    </motion.div>
  );

  // Firm Lawyer Application Card
  const FirmLawyerApplicationCard = ({ app }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 cursor-pointer hover:border-emerald-500/50 transition-all"
      onClick={() => setSelectedApp({ ...app, type: 'firmlawyer' })}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center">
          <Users className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white truncate">{app.full_name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
              app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
            </span>
          </div>
          <p className="text-emerald-400 text-sm">{app.specialization}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {app.firm_name}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {app.experience_years} yrs
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
        <span className="text-xs text-slate-500">
          Applied: {new Date(app.created_at).toLocaleDateString()}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </Button>
      </div>
    </motion.div>
  );

  // Lawyer Application Modal
  const LawyerApplicationModal = ({ app, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-start gap-4">
          <img
            src={app.photo || `https://randomuser.me/api/portraits/men/${parseInt(app._id?.slice(-2) || '10', 16) % 90}.jpg`}
            alt={app.name}
            className="w-20 h-20 rounded-xl object-cover border-2 border-purple-500"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{app.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
              </span>
            </div>
            <p className="text-purple-400">{app.specialization}</p>
            <p className="text-slate-400 text-sm">Bar Council: {app.bar_council_number}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Mail className="w-4 h-4" />
                <span className="text-xs">Email</span>
              </div>
              <p className="text-white">{app.email}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Phone className="w-4 h-4" />
                <span className="text-xs">Phone</span>
              </div>
              <p className="text-white">{app.phone}</p>
            </div>
          </div>

          {/* Professional Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">{app.experience}</p>
              <p className="text-slate-400 text-sm">Years Exp</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{app.cases_won || 0}</p>
              <p className="text-slate-400 text-sm">Cases Won</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-lg font-bold text-amber-400">{app.fee_range}</p>
              <p className="text-slate-400 text-sm">Fee Range</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Location & Court</h3>
            <p className="text-white">{app.city}, {app.state}</p>
            <p className="text-slate-400">{app.court}</p>
          </div>

          {/* Education */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Education</h3>
            <p className="text-white">{app.education}</p>
          </div>

          {/* Languages */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {app.languages?.map(lang => (
                <span key={lang} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Professional Bio</h3>
            <p className="text-slate-300">{app.bio}</p>
          </div>

          {/* Actions */}
          {app.status === 'pending' && (
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => handleLawyerAction(app._id, 'approve')}
                disabled={actionLoading === app._id}
                className="flex-1 bg-green-600 hover:bg-green-500 rounded-full"
              >
                {actionLoading === app._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleLawyerAction(app._id, 'reject')}
                disabled={actionLoading === app._id}
                variant="outline"
                className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10 rounded-full"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  // Law Firm Application Modal
  const LawFirmApplicationModal = ({ app, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-start gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{app.firm_name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
              </span>
            </div>
            <p className="text-blue-400">Est. {app.established_year}</p>
            <p className="text-slate-400 text-sm">Reg: {app.registration_number}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Person */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-3">Contact Person</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Name</p>
                <p className="text-white">{app.contact_name}</p>
                {app.contact_designation && (
                  <p className="text-slate-400 text-sm">{app.contact_designation}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-white">{app.contact_email}</p>
                <p className="text-slate-400 text-sm">{app.contact_phone}</p>
              </div>
            </div>
          </div>

          {/* Firm Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{app.total_lawyers}</p>
              <p className="text-slate-400 text-sm">Lawyers</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{app.total_staff || 0}</p>
              <p className="text-slate-400 text-sm">Staff</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">{2026 - app.established_year}</p>
              <p className="text-slate-400 text-sm">Years Old</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Location</h3>
            <p className="text-white">{app.address || `${app.city}, ${app.state}`}</p>
            <p className="text-slate-400">{app.city}, {app.state} {app.pincode && `- ${app.pincode}`}</p>
            {app.website && (
              <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm flex items-center gap-1 mt-2 hover:underline">
                <Globe className="w-4 h-4" />
                {app.website}
              </a>
            )}
          </div>

          {/* Practice Areas */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Practice Areas</h3>
            <div className="flex flex-wrap gap-2">
              {app.practice_areas?.map(area => (
                <span key={area} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">About the Firm</h3>
            <p className="text-slate-300">{app.description}</p>
          </div>

          {/* Achievements */}
          {app.achievements && (
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Achievements</h3>
              <p className="text-slate-300">{app.achievements}</p>
            </div>
          )}

          {/* Actions */}
          {app.status === 'pending' && (
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => handleLawfirmAction(app._id, 'approve')}
                disabled={actionLoading === app._id}
                className="flex-1 bg-green-600 hover:bg-green-500 rounded-full"
              >
                {actionLoading === app._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleLawfirmAction(app._id, 'reject')}
                disabled={actionLoading === app._id}
                variant="outline"
                className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10 rounded-full"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  // Firm Lawyer Application Modal
  const FirmLawyerApplicationModal = ({ app, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-start gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{app.full_name}</h2>
              <button onClick={onClose} className="text-slate-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-emerald-400">{app.specialization}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {app.firm_name}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {app.experience_years} years
              </span>
            </div>
            <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
              app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
              app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Email</h3>
              <p className="text-white">{app.email}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Phone</h3>
              <p className="text-white">{app.phone}</p>
            </div>
          </div>

          {/* Professional Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Bar Council Number</h3>
              <p className="text-white">{app.bar_council_number || 'Not provided'}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Education</h3>
              <p className="text-white">{app.education || 'Not provided'}</p>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {(app.languages || ['Hindi', 'English']).map((lang, idx) => (
                <span key={idx} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          {app.bio && (
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">About</h3>
              <p className="text-slate-300">{app.bio}</p>
            </div>
          )}

          {/* Actions */}
          {app.status === 'pending' && (
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => handleFirmLawyerAction(app.id, 'approve')}
                disabled={actionLoading === app.id}
                className="flex-1 bg-green-600 hover:bg-green-500 rounded-full"
              >
                {actionLoading === app.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleFirmLawyerAction(app.id, 'reject')}
                disabled={actionLoading === app.id}
                variant="outline"
                className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10 rounded-full"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-400">Manage applications</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchAllApplications}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setActiveSection('lawyers'); setFilter('pending'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'lawyers'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <User className="w-5 h-5" />
            Lawyer Applications
            {lawyerStats.pending > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                {lawyerStats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveSection('lawfirms'); setFilter('pending'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'lawfirms'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Law Firm Applications
            {lawfirmStats.pending > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                {lawfirmStats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveSection('firmlawyers'); setFilter('pending'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'firmlawyers'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Users className="w-5 h-5" />
            Firm Lawyer Applications
            {firmLawyerStats.pending > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                {firmLawyerStats.pending}
              </span>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-500/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-white">{currentStats.pending}</p>
              </div>
              <Clock className="w-10 h-10 text-amber-500/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm">Approved</p>
                <p className="text-3xl font-bold text-white">{currentStats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-white">{currentStats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500/50" />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['pending', 'approved', 'rejected', 'all'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? activeSection === 'lawyers' ? 'bg-purple-600 text-white' : 
                    activeSection === 'lawfirms' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-20">
            {activeSection === 'lawyers' ? (
              <User className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            ) : activeSection === 'lawfirms' ? (
              <Building2 className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            ) : (
              <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            )}
            <p className="text-slate-400">
              No {filter === 'all' ? '' : filter} {activeSection === 'lawyers' ? 'lawyer' : activeSection === 'lawfirms' ? 'law firm' : 'firm lawyer'} applications found
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map(app => (
              activeSection === 'lawyers' 
                ? <LawyerApplicationCard key={app._id || app.id} app={app} />
                : activeSection === 'lawfirms'
                  ? <LawFirmApplicationCard key={app._id || app.id} app={app} />
                  : <FirmLawyerApplicationCard key={app._id || app.id} app={app} />
            ))}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          selectedApp.type === 'lawyer' 
            ? <LawyerApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />
            : selectedApp.type === 'lawfirm'
              ? <LawFirmApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />
              : <FirmLawyerApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
