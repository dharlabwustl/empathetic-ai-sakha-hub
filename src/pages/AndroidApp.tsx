
import React from 'react';
import Header from '@/components/layout/HeaderWithAdmin';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Download, 
  CheckCircle, 
  Shield, 
  Zap, 
  Brain, 
  Clock,
  MessageSquare
} from 'lucide-react';

const AndroidApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Header />
      
      <main>
        {/* Hero Banner */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-300/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
                  <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Sakha AI Android App
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Your personalized AI study partner, now in your pocket. Get access to all Sakha features on the go.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                    size="lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download from Play Store
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-pink-200 hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-900/20"
                    size="lg"
                  >
                    <Smartphone className="mr-2 h-5 w-5" />
                    View Features
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-200/50 dark:bg-pink-900/30 rounded-full blur-2xl"></div>
                  <img 
                    src="/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png" 
                    alt="Sakha AI Mobile App" 
                    className="relative z-10 max-h-[500px] w-auto rounded-3xl shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  App Features
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Designed with students in mind, our Android app brings the full power of Sakha AI to your mobile device
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Brain className="h-10 w-10 text-pink-500" />,
                  title: "AI Study Assistant",
                  description: "Get personalized study plans and recommendations based on your learning style"
                },
                {
                  icon: <MessageSquare className="h-10 w-10 text-purple-500" />,
                  title: "24/7 Doubt Solving",
                  description: "Ask questions anytime and get instant answers from our AI tutor"
                },
                {
                  icon: <Zap className="h-10 w-10 text-yellow-500" />,
                  title: "Quick Revision Tools",
                  description: "Flashcards, quizzes, and quick tests to reinforce your learning"
                },
                {
                  icon: <Shield className="h-10 w-10 text-blue-500" />,
                  title: "Progress Tracking",
                  description: "Monitor your performance and receive improvement suggestions"
                },
                {
                  icon: <Clock className="h-10 w-10 text-green-500" />,
                  title: "Study Timer",
                  description: "Track your study sessions and maintain optimal focus periods"
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-pink-500" />,
                  title: "Sync Across Devices",
                  description: "Seamless continuation between mobile and web platforms"
                },
                {
                  icon: <Smartphone className="h-10 w-10 text-purple-500" />,
                  title: "Offline Mode",
                  description: "Access key study materials even without internet connection"
                },
                {
                  icon: <Shield className="h-10 w-10 text-blue-500" />,
                  title: "Secure Login",
                  description: "Your study data is securely stored and protected"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Download CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-100/20 to-transparent dark:from-pink-900/10"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Get Started Today
                </span>
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Join thousands of students who've transformed their study experience with Sakha AI
              </p>
              
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </Button>
              
              <p className="mt-4 text-sm text-gray-500">
                Available on Android devices. iOS version coming soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AndroidApp;
