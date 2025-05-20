
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Star, Brain, Sparkles, Check, Book, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EnhancedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeExam, setActiveExam] = useState<string>('NEET');
  
  const handleGetStarted = () => navigate('/signup');
  const handleExploreFeatures = () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  const handleExamReadinessClick = () => window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  
  return (
    <section className="relative min-h-[90vh] py-16 lg:py-0 overflow-hidden">
      {/* Dynamic gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/20">
        <div className="absolute inset-0 opacity-10 dark:opacity-20" 
          style={{ backgroundImage: "radial-gradient(circle at 25px 25px, #6366f1 2px, transparent 0)", backgroundSize: "50px 50px" }}>
        </div>
      </div>
      
      {/* Animated background shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 h-[90vh] lg:py-0 py-12">
          {/* Left Column: Main content */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* UN SDG Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-3 py-1 border-green-600 text-green-700 dark:text-green-400 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Supporting UN SDG 4: Quality Education</span>
                </div>
              </Badge>
            </motion.div>
            
            {/* Main heading with gradient effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Mastering Your</span>
                <div className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600">
                    Exam Journey
                  </span>
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </div>
              </h1>
            </motion.div>
            
            {/* Subheading */}
            <motion.p 
              className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI-powered companion that understands both <span className="font-semibold text-indigo-600 dark:text-indigo-400">your mindset</span> and the <span className="font-semibold text-indigo-600 dark:text-indigo-400">exam requirements</span> to deliver personalized preparation strategies.
            </motion.p>
            
            {/* Key benefits */}
            <motion.ul
              className="space-y-2 pt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                "Personalized study plans based on your learning style",
                "AI tutoring that adapts to your emotional state",
                "Comprehensive coverage for major competitive exams"
              ].map((benefit, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                    <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Exam selector */}
            <motion.div 
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {['NEET', 'JEE', 'UPSC', 'CAT', 'GATE'].map((exam) => (
                <button
                  key={exam}
                  onClick={() => setActiveExam(exam)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeExam === exam
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-lg px-6 shadow-md hover:shadow-lg transition-all"
              >
                Get Started Free
              </Button>
              
              <Button 
                onClick={handleExamReadinessClick}
                variant="outline" 
                size="lg"
                className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-6"
              >
                <Brain className="mr-2 h-4 w-4" />
                Analyze Exam Readiness
              </Button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex -space-x-2">
                {[
                  "/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png",
                  "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
                  "/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png"
                ].map((avatar, i) => (
                  <Avatar key={i} className="border-2 border-white dark:border-gray-800 w-8 h-8">
                    <AvatarImage src={avatar} alt={`User ${i+1}`} />
                    <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">10,000+</span> students improved their scores
              </div>
            </motion.div>
          </div>
          
          {/* Right Column: Visual showcase */}
          <div className="w-full lg:w-1/2">
            <TestimonialShowcase activeExam={activeExam} />
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

// Visual showcase component with testimonials
const TestimonialShowcase: React.FC<{ activeExam: string }> = ({ activeExam }) => {
  // Testimonial data based on exam type
  const testimonials = {
    'NEET': {
      student: 'Aanya Sharma',
      avatar: '/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png',
      quote: 'I increased my NEET score by 150 points in just 3 months using the personalized study plan!',
      improvement: '+150 pts',
      image: '/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png',
      features: ['Biology Focus', 'NCERT Aligned', 'Previous Year Papers', 'Chapter Tests'],
      icon: <FileText className="h-5 w-5 text-green-600" />
    },
    'JEE': {
      student: 'Rajat Singh',
      avatar: '/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png',
      quote: 'The adaptive learning system helped me understand complex physics concepts that I was struggling with.',
      improvement: 'AIR 342',
      image: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png',
      features: ['Advanced Mathematics', 'Problem Solving', 'Physics Animations', '3D Visualizations'],
      icon: <Brain className="h-5 w-5 text-blue-600" />
    },
    'UPSC': {
      student: 'Priya Patel',
      avatar: '/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png',
      quote: 'The most effective preparation platform I found for civil services. The current affairs section is exceptional!',
      improvement: 'Rank 56',
      image: '/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png',
      features: ['Current Affairs', 'Answer Writing', 'GS Coverage', 'Ethics Case Studies'],
      icon: <Book className="h-5 w-5 text-purple-600" />
    },
    'CAT': {
      student: 'Vikram Mehta',
      avatar: '/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png',
      quote: 'The personalized quant practice helped me overcome my weaknesses and score 99.8 percentile!',
      improvement: '99.8%ile',
      image: '/lovable-uploads/9296075b-86c2-49b6-84c1-2679c2d4ed94.png',
      features: ['Speed Calculations', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'],
      icon: <Lightbulb className="h-5 w-5 text-amber-600" />
    },
    'GATE': {
      student: 'Sanjana Roy',
      avatar: '/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png',
      quote: 'The subject-wise approach and detailed explanations helped me secure a top rank in GATE CSE.',
      improvement: 'AIR 76',
      image: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png',
      features: ['Subject Tests', 'Technical Concepts', 'Previous Papers', 'Virtual Labs'],
      icon: <FileText className="h-5 w-5 text-indigo-600" />
    }
  };
  
  // Get current testimonial based on active exam
  const current = testimonials[activeExam as keyof typeof testimonials] || testimonials.NEET;
  
  return (
    <motion.div 
      className="perspective-1000"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Main visual container */}
      <div className="relative backdrop-blur-sm bg-white/60 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
        {/* 3D floating elements */}
        <motion.div 
          className="absolute top-6 right-6 bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {activeExam} Focused
        </motion.div>
        
        {/* Exam visual */}
        <div className="relative aspect-video mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-md group">
          <motion.img
            key={activeExam}
            src={current.image}
            alt={`${activeExam} preparation`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <div className="flex items-center gap-2">
                {current.icon}
                <span className="font-medium">{activeExam} Preparation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-gray-100 dark:border-gray-700"
          key={activeExam}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12 border-2 border-indigo-100 dark:border-indigo-900">
              <AvatarImage src={current.avatar} alt={current.student} />
              <AvatarFallback>{current.student.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{current.student}</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                  {current.improvement}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{current.quote}</p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">5.0</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key features pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {current.features.map((feature, index) => (
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

export default EnhancedHeroSection;
