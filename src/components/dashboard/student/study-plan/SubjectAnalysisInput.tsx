
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";

const SubjectAnalysisInput = () => {
  const [subjects] = useState([
    { name: "Physics", confidence: 3, topics: ["Mechanics", "Thermodynamics", "Optics"] },
    { name: "Chemistry", confidence: 2, topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"] },
    { name: "Biology", confidence: 4, topics: ["Botany", "Zoology", "Human Physiology"] }
  ]);

  const [confidenceLevels, setConfidenceLevels] = useState({
    Physics: 3,
    Chemistry: 2,
    Biology: 4
  });

  const [topicPreferences, setTopicPreferences] = useState("");

  const getConfidenceColor = (level: number) => {
    if (level <= 2) return "text-red-600 bg-red-100";
    if (level <= 3) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getConfidenceIcon = (level: number) => {
    if (level <= 2) return <TrendingDown className="h-4 w-4" />;
    if (level <= 3) return <BarChart3 className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          📊 Subject Analysis Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-600">Weak Subjects (Need Focus)</h3>
            <div className="space-y-3">
              {subjects.filter(s => s.confidence <= 3).map((subject) => (
                <div key={subject.name} className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{subject.name}</span>
                    <Badge className={getConfidenceColor(subject.confidence)}>
                      {getConfidenceIcon(subject.confidence)}
                      Level {subject.confidence}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-green-600">Strong Subjects</h3>
            <div className="space-y-3">
              {subjects.filter(s => s.confidence > 3).map((subject) => (
                <div key={subject.name} className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{subject.name}</span>
                    <Badge className={getConfidenceColor(subject.confidence)}>
                      {getConfidenceIcon(subject.confidence)}
                      Level {subject.confidence}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Confidence Level per Subject (1-5 Scale)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-3">
                <Label>{subject.name}</Label>
                <div className="px-4">
                  <Slider
                    value={[confidenceLevels[subject.name as keyof typeof confidenceLevels]]}
                    onValueChange={(value) => 
                      setConfidenceLevels(prev => ({...prev, [subject.name]: value[0]}))
                    }
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Low (1)</span>
                  <span className="font-medium">
                    {confidenceLevels[subject.name as keyof typeof confidenceLevels]}
                  </span>
                  <span>High (5)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="topicPreferences">Topic Preferences (Optional)</Label>
          <Textarea
            id="topicPreferences"
            placeholder="Mention any specific topics you want to focus on or avoid..."
            value={topicPreferences}
            onChange={(e) => setTopicPreferences(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Update Subject Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectAnalysisInput;
