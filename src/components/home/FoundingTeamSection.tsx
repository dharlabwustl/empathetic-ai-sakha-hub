
import React from 'react';

const FoundingTeamSection = () => {
  return (
    <section className="py-20 bg-white" id="founding-team">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 gradient-text">Our Founding Team</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Meet the visionaries behind PREPZR who are dedicated to revolutionizing education through AI-powered solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Founder */}
          <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/31899e37-6d0c-444b-9a61-6310227008e7.png" 
                alt="Amit Singh" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:flex-1">
              <h3 className="text-2xl font-bold mb-2">Amit Singh</h3>
              <p className="text-purple-600 font-medium mb-4">Founder & CEO</p>
              <p className="text-gray-700 mb-4">
                Building AI tech startups in education. Product architect. Based in India.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Co-founder */}
          <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/26db6370-4d7a-4e6a-a038-bae30c4c1f66.png" 
                alt="Dr. Atul Sharma" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:flex-1">
              <h3 className="text-2xl font-bold mb-2">Dr. Atul Sharma</h3>
              <p className="text-purple-600 font-medium mb-4">Co-founder & Chief AI Scientist</p>
              <p className="text-gray-700 mb-4">
                Doctorate in Engineering (USA), IIT Alumni. Research Scientist & Professor, focused on advanced AI solutions. Based in the USA.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundingTeamSection;
