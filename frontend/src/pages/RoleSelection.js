import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Scale, Building2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function RoleSelection() {
  const navigate = useNavigate();
  
  const roles = [
    {
      id: 'client',
      title: 'I am a User',
      subtitle: 'Seeking legal advice? Connect with top-tier professionals seamlessly.',
      icon: User,
      bg: 'from-slate-50 to-slate-100',
      textColor: 'text-slate-900',
      subtitleColor: 'text-slate-600',
      btnColor: 'bg-slate-900 hover:bg-slate-800 text-white',
      route: '/user-login',
      testId: 'role-user-card'
    },
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Join our network. Build your practice and reach clients effectively.',
      icon: Scale,
      bg: 'from-slate-950 to-slate-900',
      textColor: 'text-white',
      subtitleColor: 'text-slate-300',
      btnColor: 'bg-white hover:bg-slate-100 text-slate-900',
      route: '/lawyer-login',
      testId: 'role-lawyer-card'
    },
    {
      id: 'law_firm',
      title: 'I am a Law Firm',
      subtitle: 'Manage your firm, onboard lawyers, and scale your legal operations.',
      icon: Building2,
      bg: 'from-blue-950 to-blue-900',
      textColor: 'text-white',
      subtitleColor: 'text-blue-200',
      btnColor: 'bg-blue-500 hover:bg-blue-400 text-white',
      route: '/lawfirm-login',
      testId: 'role-lawfirm-card'
    }
  ];
  
  return (
    <div className="min-h-screen flex">
      {roles.map((role, index) => {
        const Icon = role.icon;
        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, x: index === 0 ? -100 : index === 2 ? 100 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            data-testid={role.testId}
            className={`flex-1 relative flex flex-col items-center justify-center p-12 bg-gradient-to-br ${role.bg} group cursor-pointer transition-all duration-500 hover:flex-[1.1]`}
            onClick={() => navigate(role.route)}
          >
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-8 max-w-md">
              {/* Icon with glow */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl"
              >
                <Icon className="w-16 h-16" style={{ color: role.textColor.includes('white') ? '#fff' : '#000' }} />
              </motion.div>
              
              {/* Title */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${role.textColor} mb-4`}>
                {role.title}
              </h1>
              
              {/* Subtitle */}
              <p className={`text-lg sm:text-xl ${role.subtitleColor} leading-relaxed`}>
                {role.subtitle}
              </p>
              
              {/* Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  data-testid={`${role.id}-get-started-btn`}
                  className={`${role.btnColor} rounded-full px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.route);
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
            
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </motion.div>
        );
      })}
      
      {/* Back button (subtle) */}
      <button
        data-testid="back-to-home-btn"
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors duration-300 z-50"
      >
        ← Back
      </button>
    </div>
  );
}