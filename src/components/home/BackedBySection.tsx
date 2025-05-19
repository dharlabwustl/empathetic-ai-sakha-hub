import React from 'react';
import { motion } from 'framer-motion';

const BackedBySection = () => {
  const partners = [
    {
      name: 'NVIDIA Inception',
      logo: '/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png', // Updated logo
      alt: 'NVIDIA Inception Program Logo'
    },
    {
      name: 'NASSCOM Centre of Excellence',
      logo: '/lovable-uploads/d1760e15-ce66-47b7-8a4c-0c61d52d3c66.png',
      alt: 'NASSCOM Centre of Excellence Logo'
    },
    {
      name: 'IndiaAI (GCARED)',
      logo: '/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png',
      alt: 'IndiaAI (GCARED) Logo'
    },
    {
      name: 'Microsoft for Startups',
      logo: '/lovable-uploads/caff3d84-1157-41ac-961f-be3b0b5bb9b8.png',
      alt: 'Microsoft for Startups Logo'
    },
    {
      name: 'AWS Startups',
      logo: '/lovable-uploads/357a0e22-3fec-4a5c-808e-0540d5f7ba05.png',
      alt: 'AWS Startups Logo'
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-2">Backed By</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            PREPZR is supported by industry leaders in technology and innovation, helping us deliver the best learning experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 md:h-16">
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="h-full w-auto object-contain filter dark:brightness-90 mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackedBySection;
