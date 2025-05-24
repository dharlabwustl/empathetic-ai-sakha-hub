
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  Cube, Zap, Target, CheckCircle, MessageSquare,
  RotateCw, ZoomIn, ZoomOut, Move3D, Settings,
  Lightbulb, FlaskConical, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AITutorDialog from './AITutorDialog';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  globalAudioState?: {
    isPlaying: boolean;
    isEnabled: boolean;
    progress: number;
  };
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  audioExplanation: string;
  parameters: ExperimentParameter[];
  completed: boolean;
  duration: number;
}

interface ExperimentParameter {
  id: string;
  name: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  description: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({
  conceptName,
  subject,
  globalAudioState
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [completedExperiments, setCompletedExperiments] = useState<Set<string>>(new Set());
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiContext, setAiContext] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Sample experiments for Newton's Laws
  const experiments: Experiment[] = [
    {
      id: 'force-acceleration',
      title: 'Force vs Acceleration',
      description: 'Experiment with different forces and observe acceleration changes',
      audioExplanation: 'In this 3D experiment, we apply different forces to objects of varying masses. Notice how acceleration changes according to Newton\'s second law: F equals m times a.',
      parameters: [
        {
          id: 'force',
          name: 'Applied Force',
          min: 0,
          max: 100,
          value: 50,
          unit: 'N',
          description: 'The force applied to the object'
        },
        {
          id: 'mass',
          name: 'Object Mass',
          min: 1,
          max: 20,
          value: 10,
          unit: 'kg',
          description: 'The mass of the object'
        }
      ],
      completed: false,
      duration: 60
    },
    {
      id: 'collision-demo',
      title: 'Collision Analysis',
      description: 'Observe momentum conservation in 3D collisions',
      audioExplanation: 'Watch how momentum is conserved when objects collide. The total momentum before collision equals the total momentum after collision, demonstrating Newton\'s third law.',
      parameters: [
        {
          id: 'velocity1',
          name: 'Object 1 Velocity',
          min: 0,
          max: 10,
          value: 5,
          unit: 'm/s',
          description: 'Initial velocity of the first object'
        },
        {
          id: 'velocity2',
          name: 'Object 2 Velocity',
          min: 0,
          max: 10,
          value: 0,
          unit: 'm/s',
          description: 'Initial velocity of the second object'
        }
      ],
      completed: false,
      duration: 45
    },
    {
      id: 'pendulum-motion',
      title: 'Pendulum Dynamics',
      description: 'Study energy conservation in pendulum motion',
      audioExplanation: 'This 3D pendulum demonstrates energy conservation. As it swings, potential energy converts to kinetic energy and back. The total mechanical energy remains constant.',
      parameters: [
        {
          id: 'length',
          name: 'Pendulum Length',
          min: 0.5,
          max: 3,
          value: 1.5,
          unit: 'm',
          description: 'Length of the pendulum'
        },
        {
          id: 'angle',
          name: 'Initial Angle',
          min: 10,
          max: 90,
          value: 45,
          unit: '°',
          description: 'Starting angle from vertical'
        }
      ],
      completed: false,
      duration: 50
    }
  ];

  const [currentExperiments, setCurrentExperiments] = useState(experiments);

  // Audio synthesis function
  const speakText = (text: string) => {
    if (isMuted || !globalAudioState?.isEnabled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      markExperimentCompleted();
    };
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const currentExperiment = currentExperiments[activeExperiment];
      speakText(currentExperiment.audioExplanation);
    }
  };

