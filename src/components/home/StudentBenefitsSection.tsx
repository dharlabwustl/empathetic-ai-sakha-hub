
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const StudentBenefitsSection = () => {
  const benefits = [
    {
      title: "Personalized Learning Path",
      description: "Adaptive study plans based on your goals, strengths, and learning style.",
      features: [
        "Custom study schedules",
        "Targeted practice materials",
        "Personalized feedback loop"
      ]
    },
    {
      title: "Emotional Intelligence",
      description: "Study companion that adapts to your emotional state and helps you stay motivated.",
      features: [
        "Mood-based study adjustments",
        "Stress-reduction techniques",
        "Motivational support"
      ]
    },
    {
      title: "Interactive Learning",
      description: "Engaging study materials that make complex concepts easy to understand.",
      features: [
        "Interactive conceptual learning",
        "Visual learning methods",
        "Gamified practice sessions"
      ]
    },
    {
      title: "Continuous Improvement",
      description: "Regular assessments that identify and address your knowledge gaps.",
      features: [
        "Spaced repetition review",
        "Performance analytics",
        "Adaptive difficulty levels"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Students Love PREPZR</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform is designed to empower students with powerful tools, personalized guidance, 
            and emotional support throughout their exam preparation journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{benefit.description}</p>
                  
                  <ul className="space-y-2">
                    {benefit.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentBenefitsSection;
