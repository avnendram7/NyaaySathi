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
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Background with floating lights */}
      <div className="fixed inset-0">
        {/* Floating light orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <button 
          onClick={() => navigate('/role-selection')}
          className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity"
        >
          <Scale className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">Nyaay Sathi</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Law Firm Portal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Select Your Role
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Are you a lawyer working at a firm or a manager running the firm?
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  data-testid={role.testId}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  onClick={() => navigate(role.route)}
                  className="relative group cursor-pointer"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${role.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 group-hover:border-zinc-700 transition-all duration-300">
                    {/* Floating light inside card */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute top-0 right-0 w-32 h-32 bg-${role.glowColor}-500/10 rounded-full blur-3xl`}
                    />
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h2 className="text-2xl font-bold text-white mb-3">{role.title}</h2>
                    <p className="text-zinc-400 mb-6 leading-relaxed">{role.subtitle}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-zinc-500">
                          <div className={`w-1.5 h-1.5 bg-${role.glowColor}-400 rounded-full`} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <button className={`w-full py-3 px-6 bg-gradient-to-r ${role.gradient} text-white font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-${role.glowColor}-500/25 transition-all duration-300`}>
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Already have account */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-zinc-500">
              Already registered?{' '}
              <button 
                onClick={() => navigate('/lawfirm-login')}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Manager Login
              </button>
              {' '} or {' '}
              <button 
                onClick={() => navigate('/lawfirm-lawyer-login')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Lawyer Login
              </button>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
