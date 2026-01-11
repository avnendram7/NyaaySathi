import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Scale, LogOut, Users, Calendar, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function LawyerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cases, setCases] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
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
  
  const handleBookingStatus = async (bookingId, status) => {
    setLoading(true);
    try {
      await axios.patch(`${API}/bookings/${bookingId}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Booking ${status}!`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update booking');
    } finally {
      setLoading(false);
    }
  };
  
  const calendarEvents = bookings.map(booking => ({
    title: `Consultation - ${booking.status}`,
    start: new Date(`${booking.date} ${booking.time}`),
    end: new Date(new Date(`${booking.date} ${booking.time}`).getTime() + 60 * 60 * 1000)
  }));
  
  const stats = {
    totalCases: cases.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length
  };
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="glass border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Scale className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Nyaay Sathi - Lawyer Portal</h1>
              <p className="text-sm text-slate-400">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <Button 
            data-testid="lawyer-dashboard-logout-btn"
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
            <TabsTrigger data-testid="lawyer-overview-tab" value="overview">Overview</TabsTrigger>
            <TabsTrigger data-testid="lawyer-clients-tab" value="clients">Clients & Cases</TabsTrigger>
            <TabsTrigger data-testid="lawyer-schedule-tab" value="schedule">Schedule</TabsTrigger>
            <TabsTrigger data-testid="lawyer-bookings-tab" value="bookings">Bookings</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" data-testid="lawyer-overview-content">
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
                <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{stats.confirmedBookings}</h3>
                <p className="text-slate-400">Confirmed</p>
              </Card>
              
              <Card className="glass p-6">
                <Users className="w-10 h-10 text-yellow-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{stats.pendingBookings}</h3>
                <p className="text-slate-400">Pending</p>
              </Card>
            </div>
            
            <div className="mt-8 glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="bg-slate-900 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold mb-1">Consultation Request</h4>
                      <p className="text-sm text-slate-400">{booking.date} at {booking.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-700/20 text-green-400' :
                      booking.status === 'pending' ? 'bg-yellow-700/20 text-yellow-400' :
                      'bg-red-700/20 text-red-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Clients & Cases Tab */}
          <TabsContent value="clients" data-testid="lawyer-clients-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">All Cases</h2>
              <div className="space-y-4">
                {cases.length === 0 ? (
                  <p className="text-slate-400">No cases assigned yet.</p>
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
                      <p className="text-slate-300 mb-3">{c.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-slate-500">
                          Created: {new Date(c.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" data-testid="lawyer-schedule-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">My Schedule</h2>
              <div style={{ height: 600 }}>
                <BigCalendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ color: '#fff', background: '#0f172a', borderRadius: '12px', padding: '20px' }}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings" data-testid="lawyer-bookings-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Consultation Requests</h2>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-slate-400">No consultation requests yet.</p>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="bg-slate-900 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">Consultation Request</h3>
                          <div className="space-y-1 text-sm">
                            <p className="text-slate-400">
                              <Calendar className="inline w-4 h-4 mr-2" />
                              {booking.date} at {booking.time}
                            </p>
                            <p className="text-slate-300 mt-2">{booking.description}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' ? 'bg-green-700/20 text-green-400' :
                          booking.status === 'pending' ? 'bg-yellow-700/20 text-yellow-400' :
                          'bg-red-700/20 text-red-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex gap-3 mt-4">
                          <Button
                            data-testid={`confirm-booking-${booking.id}-btn`}
                            onClick={() => handleBookingStatus(booking.id, 'confirmed')}
                            disabled={loading}
                            className="bg-green-700 hover:bg-green-600 rounded-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm
                          </Button>
                          <Button
                            data-testid={`reject-booking-${booking.id}-btn`}
                            onClick={() => handleBookingStatus(booking.id, 'rejected')}
                            disabled={loading}
                            variant="outline"
                            className="border-red-700 text-red-400 hover:bg-red-700/20 rounded-full"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
