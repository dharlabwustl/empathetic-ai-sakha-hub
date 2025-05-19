
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, BookOpen, Trophy, Star, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const CallToAction = () => {
  const stats = [
    {
      icon: GraduationCap,
      number: "90%+",
      text: "Students reported improved exam scores"
    },
    {
      icon: Lightbulb,
      number: "40%",
      text: "Less study time with better retention"
    },
    {
      icon: Trophy,
      number: "10,000+",
      text: "Students achieving their exam goals"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center transform transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{stat.number}</h3>
              <p className="text-white/90">{stat.text}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
            Write Your Success Story with PREPZR
          </h2>
          
          <div className="flex justify-center mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              ))}
            </div>
          </div>
          
          <p className="text-white/90 text-lg mb-8 font-light">
            Join thousands of students who transformed their exam preparation from 
            <span className="line-through mx-2 opacity-80">stress and anxiety</span> to 
            <span className="font-semibold ml-2">confidence and success</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white hover:bg-gray-100 text-violet-700 text-lg group px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link to="/signup" className="flex items-center gap-2">
                <span>Start Your Free Trial Today</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight />
                </motion.div>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
              asChild
            >
              <Link to="/about">Learn How It Works</Link>
            </Button>
          </div>
          
          <p className="mt-6 text-white/80 text-sm">
            No credit card required. 7-day free trial.
          </p>
          
          {/* Testimonial badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full text-sm text-white/90 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-2">⭐</span> "Changed my approach to studying!" - Rahul K.
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full text-sm text-white/90 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-2">🎯</span> "Finally cracked JEE Advanced!" - Aisha M.
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full text-sm text-white/90 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-2">🚀</span> "From 60% to 95% in just 3 months!" - Vikram S.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
