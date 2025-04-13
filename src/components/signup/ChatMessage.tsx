
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  content: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isBot }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      {isBot ? (
        <Avatar className="h-8 w-8 border border-purple-200">
          <AvatarImage
            src="/lovable-uploads/6bd65589-a748-4b63-a28b-12521c233a7e.png"
            alt="Sakha AI"
          />
          <AvatarFallback className="bg-purple-100 text-purple-700">
            SA
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="h-8 w-8 border border-gray-200">
          <AvatarFallback className="bg-blue-100 text-blue-700">
            You
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%] text-sm",
          isBot
            ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            : "bg-violet-600 text-white"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
