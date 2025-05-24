
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, MessageSquare, BarChart3, Network, Beaker, GitCompare, Box, Zap, Globe } from 'lucide-react';
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
      console.log(`Stopping 3D visualization and audio for ${visualizationType}`);
    } else {
      setIsPlaying(true);
      setActiveVisualization(visualizationType);
      console.log(`Starting 3D visualization and audio explanation for ${visualizationType} of ${conceptName}`);
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
            { id: 'atomic', title: '3D Atomic Structure', description: 'Interactive atomic models with electron orbitals' },
            { id: 'wave', title: 'Wave Motion 3D', description: '3D wave propagation and interference patterns' },
            { id: 'field', title: 'Field Visualizations', description: 'Electric and magnetic field 3D representations' }
          ],
          simulations: [
            { id: 'pendulum', title: 'Pendulum Motion', description: 'Real-time 3D pendulum physics simulation' },
            { id: 'projectile', title: 'Projectile Trajectory', description: '3D projectile motion with air resistance' }
          ],
          environments: [
            { id: 'lab', title: 'Virtual Physics Lab', description: 'Interactive 3D laboratory environment' },
            { id: 'space', title: 'Space Environment', description: 'Zero gravity physics demonstrations' }
          ]
        };
      case 'chemistry':
        return {
          models: [
            { id: 'molecular', title: '3D Molecular Models', description: 'Interactive molecular structures and bonds' },
            { id: 'crystal', title: 'Crystal Lattices', description: '3D crystal structure visualizations' },
            { id: 'orbital', title: 'Electron Orbitals', description: '3D electron probability distributions' }
          ],
          simulations: [
            { id: 'reaction', title: 'Reaction Mechanisms', description: '3D reaction pathway animations' },
            { id: 'bonding', title: 'Chemical Bonding', description: 'Interactive bond formation processes' }
          ],
          environments: [
            { id: 'lab', title: 'Chemistry Lab 3D', description: 'Virtual chemistry laboratory' },
            { id: 'molecular', title: 'Molecular World', description: 'Microscopic molecular environment' }
          ]
        };
      case 'mathematics':
        return {
          models: [
            { id: 'geometric', title: '3D Geometric Shapes', description: 'Interactive 3D geometry and transformations' },
            { id: 'function', title: '3D Function Graphs', description: 'Three-dimensional function visualizations' },
            { id: 'calculus', title: 'Calculus in 3D', description: 'Surface integrals and vector fields' }
          ],
          simulations: [
            { id: 'optimization', title: 'Optimization Problems', description: '3D optimization landscape exploration' },
            { id: 'statistics', title: 'Statistical Distributions', description: '3D probability distribution models' }
          ],
          environments: [
            { id: 'space', title: 'Mathematical Space', description: 'Abstract mathematical environment' },
            { id: 'coordinate', title: 'Coordinate Systems', description: '3D coordinate system playground' }
          ]
        };
      default:
        return {
          models: [
            { id: 'concept', title: '3D Concept Model', description: 'Three-dimensional concept visualization' },
            { id: 'structure', title: 'Structural Model', description: 'Interactive 3D structural representation' }
          ],
          simulations: [
            { id: 'process', title: 'Process Simulation', description: '3D process flow simulation' }
          ],
          environments: [
            { id: 'virtual', title: 'Virtual Environment', description: 'Immersive 3D learning space' }
          ]
        };
    }
  };

  const content3D = getSubjectSpecific3DContent();

  const render3DCard = (item: any, type: string, icon: React.ReactNode) => (
    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            3D • {subject}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {item.description}
        </p>
        
        {/* Interactive 3D Visualization Area */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 mb-4 min-h-[250px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-600/10 rounded-full flex items-center justify-center animate-pulse">
              {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeVisualization === `${type}-${item.id}` && isPlaying 
                ? `🔄 Active 3D simulation with real-time audio explanation for ${conceptName}`
                : `Interactive 3D ${item.title.toLowerCase()} for ${conceptName}`}
            </p>
            
            {/* 3D Visual Elements */}
            <div className="flex space-x-2 mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex gap-2">
          <Button
            variant={activeVisualization === `${type}-${item.id}` && isPlaying ? "default" : "outline"}
            onClick={() => handlePlayPause(`${type}-${item.id}`)}
            className="flex items-center gap-2 flex-1"
          >
            {activeVisualization === `${type}-${item.id}` && isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Stop 3D Sim
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start 3D Sim
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => openTutor(`3D ${item.title} simulation for ${conceptName}`)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </Button>
        </div>
        
        {activeVisualization === `${type}-${item.id}` && isPlaying && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              🔊 Audio: Interactive 3D simulation running with detailed explanations of {item.title} concepts...
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
          <h2 className="text-2xl font-bold">Interactive 3D Analysis</h2>
          <p className="text-muted-foreground">
            Explore {conceptName} through immersive 3D visualizations with synchronized audio explanations
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {subject} • 3D Interactive
        </Badge>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            3D Models
          </TabsTrigger>
          <TabsTrigger value="simulations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="environments" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Virtual Env
          </TabsTrigger>
          <TabsTrigger value="comparisons" className="flex items-center gap-2">
            <GitCompare className="h-4 w-4" />
            Compare 3D
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content3D.models.map((item) => 
              render3DCard(item, 'model', <Box className="h-5 w-5 text-blue-600" />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="simulations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content3D.simulations.map((item) => 
              render3DCard(item, 'simulation', <Zap className="h-5 w-5 text-purple-600" />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="environments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content3D.environments.map((item) => 
              render3DCard(item, 'environment', <Globe className="h-5 w-5 text-green-600" />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-orange-600" />
                3D Concept Comparison Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg p-6 mb-4 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <GitCompare className="w-16 h-16 mx-auto mb-3 text-orange-600" />
                  <p className="text-sm text-muted-foreground">
                    {activeVisualization === 'comparison' && isPlaying 
                      ? `🔄 3D comparison of ${conceptName} with related concepts - Interactive audio guide active`
                      : `Compare ${conceptName} with similar concepts in immersive 3D space`}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={activeVisualization === 'comparison' && isPlaying ? "default" : "outline"}
                  onClick={() => handlePlayPause('comparison')}
                  className="flex items-center gap-2 flex-1"
                >
                  {activeVisualization === 'comparison' && isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Stop 3D Comparison
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start 3D Comparison
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openTutor(`3D comparison analysis of ${conceptName}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI
                </Button>
              </div>
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
