import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, LogOut, Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function LawFirmDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cases, setCases] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchData();
    }
  }, []);
  
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [casesRes, bookingsRes] = await Promise.all([
        axios.get(`${API}/cases`, { headers }),
        axios.get(`${API}/bookings`, { headers })
      ]);
      setCases(casesRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  
  const stats = {
    totalCases: cases.length,
    totalBookings: bookings.length,
    activeLawyers: 5, // Mock data
    revenue: '$25,000' // Mock data
  };
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="glass border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Nyaay Sathi - Firm Portal</h1>
              <p className="text-sm text-slate-400">Welcome, {user?.firm_name || user?.full_name}</p>
            </div>
          </div>
          <Button 
            data-testid="lawfirm-dashboard-logout-btn"
            onClick={handleLogout}
            variant="outline"
            className="border-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger data-testid="lawfirm-overview-tab" value="overview">Overview</TabsTrigger>
            <TabsTrigger data-testid="lawfirm-lawyers-tab" value="lawyers">Our Lawyers</TabsTrigger>
            <TabsTrigger data-testid="lawfirm-cases-tab" value="cases">Cases</TabsTrigger>
            <TabsTrigger data-testid="lawfirm-analytics-tab" value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" data-testid="lawfirm-overview-content">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass p-6">
                <FileText className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{stats.totalCases}</h3>
                <p className="text-slate-400">Total Cases</p>
              </Card>
              
              <Card className="glass p-6">
                <Calendar className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{stats.totalBookings}</h3>
                <p className="text-slate-400">Consultations</p>
              </Card>
              
              <Card className="glass p-6">
                <Users className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{stats.activeLawyers}</h3>
                <p className="text-slate-400">Active Lawyers</p>
              </Card>
              
              <Card className="glass p-6">
                <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{stats.revenue}</h3>
                <p className="text-slate-400">Monthly Revenue</p>
              </Card>
            </div>
            
            <div className="mt-8 glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Firm Overview</h2>
              <p className="text-slate-400">
                Welcome to your law firm dashboard. Here you can manage your lawyers, track cases, 
                monitor consultations, and analyze firm performance. Use the tabs above to navigate 
                to different sections.
              </p>
            </div>
          </TabsContent>
          
          {/* Lawyers Tab */}
          <TabsContent value="lawyers" data-testid="lawfirm-lawyers-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Our Lawyers</h2>
              <p className="text-slate-400">Lawyer management and onboarding coming soon...</p>
            </div>
          </TabsContent>
          
          {/* Cases Tab */}
          <TabsContent value="cases" data-testid="lawfirm-cases-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">All Cases</h2>
              <div className="space-y-4">
                {cases.length === 0 ? (
                  <p className="text-slate-400">No cases yet.</p>
                ) : (
                  cases.map(c => (
                    <div key={c.id} className="bg-slate-900 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{c.title}</h3>
                          <p className="text-slate-400">Case #{c.case_number}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-700/20 text-blue-400 rounded-full text-sm">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-slate-300">{c.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" data-testid="lawfirm-analytics-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Firm Analytics</h2>
              <p className="text-slate-400">Analytics and reporting features coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}