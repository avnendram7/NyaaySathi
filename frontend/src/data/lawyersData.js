// Comprehensive Dummy Lawyer Data for Lxwyer Up - 500 Lawyers

const firstNames = [
  'Rajesh', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sunita', 'Arun', 'Kavita', 'Sanjay', 'Meera',
  'Rahul', 'Anjali', 'Deepak', 'Pooja', 'Suresh', 'Rekha', 'Vivek', 'Anita', 'Manish', 'Seema',
  'Rakesh', 'Shweta', 'Ajay', 'Nisha', 'Vijay', 'Ritu', 'Ashok', 'Divya', 'Ramesh', 'Sarita',
  'Karan', 'Jyoti', 'Nikhil', 'Preeti', 'Gaurav', 'Shruti', 'Alok', 'Swati', 'Mohit', 'Pallavi',
  'Rohit', 'Megha', 'Tarun', 'Sneha', 'Pankaj', 'Komal', 'Harsh', 'Tanvi', 'Vishal', 'Sakshi'
];

const lastNames = [
  'Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Malhotra', 'Kapoor', 'Agarwal', 'Jain', 'Patel',
  'Shah', 'Mehta', 'Reddy', 'Nair', 'Khanna', 'Bhatia', 'Chopra', 'Bansal', 'Saxena', 'Yadav',
  'Mishra', 'Pandey', 'Dubey', 'Srivastava', 'Tiwari', 'Chauhan', 'Rathore', 'Arora', 'Sethi', 'Dhawan',
  'Bajaj', 'Goyal', 'Ahuja', 'Mehra', 'Tandon', 'Kaul', 'Dua', 'Vohra', 'Grover', 'Bhargava'
];

const specializations = [
  'Criminal Law', 'Civil Law', 'Family Law', 'Property Law', 'Corporate Law',
  'Tax Law', 'Labour Law', 'Consumer Law', 'Constitutional Law', 'Intellectual Property',
  'Banking Law', 'Cyber Law', 'Immigration Law', 'Environmental Law', 'Medical Negligence'
];

const cities = [
  { city: 'New Delhi', state: 'Delhi' },
  { city: 'North Delhi', state: 'Delhi' },
  { city: 'South Delhi', state: 'Delhi' },
  { city: 'West Delhi', state: 'Delhi' },
  { city: 'East Delhi', state: 'Delhi' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Noida', state: 'Uttar Pradesh' },
  { city: 'Ghaziabad', state: 'Uttar Pradesh' },
  { city: 'Varanasi', state: 'Uttar Pradesh' },
  { city: 'Gurgaon', state: 'Haryana' },
  { city: 'Faridabad', state: 'Haryana' },
  { city: 'Chandigarh', state: 'Punjab' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Patna', state: 'Bihar' },
  { city: 'Kochi', state: 'Kerala' }
];

const courts = [
  'Supreme Court', 'High Court', 'District Court', 'Sessions Court', 'Family Court',
  'Consumer Court', 'Labour Court', 'NCLT', 'ITAT', 'Civil Court'
];

const languages = ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];

const educations = [
  'LLB from Delhi University',
  'LLB, LLM from NLS Bangalore',
  'BA LLB from NALSAR',
  'LLB from Mumbai University',
  'LLB, LLM from Symbiosis',
  'BA LLB from Amity University',
  'LLB from Lucknow University',
  'LLB from Gujarat University',
  'BA LLB from NLIU Bhopal',
  'LLB, LLM from Pune University'
];

const generateLawyers = () => {
  const lawyers = [];
  
  for (let i = 1; i <= 500; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];
    const spec = specializations[Math.floor(Math.random() * specializations.length)];
    const experience = Math.floor(Math.random() * 25) + 3;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const reviews = Math.floor(Math.random() * 200) + 10;
    const casesWon = Math.floor(Math.random() * 300) + 50;
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const imgNum = Math.floor(Math.random() * 70) + 1;
    
    const lawyer = {
      id: `lawyer_${i}`,
      name: `Adv. ${firstName} ${lastName}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@lawmail.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      specialization: spec,
      secondarySpecializations: [
        specializations[Math.floor(Math.random() * specializations.length)],
        specializations[Math.floor(Math.random() * specializations.length)]
      ].filter((s, idx, arr) => arr.indexOf(s) === idx && s !== spec).slice(0, 2),
      experience,
      rating: parseFloat(rating),
      reviews,
      casesWon,
      casesHandled: casesWon + Math.floor(Math.random() * 100),
      city: location.city,
      state: location.state,
      location: `${location.city}, ${location.state}`,
      court: courts[Math.floor(Math.random() * courts.length)],
      barCouncilNumber: `${location.state.substring(0, 2).toUpperCase()}/${Math.floor(Math.random() * 9000) + 1000}/${2024 - experience}`,
      education: educations[Math.floor(Math.random() * educations.length)],
      languages: [
        'English',
        'Hindi',
        ...languages.filter(() => Math.random() > 0.7).slice(0, 2)
      ].filter((l, idx, arr) => arr.indexOf(l) === idx),
      feeMin: (Math.floor(Math.random() * 5) + 2) * 1000,
      feeMax: (Math.floor(Math.random() * 10) + 8) * 1000,
      bio: `Experienced ${spec} advocate with ${experience}+ years of practice. Successfully handled ${casesWon}+ cases with a strong track record. Known for dedication and client-focused approach.`,
      image: `https://randomuser.me/api/portraits/${gender}/${imgNum}.jpg`,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].filter(() => Math.random() > 0.3),
      consultationModes: ['In-Person', 'Video Call', 'Phone'].filter(() => Math.random() > 0.3),
      verified: Math.random() > 0.2,
      featured: Math.random() > 0.9,
      joinedDate: `${2024 - Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`
    };
    
    lawyers.push(lawyer);
  }
  
  return lawyers;
};

export const dummyLawyers = generateLawyers();

export const specializationsList = specializations;
export const citiesList = cities;
export const statesList = [...new Set(cities.map(c => c.state))];

export default dummyLawyers;
