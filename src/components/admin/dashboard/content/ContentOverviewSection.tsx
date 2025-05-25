
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Eye, 
  Cube, 
  FlaskConical, 
  Video, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import { ContentOverviewStats, ConceptCardFormat } from "@/types/content";

interface ContentOverviewSectionProps {
  stats: ContentOverviewStats;
}

const formatIcons: Record<ConceptCardFormat, any> = {
  'text-summary': FileText,
  'visual-diagram': Eye,
  '3d-model': Cube,
  'interactive-lab': FlaskConical,
  'video': Video,
  'exam-mistakes': AlertTriangle
};

const formatNames: Record<ConceptCardFormat, string> = {
  'text-summary': 'Text Summary',
  'visual-diagram': 'Visual Diagram',
  '3d-model': '3D Model',
  'interactive-lab': 'Interactive Lab',
  'video': 'Video Content',
  'exam-mistakes': 'Exam Mistakes'
};

const ContentOverviewSection: React.FC<ContentOverviewSectionProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Generated</p>
                <p className="text-2xl font-bold">{stats.totalGenerated}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold">{stats.qualityMetrics.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Processing</p>
                <p className="text-2xl font-bold">{stats.qualityMetrics.averageProcessingTime}s</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">User Rating</p>
                <p className="text-2xl font-bold">{stats.qualityMetrics.userSatisfaction}/5</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content by Format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Content Generation by Format
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.byFormat).map(([format, count]) => {
              const IconComponent = formatIcons[format as ConceptCardFormat];
              const percentage = stats.totalGenerated > 0 ? (count / stats.totalGenerated) * 100 : 0;
              
              return (
                <div key={format} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{formatNames[format as ConceptCardFormat]}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{count} generated</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{percentage.toFixed(1)}%</Badge>
                    <Progress value={percentage} className="w-16 mt-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Today</span>
                <Badge>{stats.recentActivity.today}</Badge>
              </div>
              <div className="flex justify-between">
                <span>This Week</span>
                <Badge>{stats.recentActivity.thisWeek}</Badge>
              </div>
              <div className="flex justify-between">
                <span>This Month</span>
                <Badge>{stats.recentActivity.thisMonth}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.bySubject)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([subject, count]) => (
                  <div key={subject} className="flex justify-between">
                    <span>{subject}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentOverviewSection;
