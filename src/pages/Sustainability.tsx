
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";

const Sustainability = () => {
  const impactStats = [
    {
      number: "5%",
      label: "Of Subscription Revenue Donated",
      description: "We donate 5% of all subscription revenue to support underprivileged students."
    },
    {
      number: "10,000+",
      label: "Scholarships Awarded",
      description: "We've provided free access to our premium features for students in need."
    },
    {
      number: "50+",
      label: "NGOs Partnered With",
      description: "We work with organizations around the world to expand educational access."
    },
    {
      number: "18",
      label: "Countries Reached",
      description: "Our educational impact extends across multiple continents."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">Our Sustainability Initiative</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <section className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <img 
                    src="https://placehold.co/600x400?text=SDG4+Quality+Education" 
                    alt="UN SDG #4: Quality Education" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-1/2 space-y-4">
                  <h2 className="text-2xl font-semibold">Supporting UN Sustainable Development Goal #4</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    PREPZR proudly contributes to the UN Sustainable Development Goal #4: Quality Education. 
                    We believe that education is a fundamental right and that technology can be a powerful 
                    tool for making quality education accessible to everyone, regardless of their background or circumstances.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Through our sustainability initiative, we're committed to reducing educational inequality 
                    and providing opportunities for students who might otherwise not have access to quality 
                    educational resources.
                  </p>
                </div>
              </section>
              
              <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-6 text-center">Our Impact</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                      <div className="font-medium my-2">{stat.label}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className="mt-10 bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">How We Contribute</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <strong>Scholarship Program:</strong> We provide full scholarships to students from underserved communities, giving them access to our premium features and personalized learning paths.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <strong>NGO Partnerships:</strong> We partner with educational NGOs around the world to extend our reach and provide our technology to students who need it most.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <strong>5% Revenue Donation:</strong> We donate 5% of our subscription revenue to fund educational initiatives in underserved communities.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <strong>Offline Solutions:</strong> We develop low-bandwidth and offline versions of our platform for areas with limited internet connectivity.
                    </div>
                  </li>
                </ul>
              </section>
              
              <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You can be a part of our mission to make quality education accessible to all:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h3 className="font-semibold text-lg mb-2">Sponsor a Student</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Your contribution can provide a year of premium access to a student in need.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Donate Now
                    </button>
                  </div>
                  <div className="border rounded-lg p-5">
                    <h3 className="font-semibold text-lg mb-2">Partner With Us</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      If you're an NGO or educational institution, we'd love to explore partnership opportunities.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Contact Us
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
