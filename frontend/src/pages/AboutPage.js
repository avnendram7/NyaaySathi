import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Target, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Nyaay Sathi</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We're on a mission to bridge the gap between citizens and the justice system using technology and AI
            </p>
          </div>
          
          {/* Mission */}
          <div className="glass rounded-3xl p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Every day, millions of people interact with the legal system but struggle to understand their cases, 
              their rights, and their next steps. This confusion leads to anxiety, delays, and injustice. 
              Nyaay Sathi exists to solve this problem by making legal information accessible, understandable, 
              and actionable for everyone.
            </p>
          </div>
          
          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="inline-flex p-4 bg-blue-700/20 rounded-xl mb-4">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clarity</h3>
              <p className="text-slate-400">
                We believe everyone deserves to understand their legal situation in simple, clear language
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <div className="inline-flex p-4 bg-blue-700/20 rounded-xl mb-4">
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empathy</h3>
              <p className="text-slate-400">
                We understand the stress of legal proceedings and design our platform with human compassion
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <div className="inline-flex p-4 bg-blue-700/20 rounded-xl mb-4">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-slate-400">
                We leverage cutting-edge AI technology to make the legal system more accessible and efficient
              </p>
            </div>
          </div>
          
          {/* Story */}
          <div className="glass rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Nyaay Sathi was born from a simple observation: while India has made significant strides in 
                digitalizing court records and case data, most citizens still struggle to make sense of this information.
              </p>
              <p>
                The legal language is complex, the processes are confusing, and finding reliable help is expensive and time-consuming. 
                We realized that technology—especially AI—could transform this experience.
              </p>
              <p>
                Today, Nyaay Sathi serves both citizens and legal professionals, creating a more transparent, 
                efficient, and humane justice system for all.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}