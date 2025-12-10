'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl
      ${isScrolled ? 'bg-black/70 border-b border-white/10 shadow-lg' : 'bg-black/30 border-transparent'}
    `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <span className="text-xl font-semibold tracking-wide">CodeLearn</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#languages" className="nav-link">Languages</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>

          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
            Login
          </Link>

          <Link
            href="/signup"
            className="text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-all font-medium hover:scale-105 transform"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="bg-black/90 backdrop-blur-xl px-6 flex flex-col gap-4">
          <a href="#features" className="mobile-link">Features</a>
          <a href="#languages" className="mobile-link">Languages</a>
          <a href="#testimonials" className="mobile-link">Testimonials</a>

          <Link href="/login" className="mobile-link">Login</Link>

          <Link
            href="/signup"
            className="block py-2 text-center bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          position: relative;
          color: #ccc;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: white;
          transition: width 0.3s;
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-link {
          color: #ccc;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s;
        }
        .mobile-link:hover {
          color: #fff;
          transform: translateX(4px);
        }
      `}</style>
    </nav>
  );
}
