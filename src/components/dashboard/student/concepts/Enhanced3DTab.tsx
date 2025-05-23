import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Play, Pause, Volume2, VolumeX, Maximize, Settings, Box } from 'lucide-react';

interface Enhanced3DTabProps {
  conceptName: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedExample, setSelectedExample] = useState(0);

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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Viewer */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5 text-indigo-600" />
                Interactive 3D Simulation
              </CardTitle>
              <CardDescription>
                {examples3D[selectedExample].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 3D Canvas Area */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 flex items-center justify-center relative overflow-hidden">
                {/* Simulated 3D Scene */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                
                {/* 3D Objects Simulation */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative">
                    {/* Main Object */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                    </div>
                    
                    {/* Force Vectors */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-16 bg-red-400 relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-red-400"></div>
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-400 text-xs font-bold whitespace-nowrap">Force (F)</span>
                      </div>
                    </div>
                    
                    {/* Acceleration Vector */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-12 bg-green-400 relative">
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-green-400"></div>
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 text-xs font-bold whitespace-nowrap">Acceleration (a)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Control Overlay */}
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

              {/* Audio Analysis Panel */}
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

        {/* Controls and Examples */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3D Examples</CardTitle>
              <CardDescription>
                Choose different scenarios to explore
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {examples3D.map((example, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedExample === index
                      ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 border'
                      : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedExample(index)}
                >
                  <h4 className="font-medium text-sm mb-1">{example.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{example.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3D Analysis Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Box className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium text-sm">Interactive Manipulation</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rotate, zoom, and explore in 3D space</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <Volume2 className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-sm">Audio Narration</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Detailed explanations with voice-over</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Settings className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-sm">Customizable Parameters</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Adjust mass, force, and other variables</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <div className="font-medium mb-1">Vector Decomposition</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Forces broken down into X, Y, and Z components
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <div className="font-medium mb-1">Real-time Calculations</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Live updates of acceleration and resulting motion
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <div className="font-medium mb-1">Comparative Analysis</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Side-by-side comparison of different scenarios
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DTab;
