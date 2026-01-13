import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/waitlist`, formData);
      toast.success('Thank you! We\'ll be in touch soon.');
      setFormData({ full_name: '', email: '', message: '' });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('You\'re already on our waitlist!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Have questions? Want to join our waitlist? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Join Our Waitlist</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    data-testid="contact-name-input"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    data-testid="contact-email-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                  <Textarea
                    data-testid="contact-message-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    rows={4}
                    className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl"
                  />
                </div>
                
                <Button
                  data-testid="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-full py-3 btn-primary"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-700/20 rounded-xl">
                      <Mail className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-slate-400">avnendram.7@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-700/20 rounded-xl">
                      <Phone className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-slate-400">+91 83182 16968</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-700/20 rounded-xl">
                      <MapPin className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-slate-400">Sonipat, Haryana, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-4">Office Hours (IST)</h3>
                <div className="space-y-2 text-slate-400">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  * AI Assistant available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}