  const handleReset = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentProgress(0);
    setActiveExperiment(0);
    setIsSimulating(false);
  };

  const markExperimentCompleted = () => {
    const currentExperimentId = currentExperiments[activeExperiment].id;
    setCompletedExperiments(prev => new Set([...prev, currentExperimentId]));
    
    setCurrentExperiments(prev => prev.map((exp, index) => 
      index === activeExperiment ? { ...exp, completed: true } : exp
    ));
  };

  const handleParameterChange = (parameterId: string, value: number) => {
    setCurrentExperiments(prev => prev.map((exp, index) => 
      index === activeExperiment 
        ? {
            ...exp,
            parameters: exp.parameters.map(param =>
              param.id === parameterId ? { ...param, value } : param
            )
          }
        : exp
    ));
  };

  const startSimulation = () => {
    setIsSimulating(true);
    const currentExperiment = currentExperiments[activeExperiment];
    speakText(`Starting ${currentExperiment.title} simulation. Observe how the parameters affect the motion.`);
    
    // Start animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animate3DScene();
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const animate3DScene = () => {
    // Simple animation logic for demonstration
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated objects based on current experiment
      const experiment = currentExperiments[activeExperiment];
      
      switch (experiment.id) {
        case 'force-acceleration':
          drawForceDemo(ctx, frame);
          break;
        case 'collision-demo':
          drawCollisionDemo(ctx, frame);
          break;
        case 'pendulum-motion':
          drawPendulumDemo(ctx, frame);
          break;
        default:
          drawDefaultDemo(ctx, frame);
      }
      
      frame += rotationSpeed;
      
      if (isSimulating) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    
    draw();
  };

  const drawForceDemo = (ctx: CanvasRenderingContext2D, frame: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const force = currentExperiments[activeExperiment].parameters.find(p => p.id === 'force')?.value || 50;
    const mass = currentExperiments[activeExperiment].parameters.find(p => p.id === 'mass')?.value || 10;
    
    // Calculate acceleration: a = F/m
    const acceleration = force / mass;
    const displacement = (acceleration * Math.pow(frame * 0.1, 2)) / 2;
    
    // Draw object
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(centerX - 25 + displacement % 200, centerY - 25, 50, 50);
    
    // Draw force arrow
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - 100, centerY);
    ctx.lineTo(centerX - 50, centerY);
    ctx.stroke();
    
    // Draw arrow head
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY);
    ctx.lineTo(centerX - 60, centerY - 5);
    ctx.lineTo(centerX - 60, centerY + 5);
    ctx.closePath();
    ctx.fill();
    
    // Display values
    ctx.fillStyle = '#1F2937';
    ctx.font = '14px Arial';
    ctx.fillText(`Force: ${force}N`, 10, 30);
    ctx.fillText(`Mass: ${mass}kg`, 10, 50);
    ctx.fillText(`Acceleration: ${acceleration.toFixed(2)}m/s²`, 10, 70);
  };

  const drawCollisionDemo = (ctx: CanvasRenderingContext2D, frame: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    // Draw two objects approaching each other
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(centerX - 100 + (frame % 100), centerY, 20, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(centerX + 100 - (frame % 100), centerY, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawPendulumDemo = (ctx: CanvasRenderingContext2D, frame: number) => {
    const centerX = ctx.canvas.width / 2;
    const topY = 50;
    const length = (currentExperiments[activeExperiment].parameters.find(p => p.id === 'length')?.value || 1.5) * 100;
    const angle = Math.sin(frame * 0.05) * (Math.PI / 4);
    
    const bobX = centerX + Math.sin(angle) * length;
    const bobY = topY + Math.cos(angle) * length;
    
    // Draw string
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, topY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();
    
    // Draw bob
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw pivot point
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(centerX, topY, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawDefaultDemo = (ctx: CanvasRenderingContext2D, frame: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    ctx.fillStyle = '#8B5CF6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleAskAI = (context: string) => {
    setAiContext(context);
    setShowAITutor(true);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Cube className="h-5 w-5 text-purple-600" />
                3D Interactive Lab - {conceptName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Conduct virtual experiments with real-time 3D simulations
              </p>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                disabled={isMuted}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAI('3D experiment')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Ask AI
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Experiment {activeExperiment + 1} of {currentExperiments.length}</span>
              <span>{completedExperiments.size}/{currentExperiments.length} completed</span>
            </div>
            <Progress value={(completedExperiments.size / currentExperiments.length) * 100} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Simulation Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {currentExperiments[activeExperiment].completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <FlaskConical className="h-5 w-5 text-purple-600" />
                    {currentExperiments[activeExperiment].title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {currentExperiments[activeExperiment].description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {currentExperiments[activeExperiment].duration}s
                  </Badge>
                  {isSimulating ? (
                    <Button size="sm" onClick={stopSimulation} variant="destructive">
                      Stop Simulation
                    </Button>
                  ) : (
                    <Button size="sm" onClick={startSimulation} className="bg-purple-600 hover:bg-purple-700">
                      Start Simulation
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 3D Canvas */}
              <div className="relative border rounded-lg overflow-hidden bg-gray-50">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-[400px]"
                />
                
                {/* 3D Controls Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <RotateCw className="h-4 w-4" />
                      <span className="text-sm font-medium">Rotation Speed</span>
                    </div>
                    <Slider
                      value={[rotationSpeed]}
                      onValueChange={(value) => setRotationSpeed(value[0])}
                      min={0.1}
                      max={3}
                      step={0.1}
                      className="w-24"
                    />
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <ZoomIn className="h-4 w-4" />
                      <span className="text-sm font-medium">Zoom</span>
                    </div>
                    <Slider
                      value={[zoomLevel]}
                      onValueChange={(value) => setZoomLevel(value[0])}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
              
              {/* Experiment Parameters */}
              <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-gray-800">Experiment Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentExperiments[activeExperiment].parameters.map((param) => (
                    <div key={param.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">{param.name}</label>
                        <span className="text-sm text-gray-600">
                          {param.value} {param.unit}
                        </span>
                      </div>
                      <Slider
                        value={[param.value]}
                        onValueChange={(value) => handleParameterChange(param.id, value[0])}
                        min={param.min}
                        max={param.max}
                        step={(param.max - param.min) / 100}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">{param.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experiment Navigation & Controls */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Experiments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentExperiments.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeExperiment === index
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                  onClick={() => setActiveExperiment(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{experiment.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {experiment.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {experiment.completed && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {experiment.duration}s
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('experiment explanation')}
              >
                <Lightbulb className="h-4 w-4" />
                Explain Experiment
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('parameter effects')}
              >
                <Settings className="h-4 w-4" />
                Parameter Effects
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('physics concepts')}
              >
                <Target className="h-4 w-4" />
                Physics Concepts
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('real world applications')}
              >
                <Activity className="h-4 w-4" />
                Real World Uses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={aiContext}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
