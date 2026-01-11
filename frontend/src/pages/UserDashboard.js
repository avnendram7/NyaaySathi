import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Scale, LogOut, FileText, MessageSquare, Calendar, Plus, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [newCase, setNewCase] = useState({ title: '', case_number: '', description: '', status: 'active' });
  const [newBooking, setNewBooking] = useState({ lawyer_id: '', date: '', time: '', description: '' });
  
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
      const [casesRes, docsRes, bookingsRes, lawyersRes] = await Promise.all([
        axios.get(`${API}/cases`, { headers }),
        axios.get(`${API}/documents`, { headers }),
        axios.get(`${API}/bookings`, { headers }),
        axios.get(`${API}/lawyers`)
      ]);
      setCases(casesRes.data);
      setDocuments(docsRes.data);
      setBookings(bookingsRes.data);
      setLawyers(lawyersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  
  const handleCreateCase = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/cases`, newCase, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Case created successfully!');
      setNewCase({ title: '', case_number: '', description: '', status: 'active' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create case');
    } finally {
      setLoading(false);
    }
  };
  
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/bookings`, newBooking, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Booking request sent!');
      setNewBooking({ lawyer_id: '', date: '', time: '', description: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/chat`, { message: chatInput }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      toast.error('Chat error');
      setChatMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };
  
  const calendarEvents = bookings.map(booking => ({
    title: `Consultation - ${booking.status}`,
    start: new Date(`${booking.date} ${booking.time}`),
    end: new Date(new Date(`${booking.date} ${booking.time}`).getTime() + 60 * 60 * 1000)
  }));
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="glass border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Scale className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Nyaay Sathi</h1>
              <p className="text-sm text-slate-400">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <Button 
            data-testid="dashboard-logout-btn"
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
            <TabsTrigger data-testid="overview-tab" value="overview">Overview</TabsTrigger>
            <TabsTrigger data-testid="cases-tab" value="cases">My Cases</TabsTrigger>
            <TabsTrigger data-testid="chat-tab" value="chat">AI Assistant</TabsTrigger>
            <TabsTrigger data-testid="bookings-tab" value="bookings">Consultations</TabsTrigger>
            <TabsTrigger data-testid="documents-tab" value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" data-testid="overview-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass p-6">
                <FileText className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{cases.length}</h3>
                <p className="text-slate-400">Active Cases</p>
              </Card>
              
              <Card className="glass p-6">
                <Calendar className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{bookings.length}</h3>
                <p className="text-slate-400">Consultations</p>
              </Card>
              
              <Card className="glass p-6">
                <FileText className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-1">{documents.length}</h3>
                <p className="text-slate-400">Documents</p>
              </Card>
            </div>
            
            <div className="mt-8 glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Cases</h2>
              {cases.length === 0 ? (
                <p className="text-slate-400">No cases yet. Create your first case above!</p>
              ) : (
                <div className="space-y-3">
                  {cases.slice(0, 3).map(c => (
                    <div key={c.id} className="bg-slate-900 rounded-xl p-4">
                      <h3 className="font-bold mb-1">{c.title}</h3>
                      <p className="text-sm text-slate-400">Case #{c.case_number}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-700/20 text-blue-400 rounded-full text-xs">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Cases Tab */}
          <TabsContent value="cases" data-testid="cases-content">
            <div className="glass rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Cases</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button data-testid="add-case-btn" className="bg-blue-700 hover:bg-blue-600 rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Case
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-800">
                    <DialogHeader>
                      <DialogTitle>Create New Case</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateCase} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Case Title</label>
                        <Input
                          data-testid="case-title-input"
                          value={newCase.title}
                          onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                          placeholder="e.g., Property Dispute"
                          required
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Case Number</label>
                        <Input
                          data-testid="case-number-input"
                          value={newCase.case_number}
                          onChange={(e) => setNewCase({...newCase, case_number: e.target.value})}
                          placeholder="e.g., CS/123/2025"
                          required
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          data-testid="case-description-input"
                          value={newCase.description}
                          onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                          placeholder="Brief description of the case"
                          required
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <Button 
                        data-testid="create-case-btn"
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-600 rounded-full"
                      >
                        {loading ? 'Creating...' : 'Create Case'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {cases.map(c => (
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
                    <p className="text-sm text-slate-500">
                      Created: {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Chat Tab */}
          <TabsContent value="chat" data-testid="chat-content">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-8 h-8 text-blue-500" />
                <div>
                  <h2 className="text-2xl font-bold">AI Legal Assistant</h2>
                  <p className="text-slate-400">Ask any legal question</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6 h-96 overflow-y-auto">
                {chatMessages.length === 0 && (
                  <div className="text-center text-slate-400 py-12">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with our AI assistant</p>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl rounded-2xl p-4 ${
                      msg.role === 'user' 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-slate-900 text-slate-200 chat-response'
                    }`}>
                      <div dangerouslySetInnerHTML={{ 
                        __html: msg.content.replace(/\n/g, '<br>').replace(/## /g, '<h2>').replace(/### /g, '<h3>')
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleChat} className="flex gap-3">
                <Input
                  data-testid="chat-input"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a legal question..."
                  className="bg-slate-950 border-slate-800"
                  disabled={loading}
                />
                <Button 
                  data-testid="chat-send-btn"
                  type="submit" 
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-600 rounded-full px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </TabsContent>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings" data-testid="bookings-content">
            <div className="glass rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Consultations</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button data-testid="book-consultation-btn" className="bg-blue-700 hover:bg-blue-600 rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-800">
                    <DialogHeader>
                      <DialogTitle>Book a Consultation</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Lawyer</label>
                        <select
                          data-testid="lawyer-select"
                          value={newBooking.lawyer_id}
                          onChange={(e) => setNewBooking({...newBooking, lawyer_id: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                        >
                          <option value="">Choose a lawyer</option>
                          {lawyers.map(lawyer => (
                            <option key={lawyer.id} value={lawyer.id}>{lawyer.full_name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <Input
                          data-testid="booking-date-input"
                          type="date"
                          value={newBooking.date}
                          onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                          required
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time</label>
                        <Input
                          data-testid="booking-time-input"
                          type="time"
                          value={newBooking.time}
                          onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                          required
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          data-testid="booking-description-input"
                          value={newBooking.description}
                          onChange={(e) => setNewBooking({...newBooking, description: e.target.value})}
                          placeholder="What do you need help with?"
                          required
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <Button 
                        data-testid="confirm-booking-btn"
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-600 rounded-full"
                      >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="mb-8">
                <div style={{ height: 500 }}>
                  <BigCalendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ color: '#fff', background: '#0f172a', borderRadius: '12px', padding: '20px' }}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Upcoming Consultations</h3>
                {bookings.map(booking => (
                  <div key={booking.id} className="bg-slate-900 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold mb-1">Consultation</h4>
                        <p className="text-sm text-slate-400">{booking.date} at {booking.time}</p>
                        <p className="text-sm text-slate-300 mt-2">{booking.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-700/20 text-green-400' :
                        booking.status === 'pending' ? 'bg-yellow-700/20 text-yellow-400' :
                        'bg-red-700/20 text-red-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" data-testid="documents-content">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">My Documents</h2>
              {documents.length === 0 ? (
                <p className="text-slate-400">No documents uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map(doc => (
                    <div key={doc.id} className="bg-slate-900 rounded-xl p-4">
                      <FileText className="w-8 h-8 text-blue-500 mb-2" />
                      <h4 className="font-bold mb-1">{doc.title}</h4>
                      <p className="text-sm text-slate-400">Type: {doc.file_type}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
