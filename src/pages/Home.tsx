
import React from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeTestimonials from '@/components/home/HomeTestimonials';
import HomeCTA from '@/components/home/HomeCTA';
import HomeFooter from '@/components/home/HomeFooter';
import HomeVoiceAnnouncer from '@/components/home/HomeVoiceAnnouncer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <HomeHeader />
      <HomeHero />
      <HomeFeatures />
      <HomeTestimonials />
      <HomeCTA />
      <HomeFooter />
      <HomeVoiceAnnouncer delay={3000} />
    </div>
  );
};

export default Home;
