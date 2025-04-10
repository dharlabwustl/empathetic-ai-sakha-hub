
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="flex justify-center mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <Button variant="ghost" className="text-violet-500 flex flex-col items-center gap-1 animate-bounce-subtle">
        <span className="text-sm font-medium">Explore More</span>
        <ChevronDown size={16} />
      </Button>
    </motion.div>
  );
};

export default ScrollIndicator;
