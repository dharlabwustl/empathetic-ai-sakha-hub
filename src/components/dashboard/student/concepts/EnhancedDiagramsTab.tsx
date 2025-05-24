
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, MessageSquare, BarChart3, Network, Beaker, GitCompare } from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ conceptName, subject }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  const handlePlayPause = (visualizationType: string) => {
    if (activeVisualization === visualizationType && isPlaying) {
      setIsPlaying(false);
      setActiveVisualization(null);
      console.log(`Stopping audio for ${visualizationType}`);
    } else {
      setIsPlaying(true);
      setActiveVisualization(visualizationType);
      console.log(`Starting audio explanation for ${visualizationType} of ${conceptName}`);
    }
  };

  const openTutor = (context: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  const getSubjectSpecificVisualizations = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return {
          diagrams: [
            { id: 'force', title: 'Force Diagram', description: 'Interactive force vectors and components' },
            { id: 'motion', title: 'Motion Graphs', description: 'Position, velocity, and acceleration graphs' },
            { id: 'energy', title: 'Energy Flow', description: 'Energy transformation diagrams' }
          ],
          networks: [
            { id: 'circuit', title: 'Circuit Analysis', description: 'Electrical circuit networks' },
            { id: 'field', title: 'Field Lines', description: 'Electric and magnetic field patterns' }
          ],
          applications: [
            { id: 'pendulum', title: 'Simple Pendulum', description: 'Real-world pendulum motion' },
            { id: 'projectile', title: 'Projectile Motion', description: 'Sports and ballistics applications' }
          ]
        };
      case 'chemistry':
        return {
          diagrams: [
            { id: 'molecular', title: 'Molecular Structure', description: 'Bond angles and molecular geometry' },
            { id: 'reaction', title: 'Reaction Mechanism', description: 'Step-by-step reaction pathways' },
            { id: 'orbital', title: 'Orbital Diagrams', description: 'Electron orbital arrangements' }
          ],
          networks: [
            { id: 'bonding', title: 'Chemical Bonding', description: 'Ionic and covalent bond networks' },
            { id: 'crystal', title: 'Crystal Lattice', description: 'Solid state structure networks' }
          ],
          applications: [
            { id: 'catalysis', title: 'Industrial Catalysis', description: 'Real-world chemical processes' },
            { id: 'biochem', title: 'Biochemical Processes', description: 'Enzyme and metabolic pathways' }
          ]
        };
      case 'mathematics':
        return {
          diagrams: [
            { id: 'function', title: 'Function Graphs', description: 'Interactive function plotting' },
            { id: 'geometry', title: 'Geometric Proofs', description: 'Step-by-step geometric constructions' },
            { id: 'calculus', title: 'Calculus Visualization', description: 'Derivatives and integrals' }
          ],
          networks: [
            { id: 'tree', title: 'Decision Trees', description: 'Problem-solving pathways' },
            { id: 'graph', title: 'Graph Theory', description: 'Network and connectivity concepts' }
          ],
          applications: [
            { id: 'optimization', title: 'Optimization Problems', description: 'Real-world optimization scenarios' },
            { id: 'statistics', title: 'Statistical Analysis', description: 'Data analysis applications' }
          ]
        };
      default:
        return {
          diagrams: [
            { id: 'concept', title: 'Concept Map', description: 'Visual concept relationships' },
            { id: 'process', title: 'Process Flow', description: 'Step-by-step processes' }
          ],
          networks: [
            { id: 'relationships', title: 'Concept Relationships', description: 'How concepts connect' }
          ],
          applications: [
            { id: 'realworld', title: 'Real-world Examples', description: 'Practical applications' }
          ]
        };
    }
  };

  const visualizations = getSubjectSpecificVisualizations();

  const renderVisualizationCard = (item: any, type: string, icon: React.ReactNode) => (
    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {subject}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {item.description}
        </p>
        
        {/* Interactive Visualization Area */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-6 mb-4 min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <p className="text-sm text-muted-foreground">
              {activeVisualization === `${type}-${item.id}` && isPlaying 
                ? `Playing: ${item.title} visualization with audio explanation`
                : `Interactive ${item.title} visualization`}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant={activeVisualization === `${type}-${item.id}` && isPlaying ? "default" : "outline"}
            onClick={() => handlePlayPause(`${type}-${item.id}`)}
            className="flex items-center gap-2 flex-1"
          >
            {activeVisualization === `${type}-${item.id}` && isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => openTutor(`${item.title} diagram for ${conceptName}`)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </Button>
        </div>
        
        {activeVisualization === `${type}-${item.id}` && isPlaying && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              🔊 Audio explaining {item.title} concepts and visual elements in detail...
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
          <h2 className="text-2xl font-bold">Interactive Diagrams</h2>
          <p className="text-muted-foreground">
            Explore {conceptName} through interactive visualizations with audio explanations
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {subject} • Enhanced Visuals
        </Badge>
      </div>

      <Tabs defaultValue="diagrams" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="diagrams" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Diagrams
          </TabsTrigger>
          <TabsTrigger value="networks" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Networks
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Beaker className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="comparisons" className="flex items-center gap-2">
            <GitCompare className="h-4 w-4" />
            Comparisons
          </TabsTrigger>
          <TabsTrigger value="lab" className="flex items-center gap-2">
            <Beaker className="h-4 w-4" />
            Interactive Lab
          </TabsTrigger>
        </TabsList>

        <TabsContent value="diagrams" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizations.diagrams.map((item) => 
              renderVisualizationCard(item, 'diagram', <BarChart3 className="h-5 w-5 text-blue-600" />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="networks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizations.networks.map((item) => 
              renderVisualizationCard(item, 'network', <Network className="h-5 w-5 text-purple-600" />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizations.applications.map((item) => 
              renderVisualizationCard(item, 'application', <Beaker className="h-5 w-5 text-green-600" />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-orange-600" />
                Concept Comparison Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg p-6 mb-4 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <GitCompare className="w-16 h-16 mx-auto mb-3 text-orange-600" />
                  <p className="text-sm text-muted-foreground">
                    {activeVisualization === 'comparison' && isPlaying 
                      ? `Comparing ${conceptName} with related concepts - Audio explanation active`
                      : `Interactive comparison of ${conceptName} with similar concepts`}
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
                      Pause Comparison
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start Comparison
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openTutor(`Comparison analysis of ${conceptName}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-green-600" />
                Interactive Virtual Laboratory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-6 mb-4 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Beaker className="w-20 h-20 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">Virtual Laboratory</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {activeVisualization === 'lab' && isPlaying 
                      ? `Conducting virtual experiments for ${conceptName} - Audio guidance active`
                      : `Hands-on experiments to understand ${conceptName} principles`}
                  </p>
                  
                  {/* Lab Controls */}
                  <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <p className="text-xs text-muted-foreground mb-1">Parameter 1</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <p className="text-xs text-muted-foreground mb-1">Parameter 2</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={activeVisualization === 'lab' && isPlaying ? "default" : "outline"}
                  onClick={() => handlePlayPause('lab')}
                  className="flex items-center gap-2 flex-1"
                >
                  {activeVisualization === 'lab' && isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause Experiment
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start Experiment
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openTutor(`Virtual laboratory experiment for ${conceptName}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI
                </Button>
              </div>
              
              {activeVisualization === 'lab' && isPlaying && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    🔊 Audio guidance: Step-by-step experiment instructions and real-time explanations...
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

export default EnhancedDiagramsTab;
