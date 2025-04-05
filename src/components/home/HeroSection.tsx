
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SendHorizonal, Mic, User } from "lucide-react";

const HeroSection = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. How can I help you today?" }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { type: "user", content: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: "I'd be happy to help you with that! To provide personalized assistance, would you like to sign up so I can tailor my responses to your specific needs?" 
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
    <section className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text">
            Your Empathetic AI Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Sakha listens, learns, and evolves with you across your learning, career, and well-being journey.
          </p>
        </div>

        {/* Full-screen Chat Interface */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-sakha-blue to-sakha-purple text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="avatar-pulse"></div>
                <div className="avatar-pulse" style={{ animationDelay: "0.5s" }}></div>
                <img 
                  src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                  alt="Sakha AI Avatar" 
                  className="w-10 h-10 rounded-full z-10 relative"
                />
              </div>
              <div>
                <h3 className="font-medium">Sakha AI</h3>
                <p className="text-xs opacity-80">Online | Listening</p>
              </div>
            </div>
          </div>

          <div className="chat-container p-6 bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div key={index} className={msg.type === "user" ? "user-message" : "bot-message"}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.type === "bot" ? (
                    <img 
                      src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                      alt="Sakha AI" 
                      className="w-6 h-6 rounded-full"
                    />
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
                  placeholder="Type your message here..."
                  className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sakha-blue"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-sakha-blue/10"
                  onClick={handleSendMessage}
                >
                  <SendHorizonal className="h-5 w-5 text-sakha-blue" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <Button 
                className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                asChild
              >
                <Link to="/signup">Sign Up to Continue</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="link" className="text-sakha-blue flex items-center gap-2">
            <span>Learn more about Sakha AI</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
