
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, Play, Pause, RotateCcw, ZoomIn, ZoomOut, 
  Move3D, Settings, Download, Share2, Eye,
  Atom, FlaskConical, Target, Activity, LineChart,
  ChevronRight, FileText, BookOpenCheck, School,
  PenTool, BarChart2, BarChart3, PieChart, Lightbulb
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
  const [activeTab, setActiveTab] = useState('models');
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
  
  const simulationMetrics = [
    { label: 'Force Applied', value: `${forceValue[0]} N`, change: '+20%', isPositive: true },
    { label: 'Acceleration', value: `${(forceValue[0]/massValue[0]).toFixed(2)} m/s²`, change: '+25%', isPositive: true },
    { label: 'Energy Transfer', value: '85%', change: '-5%', isPositive: false },
    { label: 'System Efficiency', value: '92%', change: '+3%', isPositive: true }
  ];
  
  const modelInsights = [
    "Decreasing mass by 50% results in 100% increase in acceleration (inverse relationship)",
    "Increasing force leads to proportional increase in acceleration (direct relationship)",
    "Adding friction decreases system efficiency by approximately 15% per unit",
    "Observed momentum conservation with 98% accuracy in collision simulations"
  ];
  
  const conceptConnections = [
    { concept: "Newton's First Law", relevance: 85 },
    { concept: "Energy Conservation", relevance: 72 },
    { concept: "Momentum", relevance: 90 },
    { concept: "Kinetic Energy", relevance: 78 }
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
    
    // Add formula
    ctx.fillStyle = '#4b5563';
    ctx.font = '20px Arial';
    ctx.fillText('F = m × a', centerX - 60, centerY - 80);
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
    
    // Add formula explanation
    ctx.fillStyle = '#4b5563';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('a = F/m (acceleration is inversely proportional to mass)', centerX, centerY + 120);
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
    
    // Add title and explanation
    ctx.fillStyle = '#4b5563';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Newton's Cradle: Momentum Conservation", centerX, centerY - 140);
    
    ctx.font = '14px Arial';
    ctx.fillText("Conservation of momentum: m₁v₁ = m₂v₂", centerX, centerY + 100);
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
    ctx.textAlign = 'center';
    ctx.fillText('Before Collision', centerX - 60, centerY - 80);
    if (Math.abs(ball1X - ball2X) < 60) {
      ctx.fillText('During Collision', centerX - 60, centerY + 80);
    }
    
    // Add formula and explanation
    ctx.fillStyle = '#4b5563';
    ctx.font = '16px Arial';
    ctx.fillText('p₁ + p₂ = p₁\' + p₂\' (Conservation of momentum)', centerX, centerY + 120);
    ctx.font = '14px Arial';
    ctx.fillText('KE₁ + KE₂ = KE₁\' + KE₂\' (Elastic collision)', centerX, centerY + 150);
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Box className="h-4 w-4" /> 3D Models
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> Insights
          </TabsTrigger>
          <TabsTrigger value="concepts" className="flex items-center gap-2">
            <BookOpenCheck className="h-4 w-4" /> Connections
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="mt-0">
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
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
                    
                    {/* Formula Overlay */}
                    <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/50 backdrop-blur p-3 rounded-lg">
                      <div className="text-lg font-mono">
                        {selectedModel === 0 ? 'F = m × a' : 
                         selectedModel === 1 ? 'a = F / m' : 
                         selectedModel === 2 ? 'm₁v₁ = m₂v₂' : 
                         'KE₁ + KE₂ = KE₁\' + KE₂\''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {models[selectedModel].description}
                    </p>
                    
                    {/* Key Physics Principles */}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium mb-2">Key Physics Principles:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedModel === 0 && (
                          <>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Force causes acceleration</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">F = ma relationship</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Vector nature of forces</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Net force concept</Badge>
                          </>
                        )}
                        {selectedModel === 1 && (
                          <>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Inverse mass relationship</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Acceleration proportionality</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Inertial properties</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Force equality</Badge>
                          </>
                        )}
                        {selectedModel === 2 && (
                          <>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Conservation of momentum</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Energy transfer</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Elastic collisions</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Periodic motion</Badge>
                          </>
                        )}
                        {selectedModel === 3 && (
                          <>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Momentum conservation</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Kinetic energy</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Collision types</Badge>
                            <Badge variant="outline" className="justify-start text-xs py-1 px-2">Impulse</Badge>
                          </>
                        )}
                      </div>
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
                    <div className="flex justify-between">
                      <span>Work Done:</span>
                      <span className="font-mono">{(forceValue[0] * 5).toFixed(2)} J</span>
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
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {simulationMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">{metric.label}</p>
                    <Badge variant="outline" className="text-xs">
                      <span className={metric.isPositive ? "text-green-600" : "text-red-600"}>
                        {metric.change}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Force-Acceleration Relationship */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-blue-500" />
                  Force-Acceleration Relationship
                </CardTitle>
                <CardDescription>
                  Linear correlation between force and acceleration (F = ma)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border flex items-center justify-center">
                  <div className="text-center p-6">
                    <LineChart className="h-10 w-10 mx-auto mb-2 text-blue-500/50" />
                    <p className="text-sm text-gray-500">Linear relationship chart would appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Showing how acceleration increases with force</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Correlation</div>
                    <div className="font-semibold">99.8%</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Slope (1/m)</div>
                    <div className="font-semibold">0.2 m/kg·s²</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Y-intercept</div>
                    <div className="font-semibold">0.0 m/s²</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Formula</div>
                    <div className="font-semibold">a = F/m</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mass Effect Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-purple-500" />
                  Mass Effect Analysis
                </CardTitle>
                <CardDescription>
                  Inverse relationship between mass and acceleration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border flex items-center justify-center">
                  <div className="text-center p-6">
                    <BarChart2 className="h-10 w-10 mx-auto mb-2 text-purple-500/50" />
                    <p className="text-sm text-gray-500">Inverse relationship chart would appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Showing how acceleration decreases with mass</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Relationship</div>
                    <div className="font-semibold">Inverse</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Formula</div>
                    <div className="font-semibold">a ∝ 1/m</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Double Mass</div>
                    <div className="font-semibold">Half Acceleration</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Half Mass</div>
                    <div className="font-semibold">Double Acceleration</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Physics Insights from Model
              </CardTitle>
              <CardDescription>
                Key observations and patterns from the simulation data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-700 dark:text-yellow-300">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{insight}</p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="mt-6 p-5 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="text-lg font-medium mb-3 text-blue-800 dark:text-blue-300">Key Learning Points</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                        <PenTool className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span>Newton's Second Law directly relates force, mass, and acceleration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                        <PenTool className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span>Force and acceleration are directly proportional when mass is constant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                        <PenTool className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span>Mass and acceleration are inversely proportional when force is constant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                        <PenTool className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span>The acceleration of an object is directly proportional to the net force acting on it</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Physics Analysis
                  </Button>
                  <Button>
                    <Target className="h-4 w-4 mr-2" />
                    Test Your Understanding
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concepts" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpenCheck className="h-5 w-5 text-green-500" />
                  Related Physics Concepts
                </CardTitle>
                <CardDescription>
                  How this topic connects to other physics principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conceptConnections.map((concept, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{concept.concept}</h3>
                          <div className="mt-2">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500 rounded-full" 
                                    style={{width: `${concept.relevance}%`}}
                                  />
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{concept.relevance}%</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Relevance</div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-blue-500" />
                  Educational Context
                </CardTitle>
                <CardDescription>
                  How this knowledge is applied in academic and real-world scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Academic Applications</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                          <BookOpen className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                        </div>
                        <span>Foundation for advanced mechanics courses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                          <BookOpen className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                        </div>
                        <span>Required knowledge for engineering physics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
                          <BookOpen className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                        </div>
                        <span>Crucial for understanding dynamics problems</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Real-World Applications</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="p-1 bg-green-100 dark:bg-green-800 rounded-full mt-0.5">
                          <Target className="h-3 w-3 text-green-600 dark:text-green-300" />
                        </div>
                        <span>Automotive engineering and vehicle dynamics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="p-1 bg-green-100 dark:bg-green-800 rounded-full mt-0.5">
                          <Target className="h-3 w-3 text-green-600 dark:text-green-300" />
                        </div>
                        <span>Aerospace and rocket propulsion systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="p-1 bg-green-100 dark:bg-green-800 rounded-full mt-0.5">
                          <Target className="h-3 w-3 text-green-600 dark:text-green-300" />
                        </div>
                        <span>Sports physics and equipment design</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    <PieChart className="h-4 w-4 mr-2" />
                    View Concept Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visual3DContent;
