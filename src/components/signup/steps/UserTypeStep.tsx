
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingContext } from '../OnboardingContext';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, School } from 'lucide-react';

interface UserTypeStepProps {
  onNext: () => void;
}

const UserTypeStep: React.FC<UserTypeStepProps> = ({ onNext }) => {
  const { userType, setUserType } = useOnboardingContext();

  const handleSelectType = (type: string) => {
    setUserType(type);
    onNext();
  };

  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'Preparing for exams or studying in school/college',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Supporting my child in their education journey',
      icon: School,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Helping students achieve their academic goals',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <p className="text-center text-muted-foreground mb-6">
        Select your role to personalize your experience
      </p>
      
      <motion.div
        className="space-y-3"
        variants={container}
      >
        {userTypes.map((type) => {
          const Icon = type.icon;
          return (
            <motion.div key={type.id} variants={item}>
              <Button
                variant="outline"
                className={`w-full justify-start p-4 h-auto text-left ${type.hoverColor} ${
                  userType === type.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectType(type.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-gradient-to-br ${type.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{type.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default UserTypeStep;
