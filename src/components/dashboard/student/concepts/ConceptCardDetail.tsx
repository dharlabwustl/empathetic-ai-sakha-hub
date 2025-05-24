
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Brain, Target, ChevronRight } from 'lucide-react';

interface ConceptCardDetailProps {
  conceptId: string;
  onBack: () => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock concept data
  const concept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    difficulty: "Intermediate",
    estimatedTime: "45 minutes",
    description: "Understand the fundamental principles of motion and forces in classical mechanics.",
    prerequisites: ["Basic Mathematics", "Vector Concepts"],
    learningObjectives: [
      "Understand Newton's First Law (Law of Inertia)",
      "Apply Newton's Second Law (F = ma)",
      "Analyze action-reaction pairs using Newton's Third Law",
      "Solve motion problems using Newton's laws"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{concept.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{concept.subject}</Badge>
            <Badge variant="outline">{concept.difficulty}</Badge>
            <span className="text-sm text-gray-500">{concept.estimatedTime}</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{concept.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {concept.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 mt-1 text-blue-500" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {concept.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <Button className="w-full">
                      Start Learning
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Learning Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Newton's First Law (Law of Inertia)</h3>
                  <p className="mb-4">
                    An object at rest stays at rest and an object in motion stays in motion with 
                    the same speed and in the same direction unless acted upon by an unbalanced force.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Inertia is the tendency of objects to resist changes in motion</li>
                      <li>Mass is a measure of inertia</li>
                      <li>Net force must be zero for constant velocity</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Newton's Second Law (F = ma)</h3>
                  <p className="mb-4">
                    The acceleration of an object is directly proportional to the net force acting on it 
                    and inversely proportional to its mass.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <code className="text-lg font-mono">F = ma</code>
                    <p className="text-sm mt-2">Where F is force (N), m is mass (kg), and a is acceleration (m/s²)</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Newton's Third Law (Action-Reaction)</h3>
                  <p className="mb-4">
                    For every action, there is an equal and opposite reaction.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Examples:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Walking: foot pushes ground backward, ground pushes foot forward</li>
                      <li>Swimming: hands push water backward, water pushes swimmer forward</li>
                      <li>Rocket propulsion: exhaust pushes down, rocket pushes up</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Practice Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Problem 1: Basic Force Calculation</h4>
                  <p className="text-sm mb-3">
                    A 5 kg object accelerates at 3 m/s². What is the net force acting on it?
                  </p>
                  <Button size="sm">Solve Problem</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Problem 2: Action-Reaction Analysis</h4>
                  <p className="text-sm mb-3">
                    A person pushes a wall with 100 N of force. What force does the wall exert on the person?
                  </p>
                  <Button size="sm">Solve Problem</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Problem 3: Inertia Application</h4>
                  <p className="text-sm mb-3">
                    Explain why passengers lurch forward when a car suddenly stops.
                  </p>
                  <Button size="sm">Solve Problem</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Personal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  className="w-full h-40 p-3 border rounded-lg resize-none"
                  placeholder="Add your notes about Newton's Laws of Motion..."
                />
                <Button>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <style>
        {`
          .concept-detail-content {
            max-width: 100%;
            overflow-wrap: break-word;
          }
        `}
      </style>
    </div>
  );
};

export default ConceptCardDetail;
