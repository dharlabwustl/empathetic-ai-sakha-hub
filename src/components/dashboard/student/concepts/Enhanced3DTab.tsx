
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Play, Pause, Volume2, VolumeX, Maximize, Settings, Box, Atom, FlaskConical, Target, Activity, Beaker, Microscope } from 'lucide-react';

interface Enhanced3DTabProps {
  conceptName: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('simulation');
  const [currentAudioTab, setCurrentAudioTab] = useState<string | null>(null);

  const examples3D = [
    {
      title: "Force Vectors in 3D Space",
      description: "Visualize how force vectors interact in three-dimensional space",
      audioNarration: "In this 3D visualization, you can see how force vectors combine in three-dimensional space to create resultant forces..."
    },
    {
      title: "Mass and Acceleration Relationship",
      description: "Interactive demonstration of how mass affects acceleration under constant force",
      audioNarration: "Observe how objects with different masses respond to the same applied force, demonstrating Newton's Second Law..."
    },
    {
      title: "Real-world Applications",
      description: "3D models showing Newton's Second Law in everyday scenarios",
      audioNarration: "These real-world examples demonstrate the practical applications of Newton's Second Law in engineering and physics..."
    }
  ];

  const getSubjectSpecificContent = () => {
    const conceptLower = conceptName.toLowerCase();
    
    if (conceptLower.includes('physics') || conceptLower.includes('force') || conceptLower.includes('newton')) {
      return {
        simulationTitle: "Physics Force Simulation",
        simulationDescription: "Interactive 3D physics simulation with force vectors and motion analysis",
        labTitle: "Physics Virtual Laboratory",
        labDescription: "Conduct virtual physics experiments with real-time data collection",
        icon: <Target className="h-12 w-12 text-blue-600" />
      };
    } else if (conceptLower.includes('chemistry') || conceptLower.includes('molecule') || conceptLower.includes('bond')) {
      return {
        simulationTitle: "Molecular Structure Simulation",
        simulationDescription: "3D molecular modeling with bond analysis and electron visualization",
        labTitle: "Chemistry Virtual Lab",
        labDescription: "Virtual chemistry experiments with safety protocols and data analysis",
        icon: <Beaker className="h-12 w-12 text-green-600" />
      };
    } else if (conceptLower.includes('biology') || conceptLower.includes('cell') || conceptLower.includes('organ')) {
      return {
        simulationTitle: "Biological System Simulation",
        simulationDescription: "3D biological structure modeling with cellular interaction analysis",
        labTitle: "Biology Virtual Lab",
        labDescription: "Virtual biological experiments with microscopy and specimen analysis",
        icon: <Microscope className="h-12 w-12 text-purple-600" />
      };
    }
    
    return {
      simulationTitle: "Interactive Simulation",
      simulationDescription: "3D interactive simulation with real-time analysis",
      labTitle: "Virtual Laboratory",
      labDescription: "Comprehensive virtual lab environment with AI-powered experiments",
      icon: <FlaskConical className="h-12 w-12 text-indigo-600" />
    };
  };

