import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, CheckCircle, Star, Scale, Brain, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';

const PremiumHome = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  // Solutions data
  const solutions = [
    {
      icon: Brain,
      title: 'AI Legal Assistant',
      description: 'Get instant answers to your legal queries powered by advanced AI technology trained on Indian law.'
    },
    {
      icon: Users,
      title: 'Expert Lawyer Network',
      description: 'Connect with verified, experienced lawyers across India specializing in your specific legal needs.'
    },
    {
      icon: Scale,
      title: 'Case Guidance',
      description: 'Step-by-step guidance through your legal journey with transparent timelines and expectations.'
    }
  ];

  // Benefits data
  const benefits = [
    { icon: Shield, title: 'Trustworthy', text: 'Verified lawyers and secure platform' },
    { icon: Zap, title: 'Fast', text: 'Quick responses and efficient process' },
    { icon: Clock, title: 'Transparent', text: 'Clear pricing and timelines' },
    { icon: Award, title: 'Expert', text: 'Top-rated legal professionals' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F2944] via-[#1a3a5c] to-[#0F2944] pt-16"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Legal Help Made
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Simple & Accessible
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Justice You Understand, Technology You Trust
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => navigate('/role-selection')}
                className="group relative bg-white text-[#0F2944] hover:bg-blue-50 text-lg px-10 py-7 rounded-full font-semibold shadow-2xl transition-all duration-300 hover:shadow-white/20 hover:scale-105"
              >
                Book Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => navigate('/quick-chat')}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F2944] text-lg px-10 py-7 rounded-full font-semibold transition-all duration-300"
              >
                Try AI Assistant
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.section>

      {/* Solutions Section */}
      <SolutionsSection solutions={solutions} fadeInUp={fadeInUp} staggerContainer={staggerContainer} />

      {/* Features Section */}
      <FeaturesSection fadeInUp={fadeInUp} />

      {/* Benefits Section */}
      <BenefitsSection benefits={benefits} staggerContainer={staggerContainer} fadeInUp={fadeInUp} />

      {/* Happy Clients Section */}
      <HappyClientsSection fadeInUp={fadeInUp} />

      {/* CTA Section */}
      <CTASection navigate={navigate} scaleIn={scaleIn} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Solutions Section Component
const SolutionsSection = ({ solutions, fadeInUp, staggerContainer }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F2944] mb-4">
            Modern Legal Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leveraging technology to make legal services accessible to every Indian
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} fadeInUp={fadeInUp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Solution Card Component
const SolutionCard = ({ solution, fadeInUp }) => {
  const Icon = solution.icon;
  
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2944]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-[#0F2944] to-[#1a3a5c] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F2944] mb-4">{solution.title}</h3>
        <p className="text-gray-600 leading-relaxed">{solution.description}</p>
      </div>
    </motion.div>
  );
};

// Features Section Component
const FeaturesSection = ({ fadeInUp }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0F2944] mb-6">
              Experience Legal Services
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0F2944] to-blue-600">
                Designed for India
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We understand the complexities of the Indian legal system. Our platform bridges the gap between citizens and quality legal representation through intelligent technology and a network of verified professionals.
            </p>
            <ul className="space-y-4">
              {[
                'Connect with lawyers in your city',
                'Transparent pricing with no hidden costs',
                'Track your case progress in real-time',
                'Secure document management'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center text-gray-700"
                >
                  <CheckCircle className="w-6 h-6 text-[#0F2944] mr-3 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/7841482/pexels-photo-7841482.jpeg"
                alt="Indian Legal Professionals"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2944]/20 to-transparent" />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#0F2944] rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0F2944]">10,000+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection = ({ benefits, staggerContainer, fadeInUp }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F2944] mb-4">
            Why Choose Lxwyer Up
          </h2>
          <p className="text-xl text-gray-600">
            Built for trust, designed for efficiency
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} fadeInUp={fadeInUp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Benefit Card Component
const BenefitCard = ({ benefit, fadeInUp }) => {
  const Icon = benefit.icon;
  
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
    >
      <div className="w-16 h-16 bg-[#0F2944] rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-[#0F2944] mb-2">{benefit.title}</h3>
      <p className="text-gray-600">{benefit.text}</p>
    </motion.div>
  );
};

// Happy Clients Section Component
const HappyClientsSection = ({ fadeInUp }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F2944] mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600">
            Real people, real success stories
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.pexels.com/photos/7979463/pexels-photo-7979463.jpeg"
            alt="Happy Indian Clients"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2944]/80 via-[#0F2944]/40 to-transparent flex items-end">
            <div className="p-12 text-white">
              <p className="text-2xl font-light mb-4 italic">
                "Lxwyer Up made finding the right lawyer incredibly easy. The entire process was transparent and professional."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full" />
                <div>
                  <div className="font-semibold">Priya Sharma</div>
                  <div className="text-sm text-blue-200">Property Dispute Case</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = ({ navigate, scaleIn }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F2944] via-[#1a3a5c] to-[#0F2944] overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-5"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Legal Help?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Start your journey towards justice today. Our team is ready to assist you.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/role-selection')}
              className="bg-white text-[#0F2944] hover:bg-blue-50 text-lg px-12 py-7 rounded-full font-semibold shadow-2xl group"
            >
              Book Your Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#0F2944] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="w-6 h-6" />
              <span className="text-xl font-bold">Lxwyer Up</span>
            </div>
            <p className="text-blue-200 text-sm">
              Justice You Understand, Technology You Trust
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/premium-about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/premium-contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>Legal Consultation</li>
              <li>Lawyer Network</li>
              <li>AI Assistant</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>avnendram.7@gmail.com</li>
              <li>+91 8318216968</li>
              <li>Sonipat, Haryana</li>
            </ul>
          </div>
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="border-t border-white/10 pt-8 text-center text-blue-200 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Lxwyer Up. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumHome;