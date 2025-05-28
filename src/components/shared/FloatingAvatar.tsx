
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { VoiceAssistantAvatar } from '@/components/voice/EnhancedVoiceAnimations';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot',
      content: 'Hello! I\'m PREPZR AI, your AI companion for PREP-zer. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { type: 'user', content: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I'd be happy to assist you with that! To get the full exam preparation experience, why not sign up for a free account with PREP-zer?" 
      }]);
    }, 1000);
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Floating Button with vibrant animations */}
      <button 
        className="fixed bottom-6 right-6 z-50"
        onClick={() => setIsOpen(true)}
      >
        <VoiceAssistantAvatar 
          isSpeaking={isSpeaking}
          size={56}
          className="hover:scale-105 transition-transform duration-200"
        />
      </button>

      {/* Quick Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 animate-fade-in">
          {/* Chat Header */}
          <div className="p-3 bg-gradient-to-r from-sakha-blue to-sakha-purple text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <VoiceAssistantAvatar 
                isSpeaking={isSpeaking}
                size={32}
              />
              <div>
                <h3 className="font-medium text-sm">PREPZR AI</h3>
                <p className="text-xs opacity-80">How can I help you crack your exams?</p>
              </div>
            </div>
            <button 
              className="text-white hover:bg-white/20 rounded p-1"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="h-80 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'ml-auto bg-sakha-blue text-white' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sakha-blue text-sm"
              />
              <button
                className="bg-sakha-blue text-white p-2 rounded-full hover:bg-sakha-blue/90"
                onClick={handleSendMessage}
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  function handleSendMessage() {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { type: 'user', content: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I'd be happy to assist you with that! To get the full exam preparation experience, why not sign up for a free account with PREP-zer?" 
      }]);
    }, 1000);
    
    setInput('');
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }
};

export default FloatingAvatar;
