
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-md" 
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md" 
                placeholder="How can we help you?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md h-32" 
                placeholder="Type your message here..."
              ></textarea>
            </div>
            
            <div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="font-medium text-lg mb-2">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-300">support@sakha.ai</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="font-medium text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 dark:text-gray-300">+91 9876543210</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="font-medium text-lg mb-2">Visit Us</h3>
            <p className="text-gray-600 dark:text-gray-300">Bengaluru, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
