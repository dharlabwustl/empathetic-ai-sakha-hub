
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Filter } from 'lucide-react';

const PreviousYearAnalysisPage = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');
  const [yearRange, setYearRange] = useState('2016-2025');

  // Mock data for previous year questions
  const pyqData = {
    examName: 'NEET',
    subjects: [
      {
        id: 'physics',
        name: 'Physics',
        topics: [
          {
            name: 'Mechanics',
            frequency: [
              { year: 2016, count: 7 },
              { year: 2017, count: 8 },
              { year: 2018, count: 6 },
              { year: 2019, count: 9 },
              { year: 2020, count: 7 },
              { year: 2021, count: 8 },
              { year: 2022, count: 9 },
              { year: 2023, count: 8 },
              { year: 2024, count: 9 },
              { year: 2025, count: 10 },
            ],
            trend: 'increasing',
            importance: 'high',
            averageDifficulty: 'medium'
          },
          {
            name: 'Thermodynamics',
            frequency: [
              { year: 2016, count: 4 },
              { year: 2017, count: 5 },
              { year: 2018, count: 3 },
              { year: 2019, count: 4 },
              { year: 2020, count: 5 },
              { year: 2021, count: 4 },
              { year: 2022, count: 5 },
              { year: 2023, count: 6 },
              { year: 2024, count: 5 },
              { year: 2025, count: 7 },
            ],
            trend: 'stable',
            importance: 'medium',
            averageDifficulty: 'hard'
          },
          {
            name: 'Electrostatics',
            frequency: [
              { year: 2016, count: 5 },
              { year: 2017, count: 6 },
              { year: 2018, count: 7 },
              { year: 2019, count: 5 },
              { year: 2020, count: 6 },
              { year: 2021, count: 7 },
              { year: 2022, count: 8 },
              { year: 2023, count: 7 },
              { year: 2024, count: 8 },
              { year: 2025, count: 9 },
            ],
            trend: 'increasing',
            importance: 'high',
            averageDifficulty: 'medium'
          },
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        topics: [
          {
            name: 'Organic Chemistry',
            frequency: [
              { year: 2016, count: 9 },
              { year: 2017, count: 10 },
              { year: 2018, count: 8 },
              { year: 2019, count: 9 },
              { year: 2020, count: 10 },
              { year: 2021, count: 11 },
              { year: 2022, count: 10 },
              { year: 2023, count: 11 },
              { year: 2024, count: 12 },
              { year: 2025, count: 13 },
            ],
            trend: 'increasing',
            importance: 'high',
            averageDifficulty: 'hard'
          },
          {
            name: 'Inorganic Chemistry',
            frequency: [
              { year: 2016, count: 7 },
              { year: 2017, count: 8 },
              { year: 2018, count: 7 },
              { year: 2019, count: 6 },
              { year: 2020, count: 7 },
              { year: 2021, count: 8 },
              { year: 2022, count: 7 },
              { year: 2023, count: 8 },
              { year: 2024, count: 9 },
              { year: 2025, count: 8 },
            ],
            trend: 'stable',
            importance: 'medium',
            averageDifficulty: 'medium'
          },
        ]
      },
      {
        id: 'biology',
        name: 'Biology',
        topics: [
          {
            name: 'Cell Biology',
            frequency: [
              { year: 2016, count: 6 },
              { year: 2017, count: 7 },
              { year: 2018, count: 8 },
              { year: 2019, count: 7 },
              { year: 2020, count: 8 },
              { year: 2021, count: 9 },
              { year: 2022, count: 10 },
              { year: 2023, count: 9 },
              { year: 2024, count: 10 },
              { year: 2025, count: 11 },
            ],
            trend: 'increasing',
            importance: 'high',
            averageDifficulty: 'medium'
          },
          {
            name: 'Human Physiology',
            frequency: [
              { year: 2016, count: 8 },
              { year: 2017, count: 9 },
              { year: 2018, count: 10 },
              { year: 2019, count: 9 },
              { year: 2020, count: 10 },
              { year: 2021, count: 11 },
              { year: 2022, count: 12 },
              { year: 2023, count: 13 },
              { year: 2024, count: 14 },
              { year: 2025, count: 15 },
            ],
            trend: 'increasing',
            importance: 'high',
            averageDifficulty: 'hard'
          },
        ]
      }
    ]
  };

  const activeSubjectData = pyqData.subjects.find(subject => subject.id === activeSubject);
  
  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '🔁';
      default: return '🔍';
    }
  };

  // Get importance class
  const getImportanceClass = (importance: string) => {
    switch(importance) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            onClick={() => navigate('/dashboard/student')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">{pyqData.examName} Previous Year Analysis (2016-2025)</h1>
          <p className="text-muted-foreground">
            Analyze question patterns and topic distribution from previous years
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={yearRange} onValueChange={setYearRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2016-2025">2016-2025</SelectItem>
              <SelectItem value="2021-2025">Last 5 Years</SelectItem>
              <SelectItem value="2023-2025">Last 3 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          <Button onClick={() => navigate('/dashboard/student/syllabus')}>
            View Full Syllabus
          </Button>
        </div>
      </div>
      
      <Tabs value={activeSubject} onValueChange={setActiveSubject}>
        <TabsList className="mb-6">
          {pyqData.subjects.map(subject => (
            <TabsTrigger key={subject.id} value={subject.id}>{subject.name}</TabsTrigger>
          ))}
        </TabsList>
        
        {activeSubjectData && (
          <TabsContent value={activeSubjectData.id}>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Topic-wise Question Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={activeSubjectData.topics.map(topic => ({
                          name: topic.name,
                          total: topic.frequency.reduce((sum, item) => sum + item.count, 0)
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" name="Total Questions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Topic-wise Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Total Questions</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Importance</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeSubjectData.topics.map(topic => (
                      <TableRow key={topic.name}>
                        <TableCell className="font-medium">{topic.name}</TableCell>
                        <TableCell>{topic.frequency.reduce((sum, item) => sum + item.count, 0)}</TableCell>
                        <TableCell>
                          {getTrendIcon(topic.trend)} {topic.trend.charAt(0).toUpperCase() + topic.trend.slice(1)}
                        </TableCell>
                        <TableCell className={getImportanceClass(topic.importance)}>
                          {topic.importance.charAt(0).toUpperCase() + topic.importance.slice(1)}
                        </TableCell>
                        <TableCell>
                          {topic.averageDifficulty.charAt(0).toUpperCase() + topic.averageDifficulty.slice(1)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/concepts/landing')}>
                              Concept Cards
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/flashcards/landing')}>
                              Flashcards
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {activeSubjectData.topics.map(topic => (
              <Card key={topic.name} className="mb-6">
                <CardHeader>
                  <CardTitle>{topic.name} - Year-wise Question Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topic.frequency}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Question Count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">Strategic Insight:</p>
                    <p className="text-muted-foreground">
                      {topic.trend === 'increasing' 
                        ? `This topic shows an increasing trend and has ${topic.importance === 'high' ? 'high' : 'medium'} importance. Focus on mastering this area.`
                        : topic.trend === 'decreasing'
                          ? `This topic shows a decreasing trend but still remains important. Allocate appropriate study time.`
                          : `This topic has remained stable over the years with ${topic.importance === 'high' ? 'high' : 'medium'} importance.`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default PreviousYearAnalysisPage;
