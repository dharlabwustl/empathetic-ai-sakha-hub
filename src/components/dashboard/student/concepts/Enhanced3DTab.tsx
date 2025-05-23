
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Play, Pause, Volume2, VolumeX, Maximize, Settings, Box, Atom, FlaskConical, Target, Activity, Beaker, Dna, Microscope } from 'lucide-react';

interface Enhanced3DTabProps {
  conceptName: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('simulation');

  // Determine subject type based on concept name for appropriate examples
  const getSubjectType = () => {
    if (conceptName.toLowerCase().includes('force') || conceptName.toLowerCase().includes('motion') || conceptName.toLowerCase().includes('newton')) {
      return 'physics';
    } else if (conceptName.toLowerCase().includes('bond') || conceptName.toLowerCase().includes('molecule') || conceptName.toLowerCase().includes('reaction')) {
      return 'chemistry';
    } else if (conceptName.toLowerCase().includes('cell') || conceptName.toLowerCase().includes('dna') || conceptName.toLowerCase().includes('protein')) {
      return 'biology';
    }
    return 'physics'; // default
  };

  const subjectType = getSubjectType();

  const getExamples3D = () => {
    switch (subjectType) {
      case 'physics':
        return [
          {
            title: "Force Vectors in 3D Space",
            description: "Visualize how force vectors interact in three-dimensional space",
            audioNarration: "In this 3D visualization, you can see how force vectors combine in three-dimensional space to create resultant forces..."
          },
          {
            title: "Mass and Acceleration Relationship",
            description: "Interactive demonstration of how mass affects acceleration under constant force",
            audioNarration: "Observe how objects with different masses respond to the same applied force according to Newton's Second Law..."
          },
          {
            title: "Real-world Physics Applications",
            description: "3D models showing physics concepts in everyday scenarios",
            audioNarration: "These real-world examples demonstrate the practical applications of fundamental physics principles..."
          }
        ];
      case 'chemistry':
        return [
          {
            title: "Molecular Structure Visualization",
            description: "Explore molecular bonds and electron arrangements in 3D",
            audioNarration: "This 3D molecular model shows how atoms are arranged and how electrons are shared in chemical bonds..."
          },
          {
            title: "Chemical Reaction Dynamics",
            description: "Watch chemical reactions unfold in real-time 3D animation",
            audioNarration: "Observe how reactant molecules collide and transform into products during chemical reactions..."
          },
          {
            title: "Crystal Lattice Structures",
            description: "Interactive 3D models of various crystal formations",
            audioNarration: "Explore the repeating patterns and symmetries found in crystalline structures..."
          }
        ];
      case 'biology':
        return [
          {
            title: "Cell Structure Exploration",
            description: "Navigate through detailed 3D cell models",
            audioNarration: "Take a journey inside the cell to explore organelles and their functions in this detailed 3D model..."
          },
          {
            title: "DNA Double Helix",
            description: "Interactive 3D model of DNA structure and replication",
            audioNarration: "Discover the elegant structure of DNA and watch how it replicates during cell division..."
          },
          {
            title: "Protein Folding Simulation",
            description: "Watch proteins fold into their functional 3D shapes",
            audioNarration: "See how amino acid sequences determine protein structure and function through 3D folding..."
          }
        ];
      default:
        return [];
    }
  };

  const examples3D = getExamples3D();

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const getSubjectIcon = () => {
    switch (subjectType) {
      case 'physics':
        return <Atom className="h-8 w-8 text-blue-600" />;
      case 'chemistry':
        return <Beaker className="h-8 w-8 text-green-600" />;
      case 'biology':
        return <Dna className="h-8 w-8 text-purple-600" />;
      default:
        return <Box className="h-8 w-8 text-gray-600" />;
    }
  };

