
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, CreditCard, Target, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarLayout from '@/components/dashboard/SidebarLayout';

const ExamSyllabusPage = () => {
  const [activeSubject, setActiveSubject] = useState('physics');

  // Enhanced syllabus data with detailed concepts
  const syllabusData = {
    physics: {
      name: 'Physics',
      color: 'from-blue-500 to-cyan-500',
      totalTopics: 14,
      completedTopics: 8,
      totalConcepts: 156,
      masteredConcepts: 89,
      topics: [
        {
          id: 'mechanics',
          name: 'Mechanics',
          weight: '23%',
          progress: 75,
          totalConcepts: 18,
          masteredConcepts: 14,
          concepts: [
            { id: 'kinematics', name: 'Kinematics', mastered: true },
            { id: 'dynamics', name: 'Newton\'s Laws of Motion', mastered: true },
            { id: 'work-energy', name: 'Work, Energy & Power', mastered: true },
            { id: 'momentum', name: 'Linear Momentum', mastered: false },
            { id: 'circular-motion', name: 'Circular Motion', mastered: false },
            { id: 'gravitation', name: 'Gravitation', mastered: true }
          ]
        },
        {
          id: 'thermodynamics',
          name: 'Thermodynamics',
          weight: '16%',
          progress: 60,
          totalConcepts: 12,
          masteredConcepts: 7,
          concepts: [
            { id: 'heat-temperature', name: 'Heat and Temperature', mastered: true },
            { id: 'thermal-expansion', name: 'Thermal Expansion', mastered: true },
            { id: 'calorimetry', name: 'Calorimetry', mastered: false },
            { id: 'kinetic-theory', name: 'Kinetic Theory of Gases', mastered: false },
            { id: 'thermodynamic-laws', name: 'Laws of Thermodynamics', mastered: true }
          ]
        },
        {
          id: 'waves',
          name: 'Waves and Oscillations',
          weight: '12%',
          progress: 45,
          totalConcepts: 15,
          masteredConcepts: 7,
          concepts: [
            { id: 'shm', name: 'Simple Harmonic Motion', mastered: true },
            { id: 'wave-motion', name: 'Wave Motion', mastered: false },
            { id: 'sound-waves', name: 'Sound Waves', mastered: true },
            { id: 'doppler-effect', name: 'Doppler Effect', mastered: false },
            { id: 'resonance', name: 'Resonance', mastered: false }
          ]
        },
        {
          id: 'electricity',
          name: 'Electricity and Magnetism',
          weight: '25%',
          progress: 80,
          totalConcepts: 22,
          masteredConcepts: 18,
          concepts: [
            { id: 'electrostatics', name: 'Electrostatics', mastered: true },
            { id: 'current-electricity', name: 'Current Electricity', mastered: true },
            { id: 'magnetic-field', name: 'Magnetic Field', mastered: true },
            { id: 'electromagnetic-induction', name: 'Electromagnetic Induction', mastered: false },
            { id: 'ac-circuits', name: 'AC Circuits', mastered: true },
            { id: 'electromagnetic-waves', name: 'Electromagnetic Waves', mastered: false }
          ]
        },
        {
          id: 'optics',
          name: 'Optics',
          weight: '14%',
          progress: 55,
          totalConcepts: 16,
          masteredConcepts: 9,
          concepts: [
            { id: 'geometrical-optics', name: 'Geometrical Optics', mastered: true },
            { id: 'wave-optics', name: 'Wave Optics', mastered: false },
            { id: 'interference', name: 'Interference', mastered: true },
            { id: 'diffraction', name: 'Diffraction', mastered: false },
            { id: 'polarization', name: 'Polarization', mastered: false }
          ]
        },
        {
          id: 'modern-physics',
          name: 'Modern Physics',
          weight: '10%',
          progress: 35,
          totalConcepts: 13,
          masteredConcepts: 5,
          concepts: [
            { id: 'atomic-structure', name: 'Atomic Structure', mastered: true },
            { id: 'photoelectric-effect', name: 'Photoelectric Effect', mastered: false },
            { id: 'nuclear-physics', name: 'Nuclear Physics', mastered: false },
            { id: 'radioactivity', name: 'Radioactivity', mastered: true },
            { id: 'quantum-mechanics', name: 'Quantum Mechanics Basics', mastered: false }
          ]
        }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      color: 'from-green-500 to-emerald-500',
      totalTopics: 16,
      completedTopics: 9,
      totalConcepts: 142,
      masteredConcepts: 78,
      topics: [
        {
          id: 'atomic-structure',
          name: 'Atomic Structure',
          weight: '18%',
          progress: 85,
          totalConcepts: 12,
          masteredConcepts: 10,
          concepts: [
            { id: 'bohr-model', name: 'Bohr Model', mastered: true },
            { id: 'quantum-numbers', name: 'Quantum Numbers', mastered: true },
            { id: 'electronic-configuration', name: 'Electronic Configuration', mastered: true },
            { id: 'periodic-trends', name: 'Periodic Trends', mastered: false },
            { id: 'atomic-radius', name: 'Atomic Radius', mastered: true }
          ]
        },
        {
          id: 'chemical-bonding',
          name: 'Chemical Bonding',
          weight: '20%',
          progress: 70,
          totalConcepts: 15,
          masteredConcepts: 11,
          concepts: [
            { id: 'ionic-bonding', name: 'Ionic Bonding', mastered: true },
            { id: 'covalent-bonding', name: 'Covalent Bonding', mastered: true },
            { id: 'metallic-bonding', name: 'Metallic Bonding', mastered: false },
            { id: 'vsepr-theory', name: 'VSEPR Theory', mastered: true },
            { id: 'hybridization', name: 'Hybridization', mastered: false },
            { id: 'molecular-orbital', name: 'Molecular Orbital Theory', mastered: false }
          ]
        },
        {
          id: 'thermodynamics-chem',
          name: 'Thermodynamics',
          weight: '15%',
          progress: 60,
          totalConcepts: 18,
          masteredConcepts: 11,
          concepts: [
            { id: 'enthalpy', name: 'Enthalpy', mastered: true },
            { id: 'entropy', name: 'Entropy', mastered: false },
            { id: 'gibbs-free-energy', name: 'Gibbs Free Energy', mastered: true },
            { id: 'chemical-equilibrium', name: 'Chemical Equilibrium', mastered: false },
            { id: 'equilibrium-constant', name: 'Equilibrium Constant', mastered: true }
          ]
        },
        {
          id: 'organic-chemistry',
          name: 'Organic Chemistry',
          weight: '25%',
          progress: 55,
          totalConcepts: 28,
          masteredConcepts: 15,
          concepts: [
            { id: 'hydrocarbons', name: 'Hydrocarbons', mastered: true },
            { id: 'alcohols', name: 'Alcohols and Phenols', mastered: false },
            { id: 'aldehydes-ketones', name: 'Aldehydes and Ketones', mastered: false },
            { id: 'carboxylic-acids', name: 'Carboxylic Acids', mastered: true },
            { id: 'biomolecules', name: 'Biomolecules', mastered: false },
            { id: 'polymers', name: 'Polymers', mastered: true }
          ]
        },
        {
          id: 'inorganic-chemistry',
          name: 'Inorganic Chemistry',
          weight: '22%',
          progress: 65,
          totalConcepts: 24,
          masteredConcepts: 16,
          concepts: [
            { id: 's-block', name: 'S-Block Elements', mastered: true },
            { id: 'p-block', name: 'P-Block Elements', mastered: false },
            { id: 'd-block', name: 'D-Block Elements', mastered: true },
            { id: 'coordination-compounds', name: 'Coordination Compounds', mastered: false },
            { id: 'metallurgy', name: 'Metallurgy', mastered: true }
          ]
        }
      ]
    },
    biology: {
      name: 'Biology',
      color: 'from-purple-500 to-violet-500',
      totalTopics: 18,
      completedTopics: 12,
      totalConcepts: 168,
      masteredConcepts: 92,
      topics: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
          weight: '22%',
          progress: 80,
          totalConcepts: 16,
          masteredConcepts: 13,
          concepts: [
            { id: 'cell-structure', name: 'Cell Structure', mastered: true },
            { id: 'cell-organelles', name: 'Cell Organelles', mastered: true },
            { id: 'cell-membrane', name: 'Cell Membrane', mastered: true },
            { id: 'cell-division', name: 'Cell Division', mastered: false },
            { id: 'mitosis', name: 'Mitosis', mastered: true },
            { id: 'meiosis', name: 'Meiosis', mastered: false }
          ]
        },
        {
          id: 'genetics',
          name: 'Genetics',
          weight: '20%',
          progress: 65,
          totalConcepts: 22,
          masteredConcepts: 14,
          concepts: [
            { id: 'mendels-laws', name: 'Mendel\'s Laws', mastered: true },
            { id: 'chromosomal-genetics', name: 'Chromosomal Genetics', mastered: false },
            { id: 'molecular-genetics', name: 'Molecular Genetics', mastered: true },
            { id: 'dna-replication', name: 'DNA Replication', mastered: false },
            { id: 'gene-expression', name: 'Gene Expression', mastered: true },
            { id: 'genetic-disorders', name: 'Genetic Disorders', mastered: false }
          ]
        },
        {
          id: 'ecology',
          name: 'Ecology',
          weight: '18%',
          progress: 55,
          totalConcepts: 20,
          masteredConcepts: 11,
          concepts: [
            { id: 'ecosystem', name: 'Ecosystem', mastered: true },
            { id: 'biodiversity', name: 'Biodiversity', mastered: false },
            { id: 'environmental-issues', name: 'Environmental Issues', mastered: true },
            { id: 'conservation', name: 'Conservation Biology', mastered: false },
            { id: 'population-ecology', name: 'Population Ecology', mastered: false }
          ]
        },
        {
          id: 'human-physiology',
          name: 'Human Physiology',
          weight: '25%',
          progress: 70,
          totalConcepts: 30,
          masteredConcepts: 21,
          concepts: [
            { id: 'digestive-system', name: 'Digestive System', mastered: true },
            { id: 'respiratory-system', name: 'Respiratory System', mastered: true },
            { id: 'circulatory-system', name: 'Circulatory System', mastered: false },
            { id: 'nervous-system', name: 'Nervous System', mastered: true },
            { id: 'endocrine-system', name: 'Endocrine System', mastered: false },
            { id: 'reproductive-system', name: 'Reproductive System', mastered: true }
          ]
        },
        {
          id: 'plant-physiology',
          name: 'Plant Physiology',
          weight: '15%',
          progress: 45,
          totalConcepts: 18,
          masteredConcepts: 8,
          concepts: [
            { id: 'photosynthesis', name: 'Photosynthesis', mastered: true },
            { id: 'respiration-plants', name: 'Respiration in Plants', mastered: false },
            { id: 'plant-growth', name: 'Plant Growth and Development', mastered: false },
            { id: 'plant-hormones', name: 'Plant Hormones', mastered: true },
            { id: 'mineral-nutrition', name: 'Mineral Nutrition', mastered: false }
          ]
        }
      ]
    }
  };

  const currentSubject = syllabusData[activeSubject];

  const ConceptSlider = ({ topic }) => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {topic.name}
          </h4>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {topic.masteredConcepts}/{topic.totalConcepts} Mastered
            </Badge>
            <Badge className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              Weight: {topic.weight}
            </Badge>
          </div>
        </div>
        
        <Progress value={topic.progress} className="h-2" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {topic.concepts.map((concept) => (
            <Card key={concept.id} className={`border transition-all hover:shadow-md ${
              concept.mastered 
                ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {concept.name}
                  </h5>
                  {concept.mastered && (
                    <Award className="h-4 w-4 text-green-500" />
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  <Link to={`/dashboard/student/concepts/${concept.id}`}>
                    <Button size="sm" variant="outline" className="w-full text-xs h-8">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Study
                    </Button>
                  </Link>
                  
                  <Link to={`/dashboard/student/flashcards/${concept.id}/interactive`}>
                    <Button size="sm" variant="outline" className="w-full text-xs h-8">
                      <CreditCard className="h-3 w-3 mr-1" />
                      Cards
                    </Button>
                  </Link>
                  
                  <Link to={`/dashboard/student/practice-exam/${concept.id}/start`}>
                    <Button size="sm" variant="outline" className="w-full text-xs h-8">
                      <Target className="h-3 w-3 mr-1" />
                      Exam
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <SidebarLayout>
      <div className="container py-8 space-y-6">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">NEET 2026 Syllabus</h1>
              <p className="text-indigo-100 text-lg">Complete topic-wise breakdown with concept mastery tracking</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-2xl font-bold">{Math.round((currentSubject.masteredConcepts / currentSubject.totalConcepts) * 100)}%</div>
              <div className="text-indigo-200">Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Subject Tabs */}
        <Tabs value={activeSubject} onValueChange={setActiveSubject}>
          <TabsList className="grid w-full grid-cols-3 h-12">
            {Object.entries(syllabusData).map(([key, subject]) => (
              <TabsTrigger key={key} value={key} className="text-lg font-medium">
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(syllabusData).map(([key, subject]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              {/* Subject Overview */}
              <Card className={`bg-gradient-to-r ${subject.color} text-white`}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{subject.totalTopics}</div>
                      <div className="text-sm opacity-90">Total Topics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{subject.completedTopics}</div>
                      <div className="text-sm opacity-90">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{subject.totalConcepts}</div>
                      <div className="text-sm opacity-90">Total Concepts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{subject.masteredConcepts}</div>
                      <div className="text-sm opacity-90">Mastered</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Topics with Concept Sliders */}
              <div className="space-y-8">
                {subject.topics.map((topic, index) => (
                  <Card key={topic.id} className="border-2 border-gray-100 dark:border-gray-800">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">
                          {index + 1}. {topic.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {topic.masteredConcepts}/{topic.totalConcepts} concepts mastered
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ConceptSlider topic={topic} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Premium Features Banner */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                  🎯 Premium Syllabus Features
                </h3>
                <p className="text-amber-700 dark:text-amber-400">
                  Track your progress across all concepts with detailed analytics and personalized study recommendations
                </p>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                View Analytics
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default ExamSyllabusPage;
