
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Star, TrendingUp, Users, Award, Clock } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleTakeDemo = () => {
    navigate('/demo');
  };

  const handleNeetLiveTest = () => {
    navigate('/neet-2026-live');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 mb-6 text-sm font-bold">
              🚀 Join 500,000+ Students Already Succeeding
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Become a
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent block">
                NEET 2026 Champion?
              </span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Don't let another day pass without giving your dreams the preparation they deserve. 
              Your NEET success story starts today.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: <Users className="h-6 w-6" />, value: "500K+", label: "Active Students" },
              { icon: <Award className="h-6 w-6" />, value: "95%", label: "Success Rate" },
              { icon: <TrendingUp className="h-6 w-6" />, value: "50+", label: "Point Avg Increase" },
              { icon: <Clock className="h-6 w-6" />, value: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="text-yellow-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Prominently Positioned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleNeetLiveTest}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform transition-all duration-300"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Take NEET 2026 Live Test
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform transition-all duration-300"
              >
                <Star className="h-5 w-5 mr-2" />
                Start Free Today
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleTakeDemo}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold px-8 py-4 text-lg rounded-full backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Urgency Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="h-6 w-6 text-yellow-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">NEET 2026 is just 156 days away!</h3>
            </div>
            <p className="text-gray-200 mb-4">
              Every day counts in your NEET preparation. Join thousands of students who are already ahead in their preparation.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span>Free account setup takes less than 2 minutes</span>
              <Star className="h-4 w-4 fill-current" />
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-300 text-sm mb-2">Trusted by students from</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>AIIMS • IIT • NEET Toppers • State Board • CBSE • ICSE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
