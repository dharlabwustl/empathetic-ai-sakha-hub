
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OverviewSection from '../overview/OverviewSection';
import SubjectTabs from '../shared/SubjectTabs';
import StatusTabs from '../shared/StatusTabs';
import FilterSection from '../shared/FilterSection';
import ConceptCard from './ConceptCard';

const RedesignedConceptsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [weightageFilter, setWeightageFilter] = useState('all');

  // Mock data for overview
  const overviewData = {
    kpis: [
      { title: 'Total Concepts', value: 145, total: 200, unit: 'concepts', trend: 'up' as const },
      { title: 'Today\'s Target', value: 8, unit: 'concepts', trend: 'stable' as const },
      { title: 'Accuracy %', value: 85, unit: '%', trend: 'up' as const },
      { title: 'Weekly Progress', value: 32, unit: 'concepts', trend: 'up' as const }
    ],
    subjectProgress: [
      { name: 'Physics', completed: 45, total: 65, progress: 69, color: 'text-blue-600' },
      { name: 'Chemistry', completed: 52, total: 70, progress: 74, color: 'text-purple-600' },
      { name: 'Biology', completed: 48, total: 65, progress: 74, color: 'text-green-600' }
    ],
    suggestions: [
      'Revise Electromagnetism today for better understanding.',
      'Try 2 hard-level concepts from Organic Chemistry.',
      'Focus on Human Anatomy - 3 concepts pending completion.'
    ],
    todayTarget: 'Complete 8 concepts across Physics and Chemistry'
  };

  // Mock concepts data
  const mockConcepts = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      description: 'Fundamental principles governing motion and forces',
      subject: 'Physics',
      difficulty: 'medium' as const,
      completed: false,
      progress: 65,
      mastery: 78,
      timeEstimate: '25 min',
      tags: ['Mechanics', 'Forces'],
      examType: 'NEET',
      weightage: 'High',
      topic: 'Mechanics',
      status: 'in-progress' as const
    },
    {
      id: '2',
      title: 'Organic Reaction Mechanisms',
      description: 'Understanding electron movement in organic reactions',
      subject: 'Chemistry',
      difficulty: 'hard' as const,
      completed: false,
      progress: 30,
      mastery: 45,
      timeEstimate: '35 min',
      tags: ['Organic', 'Reactions'],
      examType: 'NEET',
      weightage: 'High',
      topic: 'Organic Chemistry',
      status: 'pending' as const
    },
    {
      id: '3',
      title: 'Cell Division Process',
      description: 'Mitosis and meiosis in cellular reproduction',
      subject: 'Biology',
      difficulty: 'medium' as const,
      completed: true,
      progress: 100,
      mastery: 92,
      timeEstimate: '20 min',
      tags: ['Cell Biology', 'Reproduction'],
      examType: 'NEET',
      weightage: 'Medium',
      topic: 'Cell Biology',
      status: 'completed' as const
    }
  ];

  const filterOptions = {
    difficulty: {
      value: difficultyFilter,
      options: [
        { value: 'all', label: 'All Difficulties' },
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
      ],
      onChange: setDifficultyFilter
    },
    topic: {
      value: topicFilter,
      options: [
        { value: 'all', label: 'All Topics' },
        { value: 'mechanics', label: 'Mechanics' },
        { value: 'organic-chemistry', label: 'Organic Chemistry' },
        { value: 'cell-biology', label: 'Cell Biology' }
      ],
      onChange: setTopicFilter
    },
    weightage: {
      value: weightageFilter,
      options: [
        { value: 'all', label: 'All Weightage' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ],
      onChange: setWeightageFilter
    }
  };

  const filteredConcepts = mockConcepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || concept.subject.toLowerCase() === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || concept.status === selectedStatus;
    const matchesDifficulty = difficultyFilter === 'all' || concept.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'all' || concept.topic.toLowerCase().includes(topicFilter.replace('-', ' '));
    const matchesWeightage = weightageFilter === 'all' || concept.weightage.toLowerCase() === weightageFilter;
    
    return matchesSearch && matchesSubject && matchesStatus && matchesDifficulty && matchesTopic && matchesWeightage;
  });

  const getConceptsBySubject = (subject: string) => {
    if (subject === 'all') return filteredConcepts;
    return filteredConcepts.filter(concept => concept.subject.toLowerCase() === subject);
  };

  const getConceptsByStatus = (concepts: any[], status: string) => {
    if (status === 'all') return concepts;
    return concepts.filter(concept => concept.status === status);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDifficultyFilter('all');
    setTopicFilter('all');
    setWeightageFilter('all');
  };

  const renderConceptGrid = (concepts: any[]) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {concepts.map((concept, index) => (
        <motion.div
          key={concept.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ConceptCard
            {...concept}
            onView={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  const subjectTabs = [
    {
      id: 'all',
      name: 'All Subjects',
      count: filteredConcepts.length,
      content: (
        <StatusTabs
          tabs={[
            {
              id: 'all',
              name: 'All',
              count: getConceptsBySubject('all').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('all'), 'all'))
            },
            {
              id: 'in-progress',
              name: 'In Progress',
              count: getConceptsByStatus(getConceptsBySubject('all'), 'in-progress').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('all'), 'in-progress'))
            },
            {
              id: 'pending',
              name: 'Pending',
              count: getConceptsByStatus(getConceptsBySubject('all'), 'pending').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('all'), 'pending'))
            },
            {
              id: 'completed',
              name: 'Completed',
              count: getConceptsByStatus(getConceptsBySubject('all'), 'completed').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('all'), 'completed'))
            }
          ]}
        />
      )
    },
    {
      id: 'physics',
      name: 'Physics',
      count: getConceptsBySubject('physics').length,
      content: (
        <StatusTabs
          tabs={[
            {
              id: 'all',
              name: 'All',
              count: getConceptsBySubject('physics').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('physics'), 'all'))
            },
            {
              id: 'in-progress',
              name: 'In Progress',
              count: getConceptsByStatus(getConceptsBySubject('physics'), 'in-progress').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('physics'), 'in-progress'))
            },
            {
              id: 'pending',
              name: 'Pending',
              count: getConceptsByStatus(getConceptsBySubject('physics'), 'pending').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('physics'), 'pending'))
            },
            {
              id: 'completed',
              name: 'Completed',
              count: getConceptsByStatus(getConceptsBySubject('physics'), 'completed').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('physics'), 'completed'))
            }
          ]}
        />
      )
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      count: getConceptsBySubject('chemistry').length,
      content: (
        <StatusTabs
          tabs={[
            {
              id: 'all',
              name: 'All',
              count: getConceptsBySubject('chemistry').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('chemistry'), 'all'))
            },
            {
              id: 'in-progress',
              name: 'In Progress',
              count: getConceptsByStatus(getConceptsBySubject('chemistry'), 'in-progress').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('chemistry'), 'in-progress'))
            },
            {
              id: 'pending',
              name: 'Pending',
              count: getConceptsByStatus(getConceptsBySubject('chemistry'), 'pending').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('chemistry'), 'pending'))
            },
            {
              id: 'completed',
              name: 'Completed',
              count: getConceptsByStatus(getConceptsBySubject('chemistry'), 'completed').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('chemistry'), 'completed'))
            }
          ]}
        />
      )
    },
    {
      id: 'biology',
      name: 'Biology',
      count: getConceptsBySubject('biology').length,
      content: (
        <StatusTabs
          tabs={[
            {
              id: 'all',
              name: 'All',
              count: getConceptsBySubject('biology').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('biology'), 'all'))
            },
            {
              id: 'in-progress',
              name: 'In Progress',
              count: getConceptsByStatus(getConceptsBySubject('biology'), 'in-progress').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('biology'), 'in-progress'))
            },
            {
              id: 'pending',
              name: 'Pending',
              count: getConceptsByStatus(getConceptsBySubject('biology'), 'pending').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('biology'), 'pending'))
            },
            {
              id: 'completed',
              name: 'Completed',
              count: getConceptsByStatus(getConceptsBySubject('biology'), 'completed').length,
              content: renderConceptGrid(getConceptsByStatus(getConceptsBySubject('biology'), 'completed'))
            }
          ]}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-indigo-900/10">
      <Helmet>
        <title>Concepts - PREPZR</title>
        <meta name="description" content="Master NEET concepts with comprehensive study materials" />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        {/* Overview Section */}
        <OverviewSection
          type="concepts"
          kpis={overviewData.kpis}
          subjectProgress={overviewData.subjectProgress}
          suggestions={overviewData.suggestions}
          todayTarget={overviewData.todayTarget}
        />

        {/* Filters */}
        <FilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filterOptions}
          onClearFilters={clearFilters}
        />

        {/* Subject Tabs with Status Sub-tabs */}
        <SubjectTabs
          subjects={subjectTabs}
          defaultValue="all"
          onTabChange={setSelectedSubject}
        />
      </div>
    </div>
  );
};

export default RedesignedConceptsLandingPage;
