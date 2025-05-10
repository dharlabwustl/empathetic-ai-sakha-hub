
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-sky-900 dark:via-gray-900 dark:to-violet-900 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500 mb-4">
            अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
          </h2>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 max-w-3xl">
            We understand Your Mindset, Not Just the Exam.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Ace your exams. Save time. Stress less. Study smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600">
                <Link to="/dashboard/student">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600">
                  <Link to="/signup">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Log In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
