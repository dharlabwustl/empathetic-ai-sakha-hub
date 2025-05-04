
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useStudyGroups } from '../hooks/useStudyGroups';
import { formatDistanceToNow } from 'date-fns';

interface GroupDiscussionProps {
  groupId: string;
}

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  reactions?: Array<{
    type: string;
    count: number;
  }>;
}

const GroupDiscussion: React.FC<GroupDiscussionProps> = ({ groupId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { fetchGroupMessages, sendGroupMessage } = useStudyGroups();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const fetchedMessages = await fetchGroupMessages(groupId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Set up periodic refresh
    const intervalId = setInterval(loadMessages, 30000);
    return () => clearInterval(intervalId);
  }, [groupId, fetchGroupMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const sentMessage = await sendGroupMessage(groupId, newMessage);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm">{message.sender.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <Card className="mt-1 bg-white">
                    <CardContent className="p-2 text-sm whitespace-pre-wrap">
                      {message.content}
                    </CardContent>
                  </Card>
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {message.reactions.map((reaction, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs"
                        >
                          {reaction.type} {reaction.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="bg-white p-3 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar-placeholder.png" alt="Your avatar" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={2}
              className="resize-none"
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussion;
