import { useNavigate, useSearchParams } from 'react-router-dom';
import { Scale, User, Building2, ArrowRight, UserCircle, LogIn } from 'lucide-react';
import NavigationHeader from '../components/NavigationHeader';

export default function LawFirmRoleSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoginMode = searchParams.get('mode') === 'login';
  
  const roles = [
    {
      id: 'lawyer',
      title: 'I am a Lawyer',
      subtitle: 'Working at a law firm? Access your tasks, cases, and performance dashboard.',
      icon: Scale,
      features: ['View assigned tasks', 'Track case progress', 'Performance metrics', 'Client communication'],
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
      route: '/firm-client-application',
      loginRoute: '/firm-client-login',
      testId: 'lawfirm-client-card'
    }
  ];
  
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <NavigationHeader 
        backPath="/role-selection"
        showBack={true}
        showHome={true}
        showLogout={false}
      />

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-7xl">
          {/* Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg mb-6">
              <Building2 className="w-5 h-5 text-blue-500" />
              <span className="text-blue-500 text-sm font-medium">Law Firm Portal</span>
            </div>
            <h1 className="text-5xl font-semibold text-white mb-4">
              {isLoginMode ? 'Welcome Back' : 'Select Your Role'}
            </h1>
            <p className="text-slate-400 text-lg">
              {isLoginMode ? 'Choose your account type to login' : 'Choose how you want to interact with law firms'}
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
                  onClick={() => navigate(isLoginMode ? role.loginRoute : role.route)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-8 cursor-pointer hover:border-slate-700 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-semibold text-white mb-3">{role.title}</h2>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{role.subtitle}</p>

                  {/* Features */}
                  {!isLoginMode && (
                    <div className="space-y-2 mb-6">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-1 h-1 bg-blue-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Button */}
                  <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
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
                </div>
              );
            })}
          </div>

          {/* Toggle Links */}
          <div className="text-center mt-12">
            {isLoginMode ? (
              <p className="text-slate-400">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/lawfirm-role')}
                  className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  Get Started
                </button>
              </p>
            ) : (
              <>
                <p className="text-slate-400 mb-4">
                  Already registered?
                </p>
                <button 
                  onClick={() => navigate('/lawfirm-role?mode=login')}
                  className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  Login to existing account
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
