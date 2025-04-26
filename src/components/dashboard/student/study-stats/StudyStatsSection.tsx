
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Subject {
  id: string;
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  chapters: { id: string; name: string; progress: number }[];
  quizzes: { id: string; title: string; score?: number }[];
  flashcards: { total: number; mastered: number };
  recommendedStudyHours: number;
}

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: string;
  estimatedTime: number;
  completed: boolean;
  scheduledFor: string;
  flashcardsTotal: number;
  flashcardsCompleted: number;
}

interface StudyStatsSectionProps {
  subjects: Subject[];
  conceptCards: ConceptCard[];
}

const StudyStatsSection: React.FC<StudyStatsSectionProps> = ({ subjects, conceptCards }) => {
  // Prepare data for KPI visualization
  const conceptCompletionData = subjects.map(subject => {
    const subjectConcepts = conceptCards.filter(card => card.subject === subject.name);
    const completedConcepts = subjectConcepts.filter(card => card.completed).length;
    const totalConcepts = subjectConcepts.length || 1; // Avoid division by zero
    
    return {
      name: subject.name,
      value: totalConcepts > 0 ? Math.round((completedConcepts / totalConcepts) * 100) : 0,
      total: totalConcepts,
      completed: completedConcepts
    };
  });
  
  // Quiz scores by subject
  const quizScoreData = subjects.map(subject => {
    const completedQuizzes = subject.quizzes.filter(quiz => quiz.score !== undefined);
    const averageScore = completedQuizzes.length > 0
      ? completedQuizzes.reduce((acc, quiz) => acc + (quiz.score || 0), 0) / completedQuizzes.length
      : 0;
      
    return {
      name: subject.name,
      value: Math.round(averageScore),
      total: subject.quizzes.length,
      completed: completedQuizzes.length
    };
  });
  
  // Flashcard recall by subject
  const flashcardRecallData = subjects.map(subject => {
    const { total, mastered } = subject.flashcards;
    
    return {
      name: subject.name,
      value: total > 0 ? Math.round((mastered / total) * 100) : 0,
      total: total,
      completed: mastered
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Key Performance Indicators</h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <KpiCard 
          title="Concepts Completed"
          description="Subject-wise, updated daily"
          data={conceptCompletionData}
          dataKey="value"
          color="#3b82f6"
        />
        
        <KpiCard 
          title="Quiz Average Score"
          description="Average performance per subject"
          data={quizScoreData}
          dataKey="value"
          color="#10b981"
        />
        
        <KpiCard 
          title="Flashcard Recall Accuracy"
          description="Subject-wise recall rate (AI calculated)"
          data={flashcardRecallData}
          dataKey="value"
          color="#8b5cf6"
        />
      </div>
    </div>
  );
};

interface KpiCardProps {
  title: string;
  description: string;
  data: any[];
  dataKey: string;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, description, data, dataKey, color }) => {
  // Sort data by value (descending)
  const sortedData = [...data].sort((a, b) => b[dataKey] - a[dataKey]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">{`${payload[0].value}%`}</p>
          <p className="text-xs text-gray-500">{`${payload[0].payload.completed}/${payload[0].payload.total}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickCount={6} />
              <YAxis 
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKey} radius={[0, 4, 4, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={color}
                    fillOpacity={0.7 + (index * 0.1)} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStatsSection;
