import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { UserPlus, MessageSquare, FileText, Calendar, CheckCircle, Scale, ArrowRight, Sparkles, Users, Building2, Shield, Clock, Phone, Mail, HelpCircle, BookOpen, Video, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Floating Card Component with Glow Effect
const FloatingCard = ({ children, className = '', delay = 0, glowColor = 'blue' }) => {
  const glowColors = {
    blue: 'shadow-blue-500/20 hover:shadow-blue-500/40',
    purple: 'shadow-purple-500/20 hover:shadow-purple-500/40',
    green: 'shadow-green-500/20 hover:shadow-green-500/40',
    amber: 'shadow-amber-500/20 hover:shadow-amber-500/40',
    cyan: 'shadow-cyan-500/20 hover:shadow-cyan-500/40',
    indigo: 'shadow-indigo-500/20 hover:shadow-indigo-500/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl ${glowColors[glowColor]} transition-all duration-500 ${className}`}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${glowColor}-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Step Card Component
const StepCard = ({ number, icon: Icon, title, description, delay, glowColor }) => (
  <FloatingCard delay={delay} glowColor={glowColor}>
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className={`relative w-16 h-16 bg-gradient-to-br from-${glowColor}-500/20 to-${glowColor}-600/10 rounded-2xl flex items-center justify-center border border-${glowColor}-500/30`}>
          <Icon className={`w-8 h-8 text-${glowColor}-400`} />
          <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${glowColor}-500 rounded-full flex items-center justify-center text-xs font-bold text-white`}>
            {number}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </FloatingCard>
);

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
  >
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-left"
    >
      <span className="font-semibold text-white">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className={`w-5 h-5 transform rotate-90 ${isOpen ? 'text-blue-400' : 'text-slate-400'}`} />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="px-6 pb-4 text-slate-400">{answer}</p>
    </motion.div>
  </motion.div>
);

export default function HowItWorksPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const clientSteps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up in seconds with your email or phone number. No complicated forms, verification fees, or lengthy processes. Get started instantly.',
      glowColor: 'blue'
    },
    {
      icon: FileText,
      title: 'Describe Your Legal Need',
      description: 'Tell us about your case—whether it\'s family law, property disputes, criminal matters, or corporate issues. Upload any relevant documents securely.',
      glowColor: 'purple'
    },
    {
      icon: MessageSquare,
      title: 'Get AI-Powered Insights',
      description: 'Our advanced AI assistant analyzes your case and provides instant guidance in simple language. Ask questions 24/7 and get clear explanations.',
      glowColor: 'cyan'
    },
    {
      icon: Scale,
      title: 'Connect with Lawyers',
      description: 'Browse verified lawyers matching your needs. View profiles, ratings, and specializations. Choose the perfect legal professional for your case.',
      glowColor: 'green'
    },
    {
      icon: Calendar,
      title: 'Book Consultations',
      description: 'Schedule video calls or in-person meetings at your convenience. Pay securely and get confirmation instantly.',
      glowColor: 'amber'
    },
    {
      icon: CheckCircle,
      title: 'Track Your Progress',
      description: 'Monitor case status, upcoming hearings, and important deadlines from your personalized dashboard. Stay informed every step of the way.',
      glowColor: 'indigo'
    }
  ];

  const lawyerSteps = [
    {
      icon: UserPlus,
      title: 'Register & Get Verified',
      description: 'Create your professional profile with credentials. Our team verifies your bar council registration and experience to ensure quality.',
      glowColor: 'purple'
    },
    {
      icon: Users,
      title: 'Receive Client Requests',
      description: 'Get matched with clients seeking your expertise. View case details and decide which consultations to accept.',
      glowColor: 'blue'
    },
    {
      icon: FileText,
      title: 'Manage Cases Efficiently',
      description: 'Access client documents, AI-generated summaries, and case history in one organized platform. Save time on paperwork.',
      glowColor: 'green'
    },
    {
      icon: Calendar,
      title: 'Schedule & Earn',
      description: 'Set your availability, manage appointments, and receive secure payments. Grow your practice with our platform.',
      glowColor: 'amber'
    }
  ];

  const lawFirmSteps = [
    {
      icon: Building2,
      title: 'Register Your Firm',
      description: 'Create your law firm profile with details about your practice areas, team size, and locations served.',
      glowColor: 'indigo'
    },
    {
      icon: Users,
      title: 'Onboard Your Team',
      description: 'Invite lawyers to join your firm. Manage their profiles, assign cases, and track performance from one dashboard.',
      glowColor: 'purple'
    },
    {
      icon: Scale,
      title: 'Manage Clients',
      description: 'Handle client applications, assign lawyers, and monitor case progress. Keep your firm organized and efficient.',
      glowColor: 'blue'
    },
    {
      icon: CheckCircle,
      title: 'Track & Report',
      description: 'Generate reports on firm performance, revenue, and client satisfaction. Make data-driven decisions.',
      glowColor: 'green'
    }
  ];

  const faqs = [
    {
      question: 'How much does Nyaay Sathi cost?',
      answer: 'Creating an account and using our AI assistant is free. Lawyer consultation fees vary based on the lawyer\'s experience and case complexity. You can view all fees upfront before booking.'
    },
    {
      question: 'Are the lawyers on Nyaay Sathi verified?',
      answer: 'Yes! Every lawyer on our platform goes through a rigorous verification process. We verify bar council registration, experience, and credentials before approval.'
    },
    {
      question: 'Is my information secure?',
      answer: 'Absolutely. We use bank-grade encryption to protect your data. Your case information is confidential and only shared with lawyers you choose to work with.'
    },
    {
      question: 'Can I get help with any type of legal case?',
      answer: 'We cover a wide range of legal areas including civil, criminal, family, property, corporate, tax, intellectual property, and more. Our AI can guide you to the right type of legal help.'
    },
    {
      question: 'How does the AI assistant work?',
      answer: 'Our AI is trained on Indian legal procedures and case law. It can explain legal concepts in simple language, help you understand your rights, and guide you on next steps. It\'s available 24/7 for instant assistance.'
    },
    {
      question: 'Can I cancel or reschedule a consultation?',
      answer: 'Yes, you can cancel or reschedule up to 24 hours before your appointment for a full refund. Last-minute changes may be subject to the lawyer\'s cancellation policy.'
    }
  ];

  const helpResources = [
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Browse articles and guides on legal topics',
      link: '#'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step platform tutorials',
      link: '#'
    },
    {
      icon: Headphones,
      title: 'Live Support',
      description: 'Chat with our support team 24/7',
      link: '#'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@nyaaysathi.com',
      link: 'mailto:support@nyaaysathi.com'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Help & Guide</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              How Nyaay Sathi Works
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Your complete guide to getting legal assistance. Whether you're a client seeking help, a lawyer building your practice, or a law firm managing operations.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-blue-500/10"
          >
            <img 
              src="https://images.pexels.com/photos/8867376/pexels-photo-8867376.jpeg" 
              alt="Customer support team" 
              className="w-full h-[350px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white">Secure Platform</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-white">AI-Powered</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Clients Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">For Clients</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Get Legal Help in 6 Simple Steps</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From signup to resolution—here's how we make legal assistance simple
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientSteps.map((step, index) => (
              <StepCard
                key={step.title}
                number={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={index * 0.1}
                glowColor={step.glowColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* For Lawyers Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-purple-900/5" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Scale className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">For Lawyers</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Grow Your Practice with Nyaay Sathi</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Join our network of verified lawyers and connect with clients who need your expertise
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {lawyerSteps.map((step, index) => (
                <StepCard
                  key={step.title}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  delay={index * 0.1}
                  glowColor={step.glowColor}
                />
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-purple-500/10">
                <img 
                  src="https://images.pexels.com/photos/5668802/pexels-photo-5668802.jpeg" 
                  alt="Legal professional with technology" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Join 500+ Verified Lawyers</h3>
                  <p className="text-slate-300 mb-4">Build your reputation and grow your client base</p>
                  <a 
                    href="/lawyer-application"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all"
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Law Firms Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">For Law Firms</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Streamline Your Firm Operations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Manage your team, clients, and cases from one powerful platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lawFirmSteps.map((step, index) => (
              <FloatingCard key={step.title} delay={index * 0.1} glowColor={step.glowColor}>
                <div className="text-center">
                  <div className={`inline-flex p-4 bg-${step.glowColor}-500/10 rounded-xl mb-4 relative`}>
                    <step.icon className={`w-8 h-8 text-${step.glowColor}-400`} />
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${step.glowColor}-500 rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400">
              Got questions? We've got answers
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Help Resources Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
              <Headphones className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Support</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Need More Help?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our support team is here to help you every step of the way
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpResources.map((resource, index) => (
              <FloatingCard key={resource.title} delay={index * 0.1} glowColor="green">
                <a href={resource.link} className="block text-center">
                  <div className="inline-flex p-4 bg-green-500/10 rounded-xl mb-4">
                    <resource.icon className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{resource.title}</h3>
                  <p className="text-slate-400 text-sm">{resource.description}</p>
                </a>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <FloatingCard glowColor="blue" className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Still Have Questions?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our team is ready to help you get started. Reach out anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
              >
                <Phone className="w-5 h-5" />
                Contact Support
              </a>
              <a 
                href="/role-selection" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </FloatingCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
