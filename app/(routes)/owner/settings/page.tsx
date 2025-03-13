'use client';

import { useState } from 'react';
import Sidebar from '@/components/ownerComponents/sidebar';
import ProfileSettings from '@/components/ownerComponents/profile';
import PriceCitySettings from '@/components/ownerComponents/priceCity';
export default function Home() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <main className="min-h-screen p-6 bg-[#F1F2F8]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0a1172] mb-2">
          Welcome Back, Owner!
        </h1>
        <p className="text-[#666] mb-6">
          {activeTab === 'profile'
            ? 'Here are your settings'
            : "Here's your Pricing Report"}
        </p>

        <div className="flex flex-col md:flex-row gap-6 bg-white">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          {activeTab === 'profile' ? (
            <ProfileSettings />
          ) : (
            <PriceCitySettings />
          )}
        </div>
      </div>
    </main>
  );
}
