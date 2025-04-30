
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Sparkles, Star, BookMarked, Clock } from "lucide-react";

const PostLoginPrompt = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState("");
  const [animation, setAnimation] = useState(false);
  const [pendingTask, setPendingTask] = useState<{
    id: string;
    title: string;
    type: string;
    subject: string;
    progress: number;
  } | null>(null);

  useEffect(() => {
    // Try to get user data from local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.name) {
        setUserName(parsedData.name);
      }
      
      // Check if there's a pending task
      const mockPendingTask = {
        id: "concept-123",
        title: "Newton's Laws of Motion",
        type: "concept",
        subject: "Physics",
        progress: 65
      };
      
      setPendingTask(mockPendingTask);
    }

    // Start animation after a short delay
    setTimeout(() => setAnimation(true), 300);
  }, []);
  
  const isNewUser = searchParams.get('new') === 'true';

  const features = [
    {
      title: "Today's Study Plan",
      description: "Your personalized daily study schedule",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      path: "/dashboard/student/today"
    },
    {
      title: "Concept Cards",
      description: "Master key concepts with interactive learning cards",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      path: "/dashboard/student/concepts"
    },
    {
      title: "Feel Good Corner",
      description: "Tools to help you manage stress and stay focused",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      path: "/dashboard/student/feel-good-corner"
    },
    {
      title: "Academic Advisor",
      description: "Get personalized academic guidance",
      icon: <Sparkles className="h-5 w-5 text-green-500" />,
      path: "/dashboard/student/academic"
    },
  ];

  const handleContinue = () => {
    navigate("/dashboard/student");
  };
  
  const handleContinueTask = () => {
    if (pendingTask) {
      switch (pendingTask.type) {
        case "concept":
          navigate(`/dashboard/student/concepts/card/${pendingTask.id}`);
          break;
        case "flashcard":
          navigate(`/dashboard/student/flashcards/${pendingTask.id}/interactive`);
          break;
        case "practice-exam":
          navigate(`/dashboard/student/practice-exam/${pendingTask.id}/start`);
          break;
        default:
          navigate("/dashboard/student/today");
      }
    }
  };
  
  const handleGoToTodaysPlan = () => {
    navigate("/dashboard/student/today");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-lg border-gray-200 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
            <div className="flex justify-center mb-3">
              <PrepzrLogo width={180} />
            </div>
            <CardTitle className="text-3xl font-display">
              Welcome{userName ? ` back, ${userName}` : ""}!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: animation ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Founder's Message</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img 
                      src="/lovable-uploads/bffd91d7-243d-42d9-bbd9-52133e18f4b6.png"
                      alt="Amit Singh" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:ml-4 text-left">
                    <p className="text-gray-600 italic">
                      "At PREPZR, our mission is simple — to make learning truly personalized, engaging and result-driven. We're committed to empowering every student unbiasedly with the right tools, guidance and support to confidently reach their exam goals."
                    </p>
                    <p className="text-gray-600 mt-2 font-medium">— Amit Singh, Founder & CEO</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {pendingTask && !isNewUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animation ? 1 : 0, y: animation ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-400">Continue where you left off</h3>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{pendingTask.title}</p>
                    <p className="text-sm text-gray-500">{pendingTask.subject} • {pendingTask.progress}% completed</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="ml-4 border-amber-200 hover:bg-amber-100"
                    onClick={handleContinueTask}
                  >
                    Continue Learning
                  </Button>
                </div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animation ? 1 : 0, y: animation ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-blue-800 dark:text-blue-400">Ready for today's learning?</h3>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Your personalized study plan is ready with carefully curated concepts, flashcards, and practice tests.</p>
                <Button 
                  variant="outline" 
                  className="ml-4 whitespace-nowrap border-blue-200 hover:bg-blue-100"
                  onClick={handleGoToTodaysPlan}
                >
                  Today's Plan
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: animation ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Discover PREPZR Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: animation ? 1 : 0, y: animation ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(feature.path)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="border-t px-6 py-4 bg-gray-50">
            <Button 
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>Need help getting started? <Link to="/help" className="text-blue-600 hover:underline">View Tutorial</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default PostLoginPrompt;
