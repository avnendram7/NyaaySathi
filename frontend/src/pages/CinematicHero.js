import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Scale, FileText, Shield, Users, Clock, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { RotatingGlobe } from '../components/RotatingGlobe';

export default function CinematicHero() {
  const navigate = useNavigate();

  // Feature cards for the services section
  const featureCards = [
    {
      id: 1,
      title: 'Case Tracking',
      category: 'CLIENT SERVICES',
      description: 'Track your case status, timelines, and next steps in real-time',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600',
      glowColor: 'from-blue-500/40 to-cyan-500/40',
      borderColor: 'border-blue-500/30',
      accentColor: 'text-blue-400'
    },
    {
      id: 2,
      title: 'AI Legal Assistant',
      category: 'AI POWERED',
      description: 'Get instant answers to your legal queries with our AI chatbot',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
      glowColor: 'from-purple-500/40 to-pink-500/40',
      borderColor: 'border-purple-500/30',
      accentColor: 'text-purple-400'
    },
    {
      id: 3,
      title: 'Document Vault',
      category: 'SECURE STORAGE',
      description: 'Upload and manage your legal documents with end-to-end encryption',
      image: 'https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=600',
      glowColor: 'from-emerald-500/40 to-green-500/40',
      borderColor: 'border-emerald-500/30',
      accentColor: 'text-emerald-400'
    },
    {
      id: 4,
      title: 'Lawyer Network',
      category: 'PROFESSIONALS',
      description: 'Connect with verified lawyers specializing in your case type',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600',
      glowColor: 'from-amber-500/40 to-orange-500/40',
      borderColor: 'border-amber-500/30',
      accentColor: 'text-amber-400'
    }
  ];

  // Case studies / Selected work section
  const caseStudies = [
    {
      id: 1,
      title: 'Property Disputes',
      category: 'CIVIL LAW',
      duration: 'Avg. 6 months',
      successRate: '94%',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      glowColor: 'from-blue-600/50 to-indigo-600/50'
    },
    {
      id: 2,
      title: 'Family Matters',
      category: 'FAMILY LAW',
      duration: 'Avg. 4 months',
      successRate: '89%',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
      glowColor: 'from-rose-600/50 to-pink-600/50'
    },
    {
      id: 3,
      title: 'Consumer Rights',
      category: 'CONSUMER LAW',
      duration: 'Avg. 3 months',
      successRate: '91%',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      glowColor: 'from-emerald-600/50 to-teal-600/50'
    }
  ];
  
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black">
      {/* Animated Black Wave Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
        
        {/* Animated black wave layers - Optimized */}
        <svg className="absolute bottom-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="blackWave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="blackWave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Wave 1 */}
          <motion.path
            d="M0,400 C150,350 350,450 500,400 C650,350 850,450 1000,400 C1150,350 1350,450 1440,400 L1440,800 L0,800 Z"
            fill="url(#blackWave1)"
            animate={{
              d: [
                "M0,400 C150,350 350,450 500,400 C650,350 850,450 1000,400 C1150,350 1350,450 1440,400 L1440,800 L0,800 Z",
                "M0,420 C150,470 350,370 500,420 C650,470 850,370 1000,420 C1150,470 1350,370 1440,420 L1440,800 L0,800 Z",
                "M0,400 C150,350 350,450 500,400 C650,350 850,450 1000,400 C1150,350 1350,450 1440,400 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Wave 2 */}
          <motion.path
            d="M0,500 C200,450 400,550 600,500 C800,450 1000,550 1200,500 C1350,450 1400,550 1440,500 L1440,800 L0,800 Z"
            fill="url(#blackWave2)"
            animate={{
              d: [
                "M0,500 C200,450 400,550 600,500 C800,450 1000,550 1200,500 C1350,450 1400,550 1440,500 L1440,800 L0,800 Z",
                "M0,480 C200,530 400,430 600,480 C800,530 1000,430 1200,480 C1350,530 1400,430 1440,480 L1440,800 L0,800 Z",
                "M0,500 C200,450 400,550 600,500 C800,450 1000,550 1200,500 C1350,450 1400,550 1440,500 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Subtle light rays - Reduced for performance */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-800/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Top Navigation Bar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 z-10" />
        
        {/* Central Logo Section */}
        <div className="relative z-30 flex flex-col items-center justify-center min-h-screen">
          {/* 3D Rotating Globe with Logo */}
          <div className="relative mb-12">
            <RotatingGlobe />
          </div>
          
          {/* Typography */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              ⚖️ Nyaay Sathi
            </h1>
            <p className="text-2xl sm:text-3xl text-blue-200 font-light tracking-wide">
              Justice You Understand, Technology You Trust.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            {/* Get Started Button */}
            <div className="relative group">
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
              
              <Button
                data-testid="cinematic-hero-cta"
                onClick={() => navigate('/role-selection')}
                className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl px-12 py-6 rounded-full font-semibold shadow-2xl flex items-center space-x-3 border-2 border-blue-400/50"
              >
                <span>Get Started</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
            
            {/* AI Chat Button */}
            <div className="relative group">
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
              
              <Button
                data-testid="cinematic-ai-chat-btn"
                onClick={() => navigate('/quick-chat')}
                className="relative bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white text-xl px-12 py-6 rounded-full font-semibold shadow-2xl flex items-center space-x-3 border-2 border-emerald-400/50"
              >
                <MessageSquare className="w-6 h-6" />
                <span>AI Chat</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities / Features Section */}
      <section className="relative py-24 px-4 sm:px-8 z-10">
        {/* Section background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950/90" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-sm font-semibold tracking-wider uppercase mb-4 block text-blue-400">
              01 — Core Capabilities
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Our Services
              </h2>
              <p className="text-lg max-w-md text-slate-300">
                Comprehensive legal solutions powered by technology for modern India
              </p>
            </div>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Ambient glow behind card */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${card.glowColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`} />
                
                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-80 rounded-2xl overflow-hidden ${card.borderColor} border backdrop-blur-xl cursor-pointer bg-slate-900/50`}
                >
                  {/* Background Image */}
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <span className={`text-xs font-semibold tracking-wider ${card.accentColor} mb-2`}>
                      {card.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 text-white transition-colors group-hover:text-blue-500 duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Hover border glow */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:${card.borderColor.replace('/30', '')} transition-all duration-300`} />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => navigate('/features')}
              className="bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full px-8 py-3 text-sm font-medium transition-all duration-300"
            >
              ALL SERVICES <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Selected Case Studies Section */}
      <section className="relative py-24 px-4 sm:px-8 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/60 to-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-sm font-semibold tracking-wider uppercase mb-4 block text-blue-400">
              02 — Practice Areas
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                  Areas of Expertise
                </h2>
                <p className="max-w-xl text-slate-300">
                  Our network of experienced lawyers specializes in these key practice areas with proven success rates
                </p>
              </div>
            </div>
          </motion.div>

          {/* Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Ambient glow */}
                <div className={`absolute -inset-3 bg-gradient-to-br ${study.glowColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700`} />
                
                {/* Card */}
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl overflow-hidden border border-slate-700 backdrop-blur-xl cursor-pointer bg-slate-900/50"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md border bg-white/10 border-white/20 text-white text-xs font-medium">
                      {study.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-white">{study.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <Clock className="w-4 h-4" />
                        <span>{study.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-500 font-semibold">{study.successRate}</span>
                        <span className="text-slate-300">Success</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 px-4 sm:px-8 z-10">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold tracking-wider uppercase mb-4 block text-blue-400">
              03 — Why Nyaay Sathi
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Precision in Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Security First',
                description: 'End-to-end encryption for all your documents and communications',
                color: 'text-blue-400'
              },
              {
                icon: Sparkles,
                title: 'AI Powered',
                description: 'Smart legal assistance and document analysis at your fingertips',
                color: 'text-purple-400'
              },
              {
                icon: Users,
                title: 'Verified Lawyers',
                description: 'Connect only with bar-certified professionals across India',
                color: 'text-emerald-400'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-6">
                  {/* Icon glow */}
                  <div className={`absolute inset-0 blur-xl opacity-30 group-hover:opacity-60 transition-opacity ${item.color.replace('text-', 'bg-')}`} />
                  <div className="relative w-16 h-16 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 sm:px-8 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-blue-950/30 to-slate-950" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-slate-300">
              Join thousands of Indians who have simplified their legal journey with Nyaay Sathi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/role-selection')}
                className="text-lg px-10 py-6 rounded-full font-semibold shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Start Your Journey <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="text-lg px-10 py-6 rounded-full font-semibold border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/80 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-300">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Scale className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-white">Nyaay Sathi</span>
          </div>
          <p>© 2026 Nyaay Sathi. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>avnendram.7@gmail.com</span>
            <span>•</span>
            <span>+91 8318216968</span>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .glass {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
