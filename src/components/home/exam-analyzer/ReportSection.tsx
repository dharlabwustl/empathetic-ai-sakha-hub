
import React, { useState } from 'react';
import { ExamResults } from './types';
import { Button } from '@/components/ui/button';
import { ChevronRight, Download, Share2, AlertTriangle } from 'lucide-react';
import ReportHeader from './report-components/ReportHeader';
import ScoreBadges from './report-components/ScoreBadges';
import StrengthsAndImprovements from './report-components/StrengthsAndImprovements';
import ConfidenceMapping from './report-components/ConfidenceMapping';
import StudyPlanSection from './report-components/StudyPlanSection';
import { useNavigate } from 'react-router-dom';

interface ReportSectionProps {
  results: ExamResults;
  selectedExam: string;
  onStartOver: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  results,
  selectedExam,
  onStartOver
}) => {
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const navigate = useNavigate();
  
  // Helper function for score colors
  const getScoreColorClass = (score: number): string => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-blue-500 to-blue-600";
    if (score >= 40) return "from-amber-500 to-amber-600";
    return "from-red-500 to-red-600";
  };
  
  const handleDownloadReport = () => {
    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('userData');
    
    if (isLoggedIn) {
      // Implement download functionality here
      const reportData = {
        examType: selectedExam,
        date: new Date().toISOString(),
        results: results
      };
      
      // Create a downloadable blob
      const json = JSON.stringify(reportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      
      // Create a download link and click it
      const link = document.createElement('a');
      link.href = href;
      link.download = `${selectedExam.replace(/\s+/g, '_')}_exam_analysis_report.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setShowAuthPrompt(true);
    }
  };
  
  const handleShareReport = () => {
    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('userData');
    
    if (isLoggedIn) {
      // Implement share functionality
      if (navigator.share) {
        navigator.share({
          title: `${selectedExam} Exam Readiness Report`,
          text: `Check out my exam readiness analysis for ${selectedExam}. Overall score: ${results.overall.score}%`,
          url: window.location.href
        }).catch(err => {
          console.error('Share failed:', err);
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `${selectedExam} Exam Readiness Report - Score: ${results.overall.score}%`;
        prompt('Copy this link to share your report:', `${shareText} - ${window.location.href}`);
      }
    } else {
      setShowAuthPrompt(true);
    }
  };
  
  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="space-y-6">
      <ReportHeader 
        selectedExam={selectedExam}
        examLabel={selectedExam}
        weightedScore={results.overall.score}
        overallAnalysis={results.overall.analysis}
        getScoreColorClass={getScoreColorClass}
      />
      
      <ScoreBadges 
        results={results}
        stressScore={results.stress?.score || 0}
        conceptCompletionScore={results.concept?.score || 0}
        mockAccuracyScore={results.readiness?.score || 0}
        confidenceAlignmentScore={results.confidence?.score || 0}
        getScoreColorClass={getScoreColorClass}
      />
      
      <div className="grid gap-4 md:grid-cols-2">
        <StrengthsAndImprovements 
          title="Your Strengths" 
          items={results.overall.strengths} 
          type="strength"
          strengths={results.overall.strengths}
          improvements={results.overall.improvements}
        />
        <StrengthsAndImprovements 
          title="Areas of Improvement" 
          items={results.overall.improvements} 
          type="improvement"
          strengths={results.overall.strengths}
          improvements={results.overall.improvements}
        />
      </div>
      
      <ConfidenceMapping 
        examType={selectedExam} 
        confidenceMappings={results.confidenceMappings || []}
      />
      
      <StudyPlanSection 
        examType={selectedExam} 
        recommendations={results.recommendations || []}
        onStartOver={onStartOver}
      />
      
      <div className="flex gap-3 pt-4 justify-between items-center border-t border-gray-100 dark:border-gray-800">
        <Button variant="outline" onClick={onStartOver}>
          Start Over
        </Button>
        
        <div className="flex gap-2">
          <Button onClick={handleDownloadReport} className="flex items-center gap-1">
            <Download size={16} />
            Download Report
          </Button>
          
          <Button onClick={handleShareReport} variant="secondary" className="flex items-center gap-1">
            <Share2 size={16} />
            Share
          </Button>
        </div>
      </div>
      
      {showAuthPrompt && (
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300">Sign Up Required</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                To download or share your analysis report, you need to create a free Sakha account.
              </p>
              <Button onClick={handleSignUpRedirect} className="mt-3 bg-amber-600 hover:bg-amber-700">
                Sign Up Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSection;
