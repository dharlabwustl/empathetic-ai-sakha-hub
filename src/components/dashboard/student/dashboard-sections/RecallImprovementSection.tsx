
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, RotateCw, Lightbulb, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const RecallImprovementSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'spaced' | 'active' | 'visual'>('spaced');
    
    // Example formulas to practice (for NEET exam)
    const formulas = [
        {
            id: 1,
            formula: "PV = nRT",
            subject: "Chemistry",
            topic: "Ideal Gas Law",
            complexity: "Medium",
            retentionScore: 85,
        },
        {
            id: 2,
            formula: "F = G(m₁m₂)/r²",
            subject: "Physics",
            topic: "Gravitational Force",
            complexity: "Hard",
            retentionScore: 65,
        },
        {
            id: 3,
            formula: "E = mc²",
            subject: "Physics",
            topic: "Theory of Relativity",
            complexity: "Medium",
            retentionScore: 90,
        }
    ];
    
    const techniques = [
        {
            id: 'spaced',
            title: 'Spaced Repetition',
            icon: <RotateCw className="h-5 w-5" />,
            description: 'Review concepts at scientifically optimized intervals for maximum retention.',
            improvement: '+43%',
            color: 'orange'
        },
        {
            id: 'active',
            title: 'Active Recall',
            icon: <Brain className="h-5 w-5" />,
            description: 'Practice retrieving information from memory without referring to notes.',
            improvement: '+38%',
            color: 'orange'
        },
        {
            id: 'visual',
            title: 'Visual Association',
            icon: <Lightbulb className="h-5 w-5" />,
            description: 'Connect concepts with visual cues and mental imagery to enhance recall.',
            improvement: '+35%',
            color: 'orange'
        }
    ];

    return (
        <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                            Recall Improvement & Formula Practice
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Techniques to master formulas and improve your exam readiness score
                        </p>
                    </div>
                    <Brain className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                </div>
                
                <div className="flex space-x-2 mb-6 pb-1 overflow-x-auto">
                    {techniques.map(technique => (
                        <Button
                            key={technique.id}
                            variant={activeTab === technique.id ? "default" : "outline"}
                            size="sm"
                            className={`flex items-center gap-2 whitespace-nowrap ${
                                activeTab === technique.id 
                                    ? 'bg-orange-500 hover:bg-orange-600' 
                                    : 'text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400'
                            }`}
                            onClick={() => setActiveTab(technique.id as 'spaced' | 'active' | 'visual')}
                        >
                            {technique.icon}
                            <span>{technique.title}</span>
                        </Button>
                    ))}
                </div>

                {/* Technique Details */}
                {techniques.map(technique => (
                    <motion.div
                        key={technique.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                            opacity: activeTab === technique.id ? 1 : 0,
                            height: activeTab === technique.id ? 'auto' : 0
                        }}
                        className="overflow-hidden mb-6"
                    >
                        {activeTab === technique.id && (
                            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-100 dark:border-orange-800/30">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                                    {technique.icon}
                                    <span className="ml-2">{technique.title}</span>
                                    <span className="ml-auto text-orange-600 dark:text-orange-400 font-semibold">
                                        Recall Improvement: {technique.improvement}
                                    </span>
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{technique.description}</p>
                                
                                <div className="flex items-center space-x-2 mb-3">
                                    <CheckCircle className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Enhanced long-term retention of complex formulas
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Reduces exam anxiety through familiarity and confidence
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Formula Practice Section */}
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Formula Practice</h4>
                        <Button variant="link" className="text-orange-600 dark:text-orange-400 p-0">
                            View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                    
                    <div className="space-y-3">
                        {formulas.map(formula => (
                            <motion.div
                                key={formula.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: formula.id * 0.1 }}
                                className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-3 flex items-center"
                            >
                                <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-3 rounded-lg mr-3">
                                    <Zap className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                                            {formula.formula}
                                        </div>
                                        <div className="flex space-x-2">
                                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                                                {formula.subject}
                                            </span>
                                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                                                formula.complexity === 'Hard' 
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' 
                                                    : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                            }`}>
                                                {formula.complexity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formula.topic}
                                        </span>
                                        <div className="flex items-center">
                                            <span className="text-xs mr-2 text-gray-500 dark:text-gray-400">
                                                Retention:
                                            </span>
                                            <Progress 
                                                value={formula.retentionScore} 
                                                className="w-20 h-1.5 bg-gray-100 dark:bg-gray-600"
                                                indicatorClassName={`${
                                                    formula.retentionScore > 80 
                                                        ? 'bg-green-500' 
                                                        : formula.retentionScore > 60 
                                                        ? 'bg-orange-500' 
                                                        : 'bg-red-500'
                                                }`}
                                            />
                                            <span className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                {formula.retentionScore}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 border-t border-orange-100 dark:border-orange-900/30 p-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your overall formula recall score
                    </span>
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        78%
                    </span>
                </div>
                <Progress 
                    value={78} 
                    className="h-2 mt-2 bg-gray-100 dark:bg-gray-700"
                    indicatorClassName="bg-orange-500 dark:bg-orange-600"
                />
            </div>
        </div>
    );
};

export default RecallImprovementSection;
