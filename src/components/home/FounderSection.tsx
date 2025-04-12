
import { Quote } from "lucide-react";

const FounderSection = () => {
  return (
    <section className="py-20 bg-white" id="founder-message">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sakha-blue to-sakha-purple rounded-2xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png" 
                alt="Amit Singh - Founder of Sakha AI" 
                className="relative z-10 rounded-2xl object-cover w-full max-w-md mx-auto"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6">
              <Quote size={48} className="text-sakha-blue opacity-20" />
            </div>
            <blockquote className="text-xl md:text-2xl font-display text-gray-800 mb-8">
              We created Sakha AI to transform how students prepare for competitive exams in India. 
              Our AI companion provides personalized guidance, adapts to individual learning styles, 
              and helps students discover their true potential. With Sakha, students can overcome 
              study challenges and achieve better results with less stress.
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold">Amit Singh</h3>
                <p className="text-gray-600">Founder & CEO, Sakha AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
