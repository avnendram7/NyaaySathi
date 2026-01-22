import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Scale, Building2, ArrowRight, LogIn } from 'lucide-react';
import { FloatingCard, FloatingIcon } from '../components/CorporateComponents';

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
      color: 'cyan',
      route: isLoginMode ? '/user-login' : '/find-lawyer',
      testId: 'role-user-card'
    },
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Join our network. Build your practice and reach clients effectively.',
      icon: Scale,
      color: 'purple',
      route: isLoginMode ? '/lawyer-login' : '/lawyer-application',
      testId: 'role-lawyer-card'
    },
    {
      id: 'law_firm',
      title: 'I am a Law Firm',
      subtitle: 'Manage your firm, onboard lawyers, and scale your legal operations.',
      icon: Building2,
      color: 'blue',
      route: isLoginMode ? '/lawfirm-role' : '/lawfirm-role',
      testId: 'role-lawfirm-card'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
            <Scale className="w-6 h-6 text-white" />
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
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              {isLoginMode ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              {isLoginMode ? 'Choose your account type to login' : 'Select how you want to use Nyaay Sathi'}
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
                    <p className="text-slate-400 mb-8 leading-relaxed min-h-[60px]">
                      {role.subtitle}
                    </p>

                    {/* Button */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                    >
                      {isLoginMode ? (
                        <>
                          <LogIn className="w-5 h-5" />
                          LOGIN
                        </>
                      ) : (
                        <>
                          GET STARTED
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </FloatingCard>
              );
            })}
          </div>

          {/* Toggle Mode Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            {isLoginMode ? (
              <p className="text-slate-400 text-lg">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/role-selection')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Get Started
                </button>
              </p>
            ) : (
              <p className="text-slate-400 text-lg">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/role-selection?mode=login')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
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
