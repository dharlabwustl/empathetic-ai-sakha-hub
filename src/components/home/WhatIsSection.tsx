
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Check, BookOpen, CalendarDays, Brain, Star } from 'lucide-react';

const WhatIsSection = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Personalized Learning Journey',
      description: 'Get a custom study plan based on your learning style, pace, and goals',
    },
    {
      icon: Brain,
      title: 'Mood-Based Study Experience',
      description: 'Study resources adapt to how you feel – from energetic to anxious',
    },
    {
      icon: CalendarDays,
      title: 'Smart Time Management',
      description: 'Optimized study schedules that work with your life, not against it',
    },
    {
      icon: Star,
      title: 'Comprehensive Exam Coverage',
      description: 'Complete curriculum coverage for competitive exams and board preparations',
    },
  ];

  return (
    <section id="why-prepzr" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PREPZR?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We're revolutionizing exam preparation with emotionally intelligent AI that adapts to your unique learning needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Seamless Onboarding Experience</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started with PREPZR through our intuitive, chat-based onboarding process that personalizes your experience from day one.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm">5-minute setup process</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm">No technical knowledge required</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm">Immediate personalization</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm">Chat-based assessment</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsSection;
