import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Scale, Building2, ArrowRight } from 'lucide-react';
import NavigationHeader from '../components/NavigationHeader';

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
      route: isLoginMode ? '/user-login' : '/user-get-started',
      testId: 'role-user-card'
    },
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Join our network. Build your practice and reach clients effectively.',
      icon: Scale,
      route: isLoginMode ? '/lawyer-login' : '/lawyer-application',
      testId: 'role-lawyer-card'
    },
    {
      id: 'law_firm',
      title: 'I am a Law Firm',
      subtitle: 'Manage your firm, onboard lawyers, and scale your legal operations.',
      icon: Building2,
      route: isLoginMode ? '/lawfirm-role?mode=login' : '/lawfirm-role',
      testId: 'role-lawfirm-card'
    }
  ];
  
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <NavigationHeader 
        backPath="/"
        showBack={true}
        showHome={true}
        showLogout={false}
      />

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-semibold text-white mb-4">
              {isLoginMode ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-slate-400 text-lg">
              {isLoginMode ? 'Choose your account type to login' : 'Select how you want to use Nyaay Sathi'}
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  data-testid={role.testId}
                  onClick={() => navigate(role.route)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-8 cursor-pointer hover:border-slate-700 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-semibold text-white mb-3">{role.title}</h2>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{role.subtitle}</p>

                  {/* Button */}
                  <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
                    {isLoginMode ? 'LOGIN' : 'GET STARTED'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Toggle Mode Link */}
          <div className="text-center mt-12">
            {isLoginMode ? (
              <p className="text-slate-400">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/role-selection')}
                  className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  Get Started
                </button>
              </p>
            ) : (
              <p className="text-slate-400">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/role-selection?mode=login')}
                  className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
