import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Search, Filter, Star, Building2, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const SimpleNavbar = ({ navigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2">
            <Scale className="w-6 h-6 text-[#0F2944]" />
            <span className="text-xl font-bold text-[#0F2944]">Lxwyer Up</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/ai-firm-finder')}
              variant="ghost"
              className="text-[#0F2944] hover:text-[#0F2944]/80"
            >
              Try AI Assistant
            </Button>
            <Button
              onClick={() => navigate('/role-selection?mode=login')}
              variant="ghost"
              className="text-[#0F2944] hover:text-[#0F2944]/80"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/role-selection')}
              className="bg-[#0F2944] hover:bg-[#0F2944]/90 text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const BrowseFirms = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const firms = [
    {
      name: 'Shah & Associates',
      description: 'Premier law firm with expertise in civil, criminal, and corporate matters.',
      rating: 4.8,
      reviews: 156,
      lawyers: 15,
      location: 'Delhi',
      since: 2010,
      areas: ['Civil Law', 'Criminal Law'],
      consultation: '₹2999',
      logo: 'https://ui-avatars.com/api/?name=Shah+Associates&background=0F2944&color=fff&size=128'
    },
    {
      name: 'Mehta Legal Solutions',
      description: 'Specialized in family law and property disputes.',
      rating: 4.6,
      reviews: 98,
      lawyers: 10,
      location: 'Mumbai',
      since: 2012,
      areas: ['Family Law', 'Property Law'],
      consultation: '₹2499',
      logo: 'https://ui-avatars.com/api/?name=Mehta+Legal&background=0F2944&color=fff&size=128'
    },
    {
      name: 'Reddy & Partners',
      description: 'Leading corporate law firm serving startups and large corporations.',
      rating: 4.9,
      reviews: 203,
      lawyers: 20,
      location: 'Hyderabad',
      since: 2015,
      areas: ['Corporate Law', 'Intellectual Property'],
      consultation: '₹2499',
      logo: 'https://ui-avatars.com/api/?name=Reddy+Partners&background=0F2944&color=fff&size=128'
    },
    {
      name: 'Kumar Law Chambers',
      description: 'Expert handling of taxation and financial disputes.',
      rating: 4.7,
      reviews: 87,
      lawyers: 8,
      location: 'Bangalore',
      since: 2008,
      areas: ['Tax Law', 'Financial Law'],
      consultation: '₹3999',
      logo: 'https://ui-avatars.com/api/?name=Kumar+Law&background=0F2944&color=fff&size=128'
    },
    {
      name: 'Sharma & Co.',
      description: 'Comprehensive legal services for real estate and construction.',
      rating: 4.5,
      reviews: 64,
      lawyers: 12,
      location: 'Pune',
      since: 2011,
      areas: ['Real Estate', 'Construction Law'],
      consultation: '₹2799',
      logo: 'https://ui-avatars.com/api/?name=Sharma+Co&background=0F2944&color=fff&size=128'
    },
    {
      name: 'Gupta Legal Advisors',
      description: 'Specialized in immigration and international law matters.',
      rating: 4.8,
      reviews: 142,
      lawyers: 18,
      location: 'Gurgaon',
      since: 2013,
      areas: ['Immigration Law', 'International Law'],
      consultation: '₹3499',
      logo: 'https://ui-avatars.com/api/?name=Gupta+Legal&background=0F2944&color=fff&size=128'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <SimpleNavbar navigate={navigate} />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, specialization, or location..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2944]/20 focus:border-[#0F2944] bg-white"
                />
              </div>
              <Button
                variant="outline"
                className="border-2 border-gray-300 text-[#0F2944] hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <p className="text-gray-600">Showing 1-6 of 45 law firms</p>
          </motion.div>

          {/* Firms Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {firms.map((firm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={firm.logo}
                    alt={firm.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#0F2944] mb-1">{firm.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-[#0F2944]">{firm.rating}</span>
                          <span className="text-sm text-gray-500">({firm.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{firm.description}</p>

                <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{firm.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{firm.lawyers} lawyers</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Since {firm.since}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {firm.areas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#0F2944]/10 text-[#0F2944] text-xs rounded-full font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Consultation</p>
                    <p className="text-lg font-bold text-[#0F2944]">{firm.consultation}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="border-2 border-gray-300 text-[#0F2944] hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold"
                    >
                      View Profile
                    </Button>
                    <Button
                      className="bg-[#0F2944] hover:bg-[#0F2944]/90 text-white px-6 py-3 rounded-xl font-semibold group"
                    >
                      Join Firm
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseFirms;
