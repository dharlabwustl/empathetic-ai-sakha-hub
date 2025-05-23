
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ConceptContentProps {
  content: string;
}

const ConceptContent: React.FC<ConceptContentProps> = ({ content }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div 
            className="prose dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConceptContent;
