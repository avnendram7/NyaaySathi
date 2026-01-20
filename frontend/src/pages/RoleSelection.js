import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Scale, Building2, ArrowRight, LogIn } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoginMode = searchParams.get('mode') === 'login';
  
  const roles = [
    {
      id: 'client',
      title: 'I am a User',
      subtitle: 'Seeking legal advice? Connect with top-tier professionals seamlessly.',
      icon: User,
      gradient: 'from-cyan-600 to-cyan-700',
      hoverGradient: 'hover:from-cyan-500 hover:to-cyan-600',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500',
      route: isLoginMode ? '/user-login' : '/find-lawyer',
      testId: 'role-user-card'
    },
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Join our network. Build your practice and reach clients effectively.',
      icon: Scale,
      gradient: 'from-purple-600 to-purple-700',
      hoverGradient: 'hover:from-purple-500 hover:to-purple-600',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500',
      route: isLoginMode ? '/lawyer-login' : '/lawyer-application',
      testId: 'role-lawyer-card'
    },
    {
      id: 'law_firm',
      title: 'I am a Law Firm',
      subtitle: 'Manage your firm, onboard lawyers, and scale your legal operations.',
      icon: Building2,
      gradient: 'from-blue-600 to-indigo-700',
      hoverGradient: 'hover:from-blue-500 hover:to-indigo-600',
      borderColor: 'border-blue-500/30',
      iconBg: 'bg-blue-500',
      route: isLoginMode ? '/lawfirm-login' : '/lawfirm-application',
      testId: 'role-lawfirm-card'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Simple gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      
      {/* Subtle grid */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity"
        >
          <Scale className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">Nyaay Sathi</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {isLoginMode ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-zinc-400 text-lg">
              {isLoginMode ? 'Choose your account type to login' : 'Select how you want to use Nyaay Sathi'}
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  data-testid={role.testId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(role.route)}
                  className={`relative bg-zinc-900 border ${role.borderColor} rounded-2xl p-8 cursor-pointer group hover:bg-zinc-800 transition-all duration-200`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 ${role.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl font-bold text-white mb-3">{role.title}</h2>
                  <p className="text-zinc-400 mb-6 leading-relaxed">{role.subtitle}</p>

                  {/* Button */}
                  <button className={`w-full py-3 px-6 bg-gradient-to-r ${role.gradient} ${role.hoverGradient} text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200`}>
                    {isLoginMode ? (
                      <>
                        <LogIn className="w-5 h-5" />
                        LOGIN
                      </>
                    ) : (
                      <>
                        GET STARTED
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Toggle Mode Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            {isLoginMode ? (
              <p className="text-zinc-500">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/role-selection')}
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Get Started
                </button>
              </p>
            ) : (
              <p className="text-zinc-500">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/role-selection?mode=login')}
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Login
                </button>
              </p>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
