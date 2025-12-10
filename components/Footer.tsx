'use client';

import React from 'react';
import { Terminal, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/pykinsu' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/pykinsu' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/pykinsu' }
  ];

  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-white" />
              <span className="text-lg font-semibold">CodeLearn</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Empowering students worldwide to master programming languages.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link 
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all hover:scale-110 transform"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#languages" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Languages
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Features
                </a>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 CodeLearn. Created by{' '}
            <Link 
              href="https://github.com/pykinsu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              @pykinsu
            </Link>
          </p>
          <p className="text-gray-600 text-xs">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
