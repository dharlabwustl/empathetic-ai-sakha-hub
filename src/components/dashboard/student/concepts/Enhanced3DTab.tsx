
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Volume2, MessageSquare, Settings, Eye } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  isPlaying?: boolean;
  isAudioEnabled?: boolean;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject,
  isPlaying = false,
  isAudioEnabled = true
}) => {
  const [simulationPlaying, setSimulationPlaying] = useState(false);
  const [currentSimulation, setCurrentSimulation] = useState(0);
  const [parameters, setParameters] = useState({
    force: 50,
    mass: 10,
    friction: 0.1,
    angle: 0,
    time: 0
  });
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Get simulations based on subject
  const getSimulations = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return [
          {
            id: 1,
            title: "Force Application Simulation",
            description: "Interactive simulation showing how forces affect object motion",
            parameters: ['force', 'mass', 'friction'],
            audioContent: "This simulation demonstrates Newton's Second Law in action. Adjust the force, mass, and friction to see how they affect acceleration and motion.",
            scene: `
              <div className="relative w-full h-64 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-red-500 rounded-full shadow-lg transition-all duration-1000"
                     style={{
                       transform: simulationPlaying ? 
                         'translateX(' + (parameters.force / parameters.mass * 10) + 'px)' : 
                         'translateX(0px)'
                     }}>
                </div>
                <div className="absolute top-4 left-4 text-xs bg-white px-2 py-1 rounded">
                  F = ${parameters.force}N, m = ${parameters.mass}kg
                </div>
                <div className="absolute bottom-12 left-4 text-xs bg-white px-2 py-1 rounded">
                  a = ${(parameters.force / parameters.mass).toFixed(1)} m/s²
                </div>
              </div>
            `
          },
          {
            id: 2,
            title: "Inclined Plane Simulation",
            description: "Visualize forces on an inclined plane with adjustable angle",
            parameters: ['angle', 'mass', 'friction'],
            audioContent: "On an inclined plane, gravity is resolved into components. The parallel component causes acceleration down the plane, while friction opposes motion.",
            scene: `
              <div className="relative w-full h-64 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-4 origin-bottom-left bg-amber-600 h-2"
                     style={{
                       width: '200px',
                       transform: 'rotate(' + parameters.angle + 'deg)'
                     }}>
                </div>
                <div className="absolute w-6 h-6 bg-red-500 rounded transition-all duration-1000"
                     style={{
                       bottom: (4 + parameters.angle * 0.5) + 'px',
                       left: (20 + (simulationPlaying ? parameters.angle * 2 : 0)) + 'px'
                     }}>
                </div>
                <div className="absolute top-4 left-4 text-xs bg-white px-2 py-1 rounded">
                  θ = ${parameters.angle}°
                </div>
              </div>
            `
          },
          {
            id: 3,
            title: "Circular Motion Simulation",
            description: "Demonstrate centripetal force in circular motion",
            parameters: ['force', 'mass'],
            audioContent: "In circular motion, centripetal force acts toward the center, constantly changing the direction of velocity while maintaining constant speed.",
            scene: `
              <div className="relative w-full h-64 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="relative w-32 h-32 border-2 border-dashed border-gray-400 rounded-full">
                  <div className="absolute w-4 h-4 bg-red-500 rounded-full transition-all duration-500"
                       style={{
                         top: '50%',
                         left: '50%',
                         transform: simulationPlaying ? 
                           'translate(-50%, -50%) rotate(' + (parameters.time * 10) + 'deg) translateX(60px)' :
                           'translate(-50%, -50%) translateX(60px)'
                       }}>
                  </div>
                </div>
                <div className="absolute top-4 left-4 text-xs bg-white px-2 py-1 rounded">
                  Fc = mv²/r
                </div>
              </div>
            `
          }
        ];
      case 'chemistry':
        return [
          {
            id: 1,
            title: "Molecular Vibration",
            description: "Visualize molecular bonds and vibrations",
            parameters: ['force'],
            audioContent: "Molecular vibrations occur when atoms oscillate around their equilibrium positions. Higher energy increases vibration amplitude.",
            scene: `
              <div className="relative w-full h-64 bg-gradient-to-b from-green-100 to-green-200 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-0.5 bg-gray-600"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            `
          }
        ];
      case 'mathematics':
        return [
          {
            id: 1,
            title: "Function Visualization",
            description: "Interactive 3D function plotting",
            parameters: ['force', 'angle'],
            audioContent: "This 3D visualization shows how mathematical functions behave in three-dimensional space with adjustable parameters.",
            scene: `
              <div className="relative w-full h-64 bg-gradient-to-b from-indigo-100 to-indigo-200 rounded-lg overflow-hidden">
                <div className="absolute inset-4 border border-gray-400">
                  <div className="relative w-full h-full">
                    <div className="absolute w-full h-0.5 bg-gray-400 top-1/2"></div>
                    <div className="absolute w-0.5 h-full bg-gray-400 left-1/2"></div>
                    <svg className="w-full h-full">
                      <path d="M 0 ${120 - parameters.force} Q ${parameters.angle} ${60} 200 ${40 + parameters.force/2}" 
                            stroke="red" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>
            `
          }
        ];
      default:
        return [];
    }
  };

  const simulations = getSimulations();

  const handlePlayPause = () => {
    setSimulationPlaying(!simulationPlaying);
    if (!simulationPlaying && isAudioEnabled) {
      startAudioExplanation();
    } else {
      stopAudioExplanation();
    }
  };

  const startAudioExplanation = () => {
    if (!isAudioEnabled || simulations.length === 0) return;
    
    const currentSimulationData = simulations[currentSimulation];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSimulationData.audioContent);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      
      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 3;
        setSimulationProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 150);
      
      utterance.onend = () => {
        setSimulationPlaying(false);
        setSimulationProgress(100);
        clearInterval(progressInterval);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudioExplanation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSimulationPlaying(false);
  };

  const handleReset = () => {
    setParameters({
      force: 50,
      mass: 10,
      friction: 0.1,
      angle: 0,
      time: 0
    });
    setSimulationProgress(0);
    stopAudioExplanation();
  };

  // Animation loop for time-based simulations
  useEffect(() => {
    let animationFrame: number;
    if (simulationPlaying) {
      const animate = () => {
        setParameters(prev => ({
          ...prev,
          time: prev.time + 1
        }));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [simulationPlaying]);

  if (simulations.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No 3D simulations available for {subject}</p>
        </CardContent>
      </Card>
    );
  }

  const currentSimulationData = simulations[currentSimulation];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Advanced 3D Interactive Lab for {conceptName}</h2>
          <p className="text-sm text-muted-foreground">Immersive simulations with real-time parameter controls</p>
        </div>
        
        {/* Global Controls */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm border">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            disabled={!isAudioEnabled}
          >
            {simulationPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Badge variant="outline" className="ml-2">
            {subject}
          </Badge>
        </div>
      </div>

      {/* Simulation Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {simulations.map((sim, index) => (
          <Button
            key={sim.id}
            variant={currentSimulation === index ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCurrentSimulation(index);
              setSimulationProgress(0);
              if (simulationPlaying) {
                stopAudioExplanation();
                setTimeout(startAudioExplanation, 500);
              }
            }}
            className="flex-shrink-0"
          >
            {sim.title}
          </Button>
        ))}
      </div>

      {/* Progress Bar */}
      {simulationPlaying && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Simulation Progress</span>
            <span>{Math.round(simulationProgress)}%</span>
          </div>
          <Progress value={simulationProgress} className="h-2" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 3D Simulation */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {currentSimulationData.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{currentSimulationData.description}</p>
            </CardHeader>
            <CardContent>
              {/* Render the simulation scene */}
              <div dangerouslySetInnerHTML={{ 
                __html: currentSimulationData.scene.replace(/\$\{([^}]+)\}/g, (match, expr) => {
                  try {
                    return eval(expr);
                  } catch {
                    return match;
                  }
                })
              }} />
              
              {/* Simulation Status */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className={`flex items-center gap-2 ${simulationPlaying ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${simulationPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  {simulationPlaying ? 'Simulation Running' : 'Simulation Paused'}
                </span>
                <span className="text-muted-foreground">
                  Time: {(parameters.time / 10).toFixed(1)}s
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Sidebar */}
        <div className="space-y-4">
          {/* Parameter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Real-time Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentSimulationData.parameters.includes('force') && (
                <div>
                  <label className="text-sm font-medium">Force (N)</label>
                  <Slider
                    value={[parameters.force]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, force: value[0] }))}
                    max={100}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{parameters.force} N</div>
                </div>
              )}
              
              {currentSimulationData.parameters.includes('mass') && (
                <div>
                  <label className="text-sm font-medium">Mass (kg)</label>
                  <Slider
                    value={[parameters.mass]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, mass: value[0] }))}
                    max={50}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{parameters.mass} kg</div>
                </div>
              )}
              
              {currentSimulationData.parameters.includes('friction') && (
                <div>
                  <label className="text-sm font-medium">Friction Coefficient</label>
                  <Slider
                    value={[parameters.friction]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, friction: value[0] }))}
                    max={1}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{parameters.friction}</div>
                </div>
              )}
              
              {currentSimulationData.parameters.includes('angle') && (
                <div>
                  <label className="text-sm font-medium">Angle (°)</label>
                  <Slider
                    value={[parameters.angle]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, angle: value[0] }))}
                    max={60}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{parameters.angle}°</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Tutor Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                AI 3D Simulation Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">
                  Get help understanding the 3D simulation and parameter relationships
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Explain Simulation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audio Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Audio Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handlePlayPause}
                disabled={!isAudioEnabled}
                className="w-full mb-2"
                variant={simulationPlaying ? "destructive" : "default"}
              >
                {simulationPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Audio
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Audio
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                Synchronized audio explanations with the 3D simulation
              </p>
            </CardContent>
          </Card>

          {/* Calculated Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Live Calculations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {subject.toLowerCase() === 'physics' && (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Acceleration:</span>
                    <span className="font-mono">{(parameters.force / parameters.mass).toFixed(2)} m/s²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Net Force:</span>
                    <span className="font-mono">{parameters.force} N</span>
                  </div>
                  {currentSimulationData.parameters.includes('angle') && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Parallel Force:</span>
                        <span className="font-mono">{(parameters.mass * 9.8 * Math.sin(parameters.angle * Math.PI / 180)).toFixed(2)} N</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Normal Force:</span>
                        <span className="font-mono">{(parameters.mass * 9.8 * Math.cos(parameters.angle * Math.PI / 180)).toFixed(2)} N</span>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DTab;
