
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { BarChart3, TrendingDown, TrendingUp, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SubjectAnalysisSection = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      isWeak: true,
      isStrong: false,
      confidenceLevel: 2,
      topics: [
        { name: 'Mechanics', confidence: 3, isPreferred: true },
        { name: 'Thermodynamics', confidence: 2, isPreferred: false },
        { name: 'Electromagnetism', confidence: 1, isPreferred: false },
        { name: 'Optics', confidence: 2, isPreferred: true },
        { name: 'Modern Physics', confidence: 1, isPreferred: false }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10B981',
      isWeak: true,
      isStrong: false,
      confidenceLevel: 2,
      topics: [
        { name: 'Physical Chemistry', confidence: 2, isPreferred: false },
        { name: 'Organic Chemistry', confidence: 1, isPreferred: false },
        { name: 'Inorganic Chemistry', confidence: 3, isPreferred: true }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      isWeak: false,
      isStrong: true,
      confidenceLevel: 4,
      topics: [
        { name: 'Botany', confidence: 4, isPreferred: true },
        { name: 'Zoology', confidence: 4, isPreferred: true },
        { name: 'Human Physiology', confidence: 3, isPreferred: true }
      ]
    }
  ]);

  const toggleSubjectStatus = (subjectId: string, type: 'weak' | 'strong') => {
    setSubjects(prev => prev.map(subject => {
      if (subject.id === subjectId) {
        if (type === 'weak') {
          return { ...subject, isWeak: !subject.isWeak, isStrong: subject.isWeak ? false : subject.isStrong };
        } else {
          return { ...subject, isStrong: !subject.isStrong, isWeak: subject.isStrong ? false : subject.isWeak };
        }
      }
      return subject;
    }));
  };

  const updateConfidence = (subjectId: string, confidence: number) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId ? { ...subject, confidenceLevel: confidence } : subject
    ));
  };

  const saveAnalysis = () => {
    toast({
      title: "Analysis Saved",
      description: "Your subject analysis has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Subject Classification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Subject Strength Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <h3 className="font-medium">{subject.name}</h3>
                  </div>
                  <div className="flex gap-1">
                    {subject.isWeak && <Badge variant="destructive" className="text-xs">Weak</Badge>}
                    {subject.isStrong && <Badge variant="default" className="text-xs bg-green-100 text-green-700">Strong</Badge>}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm">Overall Confidence (1-5)</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Slider
                        value={[subject.confidenceLevel]}
                        onValueChange={(value) => updateConfidence(subject.id, value[0])}
                        max={5}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{subject.confidenceLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={subject.isWeak ? "destructive" : "outline"}
                      onClick={() => toggleSubjectStatus(subject.id, 'weak')}
                      className="flex-1"
                    >
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Weak
                    </Button>
                    <Button
                      size="sm"
                      variant={subject.isStrong ? "default" : "outline"}
                      onClick={() => toggleSubjectStatus(subject.id, 'strong')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Strong
                    </Button>
                  </div>
                </div>

                {/* Topic-wise confidence */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Topic Confidence</Label>
                  {subject.topics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        {topic.isPreferred && <CheckCircle className="h-3 w-3 text-green-500" />}
                        {topic.confidence <= 2 && <AlertTriangle className="h-3 w-3 text-red-500" />}
                        {topic.name}
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= topic.confidence ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <TrendingDown className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-medium text-red-800">Weak Subjects</h3>
              <div className="text-2xl font-bold text-red-600">
                {subjects.filter(s => s.isWeak).length}
              </div>
              <div className="text-sm text-red-600 mt-1">
                {subjects.filter(s => s.isWeak).map(s => s.name).join(', ')}
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium text-green-800">Strong Subjects</h3>
              <div className="text-2xl font-bold text-green-600">
                {subjects.filter(s => s.isStrong).length}
              </div>
              <div className="text-sm text-green-600 mt-1">
                {subjects.filter(s => s.isStrong).map(s => s.name).join(', ')}
              </div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Star className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium text-blue-800">Avg Confidence</h3>
              <div className="text-2xl font-bold text-blue-600">
                {(subjects.reduce((sum, s) => sum + s.confidenceLevel, 0) / subjects.length).toFixed(1)}
              </div>
              <div className="text-sm text-blue-600 mt-1">
                Out of 5.0
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={saveAnalysis}>
              Save Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
