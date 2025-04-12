
import React from 'react';
import { Button } from "@/components/ui/button";
import { PhoneIcon, Download, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const MobileApp = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const features = [
    "All student dashboard features synced",
    "Study on the go with full mobile access",
    "Push notifications for study reminders",
    "Offline mode for learning without internet",
    "24/7 AI tutor in your pocket",
    "Full exam preparation toolkit"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column - App description */}
          <motion.div className="order-2 md:order-1">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-violet-900"
              variants={itemVariants}
            >
              Sakha AI Student App
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8"
              variants={itemVariants}
            >
              Take your exam preparation to the next level with our powerful mobile app. Study anytime, anywhere with the same personalized AI assistance you love.
            </motion.p>
            
            <motion.div 
              className="space-y-4 mb-8"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                  custom={index}
                >
                  <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-800">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2">
                <Download size={18} />
                Download from Play Store
              </Button>
              
              <Link to="/signup">
                <Button variant="outline" size="lg" className="border-violet-300 text-violet-700 hover:bg-violet-50 flex items-center gap-2">
                  Create an Account <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right column - Phone mockup */}
          <motion.div 
            className="order-1 md:order-2 relative flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-[280px] h-[570px] bg-black rounded-[36px] p-3 shadow-2xl border-8 border-gray-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black z-10 rounded-b-xl"></div>
              <div className="h-full w-full bg-violet-50 rounded-3xl overflow-hidden relative">
                {/* App screenshots */}
                <div className="h-full w-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
                    alt="Mobile App Screenshot" 
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* App UI overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 flex flex-col justify-end p-6">
                  <h4 className="text-white text-xl font-bold mb-1">Sakha AI</h4>
                  <p className="text-white/90 text-sm mb-3">Your personalized AI study partner</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white h-8 px-3 text-xs">Dashboard</Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white h-8 px-3 text-xs">Tutor</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 w-64 h-64 bg-violet-300/50 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -z-10 w-48 h-48 bg-indigo-300/40 rounded-full blur-xl -bottom-6 -right-6"></div>
            <div className="absolute -z-10 w-32 h-32 bg-pink-300/30 rounded-full blur-xl top-8 -left-8"></div>
          </motion.div>
        </motion.div>
        
        {/* App features section */}
        <div className="mt-20 md:mt-32">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-violet-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Everything You Need In One App
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: "Personalized Study Plan",
                description: "AI creates a tailored study plan based on your unique needs and exam timeline",
                icon: <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><PhoneIcon /></div>
              },
              {
                title: "24/7 AI Tutor",
                description: "Get your questions answered instantly by our intelligent AI tutor, anytime",
                icon: <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><PhoneIcon /></div>
              },
              {
                title: "Progress Tracking",
                description: "Track your study progress in real-time with detailed analytics and insights",
                icon: <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><PhoneIcon /></div>
              },
              {
                title: "Mock Exams",
                description: "Practice with authentic mock exams that simulate real test conditions",
                icon: <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><PhoneIcon /></div>
              },
              {
                title: "Flashcards & Notes",
                description: "Create and manage digital flashcards and study notes for quick revision",
                icon: <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><PhoneIcon /></div>
              },
              {
                title: "Feel-Good Corner",
                description: "Take a study break with our motivational content and stress-relief activities",
                icon: <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><PhoneIcon /></div>
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-violet-100"
                variants={itemVariants}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-violet-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet-900">Ready to elevate your exam preparation?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Download the app now and experience the future of AI-powered learning on your mobile device.</p>
          
          <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
            Download on Google Play
          </Button>
          
          <p className="mt-6 text-sm text-gray-500">Compatible with Android 8.0 and above</p>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileApp;
