
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, Settings } from 'lucide-react';

const AIModelManagement = () => {
  const aiModels = [
    { name: 'Content Generator', status: 'deployed', accuracy: '94%', version: 'v2.1' },
    { name: 'Personalization Engine', status: 'deployed', accuracy: '87%', version: 'v1.8' },
    { name: 'Mood Analyzer', status: 'deployed', accuracy: '91%', version: 'v1.4' },
    { name: 'Study Plan Optimizer', status: 'testing', accuracy: '89%', version: 'v3.0-beta' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Model Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiModels.map((model) => (
              <div key={model.name} className="p-4 border rounded">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{model.name}</h3>
                  <Badge variant={model.status === 'deployed' ? 'default' : 'secondary'}>
                    {model.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div>Accuracy: {model.accuracy}</div>
                  <div>Version: {model.version}</div>
                </div>
                <div className="flex gap-1 mt-3">
                  <Button size="sm" variant="outline">Test</Button>
                  <Button size="sm" variant="outline">Update</Button>
                  <Button size="sm" variant="outline">Monitor</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">98.2%</div>
                <div className="text-sm text-muted-foreground">API Availability</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
            <Button>Run Comprehensive Test</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelManagement;
