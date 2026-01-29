import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, CheckCircle, Scale, Brain, Clock, Award, ChevronDown, ChevronUp, FileText, Gavel, BookOpen, MessageSquare, Search, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/button';

// Simple Navbar Component
const SimpleNavbar = ({ navigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2">
            <Scale className="w-6 h-6 text-black" />
            <span className="text-xl font-bold text-black">Lxwyer Up</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="text-black hover:text-gray-600 transition-colors">Home</button>
            <button onClick={() => navigate('/premium-about')} className="text-black hover:text-gray-600 transition-colors">About</button>
            <button onClick={() => navigate('/premium-contact')} className="text-black hover:text-gray-600 transition-colors">Contact</button>
          </div>
          
          <Button
            onClick={() => navigate('/role-selection?mode=login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

// Scattered Images Component with Vibrant Colors - Indian Legal Context
const ScatteredImages = () => {
  const images = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Supreme_Court_of_India_-_200705_%28edited%29.jpg',
      alt: 'Indian Supreme Court Building',
      position: 'top-32 left-20',
      size: 'w-56 h-72',
      rotation: -12,
      delay: 0.2
    },
    {
      src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Indian Court Session - Justice in Action',
      position: 'top-64 right-32',
      size: 'w-64 h-80',
      rotation: 8,
      delay: 0.4
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Indian Lawyer Helping Client - Legal Consultation',
      position: 'bottom-48 left-32',
      size: 'w-60 h-72',
      rotation: 15,
      delay: 0.6
    },
    {
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Indian Family Getting Legal Help - Technology Bridging Justice',
      position: 'bottom-32 right-20',
      size: 'w-52 h-64',
      rotation: -8,
      delay: 0.8
    },
    {
      src: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Indian High Court Interior - Modern Justice System',
      position: 'top-1/2 left-12',
      size: 'w-48 h-60',
      rotation: -15,
      delay: 1.0
    },
    {
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Indian Legal Professional Using Technology - Digital Justice',
      position: 'top-1/3 right-12',
      size: 'w-44 h-56',
      rotation: 10,
      delay: 1.2
    }
  ];

  return (
    <>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            rotate: image.rotation,
            y: [0, -25, 0]
          }}
          transition={{
            opacity: { duration: 0.8, delay: image.delay },
            scale: { duration: 0.8, delay: image.delay },
            rotate: { duration: 0.8, delay: image.delay },
            y: {
              duration: 6 + index,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className={`absolute ${image.position} ${image.size} z-10 hidden lg:block`}
        >
          <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{ 
                filter: 'brightness(10.0) contrast(15.0) saturate(50.0) hue-rotate(180deg) sepia(5.0) invert(0.5) blur(0px) drop-shadow(0 0 100px rgba(255,0,255,2)) drop-shadow(0 0 200px rgba(0,255,255,2)) drop-shadow(0 0 300px rgba(255,255,0,2))'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-orange-900/85 to-yellow-800/95 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/85 via-purple-900/80 to-indigo-900/85 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-teal-900/80 mix-blend-color-dodge" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/75 via-blue-900/70 to-violet-900/75 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-800/70 via-amber-800/65 to-lime-800/70 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-bl from-fuchsia-800/65 via-emerald-800/60 to-sky-800/65 mix-blend-color-burn" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-700/60 via-green-700/55 to-blue-700/60 mix-blend-difference" />
            <div className="absolute inset-0 bg-gradient-to-l from-yellow-700/55 via-magenta-700/50 to-cyan-700/55 mix-blend-exclusion" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/50 via-purple-600/45 to-green-600/50 mix-blend-hard-light" />
            <div className="absolute inset-0 bg-gradient-to-tl from-lime-600/45 via-pink-600/40 to-teal-600/45 mix-blend-color-dodge" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 via-yellow-500/35 to-blue-500/40 mix-blend-lighten" />
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500/35 via-green-500/30 to-orange-500/35 mix-blend-darken" />
          </div>
        </motion.div>
      ))}
    </>
  );
};

const PremiumHome = () => {
  const navigate = useNavigate();
  const [showAllServices, setShowAllServices] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      <SimpleNavbar navigate={navigate} />

      {/* Hero Section - Minimalist with Tagline Only */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
        {/* Scattered Floating Images */}
        <ScatteredImages />

        {/* Center Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-light text-gray-800 mb-16 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="relative inline-block font-semibold">
                Justice
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600 rounded-full"
                />
              </span>
              {' '}You Understand, <span className="relative inline-block font-semibold">
                Technology
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600 rounded-full"
                />
              </span>
              {' '}You Trust
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/role-selection')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-14 py-8 rounded-full font-semibold shadow-xl transition-all duration-300"
                >
                  Get Started
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/quick-chat')}
                  variant="outline"
                  className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white text-lg px-14 py-8 rounded-full font-semibold transition-all duration-300"
                >
                  Free AI Assistant
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection 
        showAllServices={showAllServices} 
        setShowAllServices={setShowAllServices}
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

      {/* Features Section */}
      <FeaturesSection fadeInUp={fadeInUp} />

      {/* CTA Section */}
      <CTASection navigate={navigate} fadeInUp={fadeInUp} />

      {/* Footer */}
      <Footer navigate={navigate} />
    </div>
  );
};

// Services Section Component
const ServicesSection = ({ showAllServices, setShowAllServices, fadeInUp, staggerContainer }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const mainServices = [
    {
      icon: Brain,
      title: 'AI Legal Assistant',
      description: 'Get instant answers to your legal queries powered by AI trained on Indian law and procedures.'
    },
    {
      icon: Search,
      title: 'Find Lawyers',
      description: 'Connect with verified lawyers across India specializing in your specific legal needs.'
    },
    {
      icon: FileText,
      title: 'Case Management',
      description: 'Track your case progress, documents, and timelines in one secure platform.'
    },
    {
      icon: MessageSquare,
      title: 'Legal Consultation',
      description: 'Book online or offline consultations with experienced legal professionals.'
    }
  ];

  const additionalServices = [
    {
      icon: Gavel,
      title: 'Court Representation',
      description: 'Professional representation in courts across India by experienced advocates.'
    },
    {
      icon: BookOpen,
      title: 'Legal Documentation',
      description: 'Expert assistance in drafting and reviewing legal documents and contracts.'
    },
    {
      icon: UserCheck,
      title: 'Lawyer Verification',
      description: 'All lawyers are verified with bar council credentials and client reviews.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and communications are protected with end-to-end encryption.'
    }
  ];

  const displayServices = showAllServices ? [...mainServices, ...additionalServices] : mainServices.slice(0, 3);

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Services We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive legal solutions designed for modern India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isVisible={isInView} />
          ))}
        </div>

        {/* More/Less Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setShowAllServices(!showAllServices)}
            variant="outline"
            className="border-2 border-gray-600 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-6 rounded-full font-semibold transition-all duration-300"
          >
            {showAllServices ? (
              <>
                Show Less <ChevronUp className="ml-2 w-5 h-5" />
              </>
            ) : (
              <>
                View All Services <ChevronDown className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

// Service Card Component - Optimized
const ServiceCard = ({ service, index, isVisible }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="w-16 h-16 bg-gray-100 group-hover:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
        <Icon className="w-8 h-8 text-gray-800 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed">{service.description}</p>
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              Experience Legal Services
              <span className="block text-gray-600">
                Designed for India
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We understand the complexities of the Indian legal system. Our platform bridges the gap between citizens and quality legal representation through intelligent technology and verified professionals.
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
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
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
                src="https://upload.wikimedia.org/wikipedia/commons/6/65/Supreme_Court_of_India_-_200705_%28edited%29.jpg"
                alt="Indian Supreme Court - Symbol of Justice"
                className="w-full h-[500px] object-cover"
                style={{ 
                  filter: 'brightness(1.6) contrast(1.8) saturate(2.5) hue-rotate(10deg) sepia(0.3)',
                  imageRendering: 'crisp-edges'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 via-amber-500/35 to-red-600/40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/30 via-orange-400/25 to-red-500/30 mix-blend-soft-light" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-700/25 to-orange-700/25 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/15 to-orange-500/20 mix-blend-color-dodge" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = ({ navigate, fadeInUp }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Legal Help?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Start your journey towards justice today. Our team is ready to assist you.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/role-selection')}
              className="bg-white hover:bg-gray-100 text-gray-800 text-lg px-12 py-7 rounded-full font-semibold shadow-2xl group border-2 border-gray-300 hover:border-gray-400"
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
const Footer = ({ navigate }) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="w-6 h-6" />
              <span className="text-xl font-bold">Lxwyer Up</span>
            </div>
            <p className="text-gray-300 text-sm">
              Justice You Understand, Technology You Trust
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => navigate('/premium-about')} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => navigate('/premium-contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Legal Consultation</li>
              <li>Find Lawyers</li>
              <li>AI Assistant</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>avnendram.7@gmail.com</li>
              <li>+91 8318216968</li>
              <li>Sonipat, Haryana</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Lxwyer Up. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PremiumHome;