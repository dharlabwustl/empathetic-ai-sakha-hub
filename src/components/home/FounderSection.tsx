
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
                src="/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png" 
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
              We created Sakha AI with a vision to transform how technology supports human growth. 
              Beyond just providing answers, Sakha's empathetic understanding and personalized guidance 
              helps users discover their potential, whether they're students mastering concepts, 
              professionals navigating careers, or founders building dreams.
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
