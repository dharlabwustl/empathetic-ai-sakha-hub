
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Smartphone, BookOpen, Brain, Medal, Bell, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";

const AndroidApp = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const features = [
    { 
      name: "Personalized Dashboard", 
      description: "Your study progress, recommendations and daily goals in one place",
      icon: <Smartphone className="h-5 w-5" />
    },
    { 
      name: "24/7 AI Tutor", 
      description: "Get your questions answered any time with our intelligent AI tutor",
      icon: <Brain className="h-5 w-5" /> 
    },
    { 
      name: "Study Materials & Flashcards", 
      description: "Access all your study materials and flashcards on the go",
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: "Progress Analytics", 
      description: "Visual insights into your study performance and areas of improvement",
      icon: <LineChart className="h-5 w-5" /> 
    },
    { 
      name: "Exam Readiness", 
      description: "Track your preparation level with our exam readiness analyzer",
      icon: <Medal className="h-5 w-5" /> 
    },
    { 
      name: "Smart Notifications", 
      description: "Timely reminders for your study schedule and important updates",
      icon: <Bell className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-3/5 h-3/5 bg-gradient-to-br from-violet-200/50 to-transparent rounded-bl-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-tr-full -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-violet-900">
                  Your AI Study Partner <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">in Your Pocket</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Experience the full power of Sakha AI on your Android device. Study smarter, track progress, and get help anytime, anywhere.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download on Google Play
                  </Button>
                  
                  <Link to="/signup">
                    <Button size="lg" variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
                      Create Free Account
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free download, premium features available with subscription</span>
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Phone Mockup */}
                <div className="relative mx-auto max-w-xs">
                  <div className="relative w-[280px] h-[570px] bg-black rounded-[36px] p-3 shadow-2xl border-8 border-gray-800 mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black z-10 rounded-b-xl"></div>
                    <div className="h-full w-full bg-white rounded-3xl overflow-hidden">
                      {/* App Screenshot */}
                      <div className="h-full w-full overflow-hidden">
                        <img 
                          src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
                          alt="Sakha AI Mobile App" 
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Features */}
                  <motion.div
                    className="absolute -top-4 -left-16 bg-white p-2 rounded-lg shadow-md max-w-[140px]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                        <Brain className="h-3 w-3 text-violet-600" />
                      </div>
                      <span className="text-xs font-medium">AI Tutor</span>
                    </div>
                    <p className="text-xs text-gray-500">24/7 learning support</p>
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/3 -right-20 bg-white p-2 rounded-lg shadow-md max-w-[140px]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <LineChart className="h-3 w-3 text-indigo-600" />
                      </div>
                      <span className="text-xs font-medium">Progress</span>
                    </div>
                    <p className="text-xs text-gray-500">Real-time analysis</p>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-12 -left-20 bg-white p-2 rounded-lg shadow-md max-w-[140px]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                        <BookOpen className="h-3 w-3 text-pink-600" />
                      </div>
                      <span className="text-xs font-medium">Materials</span>
                    </div>
                    <p className="text-xs text-gray-500">Study on the go</p>
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -z-10 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-900">Powerful Features on Your Mobile</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our Android app brings the complete Sakha AI learning experience to your mobile device, with full syncing to your web account.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-violet-50 to-white p-6 rounded-xl border border-violet-100 shadow-sm"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                    <div className="text-violet-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-violet-900">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* App Screenshots Carousel */}
        <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-900">Beautiful, Intuitive Interface</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Designed for the best learning experience with an easy-to-use interface that helps you focus on what matters most.
              </p>
            </motion.div>
            
            <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="w-[220px] h-[440px] bg-black rounded-[24px] p-2 shadow-xl border-[6px] border-gray-800">
                    <div className="h-full w-full bg-violet-50 rounded-2xl overflow-hidden">
                      {/* Placeholder app screen */}
                      <div className="h-full w-full bg-gradient-to-br from-violet-100 to-indigo-50 flex items-center justify-center">
                        <p className="text-violet-800 font-medium">App Screen {index + 1}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials and Reviews */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-900">Loved by Students</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Join thousands of students who are achieving their exam goals with our mobile app.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya S.",
                  exam: "UPSC Aspirant",
                  text: "The Sakha AI app has completely transformed my UPSC preparation. I can study anywhere and the AI tutor is incredibly helpful.",
                  rating: 5
                },
                {
                  name: "Rahul M.",
                  exam: "JEE Student",
                  text: "Having my study materials and an AI tutor in my pocket has been a game-changer. I can clarify doubts instantly without waiting.",
                  rating: 5
                },
                {
                  name: "Ananya K.",
                  exam: "NEET Aspirant",
                  text: "The personalized study plan adjusts to my pace and the analytics help me focus on my weak areas. Best study app I've used!",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-violet-50 to-white p-6 rounded-xl border border-violet-100 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-violet-600">{testimonial.exam}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-${i < testimonial.rating ? 'yellow-400' : 'gray-300'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Download CTA */}
        <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your exam preparation?</h2>
              <p className="text-xl mb-10 text-violet-100">
                Download the Sakha AI Student App now and experience the future of personalized learning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-100 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download on Google Play
                </Button>
                
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Create Free Account
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-sm text-violet-200">
                Compatible with Android 8.0 and above. Free download with optional premium features.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AndroidApp;
