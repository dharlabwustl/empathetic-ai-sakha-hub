
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";
import { ExamPreparation } from "@/types/user/exam-preparation";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Award, BookOpen } from "lucide-react";

interface PracticeExamStartProps {
  userProfile: UserProfileType;
  onStartExam: () => void;
}

const PracticeExamStart: React.FC<PracticeExamStartProps> = ({ userProfile, onStartExam }) => {
  const navigate = useNavigate();
  
  // Get user's exam preparation info, with proper type handling
  const examPrep = userProfile?.examPreparation && typeof userProfile.examPreparation === 'object' 
    ? (userProfile.examPreparation as ExamPreparation) 
    : null;

  const examTarget = examPrep && 'target' in examPrep ? examPrep.target : "your exam";

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Practice Exam</h1>
        <p className="text-muted-foreground">
          Test your knowledge with practice exams tailored to your study plan
        </p>
      </header>

      <Card className="overflow-hidden border-2 border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Start a New Practice Exam
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Ready to challenge yourself?</h3>
              <p className="text-muted-foreground">
                This 60-minute practice exam is designed to simulate real exam conditions
                and test your knowledge on key topics for {examTarget || "your exam"}.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">60 Minutes</p>
                    <p className="text-sm text-muted-foreground">Timed test environment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Mixed Topics</p>
                    <p className="text-sm text-muted-foreground">
                      Covers subjects from your study plan
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center space-y-4 md:border-l md:border-gray-200 md:pl-6">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/dashboard/student/practice-exam/1")}
              >
                Start Practice Exam
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate("/dashboard/student/practice-exam/history")}
              >
                View Previous Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-4">
        {["Flash Cards", "Concept Mastery", "Quick Quiz"].map((type, i) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.1 * i }
            }}
          >
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-medium mb-2">{type}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type === "Flash Cards" && "Quick review with flash cards"}
                    {type === "Concept Mastery" && "Deep dive into key concepts"}
                    {type === "Quick Quiz" && "Test knowledge in 10 minutes"}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="mt-4 w-full justify-between"
                  onClick={() => navigate(`/dashboard/student/${type.toLowerCase().replace(/\s+/g, "-")}`)}
                >
                  Start
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PracticeExamStart;
