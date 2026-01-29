// Comprehensive Dummy Law Firm Data for Lxwyer Up - 100 Law Firms

const firmPrefixes = [
  'Shah', 'Kumar', 'Mehta', 'Reddy', 'Khanna', 'Patel', 'Singh', 'Verma', 'Gupta', 'Agarwal',
  'Bhatia', 'Chopra', 'Bansal', 'Saxena', 'Yadav', 'Mishra', 'Pandey', 'Srivastava', 'Tiwari', 'Chauhan',
  'Rathore', 'Arora', 'Sethi', 'Dhawan', 'Bajaj', 'Goyal', 'Ahuja', 'Mehra', 'Tandon', 'Kaul',
  'Dua', 'Vohra', 'Grover', 'Bhargava', 'Joshi', 'Sharma', 'Kapoor', 'Malhotra', 'Jain', 'Nair'
];

const firmSuffixes = [
  '& Associates', '& Partners', 'Legal Solutions', 'Law Chambers', 'Law Group',
  'Legal Consultancy', 'Legal Services', '& Co.', 'Law Firm', 'Legal Advisors'
];

const specializations = [
  'Criminal Law', 'Civil Law', 'Family Law', 'Property Law', 'Corporate Law',
  'Tax Law', 'Labour Law', 'Consumer Law', 'Constitutional Law', 'Intellectual Property',
  'Banking Law', 'Cyber Law', 'Immigration Law', 'Environmental Law', 'Real Estate Law'
];

const cities = [
  { city: 'New Delhi', state: 'Delhi', area: 'Connaught Place' },
  { city: 'New Delhi', state: 'Delhi', area: 'Saket' },
  { city: 'New Delhi', state: 'Delhi', area: 'Dwarka' },
  { city: 'Mumbai', state: 'Maharashtra', area: 'Nariman Point' },
  { city: 'Mumbai', state: 'Maharashtra', area: 'Bandra' },
  { city: 'Mumbai', state: 'Maharashtra', area: 'Andheri' },
  { city: 'Pune', state: 'Maharashtra', area: 'Koregaon Park' },
  { city: 'Bangalore', state: 'Karnataka', area: 'MG Road' },
  { city: 'Bangalore', state: 'Karnataka', area: 'Koramangala' },
  { city: 'Chennai', state: 'Tamil Nadu', area: 'T Nagar' },
  { city: 'Kolkata', state: 'West Bengal', area: 'Park Street' },
  { city: 'Hyderabad', state: 'Telangana', area: 'Banjara Hills' },
  { city: 'Ahmedabad', state: 'Gujarat', area: 'CG Road' },
  { city: 'Lucknow', state: 'Uttar Pradesh', area: 'Hazratganj' },
  { city: 'Noida', state: 'Uttar Pradesh', area: 'Sector 62' },
  { city: 'Gurgaon', state: 'Haryana', area: 'Cyber City' },
  { city: 'Chandigarh', state: 'Punjab', area: 'Sector 17' },
  { city: 'Jaipur', state: 'Rajasthan', area: 'MI Road' },
  { city: 'Indore', state: 'Madhya Pradesh', area: 'Vijay Nagar' },
  { city: 'Kochi', state: 'Kerala', area: 'MG Road' }
];

const descriptions = [
  'Premier law firm with expertise in civil, criminal, and corporate matters.',
  'Leading legal practice providing comprehensive legal solutions.',
  'Trusted legal advisors with a proven track record of success.',
  'Modern law firm combining technology with legal expertise.',
  'Client-focused legal services with personalized attention.',
  'Established practice known for integrity and excellence.',
  'Dynamic legal team handling complex litigation matters.',
  'Full-service law firm serving individuals and businesses.',
  'Expert legal counsel with deep industry knowledge.',
  'Boutique law firm specializing in niche practice areas.'
];

const generateLawFirms = () => {
  const firms = [];
  const usedNames = new Set();
  
  for (let i = 1; i <= 100; i++) {
    let firmName;
    do {
      const prefix = firmPrefixes[Math.floor(Math.random() * firmPrefixes.length)];
      const suffix = firmSuffixes[Math.floor(Math.random() * firmSuffixes.length)];
      firmName = `${prefix} ${suffix}`;
    } while (usedNames.has(firmName));
    usedNames.add(firmName);
    
    const location = cities[Math.floor(Math.random() * cities.length)];
    const establishedYear = Math.floor(Math.random() * 20) + 2005;
    const totalLawyers = Math.floor(Math.random() * 45) + 5;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const reviews = Math.floor(Math.random() * 300) + 20;
    const casesHandled = Math.floor(Math.random() * 1000) + 200;
    
    // Select 2-4 specializations
    const firmSpecs = [];
    const specCount = Math.floor(Math.random() * 3) + 2;
    while (firmSpecs.length < specCount) {
      const spec = specializations[Math.floor(Math.random() * specializations.length)];
      if (!firmSpecs.includes(spec)) firmSpecs.push(spec);
    }
    
    const consultationFee = (Math.floor(Math.random() * 4) + 2) * 500 + 999;
    
    const firm = {
      id: `firm_${i}`,
      firm_name: firmName,
      name: firmName, // alias
      email: `contact@${firmName.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      website: `www.${firmName.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      address: `${location.area}, ${location.city}`,
      city: location.city,
      state: location.state,
      pincode: String(Math.floor(Math.random() * 900000) + 100000),
      registration_number: `${location.state.substring(0, 2).toUpperCase()}/LAW/${establishedYear}/${String(i).padStart(3, '0')}`,
      established_year: establishedYear,
      since: establishedYear,
      total_lawyers: totalLawyers,
      lawyers: totalLawyers, // alias
      total_staff: Math.floor(totalLawyers * 1.5),
      practice_areas: firmSpecs,
      areas: firmSpecs, // alias
      specializations: firmSpecs,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      achievements: `Won ${casesHandled}+ cases, Featured in Legal 500, Recognized by Bar Council`,
      status: 'approved',
      rating: parseFloat(rating),
      reviews,
      casesHandled,
      consultation: `₹${consultationFee}`,
      consultationFee,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(firmName.split(' ').slice(0, 2).join('+'))}&background=0F2944&color=fff&size=128`,
      verified: Math.random() > 0.2,
      featured: Math.random() > 0.85,
      services: [
        'Legal Consultation',
        'Document Drafting',
        'Court Representation',
        'Legal Research',
        'Mediation Services'
      ].filter(() => Math.random() > 0.3),
      workingHours: '9:00 AM - 6:00 PM',
      workingDays: 'Monday - Saturday'
    };
    
    firms.push(firm);
  }
  
  return firms;
};

export const dummyLawFirms = generateLawFirms();

export const specializationsList = specializations;
export const citiesList = [...new Set(cities.map(c => c.city))];
export const statesList = [...new Set(cities.map(c => c.state))];

export default dummyLawFirms;
