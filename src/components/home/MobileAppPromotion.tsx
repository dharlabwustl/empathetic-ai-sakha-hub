
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MobileAppPromotion = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 via-indigo-50 to-violet-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-violet-900">
              Take Sakha AI with you <br className="hidden md:block" />
              <span className="text-violet-600">wherever you go</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our mobile app puts the full power of personalized AI learning in your pocket. Study anytime, anywhere with the same features you love.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {['24/7 AI Tutor', 'Personalized Study Plan', 'Progress Tracking', 'Offline Learning'].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-violet-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                  <span className="text-sm font-medium text-gray-800">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/android-app">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-violet-300 text-violet-700 hover:bg-violet-50">
                <Download size={16} className="mr-2" /> Download App
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative z-10 w-[240px] h-[480px] bg-black rounded-[30px] p-2 shadow-2xl border-8 border-gray-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-20 bg-black z-10 rounded-b-xl"></div>
              <div className="h-full w-full bg-violet-50 rounded-3xl overflow-hidden relative">
                {/* Mobile UI elements */}
                <div className="h-full w-full overflow-hidden">
                  <div className="w-full h-[60px] bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-between px-4">
                    <span className="text-white font-semibold">Sakha AI</span>
                    <PhoneIcon className="text-white" size={18} />
                  </div>
                  <div className="p-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                      <div className="h-3 w-1/2 bg-violet-200 rounded mb-2"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded mb-1"></div>
                      <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                      <div className="h-3 w-2/3 bg-violet-200 rounded mb-2"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded mb-1"></div>
                      <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="bg-violet-100 rounded-lg p-3 shadow-sm mb-3">
                      <div className="h-3 w-1/2 bg-violet-300 rounded mb-2"></div>
                      <div className="h-2 w-4/5 bg-violet-50 rounded mb-1"></div>
                      <div className="h-2 w-3/5 bg-violet-50 rounded"></div>
                      <div className="mt-2 h-6 w-full flex justify-end">
                        <div className="h-full w-1/3 bg-violet-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Navigation bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200 flex justify-around items-center px-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-violet-600' : 'bg-gray-300'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -z-10 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl -top-10 -right-10"></div>
            <div className="absolute -z-10 w-40 h-40 bg-indigo-300/20 rounded-full blur-2xl -bottom-10 -left-10"></div>
            
            {/* Features indicators */}
            <motion.div 
              className="absolute -right-8 top-20 bg-white p-2 rounded-lg shadow-lg border border-violet-100 flex items-center gap-2 z-20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <span className="text-xs font-bold">AI</span>
              </div>
              <span className="text-xs font-medium">Personalized Study</span>
            </motion.div>
            
            <motion.div 
              className="absolute -left-12 top-40 bg-white p-2 rounded-lg shadow-lg border border-violet-100 flex items-center gap-2 z-20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <span className="text-xs font-bold">24/7</span>
              </div>
              <span className="text-xs font-medium">AI Tutor Access</span>
            </motion.div>
            
            <motion.div 
              className="absolute -right-4 bottom-32 bg-white p-2 rounded-lg shadow-lg border border-violet-100 flex items-center gap-2 z-20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <span className="text-xs font-bold">✓</span>
              </div>
              <span className="text-xs font-medium">Progress Tracking</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromotion;
