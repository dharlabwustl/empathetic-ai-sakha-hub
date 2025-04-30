
// Replace the import for the missing founder image with a placeholder URL
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Check, Calendar, BookOpen, FileText, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeScreenProps {
  onComplete: () => void;
  mood?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, mood }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    onComplete();
    navigate('/dashboard/student');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 text-white flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-4">Welcome to PREPZR</h1>
                  <p className="text-purple-100 mb-6">
                    Your journey to exam success begins here. We're excited to have you join us!
                  </p>
                  
                  <div className="space-y-4 my-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm">Personalized study plans based on your goals</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm">Advanced concept cards and interactive flashcards</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm">AI-powered performance tracking and insights</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm">Emotionally intelligent study recommendations</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-purple-100 italic">
                    "PREPZR helped me build the confidence and skills I needed to excel in my exams."
                  </p>
                  <p className="text-sm mt-1">— Rahul S., IIT JEE (AIR 245)</p>
                </div>
              </div>
              
              <div className="p-8 bg-white dark:bg-gray-800">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold">Let's get started</h2>
                    <p className="text-gray-500 dark:text-gray-400">Your exam success journey begins now</p>
                  </div>
                  <img 
                    // Replace with a placeholder image or another appropriate image
                    src="https://via.placeholder.com/100x100.png?text=PREPZR" 
                    alt="PREPZR Logo" 
                    className="h-12 w-auto" 
                  />
                </div>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-medium mb-2">Founder's Message</h3>
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/40 p-4 rounded-lg">
                      <img
                        // Replace with a placeholder image for the founder
                        src="https://via.placeholder.com/60x60.png?text=AS"
                        alt="Atul Sharma"
                        className="h-14 w-14 rounded-full object-cover border-2 border-purple-500"
                      />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          "Our mission is to make quality education accessible and personalized. 
                          We're here to support you every step of the way."
                        </p>
                        <p className="text-sm font-medium mt-1">— Atul Sharma, Founder</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium">Today's Plan</h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Personalized daily study schedule based on your progress and goals
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                        <h4 className="font-medium">Concept Cards</h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Master key concepts with our comprehensive study materials
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                        <h4 className="font-medium">Flashcards</h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Retain information effectively with our spaced repetition system
                      </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                        <h4 className="font-medium">Practice Exams</h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Test your knowledge with our exam-like practice questions
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGetStarted} 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
