
import React from "react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  type: "bot" | "user";
  content: string;
}

const ChatMessage = ({ type, content }: ChatMessageProps) => {
  return (
    <motion.div 
      className={`flex mb-4 ${type === "user" ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {type === "bot" && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-2 flex items-center justify-center text-white text-sm font-bold">
          S
        </div>
      )}
      <div 
        className={`max-w-[80%] p-4 rounded-lg shadow-md ${
          type === "user" 
            ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-br-none" 
            : "bg-white border border-blue-100 shadow-lg rounded-bl-none"
        }`}
      >
        <p className={`${type === "user" ? "text-white" : "text-gray-800"} text-sm md:text-base`}>{content}</p>
      </div>
      {type === "user" && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 ml-2 flex items-center justify-center text-white text-sm font-bold">
          U
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
