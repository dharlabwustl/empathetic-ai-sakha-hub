
import React, { useState } from 'react';
import { X, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';

interface ExamReadinessAnalyzerProps {
  onClose: () => void;
}

export function ExamReadinessAnalyzer({ onClose }: ExamReadinessAnalyzerProps) {
  const [currentTab, setCurrentTab] = useState('profile');
  const [formData, setFormData] = useState({
    examType: '',
    subject: '',
    targetDate: '',
    studyTime: '',
    studyHabits: '',
    lastExamScore: '',
    challengingTopics: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextTab = () => {
    if (currentTab === 'profile') setCurrentTab('goals');
    else if (currentTab === 'goals') setCurrentTab('assessment');
    else if (currentTab === 'assessment') setCurrentTab('results');
  };

  const handlePrevTab = () => {
    if (currentTab === 'goals') setCurrentTab('profile');
    else if (currentTab === 'assessment') setCurrentTab('goals');
    else if (currentTab === 'results') setCurrentTab('assessment');
  };

  const isCurrentTabComplete = () => {
    switch (currentTab) {
      case 'profile':
        return formData.examType !== '' && formData.subject !== '';
      case 'goals':
        return formData.targetDate !== '' && formData.studyTime !== '';
      case 'assessment':
        return formData.studyHabits !== '' && formData.lastExamScore !== '';
      default:
        return true;
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Exam Readiness Analyzer</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profile" disabled={currentTab !== 'profile'}>
              Profile
            </TabsTrigger>
            <TabsTrigger value="goals" disabled={currentTab !== 'goals'}>
              Goals
            </TabsTrigger>
            <TabsTrigger value="assessment" disabled={currentTab !== 'assessment'}>
              Assessment
            </TabsTrigger>
            <TabsTrigger value="results" disabled={currentTab !== 'results'}>
              Results
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="profile" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="examType">Which exam are you preparing for?</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('examType', value)}
                      value={formData.examType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jee">IIT-JEE</SelectItem>
                        <SelectItem value="neet">NEET</SelectItem>
                        <SelectItem value="upsc">UPSC</SelectItem>
                        <SelectItem value="cat">CAT</SelectItem>
                        <SelectItem value="gate">GATE</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Which subject do you find most challenging?</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('subject', value)}
                      value={formData.subject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="targetDate">What is your target exam date?</Label>
                    <Input 
                      id="targetDate" 
                      type="date" 
                      name="targetDate"
                      value={formData.targetDate} 
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="studyTime">How many hours can you study daily?</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('studyTime', value)}
                      value={formData.studyTime}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 hours</SelectItem>
                        <SelectItem value="3-4">3-4 hours</SelectItem>
                        <SelectItem value="5-6">5-6 hours</SelectItem>
                        <SelectItem value="7-8">7-8 hours</SelectItem>
                        <SelectItem value="8+">More than 8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>How would you rate your current study habits?</Label>
                    <RadioGroup 
                      onValueChange={(value) => handleRadioChange('studyHabits', value)}
                      value={formData.studyHabits}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="poor" id="poor" />
                        <Label htmlFor="poor">Poor - Inconsistent studying</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fair" id="fair" />
                        <Label htmlFor="fair">Fair - Somewhat regular</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="good" />
                        <Label htmlFor="good">Good - Consistent schedule</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excellent" id="excellent" />
                        <Label htmlFor="excellent">Excellent - Regular & effective</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="lastExamScore">What was your score in your most recent mock test? (approximate %)</Label>
                    <Input 
                      id="lastExamScore" 
                      type="number" 
                      name="lastExamScore"
                      value={formData.lastExamScore} 
                      onChange={handleChange}
                      placeholder="e.g. 65"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="challengingTopics">List specific topics you find challenging (optional)</Label>
                    <Input 
                      id="challengingTopics" 
                      name="challengingTopics"
                      value={formData.challengingTopics} 
                      onChange={handleChange}
                      placeholder="e.g. Organic Chemistry, Calculus"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-4">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Your Exam Readiness Analysis</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-1">Overall Readiness Score</h4>
                      <div className="w-full h-4 bg-gray-200 rounded-full">
                        <div className="h-4 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>0%</span>
                        <span className="font-medium">65%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-2">Time Management</h4>
                        <p className="text-sm">Based on your target date, you have a moderate amount of time to prepare. We recommend increasing your daily study hours.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-2">Weak Areas</h4>
                        <p className="text-sm">Focus on improving your performance in {formData.subject || 'your selected subject'} with targeted practice.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-700 mb-2">Attention Needed</h4>
                            <p className="text-sm">Your current study habits need improvement for optimal exam success.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-2">Next Steps</h4>
                        <p className="text-sm">Create a Sakha AI account for a personalized study plan aligned with your goals.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Create Personalized Study Plan
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <DialogFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={handlePrevTab} disabled={currentTab === 'profile'}>
            Back
          </Button>
          <Button 
            onClick={handleNextTab}
            disabled={!isCurrentTabComplete() || currentTab === 'results'}
          >
            {currentTab === 'assessment' ? 'View Results' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