  const renderSimulationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live {subjectType.charAt(0).toUpperCase() + subjectType.slice(1)} Simulation</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleAudio}>
            {isAudioEnabled ? (
              <>
                <Volume2 className="h-4 w-4" />
                Audio On
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                Audio Off
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardContent className="p-6">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {subjectType === 'physics' && (
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                  </div>
                  
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-16 bg-red-400 relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-red-400"></div>
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-400 text-xs font-bold whitespace-nowrap">Force (F)</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-12 bg-green-400 relative">
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-green-400"></div>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 text-xs font-bold whitespace-nowrap">Acceleration (a)</span>
                    </div>
                  </div>
                </div>
              )}

              {subjectType === 'chemistry' && (
                <div className="relative">
                  <div className="flex items-center space-x-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold">O</span>
                    </div>
                    <div className="w-4 h-1 bg-white"></div>
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">H</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-white text-xs font-bold">H₂O Molecule</span>
                  </div>
                </div>
              )}

              {subjectType === 'biology' && (
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center relative">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full absolute"></div>
                    <div className="w-4 h-4 bg-blue-400 rounded-full absolute top-2 right-4"></div>
                    <div className="w-6 h-6 bg-red-400 rounded-full absolute bottom-2 left-6"></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-white text-xs font-bold">Cell Structure</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button size="sm" onClick={togglePlayback} className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isAudioEnabled && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-blue-600" />
                Audio Explanation
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {examples3D[selectedExample]?.audioNarration || `Learn about ${conceptName} through interactive 3D visualization with detailed audio explanations.`}
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={togglePlayback}>
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  {isPlaying ? 'Pause' : 'Play'} Audio
                </Button>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: isPlaying ? '45%' : '0%', transition: 'width 0.3s' }}></div>
                </div>
                <span className="text-xs text-gray-500">2:34 / 5:42</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderForceAnalysisContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {subjectType === 'physics' ? 'Force Vector Analysis' : 
         subjectType === 'chemistry' ? 'Molecular Analysis' : 
         'Biological Structure Analysis'}
      </h3>
      <Card>
        <CardContent className="p-6">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              {getSubjectIcon()}
              <p className="text-slate-500 dark:text-slate-400 mt-4">
                Interactive {subjectType} analysis visualization
              </p>
              <p className="text-sm text-slate-400 mt-2">Powered by AI {subjectType} engine</p>
              
              {isAudioEnabled && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <Button size="sm" onClick={togglePlayback} className="mb-2">
                    {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                    {isPlaying ? 'Pause' : 'Play'} Analysis Audio
                  </Button>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Listen to detailed analysis of {subjectType} concepts and interactions
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const render3DExamplesContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3D {subjectType.charAt(0).toUpperCase() + subjectType.slice(1)} Examples Library</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples3D.map((example, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-200 ${
              selectedExample === index
                ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 border'
                : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedExample(index)}
          >
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">{example.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{example.description}</p>
              
              {isAudioEnabled && selectedExample === index && (
                <div className="mt-3 p-2 bg-white dark:bg-gray-800 rounded border">
                  <Button size="sm" variant="outline" onClick={togglePlayback} className="w-full">
                    {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                    {isPlaying ? 'Pause' : 'Play'} Audio
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderVirtualLabContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">AI-Powered Virtual {subjectType.charAt(0).toUpperCase() + subjectType.slice(1)} Lab</h3>
      <Card>
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              {subjectType === 'chemistry' ? <FlaskConical className="h-12 w-12 text-green-600 mx-auto mb-4" /> :
               subjectType === 'biology' ? <Microscope className="h-12 w-12 text-purple-600 mx-auto mb-4" /> :
               <FlaskConical className="h-12 w-12 text-blue-600 mx-auto mb-4" />}
              
              <p className="text-slate-700 dark:text-slate-300 mb-2">Virtual {subjectType.charAt(0).toUpperCase() + subjectType.slice(1)} Laboratory Environment</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">AI-generated experiments and simulations</p>
              
              <Button className="mb-3" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Start {subjectType === 'chemistry' ? 'Chemical' : subjectType === 'biology' ? 'Biological' : 'Physics'} Experiment
              </Button>
              
              {isAudioEnabled && (
                <div className="mt-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg">
                  <Button size="sm" variant="outline" onClick={togglePlayback}>
                    {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                    {isPlaying ? 'Pause' : 'Play'} Lab Audio Guide
                  </Button>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Listen to step-by-step instructions for virtual experiments
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">3D Interactive Models - {conceptName}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 capitalize">{subjectType} Visualization</span>
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
          <TabsTrigger value="analysis">
            {subjectType === 'physics' ? 'Force Analysis' : 
             subjectType === 'chemistry' ? 'Molecular Analysis' : 
             'Structure Analysis'}
          </TabsTrigger>
          <TabsTrigger value="examples">3D Examples</TabsTrigger>
          <TabsTrigger value="lab">Virtual Lab</TabsTrigger>
        </TabsList>

        <TabsContent value="simulation" className="mt-6">
          {renderSimulationContent()}
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          {renderForceAnalysisContent()}
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          {render3DExamplesContent()}
        </TabsContent>

        <TabsContent value="lab" className="mt-6">
          {renderVirtualLabContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Enhanced3DTab;
