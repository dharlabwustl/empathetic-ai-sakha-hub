
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { BarChart3, TrendingDown, TrendingUp, Brain, Star } from 'lucide-react';

export const SubjectAnalysisSection = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      strength: 'weak',
      confidence: 3,
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics']
    },
    {
      id: 'chemistry',
      name: 'Chemistry', 
      color: '#10B981',
      strength: 'medium',
      confidence: 4,
      topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      strength: 'strong',
      confidence: 5,
      topics: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology']
    }
  ]);

  const updateSubjectStrength = (subjectId: string, strength: string) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, strength } : s
    ));
  };

  const updateConfidence = (subjectId: string, confidence: number) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, confidence } : s
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Subject Analysis & Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      <h3 className="font-semibold">{subject.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      {['weak', 'medium', 'strong'].map((strength) => (
                        <Button
                          key={strength}
                          variant={subject.strength === strength ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSubjectStrength(subject.id, strength)}
                          className={`
                            ${strength === 'weak' ? 'border-red-300 text-red-600' : ''}
                            ${strength === 'medium' ? 'border-yellow-300 text-yellow-600' : ''}
                            ${strength === 'strong' ? 'border-green-300 text-green-600' : ''}
                          `}
                        >
                          {strength === 'weak' && <TrendingDown className="h-3 w-3 mr-1" />}
                          {strength === 'medium' && <Brain className="h-3 w-3 mr-1" />}
                          {strength === 'strong' && <TrendingUp className="h-3 w-3 mr-1" />}
                          {strength.charAt(0).toUpperCase() + strength.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Confidence Level</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 cursor-pointer ${
                                star <= subject.confidence ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                              onClick={() => updateConfidence(subject.id, star)}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{subject.confidence}/5</span>
                        </div>
                      </div>
                      <Progress value={subject.confidence * 20} className="h-2" />
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium mb-2 block">Key Topics</span>
                      <div className="flex flex-wrap gap-1">
                        {subject.topics.map((topic, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs"
                            style={{ borderColor: subject.color }}
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Analysis Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-red-600">Weak Subjects:</span>
                <span className="ml-2">
                  {subjects.filter(s => s.strength === 'weak').map(s => s.name).join(', ') || 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium text-yellow-600">Medium Subjects:</span>
                <span className="ml-2">
                  {subjects.filter(s => s.strength === 'medium').map(s => s.name).join(', ') || 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-600">Strong Subjects:</span>
                <span className="ml-2">
                  {subjects.filter(s => s.strength === 'strong').map(s => s.name).join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
