
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, RotateCcw, MessageCircle, Lightbulb, Eye, Layers } from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ conceptName, subject }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock diagram steps based on subject and concept
  const getDiagramSteps = () => {
    if (subject.toLowerCase() === 'physics') {
      return [
        {
          id: 1,
          title: "Force Vectors",
          description: "Understanding how forces act on objects",
          diagram: "Force vectors showing magnitude and direction",
          audioText: "Let's start by understanding force vectors. Forces have both magnitude and direction, represented by arrows."
        },
        {
          id: 2,
          title: "Free Body Diagram",
          description: "Isolating the object and showing all forces",
          diagram: "Object with all force vectors labeled",
          audioText: "Next, we create a free body diagram by isolating our object and showing all forces acting on it."
        },
        {
          id: 3,
          title: "Force Resolution",
          description: "Breaking forces into components",
          diagram: "Forces broken into x and y components",
          audioText: "We can resolve forces into horizontal and vertical components to make calculations easier."
        },
        {
          id: 4,
          title: "Equilibrium Analysis",
          description: "Applying Newton's first law",
          diagram: "Balanced forces showing equilibrium",
          audioText: "When forces are balanced, the object is in equilibrium according to Newton's first law."
        }
      ];
    } else if (subject.toLowerCase() === 'chemistry') {
      return [
        {
          id: 1,
          title: "Molecular Structure",
          description: "Basic molecular arrangement",
          diagram: "Atoms connected by bonds",
          audioText: "Let's examine the molecular structure showing how atoms are connected by chemical bonds."
        },
        {
          id: 2,
          title: "Electron Configuration",
          description: "How electrons are arranged",
          diagram: "Electron shells and orbitals",
          audioText: "The electron configuration shows how electrons are distributed in atomic orbitals."
        },
        {
          id: 3,
          title: "Bond Formation",
          description: "How chemical bonds form",
          diagram: "Bond formation process",
          audioText: "Chemical bonds form when atoms share or transfer electrons to achieve stability."
        },
        {
          id: 4,
          title: "Reaction Mechanism",
          description: "Step-by-step reaction process",
          diagram: "Reaction pathway diagram",
          audioText: "The reaction mechanism shows the step-by-step process of how reactants become products."
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: "Function Graph",
          description: "Visual representation of the function",
          diagram: "Coordinate plane with function curve",
          audioText: "Let's visualize this mathematical concept using a coordinate graph."
        },
        {
          id: 2,
          title: "Key Points",
          description: "Important points on the graph",
          diagram: "Highlighted critical points",
          audioText: "We identify key points like intercepts, maxima, and minima on our graph."
        },
        {
          id: 3,
          title: "Transformations",
          description: "How the function changes",
          diagram: "Multiple function curves showing transformations",
          audioText: "Function transformations show how we can shift, stretch, or reflect the original function."
        },
        {
          id: 4,
          title: "Applications",
          description: "Real-world applications",
          diagram: "Practical application diagram",
          audioText: "Finally, we see how this mathematical concept applies to real-world problems."
        }
      ];
    }
  };

  const diagramSteps = getDiagramSteps();

  // Text-to-speech functionality
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = isMuted ? 0 : 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      speechSynthesis.cancel();
    } else {
      setIsPlaying(true);
      const currentStepData = diagramSteps[currentStep];
      speakText(currentStepData.audioText);
      
      // Auto advance to next step after audio
      setTimeout(() => {
        if (currentStep < diagramSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 4000); // Adjust timing based on audio length
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    speechSynthesis.cancel();
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    if (isPlaying) {
      speechSynthesis.cancel();
      const stepData = diagramSteps[stepIndex];
      speakText(stepData.audioText);
    }
  };

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const renderDiagram = () => {
    const currentStepData = diagramSteps[currentStep];
    
    // Enhanced SVG diagram based on subject
    if (subject.toLowerCase() === 'physics') {
      return (
        <svg viewBox="0 0 400 300" className="w-full h-64 bg-white rounded-lg border">
          {/* Physics diagram - Force vectors example */}
          <rect x="180" y="140" width="40" height="40" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" rx="4"/>
          <text x="200" y="165" textAnchor="middle" className="fill-white text-sm font-semibold">Box</text>
          
          {currentStep >= 0 && (
            <>
              {/* Gravity force */}
              <line x1="200" y1="180" x2="200" y2="240" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead-red)"/>
              <text x="210" y="215" className="fill-red-600 text-sm font-medium">Fg</text>
            </>
          )}
          
          {currentStep >= 1 && (
            <>
              {/* Normal force */}
              <line x1="200" y1="140" x2="200" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead-green)"/>
              <text x="210" y="100" className="fill-green-600 text-sm font-medium">N</text>
            </>
          )}
          
          {currentStep >= 2 && (
            <>
              {/* Applied force */}
              <line x1="180" y1="160" x2="120" y2="160" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead-purple)"/>
              <text x="140" y="150" className="fill-purple-600 text-sm font-medium">F</text>
            </>
          )}
          
          {currentStep >= 3 && (
            <>
              {/* Friction force */}
              <line x1="220" y1="160" x2="280" y2="160" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead-yellow)"/>
              <text x="255" y="150" className="fill-yellow-600 text-sm font-medium">f</text>
            </>
          )}
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/>
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981"/>
            </marker>
            <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowhead-yellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
            </marker>
          </defs>
          
          {/* Ground line */}
          <line x1="50" y1="220" x2="350" y2="220" stroke="#6b7280" strokeWidth="2"/>
        </svg>
      );
    } else if (subject.toLowerCase() === 'chemistry') {
      return (
        <svg viewBox="0 0 400 300" className="w-full h-64 bg-white rounded-lg border">
          {/* Chemistry diagram - Molecular structure */}
          <circle cx="200" cy="150" r="20" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
          <text x="200" y="155" textAnchor="middle" className="fill-white text-sm font-semibold">C</text>
          
          {currentStep >= 0 && (
            <>
              <circle cx="150" cy="100" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
              <text x="150" y="105" textAnchor="middle" className="fill-white text-xs font-semibold">H</text>
              <line x1="170" y1="130" x2="180" y2="120" stroke="#6b7280" strokeWidth="2"/>
            </>
          )}
          
          {currentStep >= 1 && (
            <>
              <circle cx="250" cy="100" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
              <text x="250" y="105" textAnchor="middle" className="fill-white text-xs font-semibold">H</text>
              <line x1="220" y1="130" x2="230" y2="120" stroke="#6b7280" strokeWidth="2"/>
            </>
          )}
          
          {currentStep >= 2 && (
            <>
              <circle cx="150" cy="200" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
              <text x="150" y="205" textAnchor="middle" className="fill-white text-xs font-semibold">H</text>
              <line x1="170" y1="170" x2="180" y2="180" stroke="#6b7280" strokeWidth="2"/>
            </>
          )}
          
          {currentStep >= 3 && (
            <>
              <circle cx="250" cy="200" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
              <text x="250" y="205" textAnchor="middle" className="fill-white text-xs font-semibold">H</text>
              <line x1="220" y1="170" x2="230" y2="180" stroke="#6b7280" strokeWidth="2"/>
            </>
          )}
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 400 300" className="w-full h-64 bg-white rounded-lg border">
          {/* Math diagram - Function graph */}
          <line x1="50" y1="250" x2="350" y2="250" stroke="#6b7280" strokeWidth="2"/>
          <line x1="50" y1="50" x2="50" y2="250" stroke="#6b7280" strokeWidth="2"/>
          
          {currentStep >= 0 && (
            <path d="M 70 230 Q 150 100 200 150 T 330 80" stroke="#3b82f6" strokeWidth="3" fill="none"/>
          )}
          
          {currentStep >= 1 && (
            <>
              <circle cx="200" cy="150" r="4" fill="#ef4444"/>
              <text x="205" y="145" className="fill-red-600 text-xs">Critical Point</text>
            </>
          )}
          
          {currentStep >= 2 && (
            <>
              <circle cx="120" cy="180" r="4" fill="#10b981"/>
              <circle cx="280" cy="120" r="4" fill="#10b981"/>
            </>
          )}
        </svg>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Interactive Diagrams - {conceptName}
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {subject}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              onClick={handlePlayPause}
              className={`flex items-center gap-2 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'} Explanation
            </Button>
            
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            
            <Button
              onClick={() => setShowAITutor(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>

          {/* Main Diagram Area */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              {renderDiagram()}
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Step {currentStep + 1}: {diagramSteps[currentStep]?.title}
              </h3>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                {diagramSteps[currentStep]?.description}
              </p>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {diagramSteps.map((step, index) => (
              <Button
                key={step.id}
                onClick={() => handleStepClick(index)}
                variant={currentStep === index ? "default" : "outline"}
                className={`p-3 h-auto flex flex-col items-start text-left ${
                  currentStep === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="h-4 w-4" />
                  <span className="font-semibold text-xs">Step {index + 1}</span>
                </div>
                <span className="text-sm font-medium">{step.title}</span>
                <span className="text-xs opacity-75 mt-1">{step.description}</span>
              </Button>
            ))}
          </div>

          {/* Learning Tips */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Learning Tip</h4>
                <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                  Use the play/pause controls to learn at your own pace. Each step builds on the previous one, 
                  so make sure you understand each concept before moving forward.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={`diagrams and visualizations for ${conceptName}`}
        subject={subject}
      />
    </div>
  );
};

export default EnhancedDiagramsTab;
