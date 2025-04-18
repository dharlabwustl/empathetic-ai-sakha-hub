
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import KpiStats from "../home/hero/feature-highlights/KpiStats";

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-16 text-center md:py-20 lg:py-24">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl xl:text-6xl">
          Sakha AI – पहली बार, पढ़ाई से पहले, आपको समझने वाला साथी
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:text-xl lg:text-2xl">
          India's 1st Emotionally Intelligent Study Partner – Tuned to Your Mood, Habits, Mind & Mission to Crack Exams.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 px-8 py-6 text-lg font-semibold text-white shadow-lg hover:from-purple-600 hover:to-indigo-700">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-2 px-8 py-6 text-lg font-semibold shadow-lg">
            Take a Tour
          </Button>
        </div>
      </div>
      
      {/* KPI Stats */}
      <div className="mt-8 mb-16">
        <KpiStats />
      </div>

      {/* Animated elements */}
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-purple-300 opacity-20 blur-3xl filter"></div>
      <div className="absolute -right-32 top-56 h-64 w-64 rounded-full bg-indigo-300 opacity-20 blur-3xl filter"></div>
    </div>
  );
};

export default HeroSection;
