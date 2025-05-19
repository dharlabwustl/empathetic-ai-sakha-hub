
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";
import { Users, Code, PieChart, BookOpen, HeartHandshake } from "lucide-react";

const Careers = () => {
  const benefits = [
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work with talented individuals who are passionate about education and technology."
    },
    {
      icon: Code,
      title: "Cutting-edge Technology",
      description: "Opportunity to work with the latest AI and educational technology."
    },
    {
      icon: PieChart,
      title: "Growth Opportunities",
      description: "Regular training, workshops, and career advancement paths."
    },
    {
      icon: BookOpen,
      title: "Learning Culture",
      description: "Continuous learning opportunities through courses, conferences, and mentorship."
    },
    {
      icon: HeartHandshake,
      title: "Social Impact",
      description: "Make a real difference in students' lives and contribute to educational equity."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Card className="w-full shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
              <CardTitle className="text-3xl font-bold">Join Our Team</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  At PREPZR, we're on a mission to revolutionize education through AI-powered learning experiences. 
                  We're looking for passionate individuals who are excited about education, technology, and making a positive impact.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Why Work With Us?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                          <benefit.icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="font-semibold">{benefit.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Open Positions</h2>
                <div className="p-8 text-center border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-xl font-medium mb-2">Exciting opportunities coming soon!</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    We're preparing to expand our team with new positions. Check back soon for updates!
                  </p>
                </div>
                
                <div className="mt-12 text-center">
                  <h3 className="text-xl font-medium mb-3">Don't see a position that matches your skills?</h3>
                  <p className="mb-5">
                    We're always looking for talented individuals. Send us your resume and let us know how you can contribute!
                  </p>
                  <Button size="lg">
                    Send Open Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
