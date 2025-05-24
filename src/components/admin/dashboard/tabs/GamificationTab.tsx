
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Trophy, 
  Star, 
  Gift,
  Smile,
  Heart,
  Target,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GamificationTab = () => {
  const { toast } = useToast();

  const feelGoodActivities = [
    { name: "Meditation Sessions", participants: 1234, avgRating: 4.8, completionRate: 87 },
    { name: "Motivational Quotes", views: 5678, likes: 4321, shareRate: 23 },
    { name: "Mini Games", players: 2345, avgPlayTime: "8min", engagement: 92 },
    { name: "Achievement Celebrations", unlocked: 3456, satisfaction: 94, retention: 78 }
  ];

  const achievementStats = [
    { category: "Study Streak", awarded: 2341, impact: "+15% retention" },
    { category: "Concept Mastery", awarded: 1876, impact: "+23% performance" },
    { category: "Exam Excellence", awarded: 567, impact: "+18% confidence" },
    { category: "Peer Helper", awarded: 234, impact: "+12% engagement" }
  ];

  const handleCreateActivity = () => {
    toast({
      title: "Creating New Activity",
      description: "Generating new Feel Good Corner activity...",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Gamification & Feel Good Corner</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage engagement features and student motivation tools
          </p>
        </div>
        <Button 
          onClick={handleCreateActivity}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
        >
          <Smile className="h-4 w-4 mr-2" />
          Create Activity
        </Button>
      </div>

      {/* Feel Good Corner Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5 text-purple-600" />
            Feel Good Corner Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feelGoodActivities.map((activity, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{activity.name}</h4>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    Active
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  {activity.participants && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="font-semibold">{activity.participants.toLocaleString()}</span>
                    </div>
                  )}
                  {activity.views && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-semibold">{activity.views.toLocaleString()}</span>
                    </div>
                  )}
                  {activity.players && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Players:</span>
                      <span className="font-semibold">{activity.players.toLocaleString()}</span>
                    </div>
                  )}
                  {activity.unlocked && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unlocked:</span>
                      <span className="font-semibold">{activity.unlocked.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement:</span>
                    <span className="font-semibold text-green-600">
                      {activity.completionRate || activity.engagement || activity.satisfaction}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Achievement System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievementStats.map((achievement, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold">{achievement.category}</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    {achievement.awarded} awarded
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Impact: <span className="font-semibold text-green-600">{achievement.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Motivation Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Daily Feel Good Visits</div>
                  <div className="text-2xl font-bold text-pink-600">1,847</div>
                </div>
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Achievements Unlocked</div>
                  <div className="text-2xl font-bold text-yellow-600">423</div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Motivation Score</div>
                  <div className="text-2xl font-bold text-purple-600">8.4/10</div>
                </div>
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact on Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+18%</div>
                  <div className="text-sm text-muted-foreground">Study Session Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">+25%</div>
                  <div className="text-sm text-muted-foreground">Daily Goal Achievement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">+12%</div>
                  <div className="text-sm text-muted-foreground">Platform Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">+15%</div>
                  <div className="text-sm text-muted-foreground">Peer Interaction</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamificationTab;
