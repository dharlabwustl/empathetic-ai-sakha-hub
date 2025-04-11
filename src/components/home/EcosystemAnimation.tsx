
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const EcosystemAnimation = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white to-violet-50/40">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900"
            variants={titleVariants}
          >
            The <span className="text-violet-600">End-to-End Personalized Transformational</span> Exam Preparation Ecosystem
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            variants={titleVariants}
          >
            Our holistic approach places students at the center, surrounded by tools, resources, and AI support for optimal exam preparation
          </motion.p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Animated ecosystem visualization */}
          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Center element - Student */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg z-20"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.2, 
                duration: 0.5, 
                type: "spring",
                stiffness: 260, 
                damping: 20
              }}
            >
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <p className="font-bold text-lg md:text-xl mb-1">Student</p>
                <p className="text-xs md:text-sm">Exam Success</p>
              </motion.div>
            </motion.div>

            {/* Orbit layers with continuous rotation */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] md:w-[320px] h-[260px] md:h-[320px] rounded-full border border-violet-200 z-10"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ scale: { delay: 0.3, duration: 0.5 } }}
              animate={{ rotate: 360 }}
              style={{ 
                transition: "transform 60s linear infinite",
              }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] md:w-[440px] h-[380px] md:h-[440px] rounded-full border border-indigo-200 z-10"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ scale: { delay: 0.4, duration: 0.5 } }}
              animate={{ rotate: -360 }}
              style={{ 
                transition: "transform 80s linear infinite",
              }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[580px] h-[500px] md:h-[580px] rounded-full border border-violet-100 z-10"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ scale: { delay: 0.5, duration: 0.5 } }}
              animate={{ rotate: 360 }}
              style={{ 
                transition: "transform 100s linear infinite",
              }}
            />

            {/* First orbit elements */}
            {[0, 60, 120, 180, 240, 300].map((angle, index) => {
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * 130 + 130;
              const y = Math.sin(radian) * 130 + 130;
              
              return (
                <motion.div
                  key={`orbit1-${index}`}
                  className="absolute w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10 z-20"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, zIndex: 30 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center h-full border border-violet-100"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(124, 58, 237, 0.1)"
                    }}
                  >
                    <span className="text-xs font-medium text-violet-700">
                      {["Study Plan", "Flashcards", "Mock Tests", "Tutoring", "Analytics", "Notes"][index]}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Second orbit elements */}
            {[30, 90, 150, 210, 270, 330].map((angle, index) => {
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * 190 + 130;
              const y = Math.sin(radian) * 190 + 130;
              
              return (
                <motion.div
                  key={`orbit2-${index}`}
                  className="absolute w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10 z-20"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, zIndex: 30 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center h-full border border-indigo-100"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1)" 
                    }}
                  >
                    <span className="text-xs font-medium text-indigo-700">
                      {["Community", "AI Tutor", "Progress", "Past Papers", "FAQs", "Support"][index]}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Third orbit elements */}
            {[15, 75, 135, 195, 255, 315].map((angle, index) => {
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * 250 + 130;
              const y = Math.sin(radian) * 250 + 130;
              
              return (
                <motion.div
                  key={`orbit3-${index}`}
                  className="absolute w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10 z-20"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, zIndex: 30 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center h-full border border-sky-100"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 10px 25px -5px rgba(56, 189, 248, 0.1), 0 8px 10px -6px rgba(56, 189, 248, 0.1)" 
                    }}
                  >
                    <span className="text-xs font-medium text-sky-700">
                      {["Library", "Resources", "Schedule", "Exams", "Videos", "Support"][index]}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Explanation badges with animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {[
            { text: "Student-Centric Approach", bg: "bg-violet-100", text: "text-violet-700" },
            { text: "AI-Powered Learning", bg: "bg-indigo-100", text: "text-indigo-700" },
            { text: "Comprehensive Resources", bg: "bg-sky-100", text: "text-sky-700" },
            { text: "Adaptive Study Plans", bg: "bg-emerald-100", text: "text-emerald-700" },
            { text: "Continuous Assessment", bg: "bg-amber-100", text: "text-amber-700" }
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge className={`${badge.bg} ${badge.text} px-3 py-1`}>
                {badge.text}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemAnimation;
