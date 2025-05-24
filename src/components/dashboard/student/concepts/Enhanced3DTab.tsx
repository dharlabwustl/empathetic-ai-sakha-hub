
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, RotateCcw, MessageCircle, Cube, Eye, Settings, Zap } from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName, subject }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  // Subject-specific 3D phases
  const get3DPhases = () => {
    if (subject.toLowerCase() === 'physics') {
      return [
        {
          id: 1,
          title: "3D Force Analysis",
          description: "Visualizing forces in three dimensions",
          audioText: "Let's explore how forces act in three-dimensional space around this object."
        },
        {
          id: 2,
          title: "Motion Simulation",
          description: "Interactive motion visualization",
          audioText: "Now we'll simulate the motion of the object under these forces."
        },
        {
          id: 3,
          title: "Energy Visualization",
          description: "Kinetic and potential energy changes",
          audioText: "Watch how kinetic and potential energy change as the object moves."
        },
        {
          id: 4,
          title: "Virtual Lab Experiment",
          description: "Interactive physics experiment",
          audioText: "You can now interact with this virtual physics laboratory to test different scenarios."
        }
      ];
    } else if (subject.toLowerCase() === 'chemistry') {
      return [
        {
          id: 1,
          title: "Molecular 3D Structure",
          description: "Three-dimensional molecular model",
          audioText: "Examine the three-dimensional structure of this molecule and its electron clouds."
        },
        {
          id: 2,
          title: "Bond Visualization",
          description: "Chemical bonds in 3D space",
          audioText: "See how chemical bonds form and break in three-dimensional space."
        },
        {
          id: 3,
          title: "Reaction Animation",
          description: "Animated chemical reaction",
          audioText: "Watch this chemical reaction unfold step by step in our 3D simulation."
        },
        {
          id: 4,
          title: "Virtual Chemistry Lab",
          description: "Interactive chemistry experiment",
          audioText: "Use this virtual laboratory to experiment with different chemical reactions."
        }
      ];
    } else if (subject.toLowerCase() === 'biology') {
      return [
        {
          id: 1,
          title: "Cellular Structure",
          description: "3D cell model exploration",
          audioText: "Explore the three-dimensional structure of this biological cell and its organelles."
        },
        {
          id: 2,
          title: "Protein Folding",
          description: "Dynamic protein structure",
          audioText: "Watch how proteins fold into their functional three-dimensional shapes."
        },
        {
          id: 3,
          title: "Biological Process",
          description: "Cellular process simulation",
          audioText: "Observe this important biological process happening inside the cell."
        },
        {
          id: 4,
          title: "Virtual Biology Lab",
          description: "Interactive biological experiment",
          audioText: "Experiment with different biological conditions in this virtual laboratory."
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: "3D Mathematical Model",
          description: "Three-dimensional representation",
          audioText: "Let's visualize this mathematical concept in three-dimensional space."
        },
        {
          id: 2,
          title: "Interactive Transformation",
          description: "Dynamic mathematical changes",
          audioText: "See how mathematical transformations affect this three-dimensional model."
        },
        {
          id: 3,
          title: "Geometric Analysis",
          description: "Spatial relationship exploration",
          audioText: "Analyze the geometric relationships and properties of this 3D mathematical object."
        },
        {
          id: 4,
          title: "Virtual Math Lab",
          description: "Interactive mathematical exploration",
          audioText: "Use this virtual laboratory to explore different mathematical scenarios."
        }
      ];
    }
  };

  const phases = get3DPhases();

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
      const currentPhaseData = phases[currentPhase];
      speakText(currentPhaseData.audioText);
      
      // Auto advance to next phase
      setTimeout(() => {
        if (currentPhase < phases.length - 1) {
          setCurrentPhase(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 5000);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentPhase(0);
    speechSynthesis.cancel();
  };

  const handlePhaseClick = (phaseIndex: number) => {
    setCurrentPhase(phaseIndex);
    if (isPlaying) {
      speechSynthesis.cancel();
      const phaseData = phases[phaseIndex];
      speakText(phaseData.audioText);
    }
  };

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const render3DModel = () => {
    const currentPhaseData = phases[currentPhase];
    
    // Enhanced 3D visualization based on subject
    if (subject.toLowerCase() === 'physics') {
      return (
        <div className="relative w-full h-80 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative transform-gpu transition-all duration-1000 ${
              isPlaying ? 'animate-spin' : ''
            }`} style={{ animationDuration: `${4 / rotationSpeed}s` }}>
              
              {/* 3D Cube representing object */}
              <div className="relative w-24 h-24 transform-gpu preserve-3d" style={{
                transform: `rotateX(${currentPhase * 45}deg) rotateY(${currentPhase * 60}deg)`
              }}>
                <div className="absolute w-24 h-24 bg-blue-500 bg-opacity-80 border-2 border-blue-300" 
                     style={{ transform: 'translateZ(12px)' }}></div>
                <div className="absolute w-24 h-24 bg-blue-600 bg-opacity-60 border-2 border-blue-400" 
                     style={{ transform: 'translateZ(-12px)' }}></div>
                <div className="absolute w-24 h-24 bg-blue-400 bg-opacity-70 border-2 border-blue-200" 
                     style={{ transform: 'rotateY(90deg) translateZ(12px)' }}></div>
                <div className="absolute w-24 h-24 bg-blue-700 bg-opacity-50 border-2 border-blue-500" 
                     style={{ transform: 'rotateY(-90deg) translateZ(12px)' }}></div>
                <div className="absolute w-24 h-24 bg-blue-300 bg-opacity-90 border-2 border-blue-100" 
                     style={{ transform: 'rotateX(90deg) translateZ(12px)' }}></div>
                <div className="absolute w-24 h-24 bg-blue-800 bg-opacity-40 border-2 border-blue-600" 
                     style={{ transform: 'rotateX(-90deg) translateZ(12px)' }}></div>
              </div>

              {/* Force vectors */}
              {currentPhase >= 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-1/2 w-1 h-16 bg-red-400 transform -translate-x-1/2 animate-pulse"></div>
                  <div className="absolute bottom-4 left-1/2 w-1 h-16 bg-green-400 transform -translate-x-1/2 animate-pulse"></div>
                  <div className="absolute top-1/2 right-4 w-16 h-1 bg-purple-400 transform -translate-y-1/2 animate-pulse"></div>
                </div>
              )}

              {/* Motion trails */}
              {currentPhase >= 1 && isPlaying && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-ping animation-delay-500"></div>
                </div>
              )}

              {/* Energy visualization */}
              {currentPhase >= 2 && (
                <div className="absolute -inset-8 border-2 border-yellow-400 rounded-full animate-pulse opacity-60"></div>
              )}
            </div>
          </div>

          {/* Lab interface */}
          {currentPhase >= 3 && (
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>Virtual Physics Lab Active</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Simulation Running</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else if (subject.toLowerCase() === 'chemistry') {
      return (
        <div className="relative w-full h-80 bg-gradient-to-br from-green-900 to-teal-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Molecular structure */}
            <div className={`relative transform-gpu transition-all duration-1000 ${
              isPlaying ? 'animate-spin' : ''
            }`} style={{ animationDuration: `${6 / rotationSpeed}s` }}>
              
              {/* Central atom */}
              <div className="relative w-16 h-16 bg-green-500 rounded-full border-4 border-green-300 flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>

              {/* Surrounding atoms */}
              {currentPhase >= 0 && (
                <>
                  <div className="absolute -top-8 left-1/2 w-8 h-8 bg-red-500 rounded-full border-2 border-red-300 transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">H</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 w-8 h-8 bg-red-500 rounded-full border-2 border-red-300 transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">H</span>
                  </div>
                  <div className="absolute top-1/2 -left-8 w-8 h-8 bg-red-500 rounded-full border-2 border-red-300 transform -translate-y-1/2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">H</span>
                  </div>
                  <div className="absolute top-1/2 -right-8 w-8 h-8 bg-red-500 rounded-full border-2 border-red-300 transform -translate-y-1/2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">H</span>
                  </div>
                </>
              )}

              {/* Chemical bonds */}
              {currentPhase >= 1 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-1/2 w-1 h-6 bg-yellow-400 transform -translate-x-1/2 animate-pulse"></div>
                  <div className="absolute bottom-2 left-1/2 w-1 h-6 bg-yellow-400 transform -translate-x-1/2 animate-pulse"></div>
                  <div className="absolute top-1/2 left-2 w-6 h-1 bg-yellow-400 transform -translate-y-1/2 animate-pulse"></div>
                  <div className="absolute top-1/2 right-2 w-6 h-1 bg-yellow-400 transform -translate-y-1/2 animate-pulse"></div>
                </div>
              )}

              {/* Electron clouds */}
              {currentPhase >= 2 && (
                <div className="absolute -inset-12 border-2 border-blue-400 rounded-full animate-pulse opacity-40"></div>
              )}
            </div>
          </div>

          {/* Chemistry lab interface */}
          {currentPhase >= 3 && (
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>Virtual Chemistry Lab Active</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Reaction in Progress</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-80 bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Mathematical 3D object */}
            <div className={`relative transform-gpu transition-all duration-1000 ${
              isPlaying ? 'animate-spin' : ''
            }`} style={{ animationDuration: `${5 / rotationSpeed}s` }}>
              
              {/* 3D mathematical shape */}
              <div className="relative w-32 h-32 transform-gpu preserve-3d" style={{
                transform: `rotateX(${currentPhase * 30}deg) rotateY(${currentPhase * 45}deg)`
              }}>
                {/* Geometric faces */}
                <div className="absolute inset-0 bg-purple-500 bg-opacity-60 border-2 border-purple-300 rounded-lg"></div>
                <div className="absolute inset-2 bg-pink-500 bg-opacity-40 border-2 border-pink-300 rounded-lg transform rotateY(45deg)"></div>
                <div className="absolute inset-4 bg-blue-500 bg-opacity-50 border-2 border-blue-300 rounded-lg transform rotateX(45deg)"></div>
              </div>

              {/* Mathematical annotations */}
              {currentPhase >= 1 && (
                <div className="absolute -inset-8 pointer-events-none">
                  <div className="absolute top-0 left-1/2 text-yellow-400 text-sm font-bold transform -translate-x-1/2">
                    f(x,y,z)
                  </div>
                  <div className="absolute bottom-0 left-1/2 text-green-400 text-sm font-bold transform -translate-x-1/2">
                    ∂f/∂x
                  </div>
                </div>
              )}

              {/* Coordinate axes */}
              {currentPhase >= 2 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-400 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-green-400 transform -translate-x-1/2"></div>
                </div>
              )}
            </div>
          </div>

          {/* Math lab interface */}
          {currentPhase >= 3 && (
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>Virtual Math Lab Active</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Calculation Running</span>
                </div>
              </div>
            </div>
          )}
        </div>
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
              <Cube className="h-5 w-5 text-purple-600" />
              Advanced 3D Interactive Lab - {conceptName}
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              {subject} Lab
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
              {isPlaying ? 'Pause' : 'Start'} Simulation
            </Button>
            
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              Audio
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Lab
            </Button>
            
            <Button
              onClick={() => setShowAITutor(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Lab Assistant
            </Button>

            <div className="flex items-center gap-2 ml-auto">
              <Settings className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
          </div>

          {/* Main 3D Model Area */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6">
            {render3DModel()}
            
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Phase {currentPhase + 1}: {phases[currentPhase]?.title}
              </h3>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                {phases[currentPhase]?.description}
              </p>
            </div>
          </div>

          {/* Phase Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {phases.map((phase, index) => (
              <Button
                key={phase.id}
                onClick={() => handlePhaseClick(index)}
                variant={currentPhase === index ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col items-start text-left transition-all hover:scale-105 ${
                  currentPhase === index ? 'ring-2 ring-purple-500 bg-purple-600' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-semibold text-xs">Phase {index + 1}</span>
                </div>
                <span className="text-sm font-medium mb-1">{phase.title}</span>
                <span className="text-xs opacity-75">{phase.description}</span>
              </Button>
            ))}
          </div>

          {/* Lab Instructions */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-start gap-3">
              <Cube className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">3D Lab Instructions</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  This interactive 3D laboratory is automatically configured for {subject}. 
                  Use the controls to explore different phases of the concept. Each phase includes 
                  synchronized audio explanations and visual simulations specific to {conceptName}.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Lab Assistant Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={`3D interactive laboratory simulation for ${conceptName} in ${subject}`}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
