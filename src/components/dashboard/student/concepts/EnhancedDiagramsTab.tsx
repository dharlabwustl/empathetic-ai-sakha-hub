
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Volume2, MessageSquare, Eye, Network, Lightbulb, 
  FlaskConical, GitCompare, RotateCw, Settings 
} from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ conceptName, subject }) => {
  const [activeSubTab, setActiveSubTab] = useState('interactive');
  const [isAudioPlaying, setIsAudioPlaying] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  const playAudioExplanation = (diagramType: string, content: string) => {
    if (isAudioPlaying === diagramType) {
      // Pause current audio
      window.speechSynthesis.cancel();
      setIsAudioPlaying(null);
    } else {
      // Stop any current audio and play new one
      window.speechSynthesis.cancel();
      setIsAudioPlaying(diagramType);
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => setIsAudioPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const openAITutor = (context: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            Interactive Diagrams - {subject}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="lab">Virtual Laboratory</TabsTrigger>
            </TabsList>

            <TabsContent value="interactive" className="mt-6">
              <InteractiveDiagramsSection 
                conceptName={conceptName}
                subject={subject}
                isAudioPlaying={isAudioPlaying}
                onPlayAudio={playAudioExplanation}
                onOpenTutor={openAITutor}
              />
            </TabsContent>

            <TabsContent value="relationships" className="mt-6">
              <RelationshipGraphsSection 
                conceptName={conceptName}
                subject={subject}
                isAudioPlaying={isAudioPlaying}
                onPlayAudio={playAudioExplanation}
                onOpenTutor={openAITutor}
              />
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <RealWorldApplicationsSection 
                conceptName={conceptName}
                subject={subject}
                isAudioPlaying={isAudioPlaying}
                onPlayAudio={playAudioExplanation}
                onOpenTutor={openAITutor}
              />
            </TabsContent>

            <TabsContent value="comparison" className="mt-6">
              <ComparisonToolsSection 
                conceptName={conceptName}
                subject={subject}
                isAudioPlaying={isAudioPlaying}
                onPlayAudio={playAudioExplanation}
                onOpenTutor={openAITutor}
              />
            </TabsContent>

            <TabsContent value="lab" className="mt-6">
              <InteractiveLabSection 
                conceptName={conceptName}
                subject={subject}
                isAudioPlaying={isAudioPlaying}
                onPlayAudio={playAudioExplanation}
                onOpenTutor={openAITutor}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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

// Individual Section Components
const InteractiveDiagramsSection: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const audioContent = `This interactive diagram shows the key components and relationships within ${conceptName}. You can click on different elements to explore how they interact with each other in ${subject}.`;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-950 dark:to-purple-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Interactive {conceptName} Diagram</h3>
          <Badge variant="outline">{subject}</Badge>
        </div>
        
        <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg mb-4">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Eye className="h-16 w-16 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive diagram for {conceptName} loads here
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPlayAudio('interactive', audioContent)}
              className="flex items-center gap-2"
            >
              {isAudioPlaying === 'interactive' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isAudioPlaying === 'interactive' ? 'Pause' : 'Play'} Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTutor(`Interactive diagram of ${conceptName} in ${subject}`)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Customize View
          </Button>
        </div>
      </div>
    </div>
  );
};

const RelationshipGraphsSection: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const audioContent = `This relationship graph visualizes how ${conceptName} connects to other concepts in ${subject}. The network shows dependencies, influences, and correlations between different elements.`;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950 dark:to-teal-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Relationship Network - {conceptName}</h3>
          <Badge variant="outline">{subject}</Badge>
        </div>
        
        <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg mb-4">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
              <Network className="h-16 w-16 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Network graph showing relationships for {conceptName}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPlayAudio('relationships', audioContent)}
              className="flex items-center gap-2"
            >
              {isAudioPlaying === 'relationships' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isAudioPlaying === 'relationships' ? 'Pause' : 'Play'} Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTutor(`Relationship network of ${conceptName} in ${subject}`)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <RotateCw className="h-4 w-4 mr-2" />
            Rearrange Network
          </Button>
        </div>
      </div>
    </div>
  );
};

const RealWorldApplicationsSection: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const audioContent = `Here are practical applications of ${conceptName} in real-world scenarios. These examples show how the concept is used in industry, daily life, and modern technology within ${subject}.`;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Real-World Applications</h3>
          <Badge variant="outline">{subject}</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            { title: 'Industry Application', description: `How ${conceptName} is used in manufacturing and industry` },
            { title: 'Daily Life Example', description: `Common examples of ${conceptName} in everyday situations` },
            { title: 'Technology Integration', description: `Modern tech applications leveraging ${conceptName}` },
            { title: 'Future Innovations', description: `Emerging uses of ${conceptName} in cutting-edge research` }
          ].map((app, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{app.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{app.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPlayAudio('applications', audioContent)}
              className="flex items-center gap-2"
            >
              {isAudioPlaying === 'applications' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isAudioPlaying === 'applications' ? 'Pause' : 'Play'} Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTutor(`Real-world applications of ${conceptName} in ${subject}`)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Lightbulb className="h-4 w-4 mr-2" />
            More Examples
          </Button>
        </div>
      </div>
    </div>
  );
};

const ComparisonToolsSection: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const audioContent = `This comparison tool analyzes ${conceptName} against related concepts in ${subject}. It highlights similarities, differences, and helps you understand when to apply each concept.`;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Concept Comparison Analysis</h3>
          <Badge variant="outline">{subject}</Badge>
        </div>
        
        <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg mb-4">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <GitCompare className="h-16 w-16 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive comparison tool for {conceptName}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPlayAudio('comparison', audioContent)}
              className="flex items-center gap-2"
            >
              {isAudioPlaying === 'comparison' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isAudioPlaying === 'comparison' ? 'Pause' : 'Play'} Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTutor(`Comparison analysis of ${conceptName} with related concepts in ${subject}`)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <GitCompare className="h-4 w-4 mr-2" />
            Add Concepts
          </Button>
        </div>
      </div>
    </div>
  );
};

const InteractiveLabSection: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);

  const audioContent = `Welcome to the virtual laboratory for ${conceptName}. Here you can conduct interactive experiments, adjust parameters, and observe real-time results to better understand the concept in ${subject}.`;

  const startExperiment = () => {
    setExperimentRunning(true);
    const newResult = `${conceptName} experiment completed at ${new Date().toLocaleTimeString()}`;
    
    setTimeout(() => {
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Virtual Laboratory</h3>
          <Badge variant="outline">{subject}</Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Lab Equipment & Controls</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Measuring Tools', 'Sensors', 'Controls', 'Data Logger'].map((tool, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <FlaskConical className="h-6 w-6 mx-auto mb-1 text-indigo-600" />
                  <p className="text-xs">{tool}</p>
                </div>
              ))}
            </div>
            
            <Button
              onClick={startExperiment}
              disabled={experimentRunning}
              className="w-full"
              variant={experimentRunning ? "secondary" : "default"}
            >
              {experimentRunning ? 'Running...' : 'Start Experiment'}
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Results & Analysis</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[150px]">
              {labResults.length === 0 ? (
                <p className="text-gray-500 text-center">No experiments run yet</p>
              ) : (
                <div className="space-y-2">
                  {labResults.map((result, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPlayAudio('lab', audioContent)}
              className="flex items-center gap-2"
            >
              {isAudioPlaying === 'lab' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isAudioPlaying === 'lab' ? 'Pause' : 'Play'} Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTutor(`Virtual laboratory experiments for ${conceptName} in ${subject}`)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <FlaskConical className="h-4 w-4 mr-2" />
            Lab Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDiagramsTab;
