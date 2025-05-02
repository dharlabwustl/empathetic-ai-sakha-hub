
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { itemVariants } from './kpiAnimations';

interface StatItemProps {
  stat: {
    id: number;
    value: number;
    label: string;
    prefix: string;
    suffix: string;
    decimals: number;
    icon: string;
  };
  inView: boolean;
}

const StatItem = ({ stat, inView }: StatItemProps) => {
  return (
    <motion.div 
      key={stat.id} 
      variants={itemVariants}
      className="flex flex-col items-center text-center bg-white dark:bg-gray-800/60 p-2 rounded-lg border border-purple-100/30 dark:border-purple-800/30 shadow-sm hover:shadow transition-shadow"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <span className="text-2xl mb-1" aria-hidden="true">{stat.icon}</span>
      <motion.div 
        className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center"
      >
        <span>{stat.prefix}</span>
        {inView ? (
          <CountUp 
            start={0} 
            end={stat.value} 
            duration={2} 
            separator="," 
            decimals={stat.decimals}
            decimal="."
          />
        ) : (
          <span>0</span>
        )}
        <span>{stat.suffix}</span>
      </motion.div>
      <motion.p 
        className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 h-8"
      >
        {stat.label}
      </motion.p>
    </motion.div>
  );
};

export default StatItem;
