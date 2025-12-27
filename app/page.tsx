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
      description: 'Master fundamentals with pointers and memory management',
      topics: ['Variables & Types', 'Pointers', 'File I/O', 'Data Structures']
    },
    { 
      name: 'C++', 
      icon: 'https://img.icons8.com/color/96/c-plus-plus-logo.png',
      description: 'Advanced OOP, STL, and modern C++ features',
      topics: ['Classes & Objects', 'STL', 'Templates', 'Exception Handling']
    },
    { 
      name: 'Java', 
      icon: 'https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png',
      description: 'Enterprise development and Android programming',
      topics: ['OOP Principles', 'Collections', 'Multithreading', 'Spring Boot']
    },
    { 
      name: 'Python', 
      icon: 'https://img.icons8.com/color/96/python--v1.png',
      description: 'Versatile language for web, ML, and automation',
      topics: ['Data Structures', 'Web Dev', 'ML Basics', 'Automation']
    }
  ];

  const features = [
    { icon: Code, title: 'Interactive Code Editor', desc: 'Run code instantly in your browser' },
    { icon: BookOpen, title: 'Structured Learning', desc: 'Carefully designed curriculum for each language' },
    { icon: Trophy, title: 'Practice Quizzes', desc: 'Challenge yourself with 2000+ questions' },
    { icon: Flame, title: 'Real-world Examples', desc: 'Learn from professional code patterns' },
    { icon: TrendingUp, title: 'Progress Tracking', desc: 'Monitor your growth with detailed analytics' },
    { icon: Users, title: 'Community', desc: 'Learn alongside thousands of students' }
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
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm' : 'bg-white/50 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Terminal className="w-8 h-8 text-black group-hover:text-gray-700 transition-colors" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">CodeLearn</span>
              <span className="inline-block px-2 py-0.5 bg-black text-white text-xs font-bold rounded">BETA</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-black transition-colors font-medium">Features</a>
            <a href="#languages" className="text-gray-700 hover:text-black transition-colors font-medium">Languages</a>
            <a href="#testimonials" className="text-gray-700 hover:text-black transition-colors font-medium">Testimonials</a>
            <Link href="/login" className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all font-semibold">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-black text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur-md p-6 space-y-4">
            <a href="#features" className="block text-gray-700 hover:text-black transition-colors font-medium">Features</a>
            <a href="#languages" className="block text-gray-700 hover:text-black transition-colors font-medium">Languages</a>
            <a href="#testimonials" className="block text-gray-700 hover:text-black transition-colors font-medium">Testimonials</a>
            <Link href="/login" className="block px-6 py-2 border-2 border-black text-black rounded-lg text-center font-semibold">
              Login
            </Link>
            <Link href="/signup" className="block px-6 py-2 bg-black text-white rounded-lg text-center font-semibold">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/10 border border-black/20 rounded-full">
                <Sparkles className="w-4 h-4 text-black" />
                <span className="text-sm font-semibold text-black">100% Free Learning Platform</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-black">
                Master Programming
                <span className="block text-gray-700">Languages You Need</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Learn C, C++, Java, and Python through interactive tutorials, 1000+ code examples, and 2000+ practice questions. Perfect for students at any level.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="group px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#languages" className="px-8 py-4 border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all text-center">
                  Explore Courses
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="group text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-2xl font-bold text-black">{stat.number}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Code Preview */}
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-8 border border-black/20 shadow-xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-black flex items-center gap-2">
                    <img src={languages[activeLanguage].icon} alt={languages[activeLanguage].name} className="w-6 h-6" />
                    // {languages[activeLanguage].name} Example
                  </div>
                  <div className="text-gray-700 mt-4">
                    {activeLanguage === 0 && (
                      <>
                        <div><span className="text-purple-700">#include</span> <span className="text-green-700">&lt;stdio.h&gt;</span></div>
                        <div><span className="text-purple-700">int</span> main() {'{'}</div>
                        <div className="ml-4">printf(<span className="text-green-700">"Welcome to CodeLearn!"</span>);</div>
                        <div className="ml-4"><span className="text-purple-700">return</span> 0;</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 1 && (
                      <>
                        <div><span className="text-blue-700">#include</span> <span className="text-green-700">&lt;iostream&gt;</span></div>
                        <div><span className="text-purple-700">int</span> main() {'{'}</div>
                        <div className="ml-4">std::cout &lt;&lt; <span className="text-green-700">"Master C++!"</span>;</div>
                        <div className="ml-4"><span className="text-purple-700">return</span> 0;</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 2 && (
                      <>
                        <div><span className="text-blue-700">public class</span> <span className="text-yellow-700">CodeLearn</span> {'{'}</div>
                        <div className="ml-4"><span className="text-blue-700">public static void</span> main(String[] args) {'{'}</div>
                        <div className="ml-8">System.out.println(<span className="text-green-700">"Java Excellence!"</span>);</div>
                        <div className="ml-4">{'}'}</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 3 && (
                      <>
                        <div><span className="text-blue-700">def</span> <span className="text-yellow-700">learn_python</span>():</div>
                        <div className="ml-4"><span className="text-purple-700">print</span>(<span className="text-green-700">"Python Power!"</span>)</div>
                        <div></div>
                        <div>learn_python()</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-20 px-6 border-t border-black/10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black">Master Four Languages</h2>
            <p className="text-xl text-gray-600">Choose your learning path and become proficient</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {languages.map((lang, idx) => (
              <div key={idx} className="group relative bg-white rounded-2xl p-6 border border-black/10 hover:border-black transition-all duration-300 hover:shadow-xl">
                <div className="mb-4">
                  <img 
                    src={lang.icon} 
                    alt={lang.name}
                    className="w-16 h-16 mx-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center text-black">{lang.name}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{lang.description}</p>
                <ul className="space-y-2 mb-6">
                  {lang.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-black" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="w-full block text-center py-2 bg-black text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Learn {lang.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black">Why CodeLearn?</h2>
            <p className="text-xl text-gray-600">Everything you need to become a great programmer</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group bg-white rounded-2xl p-8 border border-black/10 hover:border-black transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 border-t border-black/10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black">Loved by Students</h2>
            <p className="text-xl text-gray-600">Join 50,000+ learners transforming their coding skills</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-black/10 hover:border-black transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-black">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-black/10">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-3xl p-12 text-center overflow-hidden">
            <div className="relative z-10">
              <Brain className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Start Coding?</h2>
              <p className="text-xl mb-8 text-gray-200">
                Join thousands of students mastering programming today
              </p>
              <Link href="/signup" className="inline-block px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                Start Free Today
              </Link>
              <p className="mt-6 text-sm text-gray-300">
                ✓ No credit card required • ✓ Free forever • ✓ No hidden fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-black/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-6 h-6 text-black" />
                <span className="text-xl font-bold text-black">CodeLearn</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">Empowering students worldwide to master programming languages.</p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <Link 
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-black">Platform</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#languages" className="hover:text-black transition-colors">Languages</a></li>
                <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
                <li><Link href="/help" className="hover:text-black transition-colors">Pricing</Link></li>
                <li><Link href="/help" className="hover:text-black transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-black">Resources</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/help" className="hover:text-black transition-colors">Documentation</Link></li>
                <li><Link href="/help" className="hover:text-black transition-colors">Tutorials</Link></li>
                <li><Link href="/help" className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-black transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-black">Legal</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/terms" className="hover:text-black transition-colors">Terms</Link></li>
                <li><Link href="/terms" className="hover:text-black transition-colors">Privacy</Link></li>
                <li><Link href="/help" className="hover:text-black transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-black transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-black/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2024 CodeLearn. Created with 💜 by <Link href="https://github.com/pykinsu" target="_blank" rel="noopener noreferrer" className="text-black hover:underline font-semibold">@pykinsu</Link>
              </p>
              <p className="text-gray-500 text-xs">
                Icons from <Link href="https://icons8.com" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">Icons8</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
