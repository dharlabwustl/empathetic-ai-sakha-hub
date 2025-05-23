
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Loader2, Cube, Brain } from 'lucide-react';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  
  const handleLoadModel = (modelName: string) => {
    setIsLoading(true);
    setActiveModel(modelName);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  const handleExplainAudio = (explanation: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          3D Interactive Learning Lab
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-medium text-lg">Available Models</h3>
            
            <div className="space-y-2">
              <Button 
                variant={activeModel === "forces" ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => handleLoadModel("forces")}
              >
                <Cube className="h-4 w-4 mr-2" />
                Force Vectors
              </Button>
              
              <Button 
                variant={activeModel === "massAcceleration" ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => handleLoadModel("massAcceleration")}
              >
                <Cube className="h-4 w-4 mr-2" />
                Mass-Acceleration
              </Button>
              
              <Button 
                variant={activeModel === "pulleySystems" ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => handleLoadModel("pulleySystems")}
              >
                <Cube className="h-4 w-4 mr-2" />
                Pulley Systems
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                These 3D models help visualize key concepts in {conceptName}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            {!activeModel ? (
              <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-8 h-80">
                <Cube className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-500">Select a 3D Model</h3>
                <p className="text-gray-400 text-center mt-2">
                  Choose a model from the left to view an interactive 3D visualization
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center border rounded-lg p-8 h-80 bg-gray-50 dark:bg-gray-800">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-medium">Loading 3D Model...</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Preparing interactive visualization
                </p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 flex justify-between items-center">
                  <h3 className="font-medium">
                    {activeModel === "forces" && "Force Vectors Visualization"}
                    {activeModel === "massAcceleration" && "Mass-Acceleration Relationship"}
                    {activeModel === "pulleySystems" && "Pulley Systems and Mechanical Advantage"}
                  </h3>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white dark:bg-gray-800"
                    onClick={() => {
                      const explanation = activeModel === "forces"
                        ? `This 3D model demonstrates how forces act as vectors in ${conceptName}. You can see how multiple forces combine to produce a net force on an object. The direction and length of each arrow represents the direction and magnitude of the force.`
                        : activeModel === "massAcceleration"
                        ? `This 3D model shows the inverse relationship between mass and acceleration in ${conceptName}. With constant force, as mass increases, acceleration decreases proportionally. The model demonstrates that F = ma, or Newton's Second Law of Motion.`
                        : `This 3D model illustrates how pulley systems can change the direction and magnitude of forces. The mechanical advantage gained through pulley systems is a direct application of ${conceptName}.`;
                      
                      handleExplainAudio(explanation);
                    }}
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Audio Explanation
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 h-64 p-4">
                  {activeModel === "forces" && (
                    <div className="h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 400 200">
                        {/* 3D-like force vector visualization */}
                        <defs>
                          <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" 
                                  refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                          </marker>
                          <marker id="arrowhead-green" markerWidth="10" markerHeight="7" 
                                  refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                          </marker>
                          <marker id="arrowhead-red" markerWidth="10" markerHeight="7" 
                                  refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                          </marker>
                        </defs>
                        
                        {/* 3D-like box representing object */}
                        <g transform="skewX(-15)">
                          <rect x="150" y="80" width="100" height="60" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
                          <rect x="150" y="80" width="100" height="15" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
                          <rect x="250" y="80" width="20" height="60" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
                        </g>
                        
                        {/* Force vectors */}
                        <line x1="200" y1="110" x2="300" y2="110" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrowhead-blue)"/>
                        <line x1="200" y1="110" x2="150" y2="50" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrowhead-green)"/>
                        <line x1="200" y1="110" x2="130" y2="170" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowhead-red)"/>
                        
                        {/* Labels */}
                        <text x="260" y="105" fill="#3b82f6" fontWeight="bold">F₁</text>
                        <text x="160" y="60" fill="#10b981" fontWeight="bold">F₂</text>
                        <text x="150" y="160" fill="#ef4444" fontWeight="bold">F₃</text>
                      </svg>
                    </div>
                  )}
                  
                  {activeModel === "massAcceleration" && (
                    <div className="h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 400 200">
                        {/* 3D-like visualization of mass-acceleration relationship */}
                        <defs>
                          <marker id="arrowhead-orange" markerWidth="10" markerHeight="7" 
                                refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                          </marker>
                        </defs>
                        
                        {/* Coordinate system */}
                        <line x1="50" y1="160" x2="350" y2="160" stroke="#6b7280" strokeWidth="2" />
                        <line x1="50" y1="160" x2="50" y2="40" stroke="#6b7280" strokeWidth="2" />
                        
                        {/* Axis labels */}
                        <text x="200" y="180" fill="#6b7280" fontSize="12" textAnchor="middle">Mass</text>
                        <text x="30" y="100" fill="#6b7280" fontSize="12" transform="rotate(-90 30,100)" textAnchor="middle">Acceleration</text>
                        
                        {/* Curve showing inverse relationship */}
                        <path d="M 70 50 Q 120 80 200 120 T 330 150" stroke="#f59e0b" strokeWidth="3" fill="none" />
                        
                        {/* Objects with different masses */}
                        <g transform="translate(80, 130) scale(0.7)">
                          <rect x="0" y="0" width="30" height="30" fill="#d1d5db" stroke="#9ca3af" />
                          <text x="15" y="20" fontSize="14" textAnchor="middle">1kg</text>
                        </g>
                        
                        <g transform="translate(180, 140) scale(0.9)">
                          <rect x="0" y="0" width="40" height="40" fill="#d1d5db" stroke="#9ca3af" />
                          <text x="20" y="25" fontSize="14" textAnchor="middle">5kg</text>
                        </g>
                        
                        <g transform="translate(280, 150) scale(1.1)">
                          <rect x="0" y="0" width="50" height="50" fill="#d1d5db" stroke="#9ca3af" />
                          <text x="25" y="30" fontSize="14" textAnchor="middle">10kg</text>
                        </g>
                        
                        {/* Acceleration arrows */}
                        <line x1="95" y1="100" x2="140" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead-orange)" />
                        <line x1="200" y1="100" x2="225" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead-orange)" />
                        <line x1="305" y1="100" x2="315" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead-orange)" />
                      </svg>
                    </div>
                  )}
                  
                  {activeModel === "pulleySystems" && (
                    <div className="h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 400 200">
                        {/* Pulley system visualization */}
                        
                        {/* Fixed pulley */}
                        <circle cx="200" cy="50" r="15" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
                        <circle cx="200" cy="50" r="3" fill="#6b7280" />
                        
                        {/* Movable pulley */}
                        <circle cx="200" cy="130" r="15" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
                        <circle cx="200" cy="130" r="3" fill="#6b7280" />
                        
                        {/* Rope */}
                        <path d="M 150 30 L 185 50 A 15 15 0 0 0 215 50 L 215 115 A 15 15 0 0 1 185 115 L 185 50" 
                              fill="none" stroke="#92400e" strokeWidth="2" />
                        
                        {/* Weight */}
                        <rect x="185" y="145" width="30" height="30" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                        <text x="200" y="165" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">10kg</text>
                        
                        {/* Force arrow */}
                        <line x1="150" y1="30" x2="130" y2="10" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                        <text x="120" y="20" fill="#3b82f6" fontSize="12" fontWeight="bold">F</text>
                        
                        {/* Weight arrow */}
                        <line x1="200" y1="175" x2="200" y2="195" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead-red)" />
                        <text x="210" y="190" fill="#ef4444" fontSize="12" fontWeight="bold">mg</text>
                        
                        {/* Ceiling */}
                        <line x1="100" y1="30" x2="300" y2="30" stroke="#6b7280" strokeWidth="5" />
                        
                        {/* Labels */}
                        <text x="250" y="50" fill="#6b7280" fontSize="12">Fixed Pulley</text>
                        <text x="250" y="130" fill="#6b7280" fontSize="12">Movable Pulley</text>
                        <text x="250" y="80" fill="#3b82f6" fontSize="12" fontWeight="bold">
                          Mechanical Advantage: 2x
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {activeModel === "forces" && (
                      "This model shows how multiple forces interact on a single object according to Newton's Second Law. The net force determines the acceleration direction and magnitude."
                    )}
                    {activeModel === "massAcceleration" && (
                      "This visualization demonstrates that with the same applied force, objects with greater mass experience less acceleration, illustrating the F = ma relationship."
                    )}
                    {activeModel === "pulleySystems" && (
                      "This pulley system demonstrates how mechanical advantage works. With this configuration, the force needed to lift the weight is reduced by half."
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Visual3DContent;
