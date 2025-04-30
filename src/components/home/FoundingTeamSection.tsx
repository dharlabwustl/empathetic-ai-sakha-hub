
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const FoundingTeamSection = () => {
  const founders = [
    {
      name: "Amit Singh",
      role: "Founder & CEO, PREPZR",
      image: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png", 
      bio: "Building AI tech startups in education. Product architect. Based in India."
    },
    {
      name: "Dr. Atul Sharma",
      role: "Co-founder & Chief AI Scientist",
      image: "/lovable-uploads/0aee9e2f-6c2f-484e-a580-f28fe3d23820.png",
      bio: "Doctorate in Engineering (USA), IIT Alumni. Research Scientist & Professor focused on advanced AI solutions. Based in the USA."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Team Behind PREPZR</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet the visionaries who are revolutionizing exam preparation with AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3">
                      <img 
                        src={founder.image} 
                        alt={founder.name} 
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 w-full md:w-2/3">
                      <h3 className="text-xl font-bold">{founder.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">{founder.role}</p>
                      <p className="text-gray-600 dark:text-gray-300">{founder.bio}</p>
                    </div>
                  </div>
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
