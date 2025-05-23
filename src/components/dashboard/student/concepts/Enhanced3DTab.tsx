
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Play, Pause, Volume2, VolumeX, Maximize, Settings, Box, Atom, FlaskConical, Target, Activity } from 'lucide-react';

interface Enhanced3DTabProps {
  conceptName: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('simulation');

  const examples3D = [
    {
      title: "Force Vectors in 3D Space",
      description: "Visualize how force vectors interact in three-dimensional space",
      audioNarration: "In this 3D visualization, you can see how force vectors combine in three-dimensional space..."
    },
    {
      title: "Mass and Acceleration Relationship",
      description: "Interactive demonstration of how mass affects acceleration under constant force",
      audioNarration: "Observe how objects with different masses respond to the same applied force..."
    },
    {
      title: "Real-world Applications",
      description: "3D models showing Newton's Second Law in everyday scenarios",
      audioNarration: "These real-world examples demonstrate the practical applications of Newton's Second Law..."
    }
  ];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const renderSimulationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Physics Simulation</h3>
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
                {examples3D[selectedExample].audioNarration}
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
      <h3 className="text-lg font-semibold">Force Vector Analysis</h3>
      <Card>
        <CardContent className="p-6">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              <Atom className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">Interactive force analysis visualization</p>
              <p className="text-sm text-slate-400 mt-2">Powered by AI physics engine</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const render3DExamplesContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3D Examples Library</h3>
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
              <p className="text-xs text-gray-600 dark:text-gray-400">{example.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderVirtualLabContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">AI-Powered Virtual Physics Lab</h3>
      <Card>
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              <FlaskConical className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-slate-700 dark:text-slate-300 mb-2">Virtual Laboratory Environment</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">AI-generated experiments and simulations</p>
              <Button className="mt-4" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Start Experiment
              </Button>
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
