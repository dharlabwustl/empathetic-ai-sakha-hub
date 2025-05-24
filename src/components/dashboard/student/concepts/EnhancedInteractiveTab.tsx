
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  CheckCircle, HelpCircle, Eye, Settings,
  Lightbulb, Brain, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistantChat from './AIAssistantChat';

interface InteractiveElement {
  id: string;
  type: 'slider' | 'button' | 'toggle' | 'input';
  label: string;
  value: any;
  min?: number;
  max?: number;
  step?: number;
  description: string;
}

interface VisualizationTab {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  elements: InteractiveElement[];
  voiceScript: string;
}

interface EnhancedInteractiveTabProps {
  conceptId: string;
  conceptName: string;
}

const EnhancedInteractiveTab: React.FC<EnhancedInteractiveTabProps> = ({ 
  conceptId, 
  conceptName 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedTabs, setCompletedTabs] = useState<Set<number>>(new Set());
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [elementValues, setElementValues] = useState<Record<string, any>>({});
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioProgressRef = useRef<number>(0);

  // Mock visualization tabs with voice scripts
  const visualizationTabs: VisualizationTab[] = [
    {
      id: 'force-vector',
      title: 'Force Vector Analysis',
      description: 'Understand how forces act as vectors with magnitude and direction',
      completed: false,
      voiceScript: `Welcome to Force Vector Analysis. Here you can see how forces work as vectors. A force has both magnitude, which is how strong it is, and direction, which shows where it's pointing. Try adjusting the force magnitude slider to see how the vector changes. Notice how increasing the magnitude makes the arrow longer, representing a stronger force.`,
      elements: [
        {
          id: 'magnitude',
          type: 'slider',
          label: 'Force Magnitude (N)',
          value: 50,
          min: 0,
          max: 100,
          step: 5,
          description: 'Adjust the strength of the force'
        },
        {
          id: 'angle',
          type: 'slider',
          label: 'Force Direction (°)',
          value: 45,
          min: 0,
          max: 360,
          step: 15,
          description: 'Change the direction of the force'
        },
        {
          id: 'showComponents',
          type: 'toggle',
          label: 'Show X-Y Components',
          value: false,
          description: 'Display horizontal and vertical force components'
        }
      ]
    },
    {
      id: 'equilibrium',
      title: 'Force Equilibrium',
      description: 'Explore how multiple forces can balance each other',
      completed: false,
      voiceScript: `In this Force Equilibrium simulation, you'll learn how multiple forces can balance each other out. When forces are in equilibrium, the net force is zero, meaning the object won't accelerate. Try adding different forces and see how they combine. Notice the resultant force vector - when it becomes zero, the system is in perfect equilibrium.`,
      elements: [
        {
          id: 'force1',
          type: 'slider',
          label: 'Force 1 (N)',
          value: 30,
          min: 0,
          max: 100,
          step: 5,
          description: 'First force in the system'
        },
        {
          id: 'force2',
          type: 'slider',
          label: 'Force 2 (N)',
          value: 30,
          min: 0,
          max: 100,
          step: 5,
          description: 'Second force in the system'
        },
        {
          id: 'showResultant',
          type: 'toggle',
          label: 'Show Resultant Force',
          value: true,
          description: 'Display the combined effect of all forces'
        }
      ]
    },
    {
      id: 'acceleration',
      title: 'Force and Acceleration',
      description: 'See how Newton\'s second law relates force, mass, and acceleration',
      completed: false,
      voiceScript: `This visualization demonstrates Newton's Second Law: Force equals mass times acceleration. As you change the applied force or the object's mass, observe how the acceleration changes. A heavier object needs more force to achieve the same acceleration as a lighter object. This fundamental relationship governs all motion in our universe.`,
      elements: [
        {
          id: 'appliedForce',
          type: 'slider',
          label: 'Applied Force (N)',
          value: 60,
          min: 0,
          max: 120,
          step: 10,
          description: 'Force applied to the object'
        },
        {
          id: 'mass',
          type: 'slider',
          label: 'Object Mass (kg)',
          value: 10,
          min: 1,
          max: 50,
          step: 1,
          description: 'Mass of the object'
        },
        {
          id: 'showCalculation',
          type: 'toggle',
          label: 'Show F = ma Calculation',
          value: true,
          description: 'Display the mathematical relationship'
        }
      ]
    },
    {
      id: 'friction',
      title: 'Friction Forces',
      description: 'Understand static and kinetic friction effects',
      completed: false,
      voiceScript: `Friction is a force that opposes motion between surfaces. There are two types: static friction, which prevents objects from starting to move, and kinetic friction, which acts on moving objects. Static friction is usually stronger than kinetic friction. Try adjusting the surface roughness and applied force to see when the object starts moving.`,
      elements: [
        {
          id: 'surfaceRoughness',
          type: 'slider',
          label: 'Surface Roughness',
          value: 0.3,
          min: 0.1,
          max: 1.0,
          step: 0.1,
          description: 'Coefficient of friction between surfaces'
        },
        {
          id: 'normalForce',
          type: 'slider',
          label: 'Normal Force (N)',
          value: 98,
          min: 10,
          max: 200,
          step: 10,
          description: 'Force pressing surfaces together'
        },
        {
          id: 'showFrictionTypes',
          type: 'toggle',
          label: 'Show Friction Types',
          value: true,
          description: 'Distinguish between static and kinetic friction'
        }
      ]
    },
    {
      id: 'projectile',
      title: 'Projectile Motion',
      description: 'Analyze motion under gravitational force',
      completed: false,
      voiceScript: `Projectile motion combines horizontal motion at constant velocity with vertical motion under gravitational acceleration. The horizontal and vertical motions are independent of each other. Try changing the launch angle and initial velocity to see how they affect the trajectory. Notice that 45 degrees gives the maximum range for a given initial speed.`,
      elements: [
        {
          id: 'initialVelocity',
          type: 'slider',
          label: 'Initial Velocity (m/s)',
          value: 20,
          min: 5,
          max: 50,
          step: 5,
          description: 'Starting speed of the projectile'
        },
        {
          id: 'launchAngle',
          type: 'slider',
          label: 'Launch Angle (°)',
          value: 45,
          min: 0,
          max: 90,
          step: 5,
          description: 'Angle of launch above horizontal'
        },
        {
          id: 'showTrajectory',
          type: 'toggle',
          label: 'Show Full Trajectory',
          value: true,
          description: 'Display the complete flight path'
        }
      ]
    }
  ];

  // Initialize element values
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    visualizationTabs.forEach(tab => {
      tab.elements.forEach(element => {
        initialValues[element.id] = element.value;
      });
    });
    setElementValues(initialValues);
  }, []);

  // Voice explanation functionality
  const playVoiceExplanation = (tabIndex: number) => {
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }

    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(visualizationTabs[tabIndex].voiceScript);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        audioProgressRef.current = 0;
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        markTabAsCompleted(tabIndex);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      // Simulate progress tracking
      const progressInterval = setInterval(() => {
        audioProgressRef.current += 2;
        setProgress(audioProgressRef.current);
        if (audioProgressRef.current >= 100) {
          clearInterval(progressInterval);
        }
      }, 100);

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseVoiceExplanation = () => {
    if (speechRef.current && isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const resetProgress = () => {
    pauseVoiceExplanation();
    setProgress(0);
    audioProgressRef.current = 0;
  };

  const markTabAsCompleted = (tabIndex: number) => {
    setCompletedTabs(prev => new Set([...prev, tabIndex]));
  };

  const handleElementChange = (elementId: string, value: any) => {
    setElementValues(prev => ({
      ...prev,
      [elementId]: value
    }));
  };

  const renderVisualization = (tab: VisualizationTab) => {
    // Render different visualizations based on tab type
    switch (tab.id) {
      case 'force-vector':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <svg width="200" height="150" className="absolute">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                        refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>
              {/* Force vector */}
              <line 
                x1="100" 
                y1="75" 
                x2={100 + (elementValues.magnitude || 50) * Math.cos((elementValues.angle || 45) * Math.PI / 180)}
                y2={75 - (elementValues.magnitude || 50) * Math.sin((elementValues.angle || 45) * Math.PI / 180)}
                stroke="#3b82f6" 
                strokeWidth="3" 
                markerEnd="url(#arrowhead)" 
              />
              <circle cx="100" cy="75" r="4" fill="#1e40af" />
              <text x="105" y="80" className="text-xs fill-gray-600">Origin</text>
              
              {/* Components if enabled */}
              {elementValues.showComponents && (
                <>
                  <line x1="100" y1="75" 
                        x2={100 + (elementValues.magnitude || 50) * Math.cos((elementValues.angle || 45) * Math.PI / 180)} 
                        y2="75" 
                        stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1={100 + (elementValues.magnitude || 50) * Math.cos((elementValues.angle || 45) * Math.PI / 180)} 
                        y1="75" 
                        x2={100 + (elementValues.magnitude || 50) * Math.cos((elementValues.angle || 45) * Math.PI / 180)} 
                        y2={75 - (elementValues.magnitude || 50) * Math.sin((elementValues.angle || 45) * Math.PI / 180)} 
                        stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                </>
              )}
            </svg>
            <div className="absolute top-2 right-2 bg-white p-2 rounded shadow">
              <p className="text-xs">F = {elementValues.magnitude || 50}N</p>
              <p className="text-xs">θ = {elementValues.angle || 45}°</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-64 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto mb-2 text-purple-500" />
              <p className="text-gray-600">Interactive visualization for {tab.title}</p>
              <p className="text-sm text-gray-500 mt-1">Adjust controls to see changes</p>
            </div>
          </div>
        );
    }
  };

  const currentTab = visualizationTabs[activeTab];
  const overallProgress = (completedTabs.size / visualizationTabs.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              Interactive Visualizations Progress
            </span>
            <Badge variant="outline">
              {completedTabs.size}/{visualizationTabs.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
        {visualizationTabs.map((tab, index) => (
          <Button
            key={tab.id}
            variant={activeTab === index ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(index)}
            className={`relative ${completedTabs.has(index) ? 'bg-green-100 border-green-300' : ''}`}
          >
            <span className="mr-2">{tab.title}</span>
            {completedTabs.has(index) && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    {currentTab.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{currentTab.description}</p>
                </div>
                {completedTabs.has(activeTab) && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Audio Controls */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                <Button
                  size="sm"
                  onClick={() => isPlaying ? pauseVoiceExplanation() : playVoiceExplanation(activeTab)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'} Explanation
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetProgress}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 ml-2">
                  <Progress value={progress} className="h-2" />
                </div>
                
                <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
              </div>

              {/* Visualization */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderVisualization(currentTab)}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Interactive Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentTab.elements.map((element) => (
                <div key={element.id} className="space-y-2">
                  <label className="text-sm font-medium">{element.label}</label>
                  
                  {element.type === 'slider' && (
                    <div className="space-y-1">
                      <input
                        type="range"
                        min={element.min}
                        max={element.max}
                        step={element.step}
                        value={elementValues[element.id] || element.value}
                        onChange={(e) => handleElementChange(element.id, Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{element.min}</span>
                        <span className="font-medium">{elementValues[element.id] || element.value}</span>
                        <span>{element.max}</span>
                      </div>
                    </div>
                  )}
                  
                  {element.type === 'toggle' && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={elementValues[element.id] || element.value}
                        onChange={(e) => handleElementChange(element.id, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Enable</span>
                    </label>
                  )}
                  
                  <p className="text-xs text-gray-500">{element.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-500" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowAIAssistant(true)}
                className="w-full"
                variant="outline"
              >
                <Brain className="h-4 w-4 mr-2" />
                Ask AI Tutor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <AIAssistantChat
            conceptName={`${conceptName} - ${currentTab.title}`}
            context={`Current visualization: ${currentTab.title}. ${currentTab.description}`}
            isVisible={showAIAssistant}
            onClose={() => setShowAIAssistant(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedInteractiveTab;