  const subjectContent = getSubjectSpecificContent();

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const playTabAudio = (tabName: string, text: string) => {
    if (isAudioEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      setCurrentAudioTab(tabName);
      utterance.onend = () => setCurrentAudioTab(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentAudioTab(null);
    }
  };

  const renderSimulationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{subjectContent.simulationTitle}</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => playTabAudio('simulation', `Welcome to the ${subjectContent.simulationTitle}. ${subjectContent.simulationDescription}. You can interact with the 3D model by clicking and dragging to rotate, and use the controls to modify simulation parameters.`)}
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Explain Simulation
          </Button>
          {currentAudioTab === 'simulation' && (
            <Button variant="outline" size="sm" onClick={stopAudio}>
              <VolumeX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardContent className="p-6">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                  <div className="w-full h-full bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                </div>
                
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-16 bg-red-400 relative animate-pulse">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-red-400"></div>
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-400 text-xs font-bold whitespace-nowrap">Force (F)</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-12 bg-green-400 relative animate-bounce">
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-green-400"></div>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 text-xs font-bold whitespace-nowrap">Acceleration (a)</span>
                  </div>
                </div>
              </div>
              
              {/* Interactive controls overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-white/10 backdrop-blur-sm rounded p-2">
                  <span className="text-white text-xs">Mass: 5kg</span>
                  <input type="range" min="1" max="10" defaultValue="5" className="w-full h-1 bg-white/20 rounded" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded p-2">
                  <span className="text-white text-xs">Force: 15N</span>
                  <input type="range" min="1" max="50" defaultValue="15" className="w-full h-1 bg-white/20 rounded" />
                </div>
              </div>
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

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-blue-600" />
              Real-time Analysis
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">3.0 m/s²</div>
                <div className="text-xs text-gray-500">Acceleration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">15 N</div>
                <div className="text-xs text-gray-500">Applied Force</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">5 kg</div>
                <div className="text-xs text-gray-500">Object Mass</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderForceAnalysisContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Force Vector Analysis</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => playTabAudio('analysis', 'This force analysis tool helps you understand how multiple forces combine to create resultant forces. You can add, remove, and modify force vectors to see their combined effect in real-time.')}
        >
          <Volume2 className="h-4 w-4 mr-2" />
          Explain Analysis
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center relative">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-gray-400"></div>
              ))}
            </div>
            
            <div className="relative">
              {subjectContent.icon}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                    </marker>
                  </defs>
                  <line x1="50" y1="50" x2="70" y2="30" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="50" y1="50" x2="30" y2="40" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="50" y1="50" x2="60" y2="70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </svg>
              </div>
            </div>
            
            {currentAudioTab !== 'analysis' && (
              <div className="absolute bottom-4 right-4 text-center p-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm">Interactive force analysis visualization</p>
                <p className="text-xs text-slate-400 mt-2">Click vectors to modify • AI-powered calculations</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
              <div className="text-red-600 font-bold">F₁ = 25N</div>
              <div className="text-xs text-gray-500">Force Vector 1</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
              <div className="text-green-600 font-bold">F₂ = 15N</div>
              <div className="text-xs text-gray-500">Force Vector 2</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
              <div className="text-blue-600 font-bold">Fr = 32N</div>
              <div className="text-xs text-gray-500">Resultant Force</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const render3DExamplesContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">3D Examples Library</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => playTabAudio('examples', `Welcome to the 3D examples library. Here you can explore ${examples3D.length} different interactive examples that demonstrate ${conceptName} in various real-world scenarios.`)}
        >
          <Volume2 className="h-4 w-4 mr-2" />
          Explain Examples
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples3D.map((example, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-200 ${
              selectedExample === index
                ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 border'
                : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => {
              setSelectedExample(index);
              if (isAudioEnabled) {
                playTabAudio(`example-${index}`, example.audioNarration);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{example.title}</h4>
                {currentAudioTab === `example-${index}` && (
                  <Volume2 className="h-4 w-4 text-indigo-600 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{example.description}</p>
              
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Box className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <span className="text-xs text-gray-500">3D Model {index + 1}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderVirtualLabContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{subjectContent.labTitle}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => playTabAudio('lab', `Welcome to the ${subjectContent.labTitle}. This AI-powered virtual laboratory allows you to conduct safe, interactive experiments with real-time data collection and analysis.`)}
        >
          <Volume2 className="h-4 w-4 mr-2" />
          Lab Tour
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg aspect-video flex flex-col items-center justify-center p-6">
            <div className="text-center mb-6">
              {subjectContent.icon}
              <h4 className="text-xl font-semibold mt-4 mb-2">{subjectContent.labTitle}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{subjectContent.labDescription}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <Button className="flex flex-col items-center p-4 h-auto">
                <Activity className="h-6 w-6 mb-2" />
                <span className="text-sm">Start Experiment</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Settings className="h-6 w-6 mb-2" />
                <span className="text-sm">Lab Settings</span>
              </Button>
            </div>
            
            {currentAudioTab === 'lab' && (
              <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                  <span className="text-sm font-medium">Audio Guide Active</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
              <div className="text-green-600 font-bold">Safe</div>
              <div className="text-xs text-gray-500">Virtual Environment</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
              <div className="text-blue-600 font-bold">AI-Powered</div>
              <div className="text-xs text-gray-500">Smart Analysis</div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
              <div className="text-purple-600 font-bold">Real-time</div>
              <div className="text-xs text-gray-500">Data Collection</div>
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
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAudio}
            className="flex items-center gap-2"
          >
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
          {currentAudioTab && (
            <Button variant="outline" size="sm" onClick={stopAudio}>
              <Pause className="h-4 w-4" />
              Stop Audio
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
          <TabsTrigger value="analysis">Force Analysis</TabsTrigger>
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
