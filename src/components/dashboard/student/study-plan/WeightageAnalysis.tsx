
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Target, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
}

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects }) => {
  // Prepare data for charts
  const pieData = subjects.map((subject, index) => ({
    name: subject.name,
    value: subject.examImportance,
    color: subject.color || COLORS[index % COLORS.length]
  }));

  const barData = subjects.map((subject) => ({
    name: subject.name.substring(0, 8),
    completed: subject.completedWeightage,
    total: subject.totalWeightage,
    coverage: (subject.completedWeightage / subject.totalWeightage) * 100
  }));

  const totalWeightage = subjects.reduce((sum, subject) => sum + subject.totalWeightage, 0);
  const completedWeightage = subjects.reduce((sum, subject) => sum + subject.completedWeightage, 0);
  const overallCoverage = (completedWeightage / totalWeightage) * 100;

  // Identify subjects needing attention
  const needsAttention = subjects.filter(subject => 
    (subject.completedWeightage / subject.totalWeightage) * 100 < 50 && subject.examImportance > 20
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Overall Weightage Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{overallCoverage.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Total Coverage</div>
            </div>
            <Progress value={overallCoverage} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Completed</div>
                <div className="text-muted-foreground">{completedWeightage.toFixed(1)}%</div>
              </div>
              <div>
                <div className="font-medium">Remaining</div>
                <div className="text-muted-foreground">{(totalWeightage - completedWeightage).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam Importance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Exam Importance Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Exam Weight']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Subject-wise Coverage */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Subject-wise Weightage Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}%`, 
                  name === 'completed' ? 'Completed' : 'Total'
                ]}
              />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" />
              <Bar dataKey="total" stackId="b" fill="#E5E7EB" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attention Required */}
      {needsAttention.length > 0 && (
        <Card className="lg:col-span-2 border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Subjects Requiring Immediate Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {needsAttention.map((subject) => (
                <div key={subject.id} className="p-3 bg-white rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{subject.name}</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                      {subject.examImportance}% weight
                    </Badge>
                  </div>
                  <Progress 
                    value={(subject.completedWeightage / subject.totalWeightage) * 100} 
                    className="h-2 mb-2" 
                  />
                  <div className="text-xs text-amber-600">
                    Only {((subject.completedWeightage / subject.totalWeightage) * 100).toFixed(0)}% covered
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeightageAnalysis;
