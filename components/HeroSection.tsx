'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Code, Trophy, Users, ArrowRight, Brain, Flame, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const stats = [
    { number: '50,000+', label: 'Active Learners' },
    { number: '1000+', label: 'Code Examples' },
    { number: '2000+', label: 'Quiz Questions' },
    { number: '100%', label: 'Free Forever' }
  ];

  const features = [
    { icon: Code, title: 'Interactive Code Editor', desc: 'Run code instantly in your browser', delay: 0 },
    { icon: BookOpen, title: 'Structured Learning', desc: 'Carefully designed curriculum for each language', delay: 100 },
    { icon: Trophy, title: 'Practice Quizzes', desc: 'Challenge yourself with 2000+ questions', delay: 200 },
    { icon: Flame, title: 'Real-world Examples', desc: 'Learn from professional code patterns', delay: 300 },
    { icon: TrendingUp, title: 'Progress Tracking', desc: 'Monitor your growth with detailed analytics', delay: 400 },
    { icon: Users, title: 'Community', desc: 'Learn alongside thousands of students', delay: 500 }
  ];
  const languages = [
    { 
      name: 'C', 
      icon: 'https://img.icons8.com/color/96/c-programming.png',
      color: 'from-blue-600 to-cyan-600', 
      description: 'Master fundamentals with pointers and memory management',
      topics: ['Variables & Types', 'Pointers', 'File I/O', 'Data Structures']
    },
    { 
      name: 'C++', 
      icon: 'https://img.icons8.com/color/96/c-plus-plus-logo.png',
      color: 'from-purple-600 to-blue-600', 
      description: 'Advanced OOP, STL, and modern C++ features',
      topics: ['Classes & Objects', 'STL', 'Templates', 'Exception Handling']
    },
    { 
      name: 'Java', 
      icon: 'https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png',
      color: 'from-orange-600 to-red-600', 
      description: 'Enterprise development and Android programming',
      topics: ['OOP Principles', 'Collections', 'Multithreading', 'Spring Boot']
    },
    { 
      name: 'Python', 
      icon: 'https://img.icons8.com/color/96/python--v1.png',
      color: 'from-yellow-500 to-blue-600', 
      description: 'Versatile language for web, ML, and automation',
      topics: ['Data Structures', 'Web Dev', 'ML Basics', 'Automation']
    }
  ];


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            left: `${mousePosition.x - 250}px`,
            top: `${mousePosition.y - 250}px`,
          }}
        />
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Subtle grid background */}
      <div className="fixed inset-0 -z-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Hero Content */}
      <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in-up">
          <Sparkles className="w-3 h-3 text-gray-400 animate-pulse" />
          <span className="text-xs text-gray-400">100% Free Learning Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight animate-fade-in-up">
          Master Programming
          <br />
          <span className="text-gray-500 inline-block animate-fade-in-up">Languages You Need</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up">
          Learn C, C++, Java, and Python through interactive tutorials, 1000+ code examples, and 2000+ practice questions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up">
          <Link href="/signup" className="group px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-all font-medium inline-flex items-center gap-2 justify-center hover:scale-105 transform">
            Start Learning Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#languages" className="px-6 py-3 border border-white/10 rounded-md hover:bg-white/5 hover:border-white/20 transition-all font-medium hover:scale-105 transform">
            Explore Courses
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-8 border-t border-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group cursor-default">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>


        {/* Languages Section */}
      <section id="languages" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Master Four Languages</h2>
            <p className="text-xl text-gray-400">Choose your learning path and become proficient</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {languages.map((lang, idx) => (
              <div key={idx} className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40">
                <div className="mb-4">
                  <img 
                    src={lang.icon} 
                    alt={lang.name}
                    className="w-16 h-16 mx-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center">{lang.name}</h3>
                <p className="text-gray-400 text-sm mb-4 text-center">{lang.description}</p>
                <ul className="space-y-2 mb-6">
                  {lang.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="w-full block text-center py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Learn {lang.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
        
        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="group bg-white/5 backdrop-blur-xl rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
