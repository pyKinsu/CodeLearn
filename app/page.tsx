'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Trophy, Users, ArrowRight, CheckCircle, Zap, Brain, Terminal, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeLanguage, setActiveLanguage] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const languages = [
    { 
      name: 'Python', 
      color: 'from-blue-500 to-yellow-500', 
      icon: 'https://img.icons8.com/color/96/python--v1.png',
    },
    { 
      name: 'Java', 
      color: 'from-red-500 to-orange-500', 
      icon: 'https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png',
    },
    { 
      name: 'C', 
      color: 'from-purple-500 to-blue-500', 
      icon: 'https://img.icons8.com/color/96/c-programming.png',
    }
  ];

  const features = [
    { icon: Code, title: 'Interactive Learning', desc: 'Learn by doing with hands-on code examples' },
    { icon: BookOpen, title: 'Comprehensive Resources', desc: 'Access tutorials for C, Java, and Python' },
    { icon: Trophy, title: 'Test Your Skills', desc: 'Challenge yourself with coding quizzes' },
    { icon: Users, title: 'Community Driven', desc: 'Built by students, for students' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/pykinsu', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/pykinsu', color: 'hover:text-blue-400' },
    { name: 'X (Twitter)', icon: Twitter, url: 'https://x.com/pykinsu', color: 'hover:text-sky-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/90 backdrop-blur-lg shadow-lg shadow-purple-500/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Terminal className="w-8 h-8 text-purple-400" />
              <div className="absolute inset-0 bg-purple-400 blur-lg opacity-50"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              CodeLearn
            </span>
          </Link>
          <div className="flex gap-6 items-center">
            <a href="#features" className="hover:text-purple-400 transition-colors hidden md:block font-medium">Features</a>
            <a href="#languages" className="hover:text-purple-400 transition-colors hidden md:block font-medium">Languages</a>
            <Link href="https://github.com/pykinsu" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-all hover:scale-110">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 font-semibold">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2.5 bg-white text-purple-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/50 transition-all duration-300 hover:scale-105">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-block animate-pulse">
                <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-semibold backdrop-blur-sm">
                  <Zap className="w-4 h-4 inline mr-2" />
                  100% Free Forever
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Master Coding
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  With CodeLearn
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your ultimate destination for learning C, Java, and Python. Built with Next.js for blazing fast performance. Interactive tutorials, real code examples, and challenging quizzes - all completely free!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#languages" className="px-8 py-4 border-2 border-purple-500/50 rounded-xl font-bold text-lg hover:bg-purple-500/10 backdrop-blur-sm transition-all duration-300 hover:border-purple-400">
                  Explore Courses
                </Link>
              </div>
              <div className="flex gap-8 pt-4">
                <div className="group cursor-default">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">5000+</div>
                  <div className="text-gray-400">Active Learners</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">800+</div>
                  <div className="text-gray-400">Code Examples</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">100+</div>
                  <div className="text-gray-400">Practice Quizzes</div>
                </div>
              </div>
            </div>

            {/* Code Animation */}
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-purple-400 flex items-center gap-2">
                    <Image src={languages[activeLanguage].icon} alt={languages[activeLanguage].name} width={24} height={24} />
                    # {languages[activeLanguage].name} Example
                  </div>
                  <div className="text-gray-300">
                    {activeLanguage === 0 && (
                      <>
                        <div><span className="text-blue-400">def</span> <span className="text-yellow-300">learn_coding</span>():</div>
                        <div className="ml-4 text-green-400">&quot;Start your journey!&quot;</div>
                        <div className="ml-4"><span className="text-purple-400">return</span> <span className="text-orange-400">True</span></div>
                      </>
                    )}
                    {activeLanguage === 1 && (
                      <>
                        <span className="text-blue-400">public class</span> <span className="text-yellow-300">CodeLearn</span> {'{'}
                        <div className="ml-4"><span className="text-blue-400">public static void</span> main() {'{'}</div>
                        <div className="ml-8">System.out.println(<span className="text-green-400">&quot;Learn & Grow!&quot;</span>);</div>
                        <div className="ml-4">{'}'}</div>
                        {'}'}
                      </>
                    )}
                    {activeLanguage === 2 && (
                      <>
                        <span className="text-blue-400">#include</span> <span className="text-green-400">&lt;stdio.h&gt;</span>
                        <div><span className="text-blue-400">int</span> main() {'{'}</div>
                        <div className="ml-4">printf(<span className="text-green-400">&quot;Hello CodeLearn!&quot;</span>);</div>
                        <div className="ml-4"><span className="text-purple-400">return</span> 0;</div>
                        {'}'}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Master Three Powerful Languages
            </h2>
            <p className="text-xl text-gray-400">Everything you need in one place, powered by Next.js</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((lang, idx) => (
              <div key={idx} className="group relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-3 cursor-pointer">
                <div className="relative mb-6">
                  <Image 
                    src={lang.icon} 
                    alt={lang.name}
                    width={96}
                    height={96}
                    className="mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-center">{lang.name}</h3>
                <p className="text-gray-400 mb-6 text-center">Comprehensive tutorials, examples, and practice problems</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>150+ Code Examples</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Interactive Tutorials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Practice Quizzes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Real-world Projects</span>
                  </li>
                </ul>
                <div className={`absolute inset-0 bg-gradient-to-r ${lang.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Why Choose CodeLearn?
            </h2>
            <p className="text-xl text-gray-400">Built with Next.js for the best learning experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-2 cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>
            <div className="relative z-10">
              <Brain className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Coding Journey?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of students mastering programming with CodeLearn
              </p>
              <Link href="/signup" className="inline-block px-10 py-5 bg-white text-purple-900 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110">
                Start Learning for Free
              </Link>
              <p className="mt-6 text-sm text-white/80 font-medium">
                ✨ No credit card • No hidden fees • Always free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-purple-500/30 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CodeLearn</span>
              </div>
              <p className="text-gray-400 mb-4">Empowering students to master programming through interactive learning</p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <Link 
                    key={idx}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 hover:scale-125 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
                <li><Link href="#languages" className="hover:text-purple-400 transition-colors">Languages</Link></li>
                <li><Link href="/quizzes" className="hover:text-purple-400 transition-colors">Quizzes</Link></li>
                <li><Link href="/examples" className="hover:text-purple-400 transition-colors">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-purple-400 transition-colors">Documentation</Link></li>
                <li><Link href="/tutorials" className="hover:text-purple-400 transition-colors">Tutorials</Link></li>
                <li><Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link></li>
                <li><Link href="/community" className="hover:text-purple-400 transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-purple-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-purple-500/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 CodeLearn. Created with 💜 by <Link href="https://github.com/pykinsu" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">@pykinsu</Link>
              </p>
              <p className="text-gray-500 text-sm text-center md:text-right">
                Built with Next.js • Icons by <Link href="https://icons8.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">Icons8</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}