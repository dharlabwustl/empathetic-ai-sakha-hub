
import { motion } from 'framer-motion';
import { TabsContent } from "@/components/ui/tabs";
import StatItem from './StatItem';
import { containerVariants } from './kpiAnimations';

interface StatCategoryProps {
  category: string;
  stats: Array<{
    id: number;
    value: number;
    label: string;
    prefix: string;
    suffix: string;
    decimals: number;
    icon: string;
  }>;
  inView: boolean;
  activeTab: string;
}

const StatCategory = ({ category, stats, inView, activeTab }: StatCategoryProps) => {
  return (
    <TabsContent key={category} value={category} className="mt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView && activeTab === category ? "visible" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mx-auto max-w-6xl"
      >
        {stats.map((stat) => (
          <StatItem key={stat.id} stat={stat} inView={inView} />
        ))}
      </motion.div>
    </TabsContent>
  );
};

export default StatCategory;
