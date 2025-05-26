
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Award, TrendingUp } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const testimonials = [
    {
      name: "Aarav Sharma",
      exam: "JEE Main 2024",
      score: "98.2 percentile",
      quote: "PREPZR's AI understood exactly where I was struggling and helped me improve systematically."
    },
    {
      name: "Priya Patel", 
      exam: "NEET 2024",
      score: "685/720",
      quote: "The personalized study plans and emotional support made all the difference in my preparation."
    },
    {
      name: "Rohit Kumar",
      exam: "CAT 2023", 
      score: "99.8 percentile",
      quote: "Best investment I made for my exam prep. The adaptive learning is revolutionary."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Join the Success Revolution
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Exam Results?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join over 2 million students who have already achieved their dream scores with PREPZR's AI-powered platform.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12"
          >
            {[
              { icon: <Users className="w-6 h-6" />, value: "2M+", label: "Active Students" },
              { icon: <Award className="w-6 h-6" />, value: "95%", label: "Success Rate" },
              { icon: <TrendingUp className="w-6 h-6" />, value: "40%", label: "Average Score Improvement" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex justify-center mb-3 text-yellow-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              Start Your Success Journey Today
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-blue-100 mt-4 text-sm">
              7-day free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-lg">★</span>
                  ))}
                </div>
                <p className="text-blue-100 italic">"{testimonial.quote}"</p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-blue-200">{testimonial.exam}</div>
                <div className="text-sm text-yellow-300 font-medium">Score: {testimonial.score}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
