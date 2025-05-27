
import React from 'react';
import { ExamResults } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Gift,
  Star,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReportSectionProps {
  results: ExamResults;
  onClose: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({ results, onClose }) => {
  const navigate = useNavigate();
  const testType = localStorage.getItem('testType') || 'readiness';
  const isScholarshipTest = testType === 'scholarship';
  
  // Calculate overall score
  const overallScore = Math.round((results.readiness.score + results.concept.score) / 2);
  const isScholarshipEligible = isScholarshipTest && overallScore >= 90;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const handleGetStarted = () => {
    if (isScholarshipEligible) {
      // Navigate to signup with scholarship parameter
      navigate('/signup?scholarship=true&score=' + overallScore);
    } else {
      navigate('/signup');
    }
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Scholarship Eligibility Banner */}
      {isScholarshipTest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border-2 ${
            isScholarshipEligible 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {isScholarshipEligible ? (
              <>
                <Trophy className="text-green-600" size={24} />
                <h3 className="text-lg font-bold text-green-800">🎉 Scholarship Earned!</h3>
              </>
            ) : (
              <>
                <Gift className="text-orange-600" size={24} />
                <h3 className="text-lg font-bold text-orange-800">Scholarship Attempt</h3>
              </>
            )}
          </div>
          
          {isScholarshipEligible ? (
            <div className="space-y-2">
              <p className="text-green-700 font-medium">
                Congratulations! You scored {overallScore}% and earned 1 month of free premium access!
              </p>
              <div className="flex items-center gap-2">
                <Award className="text-green-600" size={16} />
                <span className="text-sm text-green-600">Digital scholarship certificate included</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-orange-700">
                You scored {overallScore}%. You need 90% or above to qualify for the scholarship.
              </p>
              <p className="text-sm text-orange-600">
                Don't worry! You can retake the test anytime to try for the scholarship.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`${getScoreBgColor(overallScore)} border-2`}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 p-3 bg-white rounded-full w-fit">
              <Target className={`${getScoreColor(overallScore)}`} size={32} />
            </div>
            <CardTitle className="text-2xl">
              Overall NEET Readiness: {overallScore}%
            </CardTitle>
            <Badge 
              variant="outline" 
              className={`mx-auto ${getScoreColor(overallScore)} border-current`}
            >
              {results.overall.level}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700 dark:text-gray-300">
              {results.overall.analysis}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Readiness Assessment */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="text-blue-600" size={24} />
                <CardTitle className="text-lg">Readiness Assessment</CardTitle>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getScoreColor(results.readiness.score)}`}>
                  {results.readiness.score}%
                </span>
                <Badge variant="outline">{results.readiness.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {results.readiness.analysis}
              </p>
              
              {results.readiness.strengths.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 flex items-center gap-1 mb-2">
                    <CheckCircle size={16} />
                    Strengths
                  </h4>
                  <ul className="text-sm space-y-1">
                    {results.readiness.strengths.map((strength, idx) => (
                      <li key={idx} className="text-green-600">• {strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.readiness.improvements.length > 0 && (
                <div>
                  <h4 className="font-medium text-orange-700 flex items-center gap-1 mb-2">
                    <AlertCircle size={16} />
                    Areas to Improve
                  </h4>
                  <ul className="text-sm space-y-1">
                    {results.readiness.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-orange-600">• {improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Concept Mastery */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="text-purple-600" size={24} />
                <CardTitle className="text-lg">Concept Mastery</CardTitle>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getScoreColor(results.concept.score)}`}>
                  {results.concept.score}%
                </span>
                <Badge variant="outline">{results.concept.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {results.concept.analysis}
              </p>
              
              {results.concept.strengths.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 flex items-center gap-1 mb-2">
                    <CheckCircle size={16} />
                    Strong Areas
                  </h4>
                  <ul className="text-sm space-y-1">
                    {results.concept.strengths.map((strength, idx) => (
                      <li key={idx} className="text-green-600">• {strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.concept.improvements.length > 0 && (
                <div>
                  <h4 className="font-medium text-orange-700 flex items-center gap-1 mb-2">
                    <AlertCircle size={16} />
                    Focus Areas
                  </h4>
                  <ul className="text-sm space-y-1">
                    {results.concept.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-orange-600">• {improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 pt-4"
      >
        <Button 
          onClick={handleGetStarted}
          className={`flex-1 ${
            isScholarshipEligible 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          }`}
        >
          {isScholarshipEligible ? (
            <>
              <Trophy className="mr-2" size={16} />
              Claim Free Access
            </>
          ) : (
            <>
              <TrendingUp className="mr-2" size={16} />
              Start Your Journey
            </>
          )}
        </Button>
        
        <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
          Take Test Again
        </Button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Star className="text-blue-600" size={18} />
              Recommended Next Steps
            </h4>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Create your personalized study plan</li>
              <li>• Start with concept strengthening in weak areas</li>
              <li>• Practice daily with our adaptive question bank</li>
              <li>• Track your progress with regular assessments</li>
              {isScholarshipEligible && (
                <li className="text-green-600 font-medium">• Access premium features with your scholarship!</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportSection;
