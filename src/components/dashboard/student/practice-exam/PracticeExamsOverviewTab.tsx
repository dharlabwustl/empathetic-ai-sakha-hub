
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OverviewKPICard } from '../shared/OverviewKPICard';
import { SmartSuggestionBox } from '../shared/SmartSuggestionBox';
import { FileText, Target, TrendingUp, Clock, Award, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export const PracticeExamsOverviewTab: React.FC = () => {
  const kpiData = [
    { title: "Exams Completed", value: "42", subtext: "This week: 8, Month: 42", icon: <FileText className="h-6 w-6" /> },
    { title: "Overall Score", value: "78%", subtext: "+5% from last month", variant: 'success' as const, icon: <Target className="h-6 w-6" /> },
    { title: "Study Hours", value: "124", subtext: "This month", icon: <Clock className="h-6 w-6" /> },
    { title: "NEET Readiness", value: "76%", subtext: "Good progress!", variant: 'success' as const, icon: <Award className="h-6 w-6" /> }
  ];

  const subjectPerformance = [
    {
      subject: "Physics",
      examsCompleted: 15,
      totalExams: 20,
      avgScore: 74,
      bestScore: 89,
      worstScore: 58,
      improvement: "+8%",
      timeSpent: "42h",
      weakTopics: ["Electromagnetism", "Modern Physics"],
      strongTopics: ["Mechanics", "Thermodynamics"],
      lastExamDate: "2 days ago",
      nextRecommended: "Optics Practice Test"
    },
    {
      subject: "Chemistry", 
      examsCompleted: 12,
      totalExams: 18,
      avgScore: 81,
      bestScore: 94,
      worstScore: 65,
      improvement: "+12%",
      timeSpent: "38h",
      weakTopics: ["Organic Reactions", "Chemical Kinetics"],
      strongTopics: ["Inorganic Chemistry", "Physical Chemistry"],
      lastExamDate: "1 day ago",
      nextRecommended: "Organic Chemistry Mock"
    },
    {
      subject: "Biology",
      examsCompleted: 18,
      totalExams: 22,
      avgScore: 85,
      bestScore: 96,
      worstScore: 71,
      improvement: "+6%",
      timeSpent: "44h",
      weakTopics: ["Genetics", "Biotechnology"],
      strongTopics: ["Human Physiology", "Plant Biology"],
      lastExamDate: "3 hours ago",
      nextRecommended: "Genetics Practice Set"
    }
  ];

  const recentExams = [
    { name: "NEET Biology Mock 5", score: 89, subject: "Biology", date: "3 hours ago", difficulty: "Hard" },
    { name: "Physics Mechanics Test", score: 76, subject: "Physics", date: "2 days ago", difficulty: "Medium" },
    { name: "Organic Chemistry Quiz", score: 82, subject: "Chemistry", date: "3 days ago", difficulty: "Hard" }
  ];

  const performanceTrends = [
    { week: "W1", physics: 68, chemistry: 72, biology: 78 },
    { week: "W2", physics: 71, chemistry: 75, biology: 80 },
    { week: "W3", physics: 74, chemistry: 79, biology: 83 },
    { week: "W4", physics: 76, chemistry: 81, biology: 85 }
  ];

  const suggestions = [
    "Focus on Electromagnetism - scoring below average",
    "Take full-length mock test this weekend",
    "Review Organic Chemistry mechanisms"
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Chemistry': return 'bg-green-50 border-green-200 text-green-800';
      case 'Biology': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <OverviewKPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject Performance Analysis */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Detailed Subject Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectPerformance.map((subject) => (
                <div key={subject.subject} className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">{subject.subject}</span>
                      <Badge variant="outline" className={getSubjectColor(subject.subject)}>
                        {subject.examsCompleted}/{subject.totalExams} completed
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {subject.improvement} improvement
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>Last exam: {subject.lastExamDate}</div>
                      <div>Time spent: {subject.timeSpent}</div>
                    </div>
                  </div>

                  <Progress value={(subject.examsCompleted / subject.totalExams) * 100} className="h-3" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded">
                      <div className={`font-bold text-xl ${getScoreColor(subject.avgScore)}`}>
                        {subject.avgScore}%
                      </div>
                      <div className="text-xs text-gray-600">Average</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded">
                      <div className="font-bold text-xl text-green-600">{subject.bestScore}%</div>
                      <div className="text-xs text-gray-600">Best Score</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded">
                      <div className="font-bold text-xl text-red-600">{subject.worstScore}%</div>
                      <div className="text-xs text-gray-600">Lowest</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded">
                      <div className="font-bold text-xl text-blue-600">{subject.examsCompleted}</div>
                      <div className="text-xs text-gray-600">Exams Done</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">Strong Areas</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {subject.strongTopics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-700">Needs Improvement</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {subject.weakTopics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Next Recommended:</span>
                      <span className="text-sm text-blue-600">{subject.nextRecommended}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Smart Suggestions */}
          <SmartSuggestionBox suggestions={suggestions} title="Performance Insights" />

          {/* Recent Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Exam Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentExams.map((exam, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{exam.name}</h4>
                    <span className={`font-bold text-lg ${getScoreColor(exam.score)}`}>
                      {exam.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getSubjectColor(exam.subject)}>
                        {exam.subject}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{exam.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Weekly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceTrends.map((week, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{week.week}</span>
                      <div className="flex gap-2">
                        <span className="text-xs text-blue-600">P: {week.physics}%</span>
                        <span className="text-xs text-green-600">C: {week.chemistry}%</span>
                        <span className="text-xs text-purple-600">B: {week.biology}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="flex-1 bg-blue-200 rounded">
                        <div 
                          className="bg-blue-500 h-full rounded"
                          style={{ width: `${week.physics}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-green-200 rounded">
                        <div 
                          className="bg-green-500 h-full rounded"
                          style={{ width: `${week.chemistry}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-purple-200 rounded">
                        <div 
                          className="bg-purple-500 h-full rounded"
                          style={{ width: `${week.biology}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
