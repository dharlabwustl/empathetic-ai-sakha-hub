
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Box, Play, Pause, RotateCcw, ZoomIn, ZoomOut, 
  Move3D, Settings, Download, Share2, Eye,
  Atom, FlaskConical, Target, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState([50]);
  const [forceValue, setForceValue] = useState([20]);
  const [massValue, setMassValue] = useState([5]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const models = [
    {
      id: 'force-vectors',
      title: 'Force Vector Visualization',
      description: 'Interactive 3D representation of force vectors and their effects',
      type: 'Interactive',
      difficulty: 'Beginner'
    },
    {
      id: 'mass-acceleration',
      title: 'Mass-Acceleration Relationship',
      description: 'Visual demonstration of how mass affects acceleration',
      type: 'Simulation',
      difficulty: 'Intermediate'
    },
    {
      id: 'newton-cradle',
      title: "Newton's Cradle Simulation",
      description: 'Classic physics demonstration in 3D',
      type: 'Animation',
      difficulty: 'Advanced'
    },
    {
      id: 'collision-demo',
      title: 'Collision Dynamics',
      description: 'Real-time collision physics simulation',
      type: 'Simulation',
      difficulty: 'Advanced'
    }
  ];

  const controlPanels = [
    { label: 'Force (N)', value: forceValue, setValue: setForceValue, min: 1, max: 100 },
    { label: 'Mass (kg)', value: massValue, setValue: setMassValue, min: 0.1, max: 20 },
    { label: 'Rotation Speed', value: rotationSpeed, setValue: setRotationSpeed, min: 0, max: 100 }
  ];

  // Simple 3D simulation using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      if (selectedModel === 0) {
        // Force Vector Visualization
        drawForceVectors(ctx, centerX, centerY, time);
      } else if (selectedModel === 1) {
        // Mass-Acceleration Relationship
        drawMassAcceleration(ctx, centerX, centerY, time);
      } else if (selectedModel === 2) {
        // Newton's Cradle
        drawNewtonsCradle(ctx, centerX, centerY, time);
      } else if (selectedModel === 3) {
        // Collision Demo
        drawCollisionDemo(ctx, centerX, centerY, time);
      }
      
      if (isAnimating) {
        time += 0.02 * (rotationSpeed[0] / 50);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [selectedModel, isAnimating, rotationSpeed, forceValue, massValue]);

  const drawForceVectors = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    // Draw main object
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw force vector
    const forceLength = forceValue[0] * 2;
    const angle = Math.sin(time) * 0.5;
    
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + forceLength * Math.cos(angle), centerY + forceLength * Math.sin(angle));
    ctx.stroke();
    
    // Draw arrowhead
    const arrowX = centerX + forceLength * Math.cos(angle);
    const arrowY = centerY + forceLength * Math.sin(angle);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - 10 * Math.cos(angle - 0.3), arrowY - 10 * Math.sin(angle - 0.3));
    ctx.lineTo(arrowX - 10 * Math.cos(angle + 0.3), arrowY - 10 * Math.sin(angle + 0.3));
    ctx.closePath();
    ctx.fill();
    
    // Labels
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px Arial';
    ctx.fillText('F = ' + forceValue[0] + 'N', centerX + 50, centerY - 50);
    ctx.fillText('m = ' + massValue[0] + 'kg', centerX - 80, centerY + 60);
    ctx.fillText('a = ' + (forceValue[0] / massValue[0]).toFixed(1) + 'm/s²', centerX + 50, centerY + 60);
  };

  const drawMassAcceleration = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const masses = [1, 2, 5];
    const colors = ['#10b981', '#f59e0b', '#ef4444'];
    
    masses.forEach((mass, index) => {
      const x = centerX - 100 + index * 100;
      const radius = Math.sqrt(mass) * 10;
      const acceleration = forceValue[0] / mass;
      const displacement = Math.sin(time * acceleration * 0.1) * 20;
      
      // Draw mass
      ctx.fillStyle = colors[index];
      ctx.beginPath();
      ctx.arc(x, centerY + displacement, radius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Labels
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(mass + 'kg', x, centerY + 60);
      ctx.fillText('a=' + acceleration.toFixed(1), x, centerY + 75);
    });
    
    // Force arrow
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - 150, centerY - 100);
    ctx.lineTo(centerX + 150, centerY - 100);
    ctx.stroke();
    
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('Applied Force: ' + forceValue[0] + 'N', centerX, centerY - 120);
  };

  const drawNewtonsCradle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const ballCount = 5;
    const ballRadius = 20;
    const spacing = ballRadius * 2.2;
    
    for (let i = 0; i < ballCount; i++) {
      const x = centerX - (ballCount - 1) * spacing / 2 + i * spacing;
      let y = centerY;
      
      // Animate first and last balls
      if (i === 0) {
        const angle = Math.sin(time * 3) * 0.5;
        y += Math.sin(angle) * 30;
      } else if (i === ballCount - 1) {
        const angle = Math.sin(time * 3 - Math.PI) * 0.5;
        y += Math.sin(angle) * 30;
      }
      
      // Draw string
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, centerY - 100);
      ctx.lineTo(x, y - ballRadius);
      ctx.stroke();
      
      // Draw ball
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Ball outline
      ctx.strokeStyle = '#5b21b6';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const drawCollisionDemo = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const ball1X = centerX - 100 + Math.sin(time * 2) * 80;
    const ball2X = centerX + 100 - Math.sin(time * 2) * 80;
    
    // Ball 1 (moving)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(ball1X, centerY, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ball 2 (stationary initially)
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(ball2X, centerY, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Velocity vectors
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    
    // Ball 1 velocity
    ctx.beginPath();
    ctx.moveTo(ball1X, centerY);
    ctx.lineTo(ball1X + 40, centerY);
    ctx.stroke();
    
    // Ball 2 velocity
    if (Math.abs(ball1X - ball2X) < 60) { // Near collision
      ctx.beginPath();
      ctx.moveTo(ball2X, centerY);
      ctx.lineTo(ball2X + 30, centerY);
      ctx.stroke();
    }
    
    // Labels
    ctx.fillStyle = '#1f2937';
    ctx.font = '14px Arial';
    ctx.fillText('Before Collision', centerX - 60, centerY - 80);
    if (Math.abs(ball1X - ball2X) < 60) {
      ctx.fillText('During Collision', centerX - 60, centerY + 80);
    }
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetView = () => {
    setIsAnimating(false);
    setRotationSpeed([50]);
    setForceValue([20]);
    setMassValue([5]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Interactive': return 'bg-green-100 text-green-800 border-green-200';
      case 'Simulation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Animation': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Model Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model, index) => (
          <Card 
            key={model.id}
            className={`cursor-pointer transition-all ${
              selectedModel === index 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedModel(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Box className="h-5 w-5 text-indigo-600" />
                <Badge className={`text-xs ${getTypeColor(model.type)}`} variant="outline">
                  {model.type}
                </Badge>
              </div>
              <h3 className="font-medium mb-1">{model.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{model.description}</p>
              <Badge variant="outline" className="text-xs">
                {model.difficulty}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main 3D Viewer */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Move3D className="h-5 w-5 text-indigo-600" />
                  {models[selectedModel].title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAnimation}
                  >
                    {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetView}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border"
                  style={{ minHeight: '400px' }}
                />
                
                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Animation Status */}
                {isAnimating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    <Activity className="h-3 w-3" />
                    Animating
                  </motion.div>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {models[selectedModel].description}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>Click and drag to rotate</span>
                  <span>Scroll to zoom</span>
                  <span>Use controls to modify parameters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Simulation Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {controlPanels.map((control, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label>{control.label}</label>
                    <span className="font-mono">{control.value[0]}</span>
                  </div>
                  <Slider
                    value={control.value}
                    onValueChange={control.setValue}
                    min={control.min}
                    max={control.max}
                    step={control.min < 1 ? 0.1 : 1}
                    className="w-full"
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t space-y-2">
                <Button 
                  onClick={toggleAnimation}
                  variant={isAnimating ? "destructive" : "default"}
                  size="sm" 
                  className="w-full"
                >
                  {isAnimating ? 'Stop' : 'Start'} Animation
                </Button>
                <Button onClick={resetView} variant="outline" size="sm" className="w-full">
                  Reset View
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Physics Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Atom className="h-4 w-4 text-purple-500" />
                Physics Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Current Calculation
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  a = F/m = {forceValue[0]}/{massValue[0]} = {(forceValue[0] / massValue[0]).toFixed(2)} m/s²
                </div>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Net Force:</span>
                  <span className="font-mono">{forceValue[0]} N</span>
                </div>
                <div className="flex justify-between">
                  <span>Object Mass:</span>
                  <span className="font-mono">{massValue[0]} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Acceleration:</span>
                  <span className="font-mono">{(forceValue[0] / massValue[0]).toFixed(2)} m/s²</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FlaskConical className="h-3 w-3 mr-2" />
                Run Experiment
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-3 w-3 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share2 className="h-3 w-3 mr-2" />
                Share Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Visual3DContent;
