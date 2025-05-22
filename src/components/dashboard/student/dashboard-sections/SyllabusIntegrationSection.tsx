
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Circle, BookOpen, Calculator, PieChart } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface SyllabusIntegrationProps {
    examType?: string;
}

const SyllabusIntegrationSection: React.FC<SyllabusIntegrationProps> = ({ 
    examType = "NEET" 
}) => {
    const subjects = [
        {
            name: "Physics",
            progress: 72,
            topics: [
                { name: "Mechanics", completed: true },
                { name: "Electromagnetism", completed: true },
                { name: "Optics", completed: true },
                { name: "Modern Physics", completed: false },
                { name: "Thermodynamics", completed: false }
            ]
        },
        {
            name: "Chemistry",
            progress: 58,
            topics: [
                { name: "Physical Chemistry", completed: true },
                { name: "Inorganic Chemistry", completed: true },
                { name: "Organic Chemistry", completed: false },
                { name: "Biomolecules", completed: false },
                { name: "Environmental Chemistry", completed: false }
            ]
        },
        {
            name: "Biology",
            progress: 65,
            topics: [
                { name: "Human Physiology", completed: true },
                { name: "Genetics", completed: true },
                { name: "Plant Physiology", completed: true },
                { name: "Ecology", completed: false },
                { name: "Biotechnology", completed: false }
            ]
        }
    ];

    const learningTools = [
        { name: "Formula Practice", icon: <Calculator className="w-5 h-5" /> },
        { name: "Visual Learning", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Exam Pattern Analysis", icon: <PieChart className="w-5 h-5" /> },
        { name: "Syllabus Mapping", icon: <FileText className="w-5 h-5" /> }
    ];

    return (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                        {examType} Syllabus Integration
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Track your progress across the complete exam syllabus
                    </p>
                </div>
                <FileText className="h-6 w-6 text-orange-500 dark:text-orange-400" />
            </div>

            <div className="space-y-6">
                {subjects.map((subject, index) => (
                    <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-100 dark:border-gray-700 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">{subject.name}</h4>
                            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                {subject.progress}% Complete
                            </span>
                        </div>
                        
                        <Progress 
                            value={subject.progress} 
                            className="h-2 mb-4 bg-gray-100 dark:bg-gray-700"
                            indicatorClassName="bg-orange-500 dark:bg-orange-600"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {subject.topics.map((topic, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    {topic.completed ? (
                                        <CheckCircle className="h-4 w-4 text-orange-500" />
                                    ) : (
                                        <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                                    )}
                                    <span className={`text-sm ${topic.completed ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {topic.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
                
                <div className="mt-6 border-t pt-4 border-gray-100 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Learning Methods</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {learningTools.map((tool, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (idx * 0.1) }}
                                className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg flex items-center gap-2 border border-orange-100 dark:border-orange-800/30"
                            >
                                <div className="text-orange-500 dark:text-orange-400">
                                    {tool.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {tool.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SyllabusIntegrationSection;
