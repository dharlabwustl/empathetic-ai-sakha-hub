
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, ThumbsUp, Flag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DiscussSectionProps {
  conceptName: string;
}

const DiscussSection: React.FC<DiscussSectionProps> = ({ conceptName }) => {
  const [message, setMessage] = useState('');
  const [discussions, setDiscussions] = useState([
    {
      id: '1',
      user: {
        name: 'Alex Johnson',
        avatar: '/placeholders/avatar-1.jpg',
        role: 'student'
      },
      content: `I'm having trouble understanding how to apply ${conceptName} when there are multiple resistors in a circuit. Can someone explain?`,
      timestamp: '2 hours ago',
      likes: 3,
      replies: [
        {
          id: '1-1',
          user: {
            name: 'Prof. Williams',
            avatar: '/placeholders/avatar-2.jpg',
            role: 'instructor'
          },
          content: `With multiple resistors, you need to first determine if they're in series or parallel. For series, the resistances add up (Rtotal = R1 + R2 + ...). For parallel, you use 1/Rtotal = 1/R1 + 1/R2 + ...`,
          timestamp: '1 hour ago',
          likes: 5
        },
        {
          id: '1-2',
          user: {
            name: 'Maya Singh',
            avatar: '/placeholders/avatar-3.jpg',
            role: 'student'
          },
          content: 'This helped me too! A good way to remember: current is the same in series connections, voltage is the same in parallel connections.',
          timestamp: '45 minutes ago',
          likes: 2
        }
      ]
    },
    {
      id: '2',
      user: {
        name: 'Rahul Patel',
        avatar: '/placeholders/avatar-4.jpg',
        role: 'student'
      },
      content: `Is it true that ${conceptName} doesn't apply to all materials? I read that some materials don't follow the proportional relationship between voltage and current.`,
      timestamp: '1 day ago',
      likes: 7,
      replies: [
        {
          id: '2-1',
          user: {
            name: 'Dr. Lee',
            avatar: '/placeholders/avatar-5.jpg',
            role: 'instructor'
          },
          content: 'Correct! Materials that follow Ohm\'s Law are called "ohmic" materials. Non-ohmic materials like diodes and transistors have a non-linear relationship between voltage and current. This is essential to know for electronics.',
          timestamp: '20 hours ago',
          likes: 9
        }
      ]
    }
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newDiscussion = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: '/placeholders/avatar-user.jpg',
        role: 'student'
      },
      content: message,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    setMessage('');
  };
  
  const handleLike = (discussionId: string, replyId?: string) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          if (replyId) {
            // Like a reply
            return {
              ...discussion,
              replies: discussion.replies.map(reply => 
                reply.id === replyId 
                  ? { ...reply, likes: reply.likes + 1 } 
                  : reply
              )
            };
          } else {
            // Like a discussion
            return { ...discussion, likes: discussion.likes + 1 };
          }
        }
        return discussion;
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600" />
          Discussion Forum
        </CardTitle>
        <CardDescription>
          Discuss {conceptName} with fellow students and instructors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Post a message */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Ask a Question</h3>
            <Textarea
              placeholder={`Ask a question about ${conceptName}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Question
              </Button>
            </div>
          </div>
          
          {/* Discussion threads */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Discussions ({discussions.length})</h3>
            <div className="space-y-6">
              {discussions.map(discussion => (
                <div key={discussion.id} className="space-y-4 border-b pb-4">
                  {/* Main post */}
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                      <AvatarFallback>{discussion.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{discussion.user.name}</span>
                        {discussion.user.role === 'instructor' && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Instructor
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                      </div>
                      <p>{discussion.content}</p>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleLike(discussion.id)}
                          className="text-muted-foreground hover:text-indigo-600"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {discussion.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-muted-foreground hover:text-indigo-600"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-muted-foreground hover:text-red-600"
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="ml-12 space-y-4">
                      {discussion.replies.map(reply => (
                        <div key={reply.id} className="flex gap-4">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{reply.user.name}</span>
                              {reply.user.role === 'instructor' && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                  Instructor
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                            <div className="flex items-center gap-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleLike(discussion.id, reply.id)}
                                className="text-muted-foreground hover:text-indigo-600 h-7 text-xs"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {reply.likes}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-muted-foreground hover:text-red-600 h-7 text-xs"
                              >
                                <Flag className="h-3 w-3 mr-1" />
                                Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {discussions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                  <p>No discussions yet. Be the first to post a question about {conceptName}!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussSection;
