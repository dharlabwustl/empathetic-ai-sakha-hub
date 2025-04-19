
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">About Sakha AI</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            At Sakha AI, we're on a mission to revolutionize exam preparation through personalized learning experiences powered by artificial intelligence. 
            We believe every student deserves a companion that understands their unique learning style, adapts to their needs, and helps them achieve their academic goals.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Sakha AI was founded in 2023 by a team of education enthusiasts and AI specialists who recognized the limitations of traditional one-size-fits-all learning approaches. 
            Drawing from their experiences in education technology and machine learning, they set out to create an AI-powered study companion that truly understands students.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We combine cutting-edge AI technology with educational psychology to create a learning experience that adapts to your:
          </p>
          <ul className="list-disc pl-5 mt-2 mb-6 text-gray-700 dark:text-gray-300">
            <li>Learning style and pace</li>
            <li>Academic strengths and weaknesses</li>
            <li>Current emotional state and motivation level</li>
            <li>Study habits and preferences</li>
            <li>Exam-specific preparation needs</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold">Rahul Sharma</h3>
              <p className="text-gray-600 dark:text-gray-400">CEO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold">Priya Patel</h3>
              <p className="text-gray-600 dark:text-gray-400">CTO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold">Amit Kumar</h3>
              <p className="text-gray-600 dark:text-gray-400">Head of Education</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
