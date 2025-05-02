
import React from "react";
import { Container } from "@/components/ui/container";

const WhatIsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-4xl mb-8">
            How PREPZR helps you
          </h2>
          
          <div className="space-y-8 text-lg text-gray-600 dark:text-gray-300">
            <p>
              PREPZR is the world's first emotionally intelligent AI study partner that adapts to your learning style, mood, and exam goals. Unlike traditional study apps that follow a one-size-fits-all approach, PREPZR understands that each student is unique.
            </p>
            
            <p>
              Our AI-powered platform creates hyper-personalized study plans based on your strengths, weaknesses, and preparation timeline. PREPZR analyzes your learning patterns and adjusts in real-time to keep you engaged and motivated throughout your exam preparation journey.
            </p>
            
            <p>
              Whether you're preparing for NEET, JEE, or UPSC, PREPZR becomes your dedicated study companion that not only helps you learn but also understands your emotional state to provide the right kind of support when you need it most.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhatIsSection;
