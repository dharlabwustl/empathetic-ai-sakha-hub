
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Zap, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  isPlaying?: boolean;
  audioEnabled?: boolean;
  onPlayPause?: () => void;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject,
  isPlaying = false,
  audioEnabled = true,
  onPlayPause
}) => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [selectedVisualization, setSelectedVisualization] = useState('molecular');
  const [parameters, setParameters] = useState({
    speed: [50],
    temperature: [25],
    pressure: [1],
    concentration: [1]
  });
  const [showControls, setShowControls] = useState(true);
  const [aiTutorActive, setAiTutorActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subject-specific visualizations
  const getVisualizationOptions = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return [
          { id: 'mechanics', name: 'Force Mechanics', description: 'Interactive force analysis' },
          { id: 'electromagnetic', name: 'EM Fields', description: 'Electric and magnetic field visualization' },
          { id: 'waves', name: 'Wave Motion', description: 'Wave propagation and interference' },
          { id: 'quantum', name: 'Quantum States', description: 'Quantum mechanics visualization' }
        ];
      case 'chemistry':
        return [
          { id: 'molecular', name: 'Molecular Structure', description: '3D molecular models' },
          { id: 'reactions', name: 'Chemical Reactions', description: 'Reaction mechanisms' },
          { id: 'orbitals', name: 'Electron Orbitals', description: 'Atomic orbital shapes' },
          { id: 'crystalline', name: 'Crystal Structures', description: 'Crystalline lattices' }
        ];
      case 'biology':
        return [
          { id: 'cellular', name: 'Cell Structure', description: 'Cellular components' },
          { id: 'dna', name: 'DNA Structure', description: 'Double helix visualization' },
          { id: 'protein', name: 'Protein Folding', description: 'Protein structure dynamics' },
          { id: 'ecosystem', name: 'Ecosystem', description: 'Ecological interactions' }
        ];
      default:
        return [
          { id: 'generic', name: 'Concept Model', description: 'Interactive 3D model' },
          { id: 'simulation', name: 'Live Simulation', description: 'Real-time parameters' }
        ];
    }
  };

  const visualizations = getVisualizationOptions();

  // Initialize 3D canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw 3D-like representation
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Create animated visualization based on concept
        const drawVisualization = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Background gradient
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw subject-specific visualization
          if (subject.toLowerCase() === 'physics') {
            // Draw force vectors and particles
            const time = Date.now() * 0.001;
            for (let i = 0; i < 5; i++) {
              const x = centerX + Math.cos(time + i) * (50 + i * 20);
              const y = centerY + Math.sin(time + i) * (30 + i * 15);
              
              ctx.beginPath();
              ctx.arc(x, y, 8, 0, Math.PI * 2);
              ctx.fillStyle = `hsl(${220 + i * 30}, 70%, 60%)`;
              ctx.fill();
              
              // Draw force vector
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + Math.cos(time) * 30, y + Math.sin(time) * 30);
              ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          } else if (subject.toLowerCase() === 'chemistry') {
            // Draw molecular structure
            const time = Date.now() * 0.0005;
            const atoms = [
              { x: centerX, y: centerY, color: '#ef4444' },
              { x: centerX + 60, y: centerY - 30, color: '#3b82f6' },
              { x: centerX - 60, y: centerY - 30, color: '#3b82f6' },
              { x: centerX + 30, y: centerY + 50, color: '#10b981' },
              { x: centerX - 30, y: centerY + 50, color: '#10b981' }
            ];
            
            // Draw bonds
            ctx.strokeStyle = 'rgba(107, 114, 128, 0.6)';
            ctx.lineWidth = 3;
            atoms.forEach((atom, i) => {
              if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(atoms[0].x, atoms[0].y);
                ctx.lineTo(atom.x, atom.y);
                ctx.stroke();
              }
            });
            
            // Draw atoms with rotation
            atoms.forEach((atom, i) => {
              const rotX = atom.x + Math.cos(time + i) * 5;
              const rotY = atom.y + Math.sin(time + i) * 5;
              
              ctx.beginPath();
              ctx.arc(rotX, rotY, 15, 0, Math.PI * 2);
              ctx.fillStyle = atom.color;
              ctx.fill();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.lineWidth = 2;
              ctx.stroke();
            });
          }
          
          if (simulationRunning) {
            requestAnimationFrame(drawVisualization);
          }
        };
        
        if (simulationRunning) {
          drawVisualization();
        } else {
          drawVisualization(); // Draw static frame
        }
      }
    }
  }, [simulationRunning, selectedVisualization, subject, parameters]);

  const handleSimulationToggle = () => {
    setSimulationRunning(!simulationRunning);
    if (onPlayPause) {
      onPlayPause();
    }
  };

  const handleReset = () => {
    setSimulationRunning(false);
    setParameters({
      speed: [50],
      temperature: [25],
      pressure: [1],
      concentration: [1]
    });
  };

  const toggleAiTutor = () => {
    setAiTutorActive(!aiTutorActive);
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Advanced 3D Interactive Lab - {conceptName}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time simulation with AI-powered explanations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={simulationRunning ? "default" : "outline"}>
                {simulationRunning ? "Running" : "Paused"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAiTutor}
                className={aiTutorActive ? "bg-blue-50 text-blue-700" : ""}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Tutor
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Visualization Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Visualization Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {visualizations.map((viz) => (
                <motion.div
                  key={viz.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedVisualization === viz.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => setSelectedVisualization(viz.id)}
                  >
                    <div>
                      <div className="font-medium">{viz.name}</div>
                      <div className="text-xs text-muted-foreground">{viz.description}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Parameter Controls */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Live Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium">Speed: {parameters.speed[0]}%</label>
                <Slider
                  value={parameters.speed}
                  onValueChange={(value) => setParameters(prev => ({ ...prev, speed: value }))}
                  max={100}
                  step={1}
                  className="mt-1"
                />
              </div>
              
              {subject.toLowerCase() === 'chemistry' && (
                <>
                  <div>
                    <label className="text-xs font-medium">Temperature: {parameters.temperature[0]}°C</label>
                    <Slider
                      value={parameters.temperature}
                      onValueChange={(value) => setParameters(prev => ({ ...prev, temperature: value }))}
                      max={100}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Pressure: {parameters.pressure[0]} atm</label>
                    <Slider
                      value={parameters.pressure}
                      onValueChange={(value) => setParameters(prev => ({ ...prev, pressure: value }))}
                      max={5}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main 3D Visualization */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  {visualizations.find(v => v.id === selectedVisualization)?.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSimulationToggle}
                    className="flex items-center gap-2"
                  >
                    {simulationRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {simulationRunning ? 'Pause' : 'Start'} Simulation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                    className={audioEnabled ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-900 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full h-full max-h-96"
                />
                
                {/* Overlay controls */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm">
                  Click and drag to rotate • Scroll to zoom
                </div>
                
                {simulationRunning && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Live Simulation
                  </div>
                )}
              </div>

              {/* Audio Explanation Panel */}
              {isPlaying && audioEnabled && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Audio Explanation Active</span>
                    </div>
                    <div className="flex-1 bg-blue-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    "This visualization shows {conceptName} in action. Notice how the parameters affect the simulation..."
                  </p>
                </motion.div>
              )}

              {/* AI Tutor Panel */}
              {aiTutorActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-800 mb-2">AI Tutor Insight</h4>
                      <p className="text-sm text-purple-700">
                        Based on your current visualization of {conceptName}, I can see you're exploring the {selectedVisualization} model. 
                        The {subject} concepts here demonstrate how changing the {Object.keys(parameters)[0]} parameter affects the overall behavior. 
                        Would you like me to explain the relationship between these variables?
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 border-purple-300 text-purple-700">
                        Ask a Question
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DTab;
