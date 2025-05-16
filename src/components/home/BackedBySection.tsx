
import React from 'react';
import { motion } from 'framer-motion';

const BackedBySection = () => {
  const partners = [
    {
      name: 'NVIDIA Inception',
      logo: '/img/partners/nvidia-inception.png',
      alt: 'NVIDIA Inception Program Logo'
    },
    {
      name: 'NASSCOM Centre of Excellence',
      logo: '/img/partners/nasscom-coe.png',
      alt: 'NASSCOM Centre of Excellence Logo'
    },
    {
      name: 'IndiaAI (GCARED)',
      logo: '/img/partners/indiaai-gcared.png',
      alt: 'IndiaAI (GCARED) Logo'
    },
    {
      name: 'Microsoft for Startups',
      logo: '/img/partners/microsoft-startups.png',
      alt: 'Microsoft for Startups Logo'
    },
    {
      name: 'AWS Startups',
      logo: '/img/partners/aws-startups.png',
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
