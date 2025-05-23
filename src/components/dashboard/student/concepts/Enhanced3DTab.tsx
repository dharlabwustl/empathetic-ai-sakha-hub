
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, Pause, Volume2, VolumeX, RotateCcw, Settings, 
  Brain, Zap, Eye, Target, ArrowRight, Info
} from "lucide-react";
import { motion } from 'framer-motion';

interface Enhanced3DTabProps {
  conceptName: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [force, setForce] = useState([50]);
  const [mass, setMass] = useState([10]);
  const [viewMode, setViewMode] = useState('simulation');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Calculate acceleration based on F=ma
  const acceleration = force[0] / mass[0];

  // Audio synthesis for narration
  const speak = (text: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 3D Scene Setup and Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationTime = 0;
    let objectPosition = { x: 100, y: canvas.height / 2, z: 0 };
    let velocity = { x: 0, y: 0, z: 0 };

    const animate = () => {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid background
      drawGrid(ctx, canvas.width, canvas.height);
      
      // Apply physics
      const netForce = force[0] - 20; // Subtract friction
      const acc = netForce / mass[0];
      velocity.x += acc * 0.01;
      objectPosition.x += velocity.x;

      // Boundary checks
      if (objectPosition.x > canvas.width - 60) {
        objectPosition.x = canvas.width - 60;
        velocity.x *= -0.8; // Bounce with energy loss
      }
      if (objectPosition.x < 60) {
        objectPosition.x = 60;
        velocity.x *= -0.8;
      }

      // Draw 3D-like object
      draw3DObject(ctx, objectPosition, mass[0]);
      
      // Draw force vectors
      drawForceVectors(ctx, objectPosition, force[0], mass[0]);
      
      // Draw measurements
      drawMeasurements(ctx, velocity.x, acc, force[0], mass[0]);

      animationTime += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, force, mass]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const draw3DObject = (ctx: CanvasRenderingContext2D, position: any, mass: number) => {
    const size = Math.max(20, Math.min(60, mass * 3));
    
    // Shadow (3D effect)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(position.x + 5, position.y + size/2 + 5, size, 10);
    
    // Main object
    const gradient = ctx.createLinearGradient(position.x, position.y - size/2, position.x + size, position.y + size/2);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(0.5, '#1D4ED8');
    gradient.addColorStop(1, '#1E40AF');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(position.x, position.y - size/2, size, size);
    
    // Highlight (3D effect)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(position.x, position.y - size/2, size * 0.3, size * 0.3);
    
    // Mass label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${mass}kg`, position.x + size/2, position.y + 5);
  };

  const drawForceVectors = (ctx: CanvasRenderingContext2D, position: any, force: number, mass: number) => {
    const arrowLength = force * 2;
    const startX = position.x + 60;
    const startY = position.y;
    
    // Applied force arrow
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + arrowLength, startY);
    ctx.stroke();
    
    // Arrow head
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.moveTo(startX + arrowLength, startY);
    ctx.lineTo(startX + arrowLength - 10, startY - 5);
    ctx.lineTo(startX + arrowLength - 10, startY + 5);
    ctx.fill();
    
    // Force label
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Applied Force: ${force}N`, startX + 10, startY - 20);
    
    // Friction force arrow (opposite direction)
    const frictionForce = 20;
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(position.x, startY);
    ctx.lineTo(position.x - frictionForce * 2, startY);
    ctx.stroke();
    
    // Friction arrow head
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.moveTo(position.x - frictionForce * 2, startY);
    ctx.lineTo(position.x - frictionForce * 2 + 10, startY - 5);
    ctx.lineTo(position.x - frictionForce * 2 + 10, startY + 5);
    ctx.fill();
    
    // Friction label
    ctx.fillStyle = '#EF4444';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Friction: ${frictionForce}N`, position.x - 10, startY - 20);
  };

  const drawMeasurements = (ctx: CanvasRenderingContext2D, velocity: number, acceleration: number, force: number, mass: number) => {
    // Measurement panel
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(10, 10, 250, 120);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 250, 120);
    
    // Measurements text
    ctx.fillStyle = '#1F2937';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    
    ctx.fillText(`Mass (m): ${mass} kg`, 20, 35);
    ctx.fillText(`Applied Force (F): ${force} N`, 20, 55);
    ctx.fillText(`Net Force: ${force - 20} N`, 20, 75);
    ctx.fillText(`Acceleration (a): ${acceleration.toFixed(2)} m/s²`, 20, 95);
    ctx.fillText(`Velocity: ${velocity.toFixed(2)} m/s`, 20, 115);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      speak(`Starting simulation with ${mass[0]} kilogram mass and ${force[0]} newton force. The acceleration is ${acceleration.toFixed(2)} meters per second squared.`);
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setForce([50]);
    setMass([10]);
    speak("Simulation reset to default values.");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
    }
  };

  const onForceChange = (value: number[]) => {
    setForce(value);
    if (!isMuted) {
      speak(`Force changed to ${value[0]} newtons. New acceleration is ${(value[0] / mass[0]).toFixed(2)} meters per second squared.`);
    }
  };

  const onMassChange = (value: number[]) => {
    setMass(value);
    if (!isMuted) {
      speak(`Mass changed to ${value[0]} kilograms. New acceleration is ${(force[0] / value[0]).toFixed(2)} meters per second squared.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3D Controls Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-indigo-600" />
              3D Interactive Simulation: {conceptName}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={togglePlayback}
                size="sm"
                variant={isPlaying ? "default" : "outline"}
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {isPlaying ? 'Pause' : 'Start'}
              </Button>
              <Button onClick={toggleMute} size="sm" variant="outline">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button onClick={resetSimulation} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
          <TabsTrigger value="analysis">Force Analysis</TabsTrigger>
          <TabsTrigger value="examples">3D Examples</TabsTrigger>
          <TabsTrigger value="lab">Virtual Lab</TabsTrigger>
        </TabsList>

        <TabsContent value="simulation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main 3D Canvas */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-blue-600" />
                    Real-time Physics Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-80 bg-gray-50 dark:bg-gray-900 rounded-lg border"
                      style={{ width: '100%', height: '320px' }}
                    />
                    
                    {/* Simulation Status */}
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm font-medium">
                          {isPlaying ? 'Running' : 'Paused'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Insights */}
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                      <div className="text-lg font-bold text-blue-600">{acceleration.toFixed(2)}</div>
                      <div className="text-sm text-blue-800 dark:text-blue-300">Acceleration (m/s²)</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                      <div className="text-lg font-bold text-green-600">{force[0] - 20}</div>
                      <div className="text-sm text-green-800 dark:text-green-300">Net Force (N)</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded">
                      <div className="text-lg font-bold text-purple-600">{(force[0] / mass[0] * 100).toFixed(0)}%</div>
                      <div className="text-sm text-purple-800 dark:text-purple-300">Efficiency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-gray-600" />
                    Simulation Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Force Control */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Applied Force: {force[0]} N
                    </label>
                    <Slider
                      value={force}
                      onValueChange={onForceChange}
                      max={100}
                      min={0}
                      step={5}
                      className="mb-2"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>0 N</span>
                      <span>100 N</span>
                    </div>
                  </div>

                  {/* Mass Control */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Object Mass: {mass[0]} kg
                    </label>
                    <Slider
                      value={mass}
                      onValueChange={onMassChange}
                      max={50}
                      min={1}
                      step={1}
                      className="mb-2"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>1 kg</span>
                      <span>50 kg</span>
                    </div>
                  </div>

                  {/* Formula Display */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold mb-2">F = ma</div>
                      <div className="text-sm space-y-1">
                        <div>{force[0]} = {mass[0]} × {acceleration.toFixed(2)}</div>
                        <div className="text-gray-500">a = F/m = {force[0]}/{mass[0]} = {acceleration.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Preset Scenarios */}
                  <div>
                    <h4 className="font-medium mb-2">Quick Scenarios</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => { setForce([30]); setMass([5]); }}
                      >
                        Light Object, Medium Force
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => { setForce([80]); setMass([20]); }}
                      >
                        Heavy Object, Strong Force
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => { setForce([10]); setMass([50]); }}
                      >
                        Very Heavy, Weak Force
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-orange-600" />
                    Live Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Force Applied:</span>
                      <Badge variant="outline">{force[0]} N</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Friction Force:</span>
                      <Badge variant="outline">20 N</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Force:</span>
                      <Badge variant="outline">{force[0] - 20} N</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Mass:</span>
                      <Badge variant="outline">{mass[0]} kg</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Acceleration:</span>
                      <Badge variant="outline">{acceleration.toFixed(2)} m/s²</Badge>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {acceleration > 5 ? "High acceleration - light object or strong force" :
                         acceleration > 2 ? "Moderate acceleration - balanced force and mass" :
                         acceleration > 0 ? "Low acceleration - heavy object or weak net force" :
                         "No movement - forces are balanced"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Audio Commentary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 className="h-5 w-5 mr-2 text-green-600" />
                Audio Commentary & Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => speak("Newton's Second Law states that force equals mass times acceleration. When you increase the force, the acceleration increases proportionally.")}
                >
                  <Volume2 className="h-5 w-5 mb-1" />
                  <span className="text-sm">Explain Formula</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => speak(`Current simulation shows ${mass[0]} kilogram mass with ${force[0]} newton force, resulting in ${acceleration.toFixed(2)} meters per second squared acceleration.`)}
                >
                  <Info className="h-5 w-5 mb-1" />
                  <span className="text-sm">Current Values</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => speak("Try changing the force and mass values to see how acceleration changes. Notice that heavier objects need more force to achieve the same acceleration.")}
                >
                  <Target className="h-5 w-5 mb-1" />
                  <span className="text-sm">How to Use</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Force Analysis Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                3D Force Vector Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg">
                <div className="text-lg font-semibold mb-4">Interactive 3D Force Decomposition</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Visualize force vectors in 3D space and understand how they combine to create net force
                </p>
                <Button 
                  size="lg"
                  onClick={() => speak("This advanced 3D visualization breaks down forces into X, Y, and Z components, showing how they combine vectorially.")}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Launch 3D Force Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          {/* 3D Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projectile Motion in 3D</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">3D Projectile Simulation</div>
                    <Button 
                      onClick={() => speak("Projectile motion demonstrates Newton's Second Law in two dimensions, with gravity providing constant downward acceleration.")}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Simulation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Circular Motion Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Centripetal Force Demo</div>
                    <Button 
                      onClick={() => speak("In circular motion, centripetal force continuously changes the direction of velocity, demonstrating how force creates acceleration.")}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lab" className="space-y-6">
          {/* Virtual Lab */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Virtual Physics Laboratory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-lg">
                <Brain className="h-20 w-20 mx-auto text-purple-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Advanced 3D Physics Lab</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Access a full virtual laboratory with multiple objects, variable surfaces, 
                  real-time measurements, and advanced physics calculations. Perfect for 
                  conducting your own experiments with Newton's Second Law.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <Target className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <div className="font-medium">Multiple Objects</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Different shapes & masses</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <Zap className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <div className="font-medium">Variable Forces</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Gravity, friction, applied</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <Eye className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <div className="font-medium">Real-time Data</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Live measurements</div>
                  </div>
                </div>
                <Button 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => speak("The virtual laboratory provides a comprehensive environment to explore Newton's Second Law with various experimental setups and real-time data collection.")}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Enter Virtual Lab
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Enhanced3DTab;
