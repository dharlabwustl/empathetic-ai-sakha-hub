
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">About PREPZR</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  PREPZR is dedicated to revolutionizing exam preparation through personalized AI-powered learning experiences. Our mission is to make quality education accessible to all students, regardless of their background or location.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Founded in 2025, PREPZR is created by Amit Singh and Dr. Atul Sharma, both childhood friends and AI enthusiasts. They recognized the need for a more personalized approach to exam preparation, observing that traditional one-size-fits-all learning methods were leaving many students behind and failing to account for individual learning styles and needs.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  By leveraging artificial intelligence and learning science, they've developed a platform that adapts to each student's unique learning journey, helping them achieve better results with less stress and more confidence.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Innovation:</span> We continuously seek new ways to improve the learning experience.</li>
                  <li><span className="font-medium">Accessibility:</span> We believe quality education should be available to everyone.</li>
                  <li><span className="font-medium">Personalization:</span> We recognize that every student has unique needs and learning styles.</li>
                  <li><span className="font-medium">Evidence-based:</span> Our methods are grounded in learning science and research.</li>
                  <li><span className="font-medium">Sustainability:</span> We're committed to supporting UN Sustainable Development Goals.</li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;
