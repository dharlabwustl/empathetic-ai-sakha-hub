
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, ThumbsUp, User, Users, Filter, SortDesc } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DiscussSectionProps {
  conceptName: string;
}

const DiscussSection: React.FC<DiscussSectionProps> = ({ conceptName }) => {
  const [newMessage, setNewMessage] = useState('');
  
  // Sample discussions data
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: {
        name: 'Alex Johnson',
        avatar: '',
        role: 'student'
      },
      message: `Can someone explain how to apply Ohm's Law when we have multiple resistors in a circuit? I'm getting confused about which values to use.`,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 5,
      replies: [
        {
          id: 101,
          author: {
            name: 'Dr. Emily Chen',
            avatar: '',
            role: 'tutor'
          },
          message: `Great question! For multiple resistors, you need to first determine if they're in series or parallel. 

For series circuits: Total resistance is the sum of all resistors (R_total = R1 + R2 + ...), and the current is the same through each resistor.

For parallel circuits: The reciprocal of the total resistance is the sum of the reciprocals of individual resistances (1/R_total = 1/R1 + 1/R2 + ...), and voltage is the same across each resistor.

Once you know the total resistance, you can apply Ohm's Law (V = IR) to the circuit as a whole.`,
          timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
          likes: 8
        },
        {
          id: 102,
          author: {
            name: 'Alex Johnson',
            avatar: '',
            role: 'student'
          },
          message: `Thank you Dr. Chen! That makes sense. So if I have three 5Ω resistors in series with a 12V battery, the total resistance would be 15Ω, and the current would be 12V/15Ω = 0.8A, right?`,
          timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          likes: 2
        },
        {
          id: 103,
          author: {
            name: 'Dr. Emily Chen',
            avatar: '',
            role: 'tutor'
          },
          message: `Exactly right! And that 0.8A current flows through each resistor in the series. Then you can find the voltage drop across each resistor using V = IR. Great job!`,
          timestamp: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: {
        name: 'Priya Sharma',
        avatar: '',
        role: 'student'
      },
      message: `I noticed that my calculations for a simple DC circuit didn't match my measurements in lab. Could temperature be affecting the resistance? The resistor felt warm after a while.`,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 7,
      replies: [
        {
          id: 201,
          author: {
            name: 'Mark Wilson',
            avatar: '',
            role: 'student'
          },
          message: `Yes, that's absolutely right! The resistance of most conductors increases with temperature. This is why your measurements might differ from calculations if the temperature changed significantly.`,
          timestamp: new Date(Date.now() - 2.9 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 4
        }
      ]
    }
  ]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newDiscussion = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: '',
        role: 'student'
      },
      message: newMessage,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    setNewMessage('');
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays === 1) return 'yesterday';
    return date.toLocaleDateString();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600" />
          Discuss: {conceptName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* New message input */}
          <div className="space-y-2">
            <Textarea
              placeholder="Ask a question or share your insights..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSendMessage} disabled={newMessage.trim() === ''}>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4 mr-1" />
                All Questions
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Users className="h-4 w-4 mr-1" />
                From Peers
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <User className="h-4 w-4 mr-1" />
                From Tutors
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <SortDesc className="h-4 w-4 mr-1" />
              Most Recent
            </Button>
          </div>
          
          {/* Discussion threads */}
          <div className="space-y-8">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={discussion.author.avatar} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{discussion.author.name}</h3>
                      {discussion.author.role === 'tutor' && (
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                          Tutor
                        </span>
                      )}
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {formatTimestamp(discussion.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                      {discussion.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 px-2">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span className="text-xs">{discussion.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 px-2">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span className="text-xs">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Replies */}
                {discussion.replies.length > 0 && (
                  <div className="ml-12 mt-4 space-y-4 border-l-2 border-gray-100 dark:border-gray-800 pl-4">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author.avatar} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{reply.author.name}</h4>
                            {reply.author.role === 'tutor' && (
                              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                                Tutor
                              </span>
                            )}
                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                              {formatTimestamp(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-line">
                            {reply.message}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 h-6 px-2">
                              <ThumbsUp className="h-3 w-3" />
                              <span className="text-xs">{reply.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline">
              Load More Discussions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussSection;
