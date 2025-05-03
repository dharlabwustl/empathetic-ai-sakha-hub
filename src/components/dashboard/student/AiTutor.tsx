
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const AiTutor: React.FC = () => {
  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="Ask questions and get personalized help anytime"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Welcome to Your AI Tutor</h2>
        <p className="text-gray-600 mb-6">
          Your personal AI tutor is available 24/7 to help you with any questions you might have.
          Whether it's a difficult concept or a practice problem, just ask and get immediate assistance.
        </p>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col space-y-4">
            <div className="bg-blue-100 p-4 rounded-lg self-start max-w-[80%]">
              <p className="text-sm font-medium">AI Tutor</p>
              <p>Hello! I'm your AI tutor. How can I help you today with your studies?</p>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-violet-100 p-4 rounded-lg self-end max-w-[80%]">
                <p className="text-sm font-medium">You</p>
                <p>I'm having trouble understanding Newton's Second Law of Motion...</p>
              </div>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg self-start max-w-[80%]">
              <p className="text-sm font-medium">AI Tutor</p>
              <p>
                Newton's Second Law states that the acceleration of an object is directly proportional 
                to the force applied, and inversely proportional to its mass. This is commonly 
                expressed as the formula F = ma, where F is force, m is mass, and a is acceleration.
              </p>
              <p className="mt-2">
                Would you like me to explain with some examples or go deeper into this concept?
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <input 
              type="text" 
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ask your question here..."
            />
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default AiTutor;
