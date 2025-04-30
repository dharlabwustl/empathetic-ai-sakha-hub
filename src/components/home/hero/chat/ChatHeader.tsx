
import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ChatHeader = () => {
  return (
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
  );
};

export default ChatHeader;
