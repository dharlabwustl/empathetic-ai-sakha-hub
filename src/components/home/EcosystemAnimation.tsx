
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const EcosystemAnimation = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-violet-50/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
            The Complete <span className="text-violet-600">Exam Preparation</span> Ecosystem
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our holistic approach places students at the center, surrounded by tools, resources, and AI support for optimal exam preparation
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Animated ecosystem visualization */}
          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Center element - Student */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <div className="text-center">
                <p className="font-bold text-lg md:text-xl mb-1">Student</p>
                <p className="text-xs md:text-sm">Exam Success</p>
              </div>
            </motion.div>

            {/* Orbit layers */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] md:w-[320px] h-[260px] md:h-[320px] rounded-full border border-violet-200 z-10"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                scale: { delay: 0.3, duration: 0.5 },
                rotate: { duration: 60, repeat: Infinity, ease: "linear" }
              }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] md:w-[440px] h-[380px] md:h-[440px] rounded-full border border-indigo-200 z-10"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: -360 }}
              transition={{ 
                scale: { delay: 0.4, duration: 0.5 },
                rotate: { duration: 80, repeat: Infinity, ease: "linear" }
              }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[580px] h-[500px] md:h-[580px] rounded-full border border-violet-100 z-10"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                scale: { delay: 0.5, duration: 0.5 },
                rotate: { duration: 100, repeat: Infinity, ease: "linear" }
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
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center h-full border border-violet-100"
                    whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(124, 58, 237, 0.1)" }}
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
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center h-full border border-indigo-100"
                    whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1)" }}
                  >
                    <span className="text-xs font-medium text-indigo-700">
                      {["Live Classes", "Community", "AI Tutor", "Progress", "Past Papers", "FAQs"][index]}
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
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center h-full border border-sky-100"
                    whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(56, 189, 248, 0.1), 0 8px 10px -6px rgba(56, 189, 248, 0.1)" }}
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
        
        {/* Explanation badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Badge className="bg-violet-100 text-violet-700 px-3 py-1">Student-Centric Approach</Badge>
          <Badge className="bg-indigo-100 text-indigo-700 px-3 py-1">AI-Powered Learning</Badge>
          <Badge className="bg-sky-100 text-sky-700 px-3 py-1">Comprehensive Resources</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">Adaptive Study Plans</Badge>
          <Badge className="bg-amber-100 text-amber-700 px-3 py-1">Continuous Assessment</Badge>
        </div>
      </div>
    </section>
  );
};

export default EcosystemAnimation;
