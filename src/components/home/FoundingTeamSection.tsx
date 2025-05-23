
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Star } from 'lucide-react';

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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-blue-100/50 dark:border-blue-900/30"
  >
    <div className="p-6">
      <div className="relative mx-auto mb-6">
        {/* Larger profile image */}
        <div className="relative w-40 h-40 mx-auto">
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <img
            src={imageSrc}
            alt={name}
            className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-700 shadow-lg z-10 relative"
          />
          
          {/* Animated stars around image */}
          <motion.div 
            className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1.5 shadow-md z-20"
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Star className="w-4 h-4 text-white fill-current" />
          </motion.div>
        </div>
        
        {/* Colorful badges for visual enhancement */}
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <motion.div 
            className="flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs py-1 px-2 rounded-full shadow-md">
              Visionary
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs py-1 px-2 rounded-full shadow-md">
              Innovator
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.h3 
        className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-1"
        animate={{ 
          backgroundImage: ['linear-gradient(90deg, #3b82f6, #8b5cf6)', 'linear-gradient(90deg, #8b5cf6, #3b82f6)']
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {name}
      </motion.h3>
      
      <p className="text-center text-purple-600 dark:text-purple-400 mb-3 font-semibold">{role}</p>
      <p className="text-gray-600 dark:text-gray-300 text-center">{bio}</p>
      
      <div className="flex justify-center mt-4">
        <motion.a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={16} />
          <span className="text-sm font-medium">LinkedIn Profile</span>
        </motion.a>
      </div>
      
      <p className="text-gray-500 dark:text-gray-400 text-center mt-3 text-sm">Based in {location}</p>
    </div>
  </motion.div>
);

const FoundingTeamSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold"
              animate={{ 
                boxShadow: ['0 0 0px rgba(79, 70, 229, 0.5)', '0 0 20px rgba(79, 70, 229, 0.7)', '0 0 0px rgba(79, 70, 229, 0.5)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Meet Our Team
            </motion.div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
            The Team Behind PREPZR
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the visionaries who are revolutionizing exam preparation with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
};

export default FoundingTeamSection;
