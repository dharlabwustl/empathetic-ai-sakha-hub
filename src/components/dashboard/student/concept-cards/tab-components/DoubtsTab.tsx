
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, MessageCircle, Send, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DoubtsTabProps {
  concept: {
    id: string;
    title: string;
    doubts?: Array<{
      id: string;
      question: string;
      askedBy: string;
      timestamp: string;
      replies: Array<{
        id: string;
        text: string;
        responder: string;
        timestamp: string;
        isInstructor?: boolean;
      }>;
    }>;
  };
}

const DoubtsTab: React.FC<DoubtsTabProps> = ({ concept }) => {
  const [doubts, setDoubts] = useState(concept.doubts || [
    {
      id: '1',
      question: 'Can someone explain how mitochondria generate ATP in more detail?',
      askedBy: 'Student',
      timestamp: '2 days ago',
      replies: [
        {
          id: '1-1',
          text: 'Mitochondria generate ATP through oxidative phosphorylation. This process involves the electron transport chain, where electrons are passed through a series of protein complexes in the inner mitochondrial membrane, creating a proton gradient that drives ATP synthesis by ATP synthase.',
          responder: 'Instructor',
          timestamp: '1 day ago',
          isInstructor: true
        },
        {
          id: '1-2',
          text: 'Thanks, that cleared up my confusion!',
          responder: 'Student',
          timestamp: '1 day ago'
        }
      ]
    },
    {
      id: '2',
      question: 'Why is the Krebs cycle also called the citric acid cycle?',
      askedBy: 'Student',
      timestamp: '3 days ago',
      replies: []
    }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedDoubtId, setExpandedDoubtId] = useState<string | null>('1');
  const [replies, setReplies] = useState<{ [key: string]: string }>({});

  const handleAddNewDoubt = () => {
    if (!newQuestion.trim()) return;
    
    const newDoubt = {
      id: `doubt-${Date.now()}`,
      question: newQuestion,
      askedBy: 'You',
      timestamp: 'Just now',
      replies: []
    };
    
    setDoubts([newDoubt, ...doubts]);
    setNewQuestion('');
    setExpandedDoubtId(newDoubt.id);
    
    toast({
      title: "Question submitted",
      description: "Your question has been posted successfully"
    });
  };

  const handleAddReply = (doubtId: string) => {
    const replyText = replies[doubtId];
    if (!replyText || !replyText.trim()) return;
    
    const updatedDoubts = doubts.map(doubt => {
      if (doubt.id === doubtId) {
        return {
          ...doubt,
          replies: [
            ...doubt.replies,
            {
              id: `reply-${Date.now()}`,
              text: replyText,
              responder: 'You',
              timestamp: 'Just now'
            }
          ]
        };
      }
      return doubt;
    });
    
    setDoubts(updatedDoubts);
    setReplies({...replies, [doubtId]: ''});
    
    toast({
      title: "Reply posted",
      description: "Your reply has been added to the discussion"
    });
  };

  const toggleExpand = (doubtId: string) => {
    setExpandedDoubtId(expandedDoubtId === doubtId ? null : doubtId);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Ask a Question</h3>
        <Card>
          <CardContent className="p-4">
            <Textarea
              placeholder="What question do you have about this concept?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddNewDoubt}>
                <Plus size={16} className="mr-1" />
                Post Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Discussion & Questions</h3>
        
        {doubts.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
              <p>No questions have been asked about this concept yet. Be the first to ask!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {doubts.map((doubt) => (
              <Card key={doubt.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <MessageCircle size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">{doubt.question}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{doubt.askedBy}</span>
                        <span>•</span>
                        <span>{doubt.timestamp}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleExpand(doubt.id)}
                    >
                      {expandedDoubtId === doubt.id ? 'Hide Replies' : 
                      `${doubt.replies.length} ${doubt.replies.length === 1 ? 'Reply' : 'Replies'}`}
                    </Button>
                  </div>
                  
                  {expandedDoubtId === doubt.id && (
                    <div className="mt-4 pl-9 border-l-2 border-muted space-y-4">
                      {doubt.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <div className={`bg-${reply.isInstructor ? 'blue' : 'primary'}/10 rounded-full p-2`}>
                            <User size={18} className={`text-${reply.isInstructor ? 'blue' : 'primary'}-500`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-1">
                              {reply.responder} {reply.isInstructor && <span className="text-blue-500 text-xs">(Instructor)</span>}
                            </div>
                            <div className="text-sm">{reply.text}</div>
                            <div className="text-xs text-muted-foreground mt-1">{reply.timestamp}</div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex gap-2 items-center">
                        <Input
                          placeholder="Add your reply..."
                          value={replies[doubt.id] || ''}
                          onChange={(e) => setReplies({...replies, [doubt.id]: e.target.value})}
                          className="flex-1"
                        />
                        <Button 
                          size="icon" 
                          onClick={() => handleAddReply(doubt.id)} 
                          disabled={!replies[doubt.id]}
                        >
                          <Send size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtsTab;
