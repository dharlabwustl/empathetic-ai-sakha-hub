
import { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Mic, User, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ChatMessage {
  type: "user" | "bot";
  content: string;
}

const ChatInterface = () => {
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
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-violet-100">
      {/* Chat Header */}
      <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="avatar-pulse"></div>
            <div className="avatar-pulse" style={{ animationDelay: "0.5s" }}></div>
            <div className="avatar-eyes w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden animate-glow">
              <img 
                src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
                alt="Sakha AI Avatar" 
                className="w-10 h-10 rounded-full z-10 relative"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">Sakha AI</h3>
            <p className="text-xs opacity-80">Online | Your Study Partner</p>
          </div>
          <Badge className="ml-auto bg-white/20 text-white hover:bg-white/30 flex items-center gap-1">
            <Brain size={12} /> AI-Powered
          </Badge>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-container p-6 bg-gray-50 h-[280px] overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <motion.div 
            key={index} 
            className={msg.type === "user" ? "user-message" : "bot-message"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center gap-2 mb-1">
              {msg.type === "bot" ? (
                <div className="avatar-eyes w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
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
          </motion.div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full flex-shrink-0 border-gray-300 hover:bg-violet-50"
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
              className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
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
            className="bg-gradient-to-r from-violet-500 to-purple-600 text-white animate-pulse-subtle shadow-md"
            asChild
          >
            <Link to="/signup">Sign Up for Personalized Study Plan</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
