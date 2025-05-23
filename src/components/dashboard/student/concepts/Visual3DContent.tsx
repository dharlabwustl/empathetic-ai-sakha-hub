
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Play, RotateCcw, Zap, Atom, Beaker, Eye, Brain } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [activeModel, setActiveModel] = useState('molecular');
  const [isRotating, setIsRotating] = useState(false);
  const [currentView, setCurrentView] = useState('default');

  const playAudioExplanation = (type: string) => {
    let explanation = '';
    
    switch (type) {
      case 'molecular':
        explanation = `This 3D molecular model shows the structure of ${conceptName}. You can see how atoms are bonded together, the spatial arrangement, and how electrons are distributed. Notice the bond angles and molecular geometry which determine the properties of this compound.`;
        break;
      case 'atomic':
        explanation = `The atomic model visualization displays the electron cloud and nuclear structure related to ${conceptName}. Observe how electrons occupy different orbitals and energy levels. This helps understand the chemical behavior and bonding patterns.`;
        break;
      case 'simulation':
        explanation = `This interactive simulation demonstrates the dynamic behavior of ${conceptName}. Watch how particles move, interact, and change over time. You can adjust parameters to see how different conditions affect the system.`;
        break;
      case 'crossSection':
        explanation = `The cross-sectional view reveals the internal structure of ${conceptName}. This perspective shows layers, boundaries, and internal components that are normally hidden from view.`;
        break;
      default:
        explanation = `Welcome to the 3D laboratory for ${conceptName}. Here you can explore interactive models, simulations, and visualizations to understand this concept better.`;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
    const action = isRotating ? 'stopped' : 'started';
    toast({
      title: `Rotation ${action}`,
      description: `3D model rotation has been ${action}.`,
    });
  };

  const changeView = (view: string) => {
    setCurrentView(view);
    playAudioExplanation('viewChange');
    toast({
      title: "View changed",
      description: `Switched to ${view} view of the 3D model.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            3D Virtual Laboratory - {conceptName}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">Interactive</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">Audio Enabled</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">Real-time</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Button
              variant={activeModel === 'molecular' ? 'default' : 'outline'}
              onClick={() => {
                setActiveModel('molecular');
                playAudioExplanation('molecular');
              }}
              className="flex items-center gap-2"
            >
              <Atom className="h-4 w-4" />
              Molecular Model
            </Button>
            <Button
              variant={activeModel === 'atomic' ? 'default' : 'outline'}
              onClick={() => {
                setActiveModel('atomic');
                playAudioExplanation('atomic');
              }}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Atomic Structure
            </Button>
            <Button
              variant={activeModel === 'simulation' ? 'default' : 'outline'}
              onClick={() => {
                setActiveModel('simulation');
                playAudioExplanation('simulation');
              }}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Live Simulation
            </Button>
            <Button
              variant={activeModel === 'crossSection' ? 'default' : 'outline'}
              onClick={() => {
                setActiveModel('crossSection');
                playAudioExplanation('crossSection');
              }}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Cross Section
            </Button>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 min-h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
            
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center space-y-6">
                {activeModel === 'molecular' && (
                  <div className="space-y-4">
                    <div className={`w-80 h-80 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center ${isRotating ? 'animate-spin' : ''} transition-all duration-1000`}>
                      <div className="w-60 h-60 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Atom className="h-24 w-24 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Molecular Structure of {conceptName}</h3>
                    <p className="text-blue-200 max-w-md mx-auto">
                      Interactive 3D model showing atomic bonds, electron distribution, and molecular geometry.
                    </p>
                  </div>
                )}

                {activeModel === 'atomic' && (
                  <div className="space-y-4">
                    <div className={`w-80 h-80 mx-auto bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center ${isRotating ? 'animate-pulse' : ''} transition-all duration-1000`}>
                      <div className="w-60 h-60 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Zap className="h-24 w-24 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Atomic Structure View</h3>
                    <p className="text-yellow-200 max-w-md mx-auto">
                      Explore electron orbitals, energy levels, and nuclear composition.
                    </p>
                  </div>
                )}

                {activeModel === 'simulation' && (
                  <div className="space-y-4">
                    <div className={`w-80 h-80 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center ${isRotating ? 'animate-bounce' : ''} transition-all duration-1000`}>
                      <div className="w-60 h-60 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="h-24 w-24 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Live Simulation</h3>
                    <p className="text-green-200 max-w-md mx-auto">
                      Real-time simulation showing dynamic behavior and interactions.
                    </p>
                  </div>
                )}

                {activeModel === 'crossSection' && (
                  <div className="space-y-4">
                    <div className={`w-80 h-80 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center ${isRotating ? 'animate-spin' : ''} transition-all duration-1000`}>
                      <div className="w-60 h-60 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Eye className="h-24 w-24 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Cross-Sectional View</h3>
                    <p className="text-purple-200 max-w-md mx-auto">
                      Internal structure and layered composition analysis.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => changeView('front')}
                className={currentView === 'front' ? 'bg-white text-black' : ''}
              >
                Front
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => changeView('side')}
                className={currentView === 'side' ? 'bg-white text-black' : ''}
              >
                Side
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => changeView('top')}
                className={currentView === 'top' ? 'bg-white text-black' : ''}
              >
                Top
              </Button>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleRotation}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {isRotating ? 'Stop' : 'Rotate'}
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => playAudioExplanation(activeModel)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Volume2 className="h-4 w-4" />
              Audio Explanation
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const detailedInfo = `This ${activeModel} view of ${conceptName} provides detailed insights into its structure and behavior. The 3D visualization allows you to understand complex spatial relationships and dynamic processes that are difficult to grasp from 2D representations.`;
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(detailedInfo);
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
            >
              Detailed Analysis
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const instructions = `Use the view buttons to change perspectives, click rotate to animate the model, and select different model types to explore various aspects of ${conceptName}. Each view provides unique insights into the structure and behavior.`;
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(instructions);
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
            >
              <Beaker className="h-4 w-4 mr-2" />
              Instructions
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-green-600" />
            Virtual Lab Experiments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/30">
              <h4 className="font-semibold mb-2">Interactive Experiment 1</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Explore the properties and behavior of {conceptName} under different conditions.
              </p>
              <Button 
                size="sm" 
                onClick={() => {
                  const explanation = `Starting interactive experiment 1 for ${conceptName}. This experiment allows you to manipulate variables and observe how they affect the system in real-time.`;
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(explanation);
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                Start Experiment
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <h4 className="font-semibold mb-2">Interactive Experiment 2</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Advanced simulation showing complex interactions and processes.
              </p>
              <Button 
                size="sm" 
                onClick={() => {
                  const explanation = `Launching advanced simulation for ${conceptName}. This experiment demonstrates complex interactions and allows you to analyze cause-and-effect relationships.`;
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(explanation);
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                Launch Simulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visual3DContent;
