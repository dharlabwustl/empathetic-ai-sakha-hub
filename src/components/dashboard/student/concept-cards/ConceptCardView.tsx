import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, AlertTriangle, Lightbulb, Trophy, Check, Circle } from "lucide-react";
import ConceptExplanationContent from './ConceptExplanationContent';
import { motion } from "framer-motion";

interface ConceptCardViewProps {
  title: string;
  subject: string;
  chapter: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

const ConceptCardView: React.FC<ConceptCardViewProps> = ({
  title,
  subject,
  chapter,
  difficulty = "Intermediate",
  isCompleted = false,
  onToggleComplete
}) => {
  const tabs = [
    { id: "explanation", label: "Explanation", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "examples", label: "Real-world Examples", icon: <CircleCheck className="h-4 w-4" /> },
    { id: "mistakes", label: "Common Mistakes", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: "exam", label: "Exam Relevance", icon: <Trophy className="h-4 w-4" /> },
  ];

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700 border-green-200";
      case "Advanced": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pb-4 relative">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-blue-500/20 text-white border-blue-300/30">
              {subject}
            </Badge>
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor()}>
                {difficulty}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className={`${isCompleted ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/20'}`}
                onClick={onToggleComplete}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-blue-100 text-sm mt-1">From {chapter}</p>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="explanation" className="w-full">
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 border-b border-gray-200 px-4 py-2">
              <TabsList className="grid grid-cols-4 bg-transparent h-auto gap-2">
                {tabs.map(tab => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="py-1.5 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-1.5 text-xs sm:text-sm"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="p-4">
              <TabsContent value="explanation" className="mt-0">
                <ConceptExplanationContent conceptTitle={title} />
              </TabsContent>
              
              <TabsContent value="examples" className="mt-0">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-100">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-medium text-lg text-emerald-800">Real-world Examples of {title}</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                        <h4 className="font-medium text-emerald-700">Inertia in Vehicle Safety</h4>
                        <p className="mt-1 text-gray-700">When a car suddenly stops, passengers continue to move forward (First Law). This is why seat belts are crucial—they apply the force needed to stop the passenger's forward motion.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                        <h4 className="font-medium text-emerald-700">Rocket Propulsion</h4>
                        <p className="mt-1 text-gray-700">Rockets work based on Newton's Third Law. The engine expels gas at high speed in one direction, creating an equal and opposite force that propels the rocket in the opposite direction.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                        <h4 className="font-medium text-emerald-700">Elevator Physics</h4>
                        <p className="mt-1 text-gray-700">When an elevator accelerates upward, you feel heavier (apparent weight increases). This demonstrates Newton's Second Law as the floor exerts extra force to give you upward acceleration.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mistakes" className="mt-0">
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-medium text-lg text-amber-800">Common Mistakes with {title}</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                        <h4 className="font-medium text-amber-700">Confusing Mass and Weight</h4>
                        <p className="mt-1 text-gray-700">Students often confuse mass (an object's resistance to acceleration) with weight (the gravitational force on an object). Remember that mass is constant, while weight changes with gravity.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                        <h4 className="font-medium text-amber-700">Ignoring Friction</h4>
                        <p className="mt-1 text-gray-700">A common mistake is neglecting friction forces in problems. In the real world, friction is almost always present and significantly affects motion.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                        <h4 className="font-medium text-amber-700">Misapplying the Third Law</h4>
                        <p className="mt-1 text-gray-700">Students often think action-reaction forces act on the same object. Remember that action-reaction forces always act on different objects.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="exam" className="mt-0">
                <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-medium text-lg text-violet-800">Exam Relevance of {title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100">
                        <h4 className="font-medium text-violet-700">High Importance in JEE</h4>
                        <p className="mt-1 text-gray-700">Newton's Laws are fundamental concepts in JEE Physics, typically worth 10-15% of physics questions in JEE Main and Advanced.</p>
                        <div className="mt-2 flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-amber-500" />
                          <span className="text-xs font-medium text-amber-600">Consistently appears in JEE Main & Advanced</span>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100">
                        <h4 className="font-medium text-violet-700">Question Types</h4>
                        <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                          <li>Numerical problems involving multiple forces</li>
                          <li>Conceptual questions on inertia</li>
                          <li>Application of F=ma in complex scenarios</li>
                          <li>Action-reaction pair identification</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100 md:col-span-2">
                        <h4 className="font-medium text-violet-700">Related Topics to Study</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-violet-50 text-violet-700">Friction</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700">Circular Motion</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700">Work & Energy</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700">Momentum</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700">Rotational Dynamics</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConceptCardView;
