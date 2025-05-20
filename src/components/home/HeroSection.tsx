
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentExam, setCurrentExam] = useState<string>('NEET');
  
  // Handle CTA button clicks
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  const handleExploreFeatures = () => {
    // Smooth scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTryDemo = () => {
    navigate('/dashboard/demo');
  };
  
  // Exam readiness analyzer
  const handleExamReadinessClick = () => {
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  // Student testimonials
  const testimonials = [
    {
      name: "Aanya Sharma",
      avatar: "/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png",
      exam: "NEET",
      content: "Increased my score by 150 points in just 3 months!",
      improvement: "+150 pts"
    },
    {
      name: "Rajat Singh",
      avatar: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
      exam: "JEE",
      content: "The personalized study plan helped me crack JEE Advanced.",
      improvement: "AIR 342"
    },
    {
      name: "Priya Patel",
      avatar: "/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png",
      exam: "UPSC",
      content: "The most effective preparation platform for civil services.",
      improvement: "Rank 56"
    }
  ];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20 pt-10 md:pt-0">
      {/* Background elements */}
      <BackgroundElements />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-10 md:py-16 lg:py-24">
          {/* Left Column: Main content */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* UN SDG Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-3 py-1 border-green-600 text-green-700 dark:text-green-400 dark:border-green-700 bg-green-50 dark:bg-green-900/20 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Supporting UN SDG 4: Quality Education</span>
                </div>
              </Badge>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block mb-2">Your AI-Powered</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                Study Champion
              </span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              className="text-xl text-slate-700 dark:text-slate-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Master competitive exams with personalized learning that understands your mindset, not just the syllabus.
            </motion.p>
            
            {/* Exam selector */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {['NEET', 'JEE', 'UPSC', 'CAT'].map((exam) => (
                <button
                  key={exam}
                  onClick={() => setCurrentExam(exam)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentExam === exam
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Get Started Free
              </Button>
              
              <Button 
                onClick={handleExamReadinessClick}
                variant="outline" 
                size="lg"
                className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              >
                Assess Exam Readiness
              </Button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex -space-x-2">
                {testimonials.map((testimonial, i) => (
                  <Avatar key={i} className="border-2 border-white dark:border-gray-800 w-8 h-8">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">10,000+</span> students improved their scores
              </div>
            </motion.div>
          </div>
          
          {/* Right Column: Interactive visual */}
          <div className="w-full lg:w-1/2">
            <HeroVisual currentExam={currentExam} testimonials={testimonials} />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={handleExploreFeatures}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Explore Features</span>
        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </motion.div>
    </section>
  );
};

const HeroVisual: React.FC<{ currentExam: string, testimonials: any[] }> = ({ currentExam, testimonials }) => {
  // Find the testimonial that matches the current exam
  const activeTestimonial = testimonials.find(t => t.exam === currentExam) || testimonials[0];
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      
      {/* Main visual container */}
      <div className="relative backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
        {/* Exam-specific visual */}
        <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
          <motion.img
            key={currentExam}
            src={getExamImage(currentExam)}
            alt={`${currentExam} preparation`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Overlay badge */}
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full">
            {currentExam} Focused
          </div>
        </div>
        
        {/* Testimonial card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-100 dark:border-gray-700"
          key={activeTestimonial.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12 border-2 border-indigo-100 dark:border-indigo-900">
              <AvatarImage src={activeTestimonial.avatar} alt={activeTestimonial.name} />
              <AvatarFallback>{activeTestimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{activeTestimonial.name}</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {activeTestimonial.improvement}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activeTestimonial.content}</p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">5.0</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key features pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {getExamFeatures(currentExam).map((feature, index) => (
            <motion.span
              key={feature}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {feature}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundElements: React.FC = () => {
  return (
    <>
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right decorative element */}
        <svg className="absolute top-0 right-0 w-[600px] h-[600px] transform translate-x-1/3 -translate-y-1/3 text-indigo-500/10 dark:text-indigo-300/10" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(129, 140, 248)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient1)"
            d="M45.1,-52.5C59.3,-48.7,72.4,-37.7,74.4,-24.7C76.3,-11.7,67,-3.3,62.1,6.1C57.3,15.6,56.8,26.1,50.8,33.6C44.7,41.1,33,45.6,20.9,48.9C8.8,52.3,-3.7,54.5,-14.4,51.6C-25.2,48.7,-34.3,40.8,-43.9,31.9C-53.6,23,-63.7,13.3,-67.2,1.3C-70.7,-10.7,-67.5,-24.9,-59.1,-34.4C-50.6,-43.9,-36.9,-48.8,-24.2,-52.9C-11.5,-57,-0.8,-60.4,10.3,-60.1C21.5,-59.8,30.9,-56,45.1,-52.5Z"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
        
        {/* Bottom left decorative element */}
        <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] transform -translate-x-1/3 translate-y-1/3 text-blue-500/10 dark:text-blue-300/10" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient2)"
            d="M52.5,-68.7C65.5,-63.6,72,-44.4,72.1,-27.3C72.3,-10.3,66.1,4.6,60.1,18.4C54,32.2,48.1,45,38.2,53.6C28.3,62.3,14.2,67,1.1,65.5C-12,64,-24,56.4,-35.6,47.9C-47.3,39.4,-58.5,30,-65.1,17.3C-71.6,4.5,-73.5,-11.5,-68.3,-24.6C-63.1,-37.7,-50.8,-47.8,-37.7,-52.9C-24.6,-58,-12.3,-58,4.3,-63.5C20.9,-69,39.5,-73.8,52.5,-68.7Z"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
      </div>
      
      {/* Grid pattern overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{
             backgroundImage: "linear-gradient(#5c6bc0 1px, transparent 1px), linear-gradient(to right, #5c6bc0 1px, transparent 1px)",
             backgroundSize: "40px 40px"
           }}>
      </div>
    </>
  );
};

// Helper functions for exam-specific content
function getExamImage(exam: string): string {
  switch (exam) {
    case 'NEET':
      return '/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png';
    case 'JEE':
      return '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png';
    case 'UPSC':
      return '/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png';
    case 'CAT':
      return '/lovable-uploads/9296075b-86c2-49b6-84c1-2679c2d4ed94.png';
    default:
      return '/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png';
  }
}

function getExamFeatures(exam: string): string[] {
  const commonFeatures = ['AI Tutoring', 'Progress Tracking', 'Mock Tests'];
  
  switch (exam) {
    case 'NEET':
      return [...commonFeatures, 'Biology Focus', 'NCERT Aligned', 'Previous Year Papers'];
    case 'JEE':
      return [...commonFeatures, 'Advanced Math', 'Problem Solving', 'Physics Animations'];
    case 'UPSC':
      return [...commonFeatures, 'Current Affairs', 'Answer Writing', 'GS Coverage'];
    case 'CAT':
      return [...commonFeatures, 'Speed Calculations', 'Logical Reasoning', 'Verbal Ability'];
    default:
      return commonFeatures;
  }
}

// Add these keyframes to your CSS
const keyframes = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.perspective-1000 {
  perspective: 1000px;
}
`;

export default HeroSection;
