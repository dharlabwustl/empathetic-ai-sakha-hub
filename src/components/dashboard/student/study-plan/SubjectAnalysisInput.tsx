
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

interface SubjectAnalysisInputProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SubjectAnalysisInput: React.FC<SubjectAnalysisInputProps> = ({ data, onUpdate }) => {
  const [subjects] = useState([
    { id: 'physics', name: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Modern Physics'] },
    { id: 'chemistry', name: 'Chemistry', topics: ['Physical', 'Organic', 'Inorganic'] },
    { id: 'biology', name: 'Biology', topics: ['Botany', 'Zoology', 'Human Physiology', 'Ecology'] }
  ]);

  const [subjectData, setSubjectData] = useState({
    physics: { classification: data?.physics?.classification || 'neutral', confidence: data?.physics?.confidence || 3, topics: {} },
    chemistry: { classification: data?.chemistry?.classification || 'weak', confidence: data?.chemistry?.confidence || 2, topics: {} },
    biology: { classification: data?.biology?.classification || 'strong', confidence: data?.biology?.confidence || 4, topics: {} }
  });

  const handleClassificationChange = (subjectId: string, classification: string) => {
    const updated = {
      ...subjectData,
      [subjectId]: { ...subjectData[subjectId as keyof typeof subjectData], classification }
    };
    setSubjectData(updated);
    onUpdate(updated);
  };

  const handleConfidenceChange = (subjectId: string, confidence: number[]) => {
    const updated = {
      ...subjectData,
      [subjectId]: { ...subjectData[subjectId as keyof typeof subjectData], confidence: confidence[0] }
    };
    setSubjectData(updated);
    onUpdate(updated);
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'weak': return 'bg-red-100 text-red-800 border-red-300';
      case 'strong': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence <= 2) return 'bg-red-500';
    if (confidence <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getOverallStats = () => {
    const weakSubjects = Object.values(subjectData).filter(s => s.classification === 'weak').length;
    const strongSubjects = Object.values(subjectData).filter(s => s.classification === 'strong').length;
    const avgConfidence = Object.values(subjectData).reduce((acc, s) => acc + s.confidence, 0) / 3;
    
    return { weakSubjects, strongSubjects, avgConfidence: Math.round(avgConfidence * 10) / 10 };
  };

  const stats = getOverallStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Subject Analysis & Confidence Mapping
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjects.map((subject) => {
            const subjectInfo = subjectData[subject.id as keyof typeof subjectData];
            return (
              <Card key={subject.id} className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium">{subject.name}</h4>
                      <div className="flex gap-2">
                        {['weak', 'neutral', 'strong'].map((classification) => (
                          <Button
                            key={classification}
                            variant={subjectInfo.classification === classification ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleClassificationChange(subject.id, classification)}
                            className={`${
                              subjectInfo.classification === classification 
                                ? getClassificationColor(classification).replace('bg-', 'bg-opacity-20 border-')
                                : ''
                            }`}
                          >
                            {classification === 'weak' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {classification === 'strong' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {classification.charAt(0).toUpperCase() + classification.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Confidence Level</span>
                        <Badge className={getClassificationColor(subjectInfo.classification)}>
                          {subjectInfo.confidence}/5
                        </Badge>
                      </div>
                      <Slider
                        value={[subjectInfo.confidence]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => handleConfidenceChange(subject.id, value)}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Topics:</span>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-800 dark:text-red-400">{stats.weakSubjects}</div>
              <div className="text-sm text-red-600">Weak Subjects</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800 dark:text-green-400">{stats.strongSubjects}</div>
              <div className="text-sm text-green-600">Strong Subjects</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-400">{stats.avgConfidence}</div>
              <div className="text-sm text-blue-600">Avg Confidence</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Confidence Distribution</h4>
            <div className="space-y-2">
              {subjects.map((subject) => {
                const confidence = subjectData[subject.id as keyof typeof subjectData].confidence;
                return (
                  <div key={subject.id} className="flex items-center gap-3">
                    <span className="w-20 text-sm">{subject.name}</span>
                    <Progress value={confidence * 20} className="flex-1" />
                    <span className="text-sm text-gray-500">{confidence}/5</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectAnalysisInput;
