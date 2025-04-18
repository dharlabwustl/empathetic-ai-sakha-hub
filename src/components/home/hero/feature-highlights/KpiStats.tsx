
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, TrendingUp, Smile, Users, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiItem {
  icon: React.ReactNode;
  stat: string;
  description: string;
  color: string;
  delay: number;
}

const KpiStats = () => {
  const kpis: KpiItem[] = [
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      stat: "80%",
      description: "of students said Sakha helped reduce exam stress",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      delay: 0.1,
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      stat: "5+ hours",
      description: "saved weekly through personalized study plans",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      delay: 0.2,
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      stat: "75%",
      description: "of students built a consistent study habit in 2 weeks",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      delay: 0.3,
    },
    {
      icon: <Smile className="h-6 w-6 text-white" />,
      stat: "4 out of 5",
      description: "students felt more confident before their exam",
      color: "bg-gradient-to-br from-amber-500 to-amber-700",
      delay: 0.4,
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      stat: "90%+",
      description: "of Sakha users continued after their 1st month",
      color: "bg-gradient-to-br from-pink-500 to-pink-700",
      delay: 0.5,
    },
    {
      icon: <Headphones className="h-6 w-6 text-white" />,
      stat: "60%",
      description: "use mood-based learning themes daily",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      delay: 0.6,
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Proven Results That Matter
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Based on our pilot program feedback, here's how Sakha AI is making a difference
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <KpiCard key={index} kpi={kpi} />
          ))}
        </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ kpi: KpiItem }> = ({ kpi }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: kpi.delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className={cn("p-3 rounded-lg", kpi.color)}>
          {kpi.icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {kpi.stat}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {kpi.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default KpiStats;
