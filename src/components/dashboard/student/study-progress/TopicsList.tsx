import React from 'react';
import { SubjectProgress } from "@/types/user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle } from 'lucide-react';

interface TopicsListProps {
  subject: SubjectProgress;
}

const TopicsList: React.FC<TopicsListProps> = ({ subject }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {subject.topics.map((topic) => (
        <AccordionItem value={topic.id} key={topic.id}>
          <AccordionTrigger className="flex justify-between items-center">
            {topic.name}
            {topic.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-500">
              Mastery Level: {topic.masteryLevel}
            </p>
            {topic.lastPracticed && (
              <p className="text-sm text-gray-500">
                Last Practiced: {topic.lastPracticed}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TopicsList;
