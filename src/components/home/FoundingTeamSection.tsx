
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Star, Zap, Brain, Trophy } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  location: string;
  linkedinUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, bio, imageSrc, location, linkedinUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-gradient-to-br from-white via-purple-50/50 to-blue-50/50 dark:from-gray-800 dark:via-purple-900/20 dark:to-blue-900/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-500 border border-purple-200/50 dark:border-purple-800/30 relative"
  >
    {/* Vibrant background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl" />
    
    {/* Animated particles */}
    <div className="absolute top-4 right-4">
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-purple-400/30 dark:text-purple-500/40"
      >
        <Star className="w-6 h-6" />
      </motion.div>
    </div>
    
    <div className="p-8 relative z-10">
      {/* Enhanced and bigger profile image */}
      <motion.div 
        className="relative mb-6 mx-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full blur-md opacity-50 animate-pulse" />
        <img
          src={imageSrc}
          alt={name}
          className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white/80 dark:border-gray-700/80 relative z-10 shadow-2xl"
        />
        <motion.div 
          className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0, -10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Trophy className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
      
      {/* Enhanced name and role */}
      <motion.h3 
        className="text-2xl font-bold text-center mb-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 drop-shadow-lg">
          {name}
        </span>
      </motion.h3>
      
      <motion.p 
        className="text-center text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {role}
      </motion.p>
      
      {/* Enhanced bio with better styling */}
      <motion.p 
        className="text-gray-700 dark:text-gray-300 text-center text-lg leading-relaxed mb-6 font-medium"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {bio}
      </motion.p>
      
      {/* Enhanced LinkedIn link */}
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/50"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Linkedin className="w-5 h-5" />
          <span>LinkedIn Profile</span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.a>
      </motion.div>
      
      {/* Enhanced location with icon */}
      <motion.p 
        className="text-gray-600 dark:text-gray-400 text-center text-base flex items-center justify-center gap-2 font-medium"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🌍
        </motion.div>
        Based in {location}
      </motion.p>
    </div>
  </motion.div>
);

const FoundingTeamSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50/80 via-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
      {/* Vibrant background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Enhanced section heading */}
          <motion.div className="mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              🚀
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 drop-shadow-2xl">
              The Team Behind PREPZR
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-purple-600 to-blue-600 dark:from-gray-300 dark:via-purple-400 dark:to-blue-400 max-w-4xl mx-auto font-semibold leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet the visionaries who are revolutionizing exam preparation with AI
          </motion.p>
          
          {/* Added visual elements */}
          <motion.div 
            className="flex justify-center gap-4 mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[Brain, Zap, Star].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity 
                }}
                className="text-purple-500"
              >
                <Icon className="w-8 h-8" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced team cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ProfileCard
            name="Amit Singh"
            role="Founder & CEO"
            bio="Building AI tech startups in education. Based in India."
            imageSrc="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png"
            location="India"
            linkedinUrl="https://www.linkedin.com/in/amitsinghrenewed/"
          />
          <ProfileCard
            name="Dr. Atul Sharma"
            role="Cofounder & Chief AI Scientist"
            bio="Doctorate in Engineering (USA), IIT Alumni. Research Scientist & Professor focused on advanced AI solutions."
            imageSrc="/lovable-uploads/0fa1cac6-aec8-4484-82f8-54739838449c.png"
            location="USA"
            linkedinUrl="https://www.linkedin.com/in/sharmaatul11/"
          />
        </div>
        
        {/* Enhanced bottom visual element */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="text-6xl"
          >
            ⚡
          </motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 font-medium">
            Powered by Innovation & Passion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundingTeamSection;
