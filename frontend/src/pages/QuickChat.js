import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { MessageSquare, Send, ArrowLeft, Scale } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '../App';

export default function QuickChat() {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Welcome to Nyaay Sathi AI Assistant! I can help you understand legal concepts, case procedures, and your rights. How can I assist you today?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Guest session ID
  const guestSessionId = 'guest_' + Math.random().toString(36).substring(7);
  
  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setLoading(true);
    
    try {
      // Call backend without authentication (guest mode)
      const response = await axios.post(`${API}/chat/guest`, { 
        message: chatInput,
        session_id: guestSessionId
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      toast.error('Chat unavailable. Please try again or sign up for full access.');
      setChatMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950">
      {/* Header */}
      <div className="glass border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              data-testid="back-to-home"
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Scale className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Nyaay Sathi AI Chat</h1>
              <p className="text-sm text-slate-400">Ask any legal question</p>
            </div>
          </div>
          
          <Button
            data-testid="signup-cta"
            onClick={() => navigate('/role-selection')}
            className="bg-blue-700 hover:bg-blue-600 rounded-full px-6 py-2"
          >
            Sign Up for Full Access
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Chat Container */}
        <div className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-3 bg-blue-700/20 rounded-xl">
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Legal Assistant</h2>
              <p className="text-slate-400">Get instant answers to your legal questions</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="space-y-4 mb-6 h-[500px] overflow-y-auto pr-2">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-slate-900 text-slate-200 chat-response'
                }`}>
                  <div dangerouslySetInnerHTML={{ 
                    __html: msg.content
                      .replace(/\n/g, '<br>')
                      .replace(/## /g, '<h2>')
                      .replace(/### /g, '<h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleChat} className="flex gap-3">
            <Input
              data-testid="quick-chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a legal question... (e.g., What is bail?)"
              className="bg-slate-950 border-slate-800 focus:border-blue-500 rounded-xl py-3 text-lg"
              disabled={loading}
            />
            <Button 
              data-testid="quick-chat-send"
              type="submit" 
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-600 rounded-full px-8"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-slate-500">
            💡 Tip: Sign up for unlimited chats, case tracking, and lawyer consultations
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-6 text-center">
            <h3 className="font-bold mb-2">Free AI Assistance</h3>
            <p className="text-sm text-slate-400">Get instant legal guidance</p>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <h3 className="font-bold mb-2">Expert Lawyers</h3>
            <p className="text-sm text-slate-400">Connect with verified professionals</p>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <h3 className="font-bold mb-2">Case Management</h3>
            <p className="text-sm text-slate-400">Track your legal journey</p>
          </div>
        </div>
      </div>
    </div>
  );
}
