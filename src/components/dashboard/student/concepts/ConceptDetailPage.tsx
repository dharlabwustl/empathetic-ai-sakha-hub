
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  FileText, 
  Lightbulb,
  Clock,
  Target,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react';
import ConceptVoiceAssistant from '@/components/voice/ConceptVoiceAssistant';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(65);

  // Mock concept data
  const conceptData = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    difficulty: "Medium",
    estimatedTime: "45 minutes",
    completion: 65,
    description: "Understanding the fundamental principles that describe the relationship between forces and motion",
    content: {
      overview: "Newton's Laws of Motion are three physical laws that form the foundation for classical mechanics...",
      examples: [
        "A ball rolling on the ground eventually stops due to friction",
        "Pushing a car requires more force than pushing a bicycle",
        "When you jump, you push down on the Earth and it pushes back up on you"
      ],
      keyPoints: [
        "First Law: Law of Inertia",
        "Second Law: F = ma",
        "Third Law: Action-Reaction pairs"
      ]
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Concepts
        </Button>
        
        {/* Voice Assistant */}
        <ConceptVoiceAssistant 
          conceptName={conceptData.title}
          conceptSubject={conceptData.subject}
          isEnabled={true}
          userName="Student"
        />
      </div>

      {/* Concept Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{conceptData.subject}</Badge>
                <Badge variant="secondary">{conceptData.difficulty}</Badge>
              </div>
              <h1 className="text-3xl font-bold">{conceptData.title}</h1>
              <p className="text-gray-600">{conceptData.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{conceptData.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">{progress}% Complete</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Practice
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Overview</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>{conceptData.content.overview}</p>
                  
                  <h3>Key Points:</h3>
                  <ul>
                    {conceptData.content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Real-World Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conceptData.content.examples.map((example, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p>{example}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">Practice questions for this concept are being prepared.</p>
                    <Button>View Related Flashcards</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">No notes yet. Start taking notes to better understand this concept.</p>
                    <Button>Add Note</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Audio Player */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audio Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={handlePlayPause}
                  className="w-full"
                  variant={isPlaying ? "secondary" : "default"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {isPlaying ? 'Pause' : 'Play'} Audio
                </Button>
                <Progress value={30} className="h-2" />
                <p className="text-sm text-gray-600 text-center">2:30 / 8:45</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="h-4 w-4 mr-2" />
                Practice Flashcards
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          {/* Related Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <div className="text-left">
                    <p className="font-medium">Force and Acceleration</p>
                    <p className="text-sm text-gray-600">Physics</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <div className="text-left">
                    <p className="font-medium">Momentum</p>
                    <p className="text-sm text-gray-600">Physics</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <div className="text-left">
                    <p className="font-medium">Energy Conservation</p>
                    <p className="text-sm text-gray-600">Physics</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
