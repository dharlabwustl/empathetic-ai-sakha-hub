
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  CheckCircle, HelpCircle, Cube, Settings,
  RotateCw, ZoomIn, ZoomOut, Move3D
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistantChat from './AIAssistantChat';

interface Lab3DTab {
  id: string;
  title: string;
  topic: string;
  description: string;
  completed: boolean;
  voiceScript: string;
  interactions: string[];
}

interface Enhanced3DLabTabProps {
  conceptId: string;
  conceptName: string;
}

const Enhanced3DLabTab: React.FC<Enhanced3DLabTabProps> = ({ 
  conceptId, 
  conceptName 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedTabs, setCompletedTabs] = useState<Set<number>>(new Set());
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioProgressRef = useRef<number>(0);

  // Compact 3D lab tabs focusing on topic names
  const lab3DTabs: Lab3DTab[] = [
    {
      id: 'vector-3d',
      title: 'Vector Dynamics',
      topic: 'Force Vectors',
      description: '3D visualization of force vectors and their components',
      completed: false,
      voiceScript: `Welcome to the 3D Vector Dynamics lab. Here you can explore force vectors in three-dimensional space. Unlike 2D vectors, 3D vectors have components in X, Y, and Z directions. Rotate the model to see how the force vector appears from different angles. Notice how the vector maintains its magnitude and direction regardless of your viewing perspective.`,
      interactions: ['Rotate to view from different angles', 'Zoom to examine details', 'Toggle vector components']
    },
    {
      id: 'equilibrium-3d',
      title: 'Force Balance',
      topic: 'Equilibrium',
      description: 'Interactive 3D model showing force equilibrium principles',
      completed: false,
      voiceScript: `In this 3D Force Balance simulation, you'll see how multiple forces can create equilibrium in three-dimensional space. For an object to be in equilibrium, the sum of forces in all three directions must be zero. Rotate the model to understand how forces balance each other in X, Y, and Z axes simultaneously.`,
      interactions: ['Adjust force magnitudes', 'Change force directions', 'View resultant force vector']
    },
    {
      id: 'motion-3d',
      title: 'Motion Analysis',
      topic: 'Kinematics',
      description: 'Explore projectile motion and trajectories in 3D space',
      completed: false,
      voiceScript: `This 3D Motion Analysis shows projectile motion in three dimensions. Unlike simple 2D projectile motion, real-world projectiles can move in complex 3D trajectories. Factors like wind resistance, spin, and launch direction all affect the path. Rotate the view to see the complete trajectory from different perspectives.`,
      interactions: ['Change launch parameters', 'View trajectory path', 'Analyze velocity vectors']
    },
    {
      id: 'collision-3d',
      title: 'Collision Physics',
      topic: 'Momentum',
      description: 'Interactive 3D collision simulation with momentum conservation',
      completed: false,
      voiceScript: `Welcome to 3D Collision Physics. Here you can observe how momentum is conserved during collisions in three-dimensional space. Unlike 1D collisions, 3D collisions involve momentum conservation in all three spatial directions. Watch how objects bounce, rotate, and transfer energy during impact.`,
      interactions: ['Set collision parameters', 'Observe momentum transfer', 'Analyze before/after states']
    }
  ];

  // Voice explanation functionality
  const playVoiceExplanation = (tabIndex: number) => {
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }

    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(lab3DTabs[tabIndex].voiceScript);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        audioProgressRef.current = 0;
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        markTabAsCompleted(tabIndex);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      // Simulate progress tracking
      const progressInterval = setInterval(() => {
        audioProgressRef.current += 2;
        setProgress(audioProgressRef.current);
        if (audioProgressRef.current >= 100) {
          clearInterval(progressInterval);
        }
      }, 100);

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseVoiceExplanation = () => {
    if (speechRef.current && isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const resetProgress = () => {
    pauseVoiceExplanation();
    setProgress(0);
    audioProgressRef.current = 0;
  };

  const markTabAsCompleted = (tabIndex: number) => {
    setCompletedTabs(prev => new Set([...prev, tabIndex]));
  };

  const render3DModel = (tab: Lab3DTab) => {
    // Simplified 3D visualization using CSS transforms
    return (
      <div className="relative w-full h-80 bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg overflow-hidden">
        <div 
          className="absolute inset-4 transition-transform duration-300"
          style={{
            transform: `perspective(800px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`
          }}
        >
          {/* 3D Grid */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={`grid-x-${i}`}
                className="absolute h-full border-l border-blue-300/20"
                style={{ left: `${i * 10}%` }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`grid-y-${i}`}
                className="absolute w-full border-t border-blue-300/20"
                style={{ top: `${i * 10}%` }}
              />
            ))}
          </div>

          {/* 3D Objects based on tab type */}
          {tab.id === 'vector-3d' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Vector arrow */}
              <div 
                className="w-32 h-2 bg-gradient-to-r from-red-500 to-red-400 relative transform rotate-45"
                style={{ transformOrigin: 'left center' }}
              >
                <div className="absolute -right-2 -top-1 w-0 h-0 border-l-4 border-l-red-500 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
              </div>
              <div className="absolute -bottom-8 left-0 text-white text-xs">Force Vector</div>
            </div>
          )}

          {tab.id === 'equilibrium-3d' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Central object with multiple force vectors */}
              <div className="w-8 h-8 bg-yellow-400 rounded-full relative">
                {/* Multiple force arrows */}
                <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-blue-500 transform -translate-y-1/2 origin-left rotate-0" />
                <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-green-500 transform -translate-y-1/2 origin-left rotate-90" />
                <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-purple-500 transform -translate-y-1/2 origin-left rotate-180" />
                <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-orange-500 transform -translate-y-1/2 origin-left -rotate-90" />
              </div>
              <div className="absolute -bottom-8 left-0 text-white text-xs">Equilibrium Point</div>
            </div>
          )}

          {tab.id === 'motion-3d' && (
            <div className="relative w-full h-full">
              {/* Trajectory path */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 50 200 Q 150 100 250 150 Q 350 200 400 180"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
              {/* Moving projectile */}
              <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" 
                   style={{ left: '250px', top: '150px' }} />
              <div className="absolute bottom-4 left-4 text-white text-xs">3D Trajectory</div>
            </div>
          )}

          {tab.id === 'collision-3d' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Two colliding objects */}
              <div className="flex items-center space-x-8">
                <div className="w-12 h-12 bg-red-500 rounded-full relative">
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-white text-xs">v₁</div>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full relative">
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-white text-xs">v₂</div>
                </div>
              </div>
              <div className="absolute -bottom-8 left-8 text-white text-xs">Collision Point</div>
            </div>
          )}
        </div>

        {/* 3D Controls Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center space-x-2 text-white text-xs">
            <span>3D Controls:</span>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
              <RotateCw className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
              <Move3D className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const currentTab = lab3DTabs[activeTab];
  const overallProgress = (completedTabs.size / lab3DTabs.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Cube className="h-5 w-5 text-purple-500" />
              3D Laboratory Progress
            </span>
            <Badge variant="outline">
              {completedTabs.size}/{lab3DTabs.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Compact Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
        {lab3DTabs.map((tab, index) => (
          <Button
            key={tab.id}
            variant={activeTab === index ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(index)}
            className={`relative ${completedTabs.has(index) ? 'bg-green-100 border-green-300' : ''}`}
          >
            <div className="text-left">
              <div className="font-medium">{tab.title}</div>
              <div className="text-xs opacity-75">{tab.topic}</div>
            </div>
            {completedTabs.has(index) && (
              <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
            )}
          </Button>
        ))}
      </div>

      {/* Main 3D Lab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 3D Model Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Cube className="h-5 w-5 text-purple-500" />
                    {currentTab.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{currentTab.description}</p>
                </div>
                {completedTabs.has(activeTab) && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Audio Controls */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 rounded-lg">
                <Button
                  size="sm"
                  onClick={() => isPlaying ? pauseVoiceExplanation() : playVoiceExplanation(activeTab)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'} Lab Guide
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetProgress}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 ml-2">
                  <Progress value={progress} className="h-2" />
                </div>
                
                <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
              </div>

              {/* 3D Model */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {render3DModel(currentTab)}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        {/* Controls and AI Assistant Panel */}
        <div className="space-y-4">
          {/* 3D Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                3D Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rotate X</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotationX}
                  onChange={(e) => setRotationX(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 text-center">{rotationX}°</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Rotate Y</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotationY}
                  onChange={(e) => setRotationY(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 text-center">{rotationY}°</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Zoom</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 text-center">{zoom}x</div>
              </div>

              <Button 
                onClick={() => {
                  setRotationX(0);
                  setRotationY(0);
                  setZoom(1);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Reset View
              </Button>
            </CardContent>
          </Card>

          {/* Interactions Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Available Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {currentTab.interactions.map((interaction, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full" />
                    {interaction}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* AI Lab Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-500" />
                AI Lab Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowAIAssistant(true)}
                className="w-full"
                variant="outline"
              >
                <Cube className="h-4 w-4 mr-2" />
                Ask Lab Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <AIAssistantChat
            conceptName={`3D Lab: ${currentTab.title}`}
            context={`Current 3D simulation: ${currentTab.title} - ${currentTab.topic}. ${currentTab.description}`}
            isVisible={showAIAssistant}
            onClose={() => setShowAIAssistant(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Enhanced3DLabTab;
