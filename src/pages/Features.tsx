
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      title: "AI-Powered Study Plans",
      description: "Personalized study plans that adapt to your learning pace and style."
    },
    {
      title: "Comprehensive Concept Cards",
      description: "Detailed explanations of key concepts with multimedia resources."
    },
    {
      title: "Interactive Flashcards",
      description: "Effective memorization tools with spaced repetition algorithms."
    },
    {
      title: "Practice Exams",
      description: "Realistic exam simulations with detailed performance analysis."
    },
    {
      title: "Academic Advisor",
      description: "AI tutor that provides personalized guidance and answers questions."
    },
    {
      title: "Mood Tracking",
      description: "Track your emotional state and get recommendations to optimize study sessions."
    },
    {
      title: "Previous Year Analysis",
      description: "Insights from past exams to focus on high-yield topics."
    },
    {
      title: "Feel Good Corner",
      description: "Stress-relief resources and motivation to keep you going."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">PREPZR Features</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuresList.map((feature, index) => (
                    <div key={index} className="flex gap-3 p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">How PREPZR Stands Out</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Unlike traditional exam preparation platforms, PREPZR uses advanced algorithms to understand your learning style, strengths, and weaknesses. This allows us to create truly personalized study experiences that adapt in real-time to help you achieve your academic goals efficiently.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Our platform integrates emotional intelligence through mood tracking to ensure you're studying at your optimal state, while providing resources to help manage stress and maintain motivation throughout your preparation journey.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
