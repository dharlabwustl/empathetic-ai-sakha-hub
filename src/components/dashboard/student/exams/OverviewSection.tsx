
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Target, TrendingUp } from 'lucide-react';

const OverviewSection: React.FC = () => {
  const stats = [
    { title: 'Total Exams', value: '24', icon: <FileText className="h-5 w-5" />, color: 'blue' },
    { title: 'Avg. Score', value: '78%', icon: <Target className="h-5 w-5" />, color: 'green' },
    { title: 'Time Spent', value: '15h', icon: <Clock className="h-5 w-5" />, color: 'purple' },
    { title: 'Improvement', value: '+12%', icon: <TrendingUp className="h-5 w-5" />, color: 'orange' }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Practice Exam Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={`inline-flex p-2 rounded-full bg-${stat.color}-100 text-${stat.color}-600 mb-2`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewSection;
