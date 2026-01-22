import { Scale, LogOut, User, Briefcase, Calendar, FileText, Clock, CheckCircle } from 'lucide-react';
import { StatCard, CorporateBadge, SimpleCard } from '../components/CorporateComponents';

export default function FirmClientDashboardDemo() {
  const client = {
    id: 'demo123',
    full_name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    law_firm_name: 'Shah & Associates',
    case_type: 'civil',
    assigned_lawyer_name: 'Adv. Priya Sharma',
    created_at: '2025-01-10T00:00:00'
  };

  const caseUpdates = [
    {
      id: '1',
      update_type: 'hearing_date',
      title: 'Court Hearing Scheduled',
      description: 'Your court hearing has been scheduled for January 30, 2025 at 10:00 AM in Civil Court, Mumbai',
      created_at: '2025-01-20T10:00:00',
      created_by: 'Adv. Priya Sharma'
    },
    {
      id: '2',
      update_type: 'document_submitted',
      title: 'Documents Submitted to Court',
      description: 'All required documents have been submitted to the court. Waiting for review.',
      created_at: '2025-01-18T15:30:00',
      created_by: 'Adv. Priya Sharma'
    },
    {
      id: '3',
      update_type: 'meeting_scheduled',
      title: 'Meeting with Lawyer',
      description: 'Initial consultation meeting completed. Next review meeting scheduled for January 25, 2025 at 3:00 PM',
      created_at: '2025-01-15T09:00:00',
      created_by: 'Manager - Shah & Associates'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Nyaay Sathi</h1>
                <p className="text-xs text-slate-400">Client Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{client.full_name}</p>
                <p className="text-xs text-slate-400">{client.email}</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
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
          <h2 className="text-3xl font-semibold text-white mb-2">
            Welcome back, Rajesh
          </h2>
          <p className="text-slate-400">
            Here's an overview of your case progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Case Status" value="Active" icon={Briefcase} />
          <StatCard title="Next Hearing" value="Jan 30, 2025" icon={Calendar} />
          <StatCard title="Documents" value="12" icon={FileText} />
          <StatCard title="Days Active" value="45" icon={Clock} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Case Updates */}
          <div className="lg:col-span-2">
            <SimpleCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Case Updates</h3>
                <CorporateBadge variant="info">3 Updates</CorporateBadge>
              </div>

              <div className="space-y-4">
                {caseUpdates.map((update) => (
                  <div key={update.id} className="bg-black border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        {update.update_type === 'hearing_date' && <Calendar className="w-5 h-5 text-white" />}
                        {update.update_type === 'document_submitted' && <FileText className="w-5 h-5 text-white" />}
                        {update.update_type === 'meeting_scheduled' && <Clock className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-white font-medium">{update.title}</h4>
                          <span className="text-xs text-slate-500">
                            {new Date(update.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{update.description}</p>
                        <p className="text-xs text-slate-500">By: {update.created_by}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SimpleCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Lawyer */}
            <SimpleCard>
              <h3 className="text-lg font-semibold text-white mb-4">Assigned Lawyer</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Adv. Priya Sharma</p>
                    <p className="text-sm text-slate-400">Civil Law</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Experience</p>
                    <p className="text-sm text-white">12+ years</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Phone</p>
                    <p className="text-sm text-white">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Email</p>
                    <p className="text-sm text-white">priya@shahandassociates.com</p>
                  </div>
                </div>
              </div>
            </SimpleCard>

            {/* Case Information */}
            <SimpleCard>
              <h3 className="text-lg font-semibold text-white mb-4">Case Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Law Firm</p>
                  <p className="text-sm text-white">Shah & Associates</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Case Type</p>
                  <p className="text-sm text-white">Civil Law</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  <CorporateBadge variant="success">Active</CorporateBadge>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Started On</p>
                  <p className="text-sm text-white">Jan 10, 2025</p>
                </div>
              </div>
            </SimpleCard>
          </div>
        </div>
      </main>
    </div>
  );
}
