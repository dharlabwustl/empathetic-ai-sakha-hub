
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface ImpactStat {
  id: string;
  value: number;
  unit?: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

const impactStats: ImpactStat[] = [
  {
    id: 'students',
    value: 10000,
    unit: '+',
    title: 'Active Students',
    description: 'Students from across India trust us to achieve their academic goals.',
    icon: '👩‍🎓',
    highlights: [
      'Students across 28 states',
      'Average study time increased by 42%',
      '97% reported improved confidence',
      'Personalized learning for each student'
    ]
  },
  {
    id: 'success',
    value: 92,
    unit: '%',
    title: 'Success Rate',
    description: 'Our students consistently outperform their peers in competitive exams.',
    icon: '🏆',
    highlights: [
      'Top 1% achievers in NEET',
      'Average score improvement of 32%',
      'Personalized success pathways',
      '94% reach their target scores'
    ]
  },
  {
    id: 'tutor',
    value: 24,
    unit: '/7',
    title: 'AI Tutor Support',
    description: 'Round-the-clock access to our advanced AI tutoring system.',
    icon: '🤖',
    highlights: [
      'Available anytime, anywhere',
      '3M+ queries answered monthly',
      'Personalized to each student',
      'Constantly learning and improving'
    ]
  },
  {
    id: 'tests',
    value: 100,
    unit: '+',
    title: 'Practice Tests',
    description: 'Comprehensive test library covering all major competitive exams.',
    icon: '📝',
    highlights: [
      'Exam-specific question banks',
      'Adaptive difficulty based on progress',
      'Detailed performance analytics',
      'Regular updates with new questions'
    ]
  },
  {
    id: 'concepts',
    value: 5000,
    unit: '+',
    title: 'Concept Cards',
    description: 'Comprehensive coverage of all subjects for deep understanding.',
    icon: '🧠',
    highlights: [
      'Visual learning with animations',
      'Interconnected concept mapping',
      'Memory-optimized presentations',
      'Regular updates with latest curriculum'
    ]
  }
];

const OurImpactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [hasAnimated, setHasAnimated] = useState<{[key: string]: boolean}>({});
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && !hasAnimated[activeTab]) {
      setHasAnimated(prev => ({...prev, [activeTab]: true}));
    }
  }, [inView, activeTab, hasAnimated]);

  return (
    <section id="our-impact" className="py-16 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing education through technology and personalized learning
          </p>
        </motion.div>

        <div ref={ref} className="max-w-5xl mx-auto">
          <Tabs
            defaultValue="students"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-flow-col auto-cols-fr gap-2">
                {impactStats.map(stat => (
                  <motion.div
                    key={stat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TabsTrigger
                      value={stat.id}
                      className="relative flex flex-col items-center justify-center h-24 w-24 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <span className="text-2xl mb-1">{stat.icon}</span>
                      <AnimatePresence>
                        {activeTab === stat.id && (
                          <motion.div 
                            className="absolute -bottom-1 h-1 w-12 bg-primary rounded-full"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 48 }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </div>

            <div className="relative min-h-[400px]">
              {impactStats.map(stat => (
                <TabsContent 
                  key={stat.id}
                  value={stat.id} 
                  className="mt-0"
                >
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-card/95 to-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <motion.div 
                          className="lg:w-1/2 p-8 flex flex-col justify-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="text-4xl md:text-5xl font-bold mb-2 text-primary flex items-baseline">
                            {hasAnimated[stat.id] ? (
                              <CountUp 
                                start={0} 
                                end={stat.value} 
                                duration={2.5} 
                                separator="," 
                              />
                            ) : (
                              stat.value
                            )}
                            <span className="ml-1">{stat.unit}</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-4">{stat.title}</h3>
                          <p className="text-muted-foreground mb-6">{stat.description}</p>
                        </motion.div>
                        <motion.div 
                          className="lg:w-1/2 p-8 bg-primary/5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <h4 className="font-semibold mb-4 text-lg">Key Highlights</h4>
                          <ul className="space-y-3">
                            {stat.highlights.map((highlight, index) => (
                              <motion.li 
                                key={index}
                                className="flex items-start"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                              >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                                </div>
                                <span>{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default OurImpactSection;
