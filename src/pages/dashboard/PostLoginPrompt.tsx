
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Sparkles, Star } from "lucide-react";

const PostLoginPrompt = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // Try to get user data from local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.name) {
        setUserName(parsedData.name);
      }
    }

    // Start animation after a short delay
    setTimeout(() => setAnimation(true), 300);
  }, []);

  const features = [
    {
      title: "Today's Study Plan",
      description: "Your personalized daily study schedule",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Concept Cards",
      description: "Master key concepts with interactive learning cards",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Feel Good Corner",
      description: "Tools to help you manage stress and stay focused",
      icon: <Star className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "24/7 AI Tutor",
      description: "Get help with any question, anytime",
      icon: <Sparkles className="h-5 w-5 text-green-500" />,
    },
  ];

  const handleContinue = () => {
    navigate("/dashboard/student");
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
              <PrepzrLogo width={100} />
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
                <p className="text-gray-600">
                  "Our mission at PREPZR is to make learning personalized, engaging, 
                  and effective. We're dedicated to helping you achieve your academic goals."
                </p>
                <p className="text-gray-600 mt-2 font-medium">- Amit Singh, Founder & CEO</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: animation ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Discover PREPZR Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: animation ? 1 : 0, y: animation ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
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
