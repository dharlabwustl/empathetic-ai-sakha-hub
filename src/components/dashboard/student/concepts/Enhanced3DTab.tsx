
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Play, Pause, RotateCcw, Volume2, Settings, MessageSquare, Zap, Target, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  isPlaying?: boolean;
  audioEnabled?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject, 
  isPlaying, 
  audioEnabled, 
  onPlayStateChange 
}) => {
  const [activeSimulation, setActiveSimulation] = useState(0);
  const [isPlaying3D, setIsPlaying3D] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [parameters, setParameters] = useState({
    force: 10,
    mass: 5,
    friction: 0.1,
    time: 1
  });

  // Subject-specific simulations
  const getSimulationsForSubject = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return [
          {
            id: 'forces',
            title: 'Force Vectors in 3D',
            description: 'Visualize force vectors and their resultant in three-dimensional space',
            audioScript: 'This simulation shows how multiple forces combine in three-dimensional space. Watch as force vectors are applied to the object and observe the resulting net force and acceleration.',
            parameters: ['force', 'mass']
          },
          {
            id: 'motion',
            title: 'Projectile Motion',
            description: 'Interactive projectile motion with air resistance',
            audioScript: 'Here we see projectile motion in action. The object follows a parabolic path under the influence of gravity, with the trajectory affected by initial velocity and angle.',
            parameters: ['force', 'friction', 'time']
          },
          {
            id: 'oscillation',
            title: 'Simple Harmonic Motion',
            description: 'Spring-mass system in 3D space',
            audioScript: 'This demonstrates simple harmonic motion. The mass oscillates back and forth, with the restoring force proportional to displacement according to Hookes law.',
            parameters: ['mass', 'friction']
          },
          {
            id: 'collision',
            title: 'Collision Dynamics',
            description: 'Elastic and inelastic collisions between objects',
            audioScript: 'Watch as two objects collide and exchange momentum. The conservation of momentum and energy principles govern the outcome of the collision.',
            parameters: ['force', 'mass', 'time']
          }
        ];
      case 'chemistry':
        return [
          {
            id: 'molecular',
            title: 'Molecular Structure',
            description: 'Interactive 3D molecular models with bond visualization',
            audioScript: 'Explore the three-dimensional structure of molecules. See how atoms bond together and how molecular geometry affects chemical properties.',
            parameters: ['time']
          },
          {
            id: 'reaction',
            title: 'Chemical Reactions',
            description: 'Animated reaction mechanisms and energy diagrams',
            audioScript: 'This animation shows the step-by-step process of a chemical reaction, including the formation and breaking of bonds.',
            parameters: ['time', 'force']
          },
          {
            id: 'orbitals',
            title: 'Atomic Orbitals',
            description: 'Electron probability clouds and orbital shapes',
            audioScript: 'Visualize electron orbitals as probability clouds around the atomic nucleus. Different orbital shapes correspond to different energy levels.',
            parameters: ['force']
          },
          {
            id: 'crystal',
            title: 'Crystal Structures',
            description: 'Lattice structures and unit cells',
            audioScript: 'Examine the repeating patterns in crystal structures. The arrangement of atoms determines the physical properties of crystalline materials.',
            parameters: ['mass']
          }
        ];
      case 'mathematics':
        return [
          {
            id: 'functions',
            title: '3D Function Graphs',
            description: 'Interactive surface plots and contour maps',
            audioScript: 'Explore three-dimensional function graphs. See how changing parameters affects the shape and behavior of mathematical surfaces.',
            parameters: ['force', 'mass', 'time']
          },
          {
            id: 'vectors',
            title: 'Vector Operations',
            description: 'Vector addition, dot product, and cross product in 3D',
            audioScript: 'This demonstrates vector operations in three-dimensional space. Watch how vectors combine through addition and multiplication.',
            parameters: ['force', 'time']
          },
          {
            id: 'calculus',
            title: 'Calculus Visualization',
            description: 'Derivatives and integrals with geometric interpretation',
            audioScript: 'See calculus concepts come to life through geometric visualization. Understand derivatives as slopes and integrals as areas under curves.',
            parameters: ['mass', 'friction']
          },
          {
            id: 'geometry',
            title: 'Geometric Transformations',
            description: 'Rotations, translations, and scaling in 3D space',
            audioScript: 'Observe how geometric transformations affect three-dimensional objects. See the effects of rotation, translation, and scaling.',
            parameters: ['force', 'friction', 'time']
          }
        ];
      default:
        return [
          {
            id: 'generic',
            title: 'Interactive 3D Model',
            description: 'Generic 3D visualization for the concept',
            audioScript: 'This is an interactive 3D model that helps visualize the key aspects of this concept.',
            parameters: ['force', 'mass']
          }
        ];
    }
  };

  const simulations = getSimulationsForSubject();

  useEffect(() => {
    if (isPlaying && audioEnabled) {
      startSimulation();
    } else {
      stopSimulation();
    }
  }, [isPlaying, audioEnabled, activeSimulation]);

  const startSimulation = () => {
    setIsPlaying3D(true);
    
    // Start audio explanation
    const currentSim = simulations[activeSimulation];
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSim.audioScript);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setIsPlaying3D(false);
        onPlayStateChange?.(false);
      };
      window.speechSynthesis.speak(utterance);
    }

    // Simulate progress
    const progressInterval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopSimulation = () => {
    setIsPlaying3D(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handlePlayPause = () => {
    const newState = !isPlaying3D;
    setIsPlaying3D(newState);
    onPlayStateChange?.(newState);
    
    if (newState) {
      startSimulation();
    } else {
      stopSimulation();
    }
  };

  const handleReset = () => {
    setSimulationProgress(0);
    setIsPlaying3D(false);
    stopSimulation();
    setParameters({
      force: 10,
      mass: 5,
      friction: 0.1,
      time: 1
    });
    onPlayStateChange?.(false);
  };

  const currentSimulation = simulations[activeSimulation];

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Advanced 3D Interactive Lab - {conceptName}
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="flex items-center gap-2"
          >
            {isPlaying3D ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying3D ? 'Pause' : 'Start Simulation'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            AI Tutor
          </Button>
        </div>
      </motion.div>

      {/* Simulation Progress */}
      {isPlaying3D && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-xl border"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-purple-600 animate-pulse" />
              <span className="text-sm font-medium">Running Simulation: {currentSimulation.title}</span>
            </div>
            <span className="text-sm text-gray-600">{Math.round(simulationProgress)}%</span>
          </div>
          <Progress value={simulationProgress} className="h-2" />
        </motion.div>
      )}

      <Tabs value="simulations" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 rounded-xl p-1">
          <TabsTrigger value="simulations" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Brain className="h-4 w-4 mr-2" />
            Live Simulation
          </TabsTrigger>
          <TabsTrigger value="controls" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Parameters
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            <Target className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            <Gauge className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulations" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main 3D Viewport */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    {currentSimulation.title}
                  </CardTitle>
                  <p className="text-sm text-purple-100">{currentSimulation.description}</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <motion.div
                      className="relative w-80 h-64 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30 flex items-center justify-center"
                      animate={{
                        rotateY: isPlaying3D ? [0, 360] : 0,
                        scale: isPlaying3D ? [1, 1.05, 1] : 1
                      }}
                      transition={{
                        rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <div className="text-center text-white">
                        <Brain className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                        <p className="text-lg font-semibold">3D {subject} Simulation</p>
                        <p className="text-sm text-gray-300 mt-2">{currentSimulation.title}</p>
                      </div>
                      
                      {/* Animated particles/elements based on simulation type */}
                      {isPlaying3D && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-blue-400 rounded-full"
                              animate={{
                                x: [0, 100, -100, 0],
                                y: [0, -50, 50, 0],
                                opacity: [0, 1, 1, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                              }}
                              style={{
                                left: '50%',
                                top: '50%'
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>
                    
                    {/* 3D Controls Overlay */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
                        Force: {parameters.force}N | Mass: {parameters.mass}kg
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Simulation Selection */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Simulations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {simulations.map((sim, index) => (
                    <motion.div
                      key={sim.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        activeSimulation === index
                          ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveSimulation(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="font-medium text-sm">{sim.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{sim.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="controls" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Real-time Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentSimulation.parameters.includes('force') && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Applied Force (N)</label>
                  <Slider
                    value={[parameters.force]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, force: value[0] }))}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">Current: {parameters.force}N</div>
                </div>
              )}
              
              {currentSimulation.parameters.includes('mass') && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Object Mass (kg)</label>
                  <Slider
                    value={[parameters.mass]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, mass: value[0] }))}
                    max={20}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">Current: {parameters.mass}kg</div>
                </div>
              )}
              
              {currentSimulation.parameters.includes('friction') && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Friction Coefficient</label>
                  <Slider
                    value={[parameters.friction]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, friction: value[0] }))}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">Current: {parameters.friction}</div>
                </div>
              )}
              
              {currentSimulation.parameters.includes('time') && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Scale</label>
                  <Slider
                    value={[parameters.time]}
                    onValueChange={(value) => setParameters(prev => ({ ...prev, time: value[0] }))}
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">Current: {parameters.time}x</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-time Calculations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Acceleration</div>
                  <div className="text-xl font-bold text-blue-600">
                    {(parameters.force / parameters.mass).toFixed(2)} m/s²
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Kinetic Energy</div>
                  <div className="text-xl font-bold text-green-600">
                    {(0.5 * parameters.mass * Math.pow(parameters.force / parameters.mass, 2)).toFixed(2)} J
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Momentum</div>
                  <div className="text-xl font-bold text-purple-600">
                    {(parameters.mass * (parameters.force / parameters.mass)).toFixed(2)} kg⋅m/s
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulation Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-medium text-amber-800 dark:text-amber-300 text-sm">Key Observation</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                      As force increases, acceleration increases proportionally (F = ma)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-300 text-sm">Learning Point</h4>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      Doubling the mass halves the acceleration for the same force
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-amber-500" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Simulation Accuracy</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">60 FPS</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rendering Speed</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">Real-time</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Physics Updates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Enhanced3DTab;
