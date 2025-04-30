
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
  linkedIn?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    bio: "Former educator with 10+ years of experience in the EdTech space, passionate about transforming learning with AI.",
    initials: "RS",
    linkedIn: "#"
  },
  {
    name: "Priya Patel",
    role: "Co-founder & CTO",
    bio: "AI researcher with a focus on personalized learning systems and adaptive educational technologies.",
    initials: "PP",
    linkedIn: "#"
  },
  {
    name: "Vikram Singh",
    role: "Head of Educational Content",
    bio: "Former IIT professor with expertise in developing structured learning materials for competitive exams.",
    initials: "VS",
    linkedIn: "#"
  },
  {
    name: "Ananya Desai",
    role: "Chief Learning Officer",
    bio: "Educational psychologist specializing in cognitive learning models and student engagement strategies.",
    initials: "AD",
    linkedIn: "#"
  }
];

const FoundingTeamSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Team Behind PREPZR</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the visionaries who are revolutionizing exam preparation with AI
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className="p-6 bg-gradient-to-r from-violet-500/10 to-blue-500/10 dark:from-violet-500/20 dark:to-blue-500/20 flex justify-center">
                  <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-lg">
                    {member.image ? (
                      <AvatarImage src={member.image} alt={member.name} />
                    ) : (
                      <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                        {member.initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-center">{member.name}</h3>
                  <p className="text-primary text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{member.bio}</p>
                  
                  {member.linkedIn && (
                    <div className="flex justify-center mt-4">
                      <a 
                        href={member.linkedIn} 
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundingTeamSection;
