
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  TrendingUp,
  Users,
  Brain,
  Activity
} from "lucide-react";

const MoodAnalyticsTab = () => {
  const moodDistribution = [
    { mood: "Happy", count: 1423, percentage: 42.3, icon: Smile, color: "text-green-600" },
    { mood: "Neutral", count: 1087, percentage: 32.1, icon: Meh, color: "text-yellow-600" },
    { mood: "Stressed", count: 612, percentage: 18.2, icon: Frown, color: "text-red-600" },
    { mood: "Excited", count: 245, percentage: 7.4, icon: Heart, color: "text-purple-600" }
  ];

  const moodImpactData = [
    { metric: "Study Session Completion", happy: 89, stressed: 67, improvement: "+22%" },
    { metric: "Concept Recall Accuracy", happy: 84, stressed: 71, improvement: "+13%" },
    { metric: "Daily Goal Achievement", happy: 92, stressed: 58, improvement: "+34%" },
    { metric: "Time Spent Learning", happy: 3.2, stressed: 2.1, improvement: "+52%" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Mood Analytics & Learning Adaptation</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Analyze student mood patterns and their impact on learning performance
        </p>
      </div>

      {/* Mood Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Current Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {moodDistribution.map((mood, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <mood.icon className={`h-6 w-6 ${mood.color}`} />
                  <Badge variant="outline">{mood.percentage}%</Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold">{mood.count}</div>
                  <div className="text-sm text-muted-foreground">{mood.mood} Students</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mood Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Impact on Learning Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodImpactData.map((data, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{data.metric}</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {data.improvement}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Happy Students:</span>
                    <div className="text-lg font-semibold text-green-600">
                      {typeof data.happy === 'number' && data.metric.includes('Time') 
                        ? `${data.happy}h` 
                        : `${data.happy}%`}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Stressed Students:</span>
                    <div className="text-lg font-semibold text-red-600">
                      {typeof data.stressed === 'number' && data.metric.includes('Time') 
                        ? `${data.stressed}h` 
                        : `${data.stressed}%`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Mood-Based Adaptations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-semibold text-blue-900 dark:text-blue-100">Stressed Students</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                • Shorter study sessions (25min → 15min)<br/>
                • More visual content<br/>
                • Relaxing background music<br/>
                • Extra motivational prompts
              </div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-semibold text-green-900 dark:text-green-100">Happy Students</div>
              <div className="text-sm text-green-700 dark:text-green-300">
                • Extended study sessions<br/>
                • Challenging content<br/>
                • Bonus achievements<br/>
                • Peer collaboration opportunities
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Tracking Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">87.3%</div>
                <div className="text-sm text-muted-foreground">Daily Check-in Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">65%</div>
                <div className="text-sm text-muted-foreground">Mood Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4.2</div>
                <div className="text-sm text-muted-foreground">Avg Mood Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">23%</div>
                <div className="text-sm text-muted-foreground">Performance Boost</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodAnalyticsTab;
