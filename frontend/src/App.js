import { useEffect, useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from './components/ui/sonner';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FeaturesPage from './pages/FeaturesPage';
import ForClientsPage from './pages/ForClientsPage';
import ForLawyersPage from './pages/ForLawyersPage';
import ContactPage from './pages/ContactPage';
import UserLoginPage from './pages/UserLoginPage';
import LawyerLoginPage from './pages/LawyerLoginPage';
import UserDashboard from './pages/UserDashboard';
import LawyerDashboard from './pages/LawyerDashboard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Auth Context
export const AuthContext = React.createContext();

const ProtectedRoute = ({ children, requiredType }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to={requiredType === 'lawyer' ? '/lawyer-login' : '/user-login'} />;
  }
  
  if (requiredType && user.user_type !== requiredType) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/for-clients" element={<ForClientsPage />} />
            <Route path="/for-lawyers" element={<ForLawyersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/user-login" element={<UserLoginPage />} />
            <Route path="/lawyer-login" element={<LawyerLoginPage />} />
            <Route 
              path="/user-dashboard" 
              element={
                <ProtectedRoute requiredType="client">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/lawyer-dashboard" 
              element={
                <ProtectedRoute requiredType="lawyer">
                  <LawyerDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

const React = require('react');