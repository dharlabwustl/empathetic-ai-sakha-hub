
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { play, pause, MessageSquare, Box, Atom, Calculator, Globe, Microscope } from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName, subject }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  const handlePlayPause = (visualizationType: string) => {
    if (activeVisualization === visualizationType && isPlaying) {
      setIsPlaying(false);
      setActiveVisualization(null);
      console.log(`Stopping 3D simulation and audio for ${visualizationType}`);
    } else {
      setIsPlaying(true);
      setActiveVisualization(visualizationType);
      console.log(`Starting 3D simulation and audio explanation for ${visualizationType} of ${conceptName}`);
    }
  };

  const openTutor = (context: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  const getSubjectSpecific3DContent = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return {
          models: [
            { id: 'particle', title: 'Particle Motion', description: '3D particle trajectories and forces', icon: <Box className="h-5 w-5" /> },
            { id: 'wave', title: 'Wave Propagation', description: '3D wave interference patterns', icon: <Globe className="h-5 w-5" /> },
            { id: 'field', title: 'Field Visualization', description: '3D electric and magnetic fields', icon: <Atom className="h-5 w-5" /> }
          ],
          simulations: [
            { id: 'collision', title: 'Collision Dynamics', description: 'Real-time collision simulations' },
            { id: 'oscillation', title: 'Oscillatory Motion', description: 'Pendulum and spring systems' },
            { id: 'thermal', title: 'Thermal Motion', description: 'Molecular kinetic theory' }
          ]
        };
      case 'chemistry':
        return {
          models: [
            { id: 'molecule', title: 'Molecular Structure', description: '3D molecular geometry and bonds', icon: <Atom className="h-5 w-5" /> },
            { id: 'crystal', title: 'Crystal Lattice', description: '3D crystal structure visualization', icon: <Box className="h-5 w-5" /> },
            { id: 'enzyme', title: 'Enzyme Mechanisms', description: '3D protein folding and reactions', icon: <Microscope className="h-5 w-5" /> }
          ],
          simulations: [
            { id: 'reaction', title: 'Reaction Pathways', description: 'Animated reaction mechanisms' },
            { id: 'bonding', title: 'Chemical Bonding', description: 'Orbital overlap simulations' },
            { id: 'phase', title: 'Phase Transitions', description: 'State change visualizations' }
          ]
        };
      case 'mathematics':
        return {
          models: [
            { id: 'surface', title: 'Mathematical Surfaces', description: '3D function plotting and analysis', icon: <Calculator className="h-5 w-5" /> },
            { id: 'geometry', title: 'Geometric Solids', description: '3D geometric constructions', icon: <Box className="h-5 w-5" /> },
            { id: 'vector', title: 'Vector Fields', description: '3D vector field visualization', icon: <Globe className="h-5 w-5" /> }
          ],
          simulations: [
            { id: 'calculus', title: 'Calculus Visualization', description: 'Derivatives and integrals in 3D' },
            { id: 'transform', title: 'Transformations', description: 'Linear transformation animations' },
            { id: 'optimization', title: 'Optimization Problems', description: 'Gradient descent visualization' }
          ]
        };
      default:
        return {
          models: [
            { id: 'concept', title: '3D Concept Model', description: 'Interactive 3D representation', icon: <Box className="h-5 w-5" /> }
          ],
          simulations: [
            { id: 'interactive', title: 'Interactive Simulation', description: 'Dynamic concept exploration' }
          ]
        };
    }
  };

  const content3D = getSubjectSpecific3DContent();

  const render3DModelCard = (item: any) => (
    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.icon}
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            3D Model
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {item.description}
        </p>
        
        {/* 3D Visualization Area */}
        <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30 rounded-lg p-6 mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-indigo-200 dark:border-indigo-800">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              {item.icon && React.cloneElement(item.icon, { className: "h-8 w-8 text-indigo-600" })}
            </div>
            <h4 className="font-medium mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">
              {activeVisualization === `model-${item.id}` && isPlaying 
                ? `3D simulation active with detailed audio explanation`
                : `Interactive 3D model for ${conceptName}`}
            </p>
            
            {/* 3D Controls */}
            {activeVisualization === `model-${item.id}` && isPlaying && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-center gap-2 text-xs">
                  <Badge variant="secondary">Rotate: Mouse Drag</Badge>
                  <Badge variant="secondary">Zoom: Scroll</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-indigo-600 h-1 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant={activeVisualization === `model-${item.id}` && isPlaying ? "default" : "outline"}
            onClick={() => handlePlayPause(`model-${item.id}`)}
            className="flex items-center gap-2 flex-1"
          >
            {activeVisualization === `model-${item.id}` && isPlaying ? (
              <>
                <pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <play className="h-4 w-4" />
                Play 3D
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => openTutor(`3D model of ${item.title} for ${conceptName}`)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </Button>
        </div>
        
        {activeVisualization === `model-${item.id}` && isPlaying && (
          <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-sm text-indigo-800 dark:text-indigo-300">
              🔊 Audio: Explaining 3D structure, interactions, and key features of {item.title}...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderSimulationCard = (item: any) => (
    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            Live Simulation
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {item.description}
        </p>
        
        {/* Simulation Area */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg p-6 mb-4 min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <Globe className="w-16 h-16 mx-auto mb-3 text-emerald-600" />
            <p className="text-sm text-muted-foreground">
              {activeVisualization === `sim-${item.id}` && isPlaying 
                ? `Live simulation running with audio commentary`
                : `Interactive simulation for ${conceptName}`}
            </p>
            
            {/* Simulation Parameters */}
            {activeVisualization === `sim-${item.id}` && isPlaying && (
              <div className="mt-4 grid grid-cols-2 gap-2 max-w-xs mx-auto">
                <div className="p-2 bg-white dark:bg-gray-800 rounded text-xs">
                  <div className="text-emerald-600 font-medium">Speed</div>
                  <div className="w-full bg-gray-200 rounded h-1 mt-1">
                    <div className="bg-emerald-600 h-1 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded text-xs">
                  <div className="text-emerald-600 font-medium">Accuracy</div>
                  <div className="w-full bg-gray-200 rounded h-1 mt-1">
                    <div className="bg-emerald-600 h-1 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant={activeVisualization === `sim-${item.id}` && isPlaying ? "default" : "outline"}
            onClick={() => handlePlayPause(`sim-${item.id}`)}
            className="flex items-center gap-2 flex-1"
          >
            {activeVisualization === `sim-${item.id}` && isPlaying ? (
              <>
                <pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <play className="h-4 w-4" />
                Run Simulation
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => openTutor(`Live simulation of ${item.title} for ${conceptName}`)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </Button>
        </div>
        
        {activeVisualization === `sim-${item.id}` && isPlaying && (
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              🔊 Audio: Real-time explanation of simulation behavior and underlying principles...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">3D Analysis & Virtual Laboratory</h2>
          <p className="text-muted-foreground">
            Explore {conceptName} through interactive 3D models and live simulations
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {subject} • 3D Enhanced
        </Badge>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            3D Models
          </TabsTrigger>
          <TabsTrigger value="simulations" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Live Simulations
          </TabsTrigger>
          <TabsTrigger value="laboratory" className="flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            Virtual Laboratory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {content3D.models.map(render3DModelCard)}
          </div>
        </TabsContent>

        <TabsContent value="simulations" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {content3D.simulations.map(renderSimulationCard)}
          </div>
        </TabsContent>

        <TabsContent value="laboratory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Microscope className="h-5 w-5 text-purple-600" />
                Virtual Laboratory - {conceptName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-8 mb-4 min-h-[400px] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Microscope className="w-24 h-24 mx-auto mb-6 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-4">Advanced Virtual Laboratory</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {activeVisualization === 'laboratory' && isPlaying 
                      ? `Conducting virtual experiments for ${conceptName} with real-time audio guidance and 3D visualization`
                      : `Experience hands-on learning with subject-specific virtual experiments for ${conceptName}`}
                  </p>
                  
                  {/* Laboratory Equipment */}
                  {activeVisualization === 'laboratory' && isPlaying && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                        <Atom className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                        <p className="text-xs">Equipment A</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className="bg-purple-600 h-1 rounded-full w-4/5 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                        <Calculator className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                        <p className="text-xs">Measurement</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className="bg-purple-600 h-1 rounded-full w-3/5 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                        <Box className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                        <p className="text-xs">Analysis</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className="bg-purple-600 h-1 rounded-full w-2/3 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={activeVisualization === 'laboratory' && isPlaying ? "default" : "outline"}
                  onClick={() => handlePlayPause('laboratory')}
                  className="flex items-center gap-2 flex-1"
                >
                  {activeVisualization === 'laboratory' && isPlaying ? (
                    <>
                      <pause className="h-4 w-4" />
                      Pause Laboratory
                    </>
                  ) : (
                    <>
                      <play className="h-4 w-4" />
                      Start Laboratory
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openTutor(`Virtual laboratory experiment for ${conceptName} in ${subject}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI
                </Button>
              </div>
              
              {activeVisualization === 'laboratory' && isPlaying && (
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    🔊 Laboratory Audio Guide: Step-by-step experiment instructions, safety protocols, and real-time analysis for {conceptName}...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AITutorDialog
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        conceptName={conceptName}
        context={tutorContext}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
