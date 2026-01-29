import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Search, Filter, Star, Briefcase, MapPin, ArrowRight } from 'lucide-react';
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
              onClick={() => navigate('/ai-lawyer-chat')}
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

const BrowseLawyers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const lawyers = [
    {
      name: 'Adv. Seema Malhotra',
      specialization: 'Cyber Law',
      rating: 5,
      reviews: 41,
      experience: 14,
      location: 'West Delhi, Delhi',
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Adv. Vikram Reddy',
      specialization: 'Cyber Law',
      rating: 5,
      reviews: 56,
      experience: 11,
      location: 'North Delhi, Delhi',
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      name: 'Adv. Meera Nair',
      specialization: 'Civil Law',
      rating: 5,
      reviews: 37,
      experience: 11,
      location: 'Ghaziabad, Uttar Pradesh',
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Adv. Anita Khanna',
      specialization: 'Family Law',
      rating: 5,
      reviews: 188,
      experience: 7,
      location: 'Allahabad, Uttar Pradesh',
      image: 'https://i.pravatar.cc/150?img=9'
    },
    {
      name: 'Adv. Vikram Kapoor',
      specialization: 'Tax Law',
      rating: 5,
      reviews: 31,
      experience: 11,
      location: 'Panipat, Haryana',
      image: 'https://i.pravatar.cc/150?img=13'
    },
    {
      name: 'Adv. Rajesh Shah',
      specialization: 'Property Law',
      rating: 5,
      reviews: 30,
      experience: 10,
      location: 'Hisar, Haryana',
      image: 'https://i.pravatar.cc/150?img=14'
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
            <p className="text-gray-600">Showing 1-20 of 300 lawyers</p>
          </motion.div>

          {/* Lawyers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-[#0F2944]">{lawyer.rating}</span>
                    <span className="text-sm text-gray-500">({lawyer.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0F2944] mb-1">{lawyer.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{lawyer.specialization}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{lawyer.experience}yrs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{lawyer.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-300 text-[#0F2944] hover:bg-gray-50 py-3 rounded-xl font-semibold"
                  >
                    View Profile
                  </Button>
                  <Button
                    className="w-full bg-[#0F2944] hover:bg-[#0F2944]/90 text-white py-3 rounded-xl font-semibold group"
                  >
                    Book
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseLawyers;