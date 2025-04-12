
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, CheckCircle } from 'lucide-react';

const MobileAppPromotion = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-100/20 to-transparent dark:from-pink-900/10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-transparent dark:from-purple-900/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-200/50 dark:bg-pink-900/30 rounded-full blur-2xl"></div>
              <div className="relative z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <img 
                  src="/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png" 
                  alt="Sakha AI Mobile App" 
                  className="w-full h-auto"
                />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-200/50 dark:bg-purple-900/30 rounded-full blur-2xl"
              ></motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
              New Release
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold mb-6 font-display">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Sakha AI in Your Pocket
              </span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Take your personalized study companion wherever you go with the Sakha AI mobile app. Get the same powerful features with a seamless mobile experience.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Complete study dashboard on mobile",
                "Personalized study plan synced across devices",
                "AI-powered doubt resolution on the go",
                "Quick mood-based content suggestions",
                "Study analytics and progress tracking"
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-start"
                >
                  <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 mr-3" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download App
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 border-pink-200 hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-900/20"
                  size="lg"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Available for Android devices. iOS version coming soon.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromotion;
