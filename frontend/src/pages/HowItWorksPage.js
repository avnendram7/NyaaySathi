import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { UserPlus, MessageSquare, FileText, Calendar, CheckCircle, Scale } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Get started with Nyaay Sathi in just a few simple steps
            </p>
          </div>
          
          {/* For Clients */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <Scale className="inline-block w-8 h-8 mr-3 text-blue-500" />
              For Clients
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-700/20 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="glass rounded-2xl p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3">1. Create Your Account</h3>
                  <p className="text-slate-400">
                    Sign up in seconds with your email. No complicated forms or lengthy verification processes.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-700/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="glass rounded-2xl p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3">2. Add Your Case Details</h3>
                  <p className="text-slate-400">
                    Enter your case information and upload relevant documents. Our platform keeps everything organized and secure.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-700/20 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="glass rounded-2xl p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3">3. Get AI-Powered Insights</h3>
                  <p className="text-slate-400">
                    Chat with our AI assistant to understand your case in simple language. Get instant answers to your legal questions 24/7.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-700/20 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="glass rounded-2xl p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3">4. Book a Consultation</h3>
                  <p className="text-slate-400">
                    Connect with verified lawyers when you need expert advice. Schedule consultations at your convenience.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-700/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="glass rounded-2xl p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3">5. Track Progress</h3>
                  <p className="text-slate-400">
                    Monitor your case status, upcoming hearings, and important deadlines from your personalized dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* For Lawyers */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">
              <Scale className="inline-block w-8 h-8 mr-3 text-blue-500" />
              For Lawyers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-8 text-center">
                <div className="inline-flex p-4 bg-blue-700/20 rounded-xl mb-4">
                  <UserPlus className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Register & Verify</h3>
                <p className="text-slate-400">
                  Create your professional profile and get verified to start receiving clients
                </p>
              </div>
              
              <div className="glass rounded-2xl p-8 text-center">
                <div className="inline-flex p-4 bg-blue-700/20 rounded-xl mb-4">
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Manage Cases</h3>
                <p className="text-slate-400">
                  Access client cases, documents, and structured summaries in one platform
                </p>
              </div>
              
              <div className="glass rounded-2xl p-8 text-center">
                <div className="inline-flex p-4 bg-blue-700/20 rounded-xl mb-4">
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Schedule Efficiently</h3>
                <p className="text-slate-400">
                  Manage consultations and automatically update clients on progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}