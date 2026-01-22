// Comprehensive dummy lawyer data for Nyaay Sathi
// 300 lawyers across 4 states: Delhi, Uttar Pradesh, Haryana, Maharashtra

export const states = {
  'Delhi': {
    cities: ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
    courts: ['Supreme Court of India', 'Delhi High Court', 'District Court - Saket', 'District Court - Rohini', 'District Court - Tis Hazari', 'District Court - Dwarka']
  },
  'Uttar Pradesh': {
    cities: ['Lucknow', 'Noida', 'Ghaziabad', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'],
    courts: ['Allahabad High Court', 'Lucknow Bench High Court', 'District Court - Lucknow', 'District Court - Noida', 'District Court - Ghaziabad', 'District Court - Kanpur']
  },
  'Haryana': {
    cities: ['Gurgaon', 'Faridabad', 'Rohtak', 'Panipat', 'Karnal', 'Ambala', 'Hisar'],
    courts: ['Punjab & Haryana High Court', 'District Court - Gurgaon', 'District Court - Faridabad', 'District Court - Rohtak', 'District Court - Panipat']
  },
  'Maharashtra': {
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur'],
    courts: ['Bombay High Court', 'District Court - Mumbai', 'District Court - Pune', 'District Court - Nagpur', 'District Court - Thane', 'District Court - Nashik']
  }
};

export const specializations = [
  'Civil Law',
  'Criminal Law',
  'Family Law',
  'Corporate Law',
  'Property Law',
  'Tax Law',
  'Labour Law',
  'Intellectual Property Law',
  'Consumer Law',
  'Constitutional Law',
  'Banking Law',
  'Insurance Law',
  'Environmental Law',
  'Cyber Law'
];

const firstNames = [
  'Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Meera', 'Arjun', 'Kavita', 
  'Sanjay', 'Anita', 'Rahul', 'Pooja', 'Anil', 'Deepika', 'Suresh', 'Nisha',
  'Vijay', 'Rekha', 'Manish', 'Sunita', 'Ravi', 'Geeta', 'Ashok', 'Seema',
  'Ramesh', 'Sonia', 'Kiran', 'Anjali', 'Prakash', 'Swati', 'Ajay', 'Preeti'
];

const lastNames = [
  'Kumar', 'Sharma', 'Verma', 'Singh', 'Patel', 'Reddy', 'Gupta', 'Joshi',
  'Agarwal', 'Mehta', 'Shah', 'Desai', 'Rao', 'Nair', 'Iyer', 'Kulkarni',
  'Chopra', 'Malhotra', 'Kapoor', 'Bhatia', 'Khanna', 'Sethi', 'Saxena', 'Pandey'
];

const languages = [
  ['Hindi', 'English'],
  ['Hindi', 'English', 'Punjabi'],
  ['Hindi', 'English', 'Marathi'],
  ['Hindi', 'English', 'Gujarati'],
  ['Hindi', 'English', 'Bengali'],
  ['English', 'Hindi', 'Tamil'],
  ['Hindi', 'Urdu', 'English']
];

// Generate lawyers
const generateLawyers = () => {
  const lawyers = [];
  let id = 1;

  Object.keys(states).forEach(state => {
    const stateData = states[state];
    const lawyersPerState = 75; // 75 lawyers per state = 300 total

    for (let i = 0; i < lawyersPerState; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const specialization = specializations[Math.floor(Math.random() * specializations.length)];
      const city = stateData.cities[Math.floor(Math.random() * stateData.cities.length)];
      const court = stateData.courts[Math.floor(Math.random() * stateData.courts.length)];
      const experience = Math.floor(Math.random() * 25) + 3; // 3-28 years
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5-5.0
      const casesWon = Math.floor(Math.random() * 200) + 20; // 20-220 cases
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const photoId = Math.floor(Math.random() * 99) + 1;
      const langSet = languages[Math.floor(Math.random() * languages.length)];

      lawyers.push({
        id: `lawyer_${id}`,
        name: `Adv. ${firstName} ${lastName}`,
        photo: `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`,
        specialization: specialization,
        experience: experience,
        rating: parseFloat(rating),
        cases_won: casesWon,
        state: state,
        city: city,
        court: court,
        languages: langSet,
        fee: `₹${Math.floor(Math.random() * 15 + 5) * 1000} - ₹${Math.floor(Math.random() * 20 + 15) * 1000}`,
        bio: `Experienced ${specialization} practitioner with ${experience} years of expertise in handling complex legal matters. Specialized in ${court} proceedings and dedicated to providing comprehensive legal solutions.`,
        education: ['LLB', 'LLM'][Math.floor(Math.random() * 2)],
        bar_council: `${state.substring(0, 2).toUpperCase()}/${Math.floor(Math.random() * 10000) + 10000}/20${Math.floor(Math.random() * 15) + 5}`,
        available: Math.random() > 0.2 // 80% available
      });
      id++;
    }
  });

  return lawyers;
};

export const dummyLawyers = generateLawyers();

// Helper functions
export const getLawyersByState = (state) => {
  return dummyLawyers.filter(lawyer => lawyer.state === state);
};

export const getLawyersByCity = (city) => {
  return dummyLawyers.filter(lawyer => lawyer.city === city);
};

export const getLawyersBySpecialization = (specialization) => {
  return dummyLawyers.filter(lawyer => lawyer.specialization === specialization);
};

export const searchLawyers = (query, filters = {}) => {
  let results = [...dummyLawyers];

  // Text search
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(l => 
      l.name.toLowerCase().includes(q) ||
      l.specialization.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.state.toLowerCase().includes(q)
    );
  }

  // Apply filters
  if (filters.state) {
    results = results.filter(l => l.state === filters.state);
  }
  if (filters.city) {
    results = results.filter(l => l.city === filters.city);
  }
  if (filters.specialization) {
    results = results.filter(l => l.specialization === filters.specialization);
  }
  if (filters.court) {
    results = results.filter(l => l.court === filters.court);
  }
  if (filters.minExperience) {
    results = results.filter(l => l.experience >= filters.minExperience);
  }
  if (filters.minRating) {
    results = results.filter(l => l.rating >= filters.minRating);
  }

  // Sort by rating
  results.sort((a, b) => b.rating - a.rating);

  return results;
};

export default dummyLawyers;
