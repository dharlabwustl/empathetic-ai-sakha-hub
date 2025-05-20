
import React from 'react';
import { LinkedIn, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Team member data with LinkedIn profiles
const teamMembers = [
  {
    id: 1,
    name: "Dr. Atul Sharma",
    role: "Co-Founder & CEO",
    image: "/assets/images/team/atul.jpg",
    description: "Former Senior PM at Microsoft, education technology expert with 15+ years experience.",
    linkedIn: "https://www.linkedin.com/in/sharmaatul11/",
    email: "atul@prepzr.com"
  },
  {
    id: 2,
    name: "Amit Singh",
    role: "Co-Founder & CTO",
    image: "/assets/images/team/amit.jpg",
    description: "AI/ML expert with experience at Amazon, Stanford AI graduate with multiple patents.",
    linkedIn: "https://www.linkedin.com/in/amitsinghrenewed/",
    email: "amit@prepzr.com"
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Head of Educational Content",
    image: "/assets/images/team/sneha.jpg",
    description: "Former curriculum designer for Khan Academy, specialized in adaptive learning.",
    linkedIn: "#",
    email: "sneha@prepzr.com"
  },
  {
    id: 4,
    name: "Rajiv Mehta",
    role: "Chief Psychology Officer",
    image: "/assets/images/team/rajiv.jpg",
    description: "Educational psychologist with research focus on learning patterns and motivation.",
    linkedIn: "#",
    email: "rajiv@prepzr.com"
  }
];

const FoundingTeamSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Meet Our Founding Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experts in education, psychology, and technology, united by a shared mission to revolutionize exam preparation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/default-avatar.png";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {member.description}
                </p>
                <div className="flex space-x-3">
                  <a 
                    href={member.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-400 transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <LinkedIn size={18} />
                  </a>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/30 dark:hover:bg-violet-800/50 text-violet-700 dark:text-violet-400 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundingTeamSection;
