'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}
