
import React from "react";

interface ChatMessageProps {
  type: "bot" | "user";
  content: string;
}

const ChatMessage = ({ type, content }: ChatMessageProps) => {
  return (
    <div className={`flex mb-4 ${type === "user" ? "justify-end" : "justify-start"}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
          type === "user" 
            ? "bg-blue-600 text-white rounded-br-none" 
            : "bg-white border border-gray-200 shadow-md rounded-bl-none"
        }`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
