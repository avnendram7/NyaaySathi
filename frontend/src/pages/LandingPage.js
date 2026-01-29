import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, FileText, Scale, Shield, Clock, Users, TrendingUp, ChevronUp, Gavel, BookOpen, UserCheck, Phone, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LandingPage() {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                <span className="text-orange-600">Justice</span> You Understand,
                <br />
                <span className="text-blue-600">Technology</span> You Trust
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
                Connect with verified Indian lawyers, get AI-powered legal guidance, and navigate the Indian legal system with confidence
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/user-get-started">
                  <Button 
                    data-testid="get-started-btn"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button 
                    data-testid="learn-more-btn"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-4 text-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              
              {/* Swipe Up Arrow */}
              <motion.div 
                className="mt-12 flex flex-col items-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-sm text-gray-500 mb-2">Explore our services</p>
                <ChevronUp className="w-6 h-6 text-blue-600" />
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/65/Supreme_Court_of_India_-_200705_%28edited%29.jpg"
                  alt="Indian Supreme Court Building"
                  className="w-full h-[500px] object-cover brightness-110 contrast-110 saturate-120"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                    <p className="text-sm font-semibold text-gray-800">Supreme Court of India</p>
                    <p className="text-xs text-gray-600">Where justice meets technology</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section data-testid="featured-services" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Lxwyer Up?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Access powerful tools designed to make legal processes simple and transparent</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Chat Feature - Highlighted */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              data-testid="ai-chat-feature"
              className="glass rounded-3xl p-8 border-2 border-blue-500/50 glow-blue feature-card md:col-span-1"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-700/20 rounded-xl">
                  <MessageSquare className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">AI Legal Assistant</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Get instant answers to your legal questions in simple language. Our AI chatbot provides structured, easy-to-understand guidance 24/7.
              </p>
              <Link to="/user-login">
                <Button 
                  data-testid="try-ai-chat-btn"
                  className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-6 py-2 btn-primary"
                >
                  Try AI Chat
                </Button>
              </Link>
            </motion.div>
            
            {/* Consultation Feature - Highlighted */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-testid="consultation-feature"
              className="glass rounded-3xl p-8 border-2 border-blue-500/50 glow-blue feature-card md:col-span-1"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-700/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">Book Consultations</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Schedule appointments with verified lawyers at your convenience. Manage all your consultations in one place.
              </p>
              <Link to="/book-consultation">
                <Button 
                  data-testid="book-consultation-btn"
                  className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-6 py-2 btn-primary"
                >
                  Book Now
                </Button>
              </Link>
            </motion.div>
            
            {/* Additional Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-3xl p-8 feature-card"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-xl">
                  <FileText className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold">Case Tracking</h3>
              </div>
              <p className="text-slate-400">
                Monitor your case status, timelines, and next steps in real-time with our intuitive dashboard.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-3xl p-8 feature-card"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-xl">
                  <Shield className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold">Document Management</h3>
              </div>
              <p className="text-slate-400">
                Securely upload, organize, and access all your legal documents from anywhere.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Scale className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">10K+</h3>
              <p className="text-slate-400">Cases Tracked</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-slate-400">Verified Lawyers</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-slate-400">AI Support</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="text-slate-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of users who have simplified their legal journey with Lxwyer Up
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/user-login">
              <Button 
                data-testid="cta-client-btn"
                className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-8 py-3 btn-primary"
              >
                I'm a Client
              </Button>
            </Link>
            <Link to="/lawyer-login">
              <Button 
                data-testid="cta-lawyer-btn"
                variant="outline"
                className="border-slate-700 text-slate-200 hover:bg-slate-800 rounded-full px-8 py-3"
              >
                I'm a Lawyer
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}