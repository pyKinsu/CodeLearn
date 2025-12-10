'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Trophy, Users, ArrowRight, CheckCircle, Zap, Brain, Terminal, Github, Linkedin, Twitter, Flame, TrendingUp, Star, Sparkles, Award, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const features = [
    { icon: Code, title: 'Interactive Code Editor', desc: 'Run code instantly in your browser', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, title: 'Structured Learning', desc: 'Carefully designed curriculum for each language', color: 'from-purple-500 to-pink-500' },
    { icon: Trophy, title: 'Practice Quizzes', desc: 'Challenge yourself with 2000+ questions', color: 'from-orange-500 to-red-500' },
    { icon: Flame, title: 'Real-world Examples', desc: 'Learn from professional code patterns', color: 'from-yellow-500 to-orange-500' },
    { icon: TrendingUp, title: 'Progress Tracking', desc: 'Monitor your growth with detailed analytics', color: 'from-green-500 to-emerald-500' },
    { icon: Users, title: 'Community', desc: 'Learn alongside thousands of students', color: 'from-pink-500 to-rose-500' }
  ];

  const testimonials = [
    { name: 'Ahmed Hassan', role: 'CS Student', text: 'CodeLearn helped me master C++ in just 3 months!', avatar: '👨‍🎓', rating: 5 },
    { name: 'Fatima Khan', role: 'Developer', text: 'The best platform for learning programming fundamentals.', avatar: '👩‍💻', rating: 5 },
    { name: 'Ali Raza', role: 'Engineer', text: 'Highly recommended for anyone serious about coding.', avatar: '👨‍💼', rating: 5 }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Learners', icon: Users },
    { number: '1000+', label: 'Code Examples', icon: Code },
    { number: '2000+', label: 'Quiz Questions', icon: Award },
    { number: '100%', label: 'Free Forever', icon: Sparkles }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/pykinsu' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/pykinsu' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/pykinsu' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeLearn
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#languages" className="text-gray-300 hover:text-white transition-colors font-medium">Languages</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors font-medium">Testimonials</a>
            <Link href="/login" className="px-6 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md p-6 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#languages" className="block text-gray-300 hover:text-white transition-colors">Languages</a>
            <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">Testimonials</a>
            <Link href="/login" className="block px-6 py-2 border border-blue-500 text-blue-400 rounded-lg text-center">
              Login
            </Link>
            <Link href="/signup" className="block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center font-semibold">
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">100% Free Learning Platform</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Master Programming
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Languages You Need
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Learn C, C++, Java, and Python through interactive tutorials, 1000+ code examples, and 2000+ practice questions. Perfect for students at any level.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2 justify-center">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#languages" className="px-8 py-4 border-2 border-purple-500/50 rounded-xl font-bold text-lg hover:border-purple-400 hover:bg-purple-500/10 transition-all text-center">
                  Explore Courses
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="group text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-2xl font-bold text-white">{stat.number}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Code Preview */}
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-blue-400 flex items-center gap-2">
                    <img src={languages[activeLanguage].icon} alt={languages[activeLanguage].name} className="w-6 h-6" />
                    // {languages[activeLanguage].name} Example
                  </div>
                  <div className="text-gray-300 mt-4">
                    {activeLanguage === 0 && (
                      <>
                        <div><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;stdio.h&gt;</span></div>
                        <div><span className="text-purple-400">int</span> main() {'{'}</div>
                        <div className="ml-4">printf(<span className="text-green-400">"Welcome to CodeLearn!"</span>);</div>
                        <div className="ml-4"><span className="text-purple-400">return</span> 0;</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 1 && (
                      <>
                        <div><span className="text-blue-400">#include</span> <span className="text-green-400">&lt;iostream&gt;</span></div>
                        <div><span className="text-purple-400">int</span> main() {'{'}</div>
                        <div className="ml-4">std::cout &lt;&lt; <span className="text-green-400">"Master C++!"</span>;</div>
                        <div className="ml-4"><span className="text-purple-400">return</span> 0;</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 2 && (
                      <>
                        <div><span className="text-blue-400">public class</span> <span className="text-yellow-300">CodeLearn</span> {'{'}</div>
                        <div className="ml-4"><span className="text-blue-400">public static void</span> main(String[] args) {'{'}</div>
                        <div className="ml-8">System.out.println(<span className="text-green-400">"Java Excellence!"</span>);</div>
                        <div className="ml-4">{'}'}</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 3 && (
                      <>
                        <div><span className="text-blue-400">def</span> <span className="text-yellow-300">learn_python</span>():</div>
                        <div className="ml-4"><span className="text-purple-400">print</span>(<span className="text-green-400">"Python Power!"</span>)</div>
                        <div></div>
                        <div>learn_python()</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Why CodeLearn?</h2>
            <p className="text-xl text-gray-400">Everything you need to become a great programmer</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-2">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Loved by Students</h2>
            <p className="text-xl text-gray-400">Join 50,000+ learners transforming their coding skills</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <Brain className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Coding?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of students mastering programming today
              </p>
              <Link href="/signup" className="inline-block px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/50 transition-all hover:scale-105">
                Start Free Today
              </Link>
              <p className="mt-6 text-sm text-white/80">
                ✓ No credit card required • ✓ Free forever • ✓ No hidden fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CodeLearn</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">Empowering students worldwide to master programming languages.</p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <Link 
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#languages" className="hover:text-white transition-colors">Languages</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/help" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Tutorials</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 CodeLearn. Created with 💜 by <Link href="https://github.com/pykinsu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">@pykinsu</Link>
              </p>
              <p className="text-gray-500 text-xs">
                Icons from <Link href="https://icons8.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Icons8</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
