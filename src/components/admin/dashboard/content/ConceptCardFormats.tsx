
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Eye, 
  Box, 
  FlaskConical, 
  Video, 
  AlertTriangle,
  Volume2,
  PlayCircle,
  Settings
} from 'lucide-react';
import { ConceptCardFormatOption } from "@/types/content";

interface ConceptCardFormatsProps {
  onSelectFormat: (format: string) => void;
  onConfigureFormat: (format: string) => void;
}

const conceptCardFormats: ConceptCardFormatOption[] = [
  {
    id: 'text-summary',
    name: 'Text Summary',
    description: 'AI-generated text summaries with key concepts',
    icon: 'FileText',
    features: ['Key points extraction', 'Difficulty adaptation', 'Related concepts linking']
  },
  {
    id: 'visual-diagram',
    name: 'Visual Diagram',
    description: 'Interactive diagrams with text and audio analysis',
    icon: 'Eye',
    features: ['Interactive visuals', 'Audio narration', 'Zoom & annotations', 'Step-by-step breakdown']
  },
  {
    id: '3d-model',
    name: '3D Model',
    description: '3D interactive models with audio explanations',
    icon: 'Box',
    features: ['360° interaction', 'Audio guidance', 'Layer exploration', 'Real-time manipulation']
  },
  {
    id: 'interactive-lab',
    name: 'Interactive Lab',
    description: 'Virtual lab environment for hands-on learning',
    icon: 'FlaskConical',
    features: ['Virtual experiments', 'Real-time feedback', 'Safe environment', 'Progress tracking']
  },
  {
    id: 'video',
    name: 'Video Content',
    description: 'AI-generated educational videos with explanations',
    icon: 'Video',
    features: ['Animated explanations', 'Multiple perspectives', 'Subtitle support', 'Playback controls']
  },
  {
    id: 'exam-mistakes',
    name: 'Exam Mistakes Analysis',
    description: 'Common mistakes and how to avoid them',
    icon: 'AlertTriangle',
    features: ['Error patterns', 'Prevention strategies', 'Practice questions', 'Improvement tracking']
  }
];

const iconComponents = {
  FileText,
  Eye,
  Box,
  FlaskConical,
  Video,
  AlertTriangle
};

const ConceptCardFormats: React.FC<ConceptCardFormatsProps> = ({ 
  onSelectFormat, 
  onConfigureFormat 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Concept Card Formats</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose the format for AI-generated concept cards. Each format links to different tabs in the student concept detail page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conceptCardFormats.map((format) => {
          const IconComponent = iconComponents[format.icon as keyof typeof iconComponents];
          
          return (
            <Card key={format.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{format.name}</CardTitle>
                    {(format.id === 'visual-diagram' || format.id === '3d-model') && (
                      <Badge variant="secondary" className="text-xs">
                        <Volume2 className="h-3 w-3 mr-1" />
                        Audio
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Features:</p>
                  <ul className="text-xs space-y-1">
                    {format.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={() => onSelectFormat(format.id)}
                    className="flex-1"
                  >
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Generate
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onConfigureFormat(format.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Volume2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Audio Analysis Feature</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Visual Diagram and 3D Model formats include AI-powered audio analysis that provides 
                spoken explanations, narration, and interactive voice guidance for enhanced learning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardFormats;
