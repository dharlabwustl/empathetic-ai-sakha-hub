
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  Trophy,
  TrendingUp,
  Heart,
  Star,
  Award,
  Target,
  Clock,
  Brain,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const SurroundingInfluencesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('peers');

  // Mock data for peer influences
  const peerData = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: '/api/placeholder/40/40',
      score: 92,
      improvement: '+8%',
      subject: 'Physics',
      status: 'online',
      studyStreak: 15
    },
    {
      id: 2,
      name: 'Arjun Patel',
      avatar: '/api/placeholder/40/40',
      score: 88,
      improvement: '+12%',
      subject: 'Chemistry',
      status: 'studying',
      studyStreak: 22
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      avatar: '/api/placeholder/40/40',
      score: 95,
      improvement: '+5%',
      subject: 'Biology',
      status: 'offline',
      studyStreak: 8
    }
  ];

  // Mock data for mentors
  const mentorData = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      subject: 'Physics',
      experience: '15 years',
      rating: 4.9,
      sessions: 127,
      nextAvailable: 'Today 3:00 PM'
    },
    {
      id: 2,
      name: 'Prof. Meera Singh',
      subject: 'Chemistry', 
      experience: '12 years',
      rating: 4.8,
      sessions: 98,
      nextAvailable: 'Tomorrow 10:00 AM'
    }
  ];

  // Mock data for study groups
  const studyGroups = [
    {
      id: 1,
      name: 'NEET Physics Champions',
      members: 24,
      activeNow: 8,
      topic: 'Thermodynamics',
      nextSession: 'Today 4:00 PM',
      progress: 78
    },
    {
      id: 2,
      name: 'Chemistry Wizards',
      members: 18,
      activeNow: 5,
      topic: 'Organic Reactions',
      nextSession: 'Tomorrow 2:00 PM',
      progress: 65
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Your Learning Community
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect, learn, and grow with peers, mentors, and study groups
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <Button
            variant={activeTab === 'peers' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('peers')}
            className="rounded-md"
          >
            <Users className="h-4 w-4 mr-2" />
            Peers
          </Button>
          <Button
            variant={activeTab === 'mentors' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('mentors')}
            className="rounded-md"
          >
            <Award className="h-4 w-4 mr-2" />
            Mentors
          </Button>
          <Button
            variant={activeTab === 'groups' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('groups')}
            className="rounded-md"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Study Groups
          </Button>
        </div>
      </div>

      {/* Peers Tab */}
      {activeTab === 'peers' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {peerData.map((peer) => (
            <Card key={peer.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      peer.status === 'online' ? 'bg-green-500' :
                      peer.status === 'studying' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{peer.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{peer.subject} Specialist</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Score</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{peer.score}%</span>
                      <Badge 
                        variant="outline" 
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        {peer.improvement}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Study Streak</span>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold">{peer.studyStreak} days</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Mentors Tab */}
      {activeTab === 'mentors' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {mentorData.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{mentor.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{mentor.subject} Expert</p>
                    <p className="text-sm text-gray-500">{mentor.experience} experience</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-sm text-gray-500">({mentor.sessions} sessions)</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Next Available</span>
                    <span className="text-sm font-semibold text-green-600">{mentor.nextAvailable}</span>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Study Groups Tab */}
      {activeTab === 'groups' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {studyGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{group.name}</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {group.activeNow} active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Topic</span>
                    <span className="text-sm font-semibold">{group.topic}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Members</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{group.members}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Group Progress</span>
                      <span className="text-sm font-semibold">{group.progress}%</span>
                    </div>
                    <Progress value={group.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Next Session</span>
                    <span className="text-sm font-semibold text-green-600">{group.nextSession}</span>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Join the PREPZR Community</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connect with thousands of students, expert mentors, and study groups to accelerate your learning journey.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Explore Community Features
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SurroundingInfluencesSection;
