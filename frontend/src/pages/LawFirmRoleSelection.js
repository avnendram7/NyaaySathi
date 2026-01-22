import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, User, Building2, ArrowRight, UserCircle } from 'lucide-react';
import { FloatingCard, FloatingIcon } from '../components/CorporateComponents';

export default function LawFirmRoleSelection() {
  const navigate = useNavigate();
  
  const roles = [
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Working at a law firm? Access your tasks, cases, and performance dashboard.',
      icon: Scale,
      features: ['View assigned tasks', 'Track case progress', 'Performance metrics', 'Client communication'],
      color: 'purple',
      route: '/firm-lawyer-application',
      loginRoute: '/lawfirm-lawyer-login',
      testId: 'lawfirm-lawyer-card'
    },
    {
      id: 'manager',
      title: 'I am a Manager',
      subtitle: 'Manage your law firm, onboard lawyers, track performance and reports.',
      icon: Building2,
      features: ['Register your firm', 'Manage lawyers', 'View all reports', 'Track firm revenue'],
      color: 'blue',
      route: '/lawfirm-application',
      loginRoute: '/lawfirm-login',
      testId: 'lawfirm-manager-card'
    },
    {
      id: 'client',
      title: 'I am a Client',
      subtitle: 'Join a law firm as a client. Track your case progress and communicate with your lawyer.',
      icon: UserCircle,
      features: ['Apply to join a firm', 'Track case progress', 'View assigned lawyer', 'Receive updates'],
      color: 'cyan',
      route: '/firm-client-application',
      loginRoute: '/firm-client-login',
      testId: 'lawfirm-client-card'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <button 
          onClick={() => navigate('/role-selection')}
          className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Nyaay Sathi</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">Law Firm Portal</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Select Your Role
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Choose how you want to interact with law firms
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <FloatingCard key={role.id} delay={index * 0.1}>
                  <div
                    data-testid={role.testId}
                    onClick={() => navigate(role.route)}
                    className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 cursor-pointer group hover:bg-slate-900/70 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
                  >
                    {/* Floating Icon */}
                    <div className="mb-8">
                      <FloatingIcon icon={Icon} color={role.color} size="lg" />
                    </div>

                    {/* Content */}
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {role.title}
                    </h2>
                    <p className="text-slate-400 mb-6 leading-relaxed min-h-[60px]">
                      {role.subtitle}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-8">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </FloatingCard>
              );
            })}
          </div>

          {/* Login Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-slate-400 text-lg mb-4">
              Already registered?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/lawfirm-login')}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg font-medium transition-all duration-300 border border-slate-700"
              >
                Manager Login
              </button>
              <button 
                onClick={() => navigate('/lawfirm-lawyer-login')}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded-lg font-medium transition-all duration-300 border border-slate-700"
              >
                Lawyer Login
              </button>
              <button 
                onClick={() => navigate('/firm-client-login')}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg font-medium transition-all duration-300 border border-slate-700"
              >
                Client Login
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
