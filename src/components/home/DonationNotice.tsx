
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Users, School } from 'lucide-react';
import { motion } from 'framer-motion';

const DonationNotice = () => {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Supporting Education For All</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            At PREPZR, we believe quality education should be accessible to everyone. 
            When you subscribe to our premium plans, you're not just investing in your future—you're helping others too.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-blue-500" />
                <span>10% Goes to Scholarships</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                10% of all subscription revenue funds scholarships for underprivileged students, 
                giving them access to premium PREPZR features to prepare for competitive exams.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-purple-500" />
                <span>Supporting Rural Schools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We partner with rural schools to provide educational resources,
                technology infrastructure, and training to help their students compete nationally.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                <span>One-for-One Program</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For every 10 paid subscriptions, we provide a free premium account to a deserving 
                student who demonstrates academic potential but lacks financial resources.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 italic">
          Join us in making quality education accessible to everyone, regardless of their background.
        </div>
      </motion.div>
    </div>
  );
};

export default DonationNotice;
