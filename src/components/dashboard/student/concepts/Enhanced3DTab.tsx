
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Brain, Play, Pause, Volume2, RotateCcw, Settings, MessageSquare, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalAudioState {
  isPlaying: boolean;
  isEnabled: boolean;
  progress: number;
}

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  globalAudioState?: GlobalAudioState;
}

interface SimulationData {
  id: number;
  title: string;
  description: string;
  duration: number;
  audioText: string;
  hotspots?: Array<{
    x: number;
    y: number;
    label: string;
    info: string;
  }>;
  controls?: string[];
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  const [currentSimulation, setCurrentSimulation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  
  // Simulation parameters
  const [force, setForce] = useState([50]);
  const [mass, setMass] = useState([10]);
  const [friction, setFriction] = useState([0.1]);
  const [angle, setAngle] = useState([0]);

  // Sample 3D simulation data
  const simulations: SimulationData[] = [
    {
      id: 1,
      title: "Force Application Simulator",
      description: "Interactive 3D visualization of forces acting on objects",
      duration: 35,
      audioText: "This 3D simulation shows how different forces affect object motion. You can adjust the applied force, object mass, and friction coefficient to see real-time changes in acceleration and velocity. The force vectors are represented in 3D space, helping you visualize the relationship between force, mass, and acceleration according to Newton's Second Law.",
      hotspots: [
        { x: 200, y: 150, label: "Object", info: "Mass that experiences forces" },
        { x: 300, y: 100, label: "Force Vector", info: "Applied force direction and magnitude" },
        { x: 150, y: 200, label: "Friction", info: "Surface resistance force" },
        { x: 250, y: 50, label: "Acceleration", info: "Resulting motion change" }
      ]
    },
    {
      id: 2,
      title: "Mass-Acceleration Relationship",
      description: "3D visualization of how mass affects acceleration",
      duration: 30,
      audioText: "This interactive 3D model demonstrates the inverse relationship between mass and acceleration. As you increase the mass of the object while keeping force constant, you'll observe that acceleration decreases proportionally. The 3D visualization shows this relationship through dynamic motion paths and vector representations.",
      controls: ["Mass Slider", "Force Control", "Velocity Display", "Acceleration Meter"]
    },
    {
      id: 3,
      title: "Multi-Force Environment",
      description: "Complex 3D scenario with multiple forces",
      duration: 40,
      audioText: "This advanced 3D simulation presents a multi-force environment where several forces act simultaneously on an object. You can observe how gravitational force, normal force, applied force, and friction combine to produce net force and resulting acceleration. The 3D perspective helps understand force vector addition in three dimensions.",
      hotspots: [
        { x: 200, y: 150, label: "Center Mass", info: "Object experiencing multiple forces" },
        { x: 200, y: 100, label: "Normal Force", info: "Upward force from surface" },
        { x: 200, y: 200, label: "Weight", info: "Gravitational force downward" },
        { x: 280, y: 150, label: "Applied Force", info: "External force applied" },
        { x: 120, y: 150, label: "Friction", info: "Opposes motion" }
      ]
    },
    {
      id: 4,
      title: "Real-time Physics Lab",
      description: "Interactive physics laboratory simulation",
      duration: 45,
      audioText: "Welcome to the virtual physics laboratory where you can conduct real-time experiments with Newton's Second Law. This comprehensive 3D environment allows you to manipulate various parameters and immediately observe their effects on object motion. Use the control panel to adjust forces, masses, and environmental conditions while watching the physics unfold in real-time.",
      controls: ["Force Vector Control", "Mass Adjustment", "Environment Settings", "Data Recording", "Result Analysis"]
    }
  ];

  // Listen to global audio events
  useEffect(() => {
    const handleGlobalAudioToggle = (event: CustomEvent) => {
      if (globalAudioState?.isEnabled) {
        setIsPlaying(event.detail.isPlaying);
        if (event.detail.isPlaying) {
          startAudioNarration();
        } else {
          stopAudioNarration();
        }
      }
    };

    const handleGlobalAudioReset = () => {
      setProgress(0);
      setIsPlaying(false);
      stopAudioNarration();
    };

    const handleGlobalAudioEnable = (event: CustomEvent) => {
      if (!event.detail.enabled) {
        setIsPlaying(false);
        stopAudioNarration();
      }
    };

    window.addEventListener('globalAudioToggle', handleGlobalAudioToggle as EventListener);
    window.addEventListener('globalAudioReset', handleGlobalAudioReset);
    window.addEventListener('globalAudioEnable', handleGlobalAudioEnable as EventListener);

    return () => {
      window.removeEventListener('globalAudioToggle', handleGlobalAudioToggle as EventListener);
      window.removeEventListener('globalAudioReset', handleGlobalAudioReset);
      window.removeEventListener('globalAudioEnable', handleGlobalAudioEnable as EventListener);
    };
  }, [globalAudioState]);

  const startAudioNarration = () => {
    const currentSimData = simulations[currentSimulation];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSimData.audioText);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudioNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const resetSimulation = () => {
    setForce([50]);
    setMass([10]);
    setFriction([0.1]);
    setAngle([0]);
    setProgress(0);
    setSelectedHotspot(null);
  };

  const currentSimData = simulations[currentSimulation];
  const acceleration = force[0] / mass[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Interactive Lab - {conceptName}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAITutor(!showAITutor)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            AI Lab Assistant
          </Button>
        </div>
      </div>

      {/* AI Tutor Panel */}
      <AnimatePresence>
        {showAITutor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">3D Lab AI Assistant</h4>
                    <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                      I'm your virtual lab partner! Currently running: "{currentSimData.title}". 
                      Current settings: Force={force[0]}N, Mass={mass[0]}kg, Acceleration={acceleration.toFixed(2)}m/s²
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Explain simulation
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Suggest experiments
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Check my understanding
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Simulation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Simulation Display */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    {currentSimData.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {currentSimData.description}
                  </p>
                </div>
                <Badge variant="outline">3D Lab</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* 3D Simulation Viewport */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden h-80">
                {/* Simulated 3D Environment */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    {/* Grid background */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="300" fill="url(#grid)" />
                    
                    {/* 3D Object */}
                    <g transform={`translate(200, 150)`}>
                      {/* Shadow */}
                      <ellipse cx="0" cy="50" rx="30" ry="10" fill="#000000" opacity="0.3"/>
                      
                      {/* Main object (3D box) */}
                      <g transform={`rotate(${angle[0]})`}>
                        <rect x="-25" y="-25" width="50" height="50" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
                        <polygon points="-25,-25 -15,-35 35,-35 25,-25" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1"/>
                        <polygon points="25,-25 35,-35 35,15 25,25" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1"/>
                        
                        {/* Mass label */}
                        <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-white">
                          {mass[0]}kg
                        </text>
                      </g>
                      
                      {/* Force vector */}
                      <line 
                        x1="0" y1="0" 
                        x2={force[0] * 2} y2="0" 
                        stroke="#ef4444" 
                        strokeWidth="4" 
                        markerEnd="url(#arrowhead)"
                      />
                      <text x={force[0] * 2 + 10} y="-5" className="text-sm font-medium fill-red-400">
                        F = {force[0]}N
                      </text>
                      
                      {/* Acceleration indicator */}
                      <line 
                        x1="0" y1="-40" 
                        x2={acceleration * 10} y2="-40" 
                        stroke="#10b981" 
                        strokeWidth="3" 
                        markerEnd="url(#arrowhead)"
                      />
                      <text x={acceleration * 10 + 5} y="-45" className="text-xs font-medium fill-green-400">
                        a = {acceleration.toFixed(2)}m/s²
                      </text>
                    </g>
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                {/* Interactive Hotspots */}
                {currentSimData.hotspots && currentSimData.hotspots.map((hotspot, index) => (
                  <motion.div
                    key={index}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer ${
                      selectedHotspot === index 
                        ? 'bg-yellow-500 ring-4 ring-yellow-300' 
                        : 'bg-cyan-500 hover:bg-cyan-400'
                    }`}
                    style={{
                      left: `${(hotspot.x / 400) * 100}%`,
                      top: `${(hotspot.y / 300) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-full h-full rounded-full bg-white/30 animate-pulse"></div>
                  </motion.div>
                ))}
                
                {/* 3D Controls */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (isPlaying) {
                        stopAudioNarration();
                      } else {
                        startAudioNarration();
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    disabled={!globalAudioState?.isEnabled}
                    className="bg-black/50 backdrop-blur-sm text-white border-gray-600"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetSimulation}
                    className="bg-black/50 backdrop-blur-sm text-white border-gray-600"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Real-time Physics Data */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="text-xs space-y-1">
                    <div>Force: <span className="text-red-400">{force[0]}N</span></div>
                    <div>Mass: <span className="text-blue-400">{mass[0]}kg</span></div>
                    <div>Acceleration: <span className="text-green-400">{acceleration.toFixed(2)}m/s²</span></div>
                    <div>F/m = a: <span className="text-yellow-400">{(force[0]/mass[0]).toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
              
              {/* Audio Progress */}
              {isPlaying && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <Volume2 className="h-4 w-4" />
                    <span>3D Lab Audio Guide</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Control Panel */}
        <div className="space-y-4">
          {/* Parameter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Simulation Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Applied Force: {force[0]}N</label>
                <Slider
                  value={force}
                  onValueChange={setForce}
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Object Mass: {mass[0]}kg</label>
                <Slider
                  value={mass}
                  onValueChange={setMass}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Friction: {friction[0]}</label>
                <Slider
                  value={friction}
                  onValueChange={setFriction}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Angle: {angle[0]}°</label>
                <Slider
                  value={angle}
                  onValueChange={setAngle}
                  max={360}
                  min={0}
                  step={15}
                  className="w-full"
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Newton's Second Law</div>
                <div className="text-sm font-mono text-blue-700 dark:text-blue-400">
                  a = F/m = {force[0]}/{mass[0]} = {acceleration.toFixed(2)} m/s²
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Interactive Controls */}
          {currentSimData.controls && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentSimData.controls.map((control, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{control}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Hotspot Information */}
          {selectedHotspot !== null && currentSimData.hotspots && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-700"
            >
              <div className="flex items-start gap-2">
                <Target className="h-5 w-5 text-cyan-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-cyan-800 dark:text-cyan-300">
                    {currentSimData.hotspots[selectedHotspot].label}
                  </h4>
                  <p className="text-sm text-cyan-700 dark:text-cyan-400 mt-1">
                    {currentSimData.hotspots[selectedHotspot].info}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Simulation Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Available Simulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {simulations.map((sim, index) => (
                  <button
                    key={sim.id}
                    onClick={() => {
                      setCurrentSimulation(index);
                      setProgress(0);
                      setSelectedHotspot(null);
                      resetSimulation();
                    }}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      currentSimulation === index
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="font-medium">{sim.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{sim.description}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DTab;
