
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, BookOpen, CheckCircle, X, SkipForward, Filter, RefreshCw } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

interface AdaptiveStudyPlanTableProps {
  data: any[];
  subjects: any;
  onUpdate: (data: any[]) => void;
}

const AdaptiveStudyPlanTable: React.FC<AdaptiveStudyPlanTableProps> = ({ data, subjects, onUpdate }) => {
  const [studyPlan, setStudyPlan] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  useEffect(() => {
    // Generate initial study plan if empty
    if (data.length === 0) {
      generateInitialPlan();
    } else {
      setStudyPlan(data);
    }
  }, [data]);

  const generateInitialPlan = () => {
    const startDate = new Date();
    const plan = [];
    
    const subjectRotation = ['Physics', 'Chemistry', 'Biology'];
    const topics = {
      Physics: ['Mechanics', 'Thermodynamics', 'Waves', 'Optics'],
      Chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
      Biology: ['Cell Biology', 'Genetics', 'Human Physiology', 'Ecology']
    };

    for (let i = 0; i < 21; i++) { // 3 weeks
      const date = addDays(startDate, i);
      const subject = subjectRotation[i % 3];
      const topicIndex = Math.floor(i / 3) % topics[subject as keyof typeof topics].length;
      
      plan.push({
        id: `plan-${i}`,
        date: format(date, 'yyyy-MM-dd'),
        subject,
        topics: [topics[subject as keyof typeof topics][topicIndex]],
        studyHours: i % 7 === 0 ? 4 : 6, // Shorter on Sundays
        timeOfStudy: i % 2 === 0 ? 'Morning' : 'Evening',
        focusLevel: Math.random() > 0.3 ? 'High' : Math.random() > 0.5 ? 'Medium' : 'Low',
        status: Math.random() > 0.7 ? 'Done' : Math.random() > 0.8 ? 'Skipped' : 'Pending',
        mood: 'neutral'
      });
    }
    
    setStudyPlan(plan);
    onUpdate(plan);
  };

  const updatePlanItem = (id: string, field: string, value: any) => {
    const updated = studyPlan.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setStudyPlan(updated);
    onUpdate(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800 border-green-300';
      case 'Skipped': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getFocusColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const filteredPlan = studyPlan.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterSubject !== 'all' && item.subject !== filterSubject) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Adaptive Study Plan
          </CardTitle>
          <div className="flex gap-2 mt-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={generateInitialPlan}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Auto-Adjust
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Topics</th>
                  <th className="text-left p-3 font-medium">Hours</th>
                  <th className="text-left p-3 font-medium">Time</th>
                  <th className="text-left p-3 font-medium">Focus</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlan.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-3">
                      <div className="text-sm">
                        {format(new Date(item.date), 'MMM dd')}
                        <div className="text-xs text-gray-500">
                          {format(new Date(item.date), 'EEEE')}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={`${
                        item.subject === 'Physics' ? 'border-blue-300 text-blue-700' :
                        item.subject === 'Chemistry' ? 'border-green-300 text-green-700' :
                        'border-purple-300 text-purple-700'
                      }`}>
                        {item.subject}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {item.topics.map((topic: string, index: number) => (
                          <span key={index} className="block text-gray-700 dark:text-gray-300">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{item.studyHours}h</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">{item.timeOfStudy}</span>
                    </td>
                    <td className="p-3">
                      <Badge className={getFocusColor(item.focusLevel)}>
                        {item.focusLevel}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {item.status === 'Pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updatePlanItem(item.id, 'status', 'Done')}
                              className="h-6 w-6 p-0"
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updatePlanItem(item.id, 'status', 'Skipped')}
                              className="h-6 w-6 p-0"
                            >
                              <SkipForward className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        {item.status !== 'Pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updatePlanItem(item.id, 'status', 'Pending')}
                            className="h-6 w-6 p-0"
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveStudyPlanTable;
