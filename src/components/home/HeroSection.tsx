
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SendHorizonal, Mic, User, BookOpen, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

const HeroSection = ({ onAnalyzeClick }: HeroSectionProps) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", content: "Hi, I'm Sakha – your personal AI exam companion. I'll help you ace your exams with personalized study plans and continuous support!" }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { type: "user", content: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: "I'd be happy to help with your exam preparation! To create a personalized study plan for you, would you like to sign up so I can tailor my responses to your specific exam goals?" 
      }]);
    }, 1000);
    
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-violet-100/40 via-white to-purple-100/40">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-500">
            Your AI Study Companion for Exam Success
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Sakha delivers personalized exam preparation strategies with AI-powered study plans that adapt to your learning style and goals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-500 hover:opacity-90 text-white px-8 py-6"
              onClick={onAnalyzeClick}
            >
              <TrendingUp className="mr-2" />
              Test Your Exam Readiness Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-violet-500 text-violet-600 hover:bg-violet-50"
              asChild
            >
              <Link to="/signup">
                <BookOpen className="mr-2" />
                Start Free Preparation
              </Link>
            </Button>
          </div>
        </div>

        {/* Full-screen Chat Interface */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="avatar-pulse"></div>
                <div className="avatar-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="avatar-eyes w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden animate-glow">
                  <img 
                    src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                    alt="Sakha AI Avatar" 
                    className="w-10 h-10 rounded-full z-10 relative"
                  />
                  <div className="eye absolute w-2 h-2 bg-white rounded-full" style={{ left: '8px', top: '12px'}}></div>
                  <div className="eye absolute w-2 h-2 bg-white rounded-full" style={{ left: '17px', top: '12px'}}></div>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Sakha AI</h3>
                <p className="text-xs opacity-80">Online | Your Study Partner</p>
              </div>
            </div>
          </div>

          <div className="chat-container p-6 bg-gray-50 h-[400px] overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={msg.type === "user" ? "user-message" : "bot-message"}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.type === "bot" ? (
                    <div className="avatar-eyes w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden">
                      <img 
                        src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                        alt="Sakha AI" 
                        className="w-6 h-6 rounded-full"
                      />
                    </div>
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                  <span className="text-xs font-medium">
                    {msg.type === "bot" ? "Sakha AI" : "You"}
                  </span>
                </div>
                <p>{msg.content}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full flex-shrink-0"
              >
                <Mic className="h-5 w-5 text-gray-500" />
              </Button>
              <div className="relative w-full">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your exam preparation..."
                  className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-violet-100"
                  onClick={handleSendMessage}
                >
                  <SendHorizonal className="h-5 w-5 text-violet-500" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <Button 
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white animate-glow"
                asChild
              >
                <Link to="/signup">Sign Up for Personalized Study Plan</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="link" className="text-violet-500 flex items-center gap-2 group animate-float-subtle">
            <span>See how Sakha helps exam toppers</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-y-1 transition-transform">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
