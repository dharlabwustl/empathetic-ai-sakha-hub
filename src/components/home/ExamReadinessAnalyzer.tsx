
import { useState } from "react";
import { 
  Chart, 
  ChartData, 
  ChartOptions, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ReadinessData {
  name: string;
  categories: Array<{
    name: string;
    score: number;
  }>;
  overallScore: number;
  strengths: Array<string>;
  weaknesses: Array<string>;
  improvements: Array<string>;
}

const mockExams = [
  {
    id: "jee",
    name: "IIT-JEE",
    data: {
      name: "IIT-JEE",
      categories: [
        { name: "Math Proficiency", score: 75 },
        { name: "Physics Concepts", score: 82 },
        { name: "Chemistry Knowledge", score: 65 },
        { name: "Problem Solving", score: 78 },
        { name: "Time Management", score: 60 },
        { name: "Revision Strategy", score: 71 },
      ],
      overallScore: 72,
      strengths: [
        "Strong grasp of Physics mechanics and electromagnetism",
        "Excellent at geometry and calculus problems",
        "Good at formula application and derivations"
      ],
      weaknesses: [
        "Organic chemistry concepts need strengthening",
        "Time management during complex problem solving", 
        "Thermodynamics and electrochemistry require attention"
      ],
      improvements: [
        "Focus on solving more organic chemistry problems",
        "Practice timed mock tests to improve speed",
        "Review thermodynamics and electrochemistry concepts"
      ]
    }
  },
  {
    id: "neet",
    name: "NEET",
    data: {
      name: "NEET",
      categories: [
        { name: "Biology Concepts", score: 85 },
        { name: "Chemistry Knowledge", score: 72 },
        { name: "Physics Understanding", score: 68 },
        { name: "Memorization", score: 80 },
        { name: "Application Skills", score: 75 },
        { name: "Exam Strategy", score: 65 },
      ],
      overallScore: 74,
      strengths: [
        "Excellent knowledge of human physiology and anatomy",
        "Strong understanding of cellular biology concepts",
        "Good grasp of organic chemistry mechanisms"
      ],
      weaknesses: [
        "Physics numerical problems need more practice",
        "Plant biology concepts require strengthening",
        "Need to improve on connecting theoretical knowledge to applications"
      ],
      improvements: [
        "Focus on solving more physics numerical problems",
        "Review plant biology chapters thoroughly",
        "Practice more application-based questions"
      ]
    }
  },
  {
    id: "upsc",
    name: "UPSC",
    data: {
      name: "UPSC",
      categories: [
        { name: "General Knowledge", score: 79 },
        { name: "Current Affairs", score: 82 },
        { name: "Essay Writing", score: 75 },
        { name: "History & Culture", score: 68 },
        { name: "Economics & Polity", score: 72 },
        { name: "Answer Presentation", score: 65 },
      ],
      overallScore: 73,
      strengths: [
        "Strong understanding of current national and international affairs",
        "Good analytical skills and logical reasoning",
        "Effective essay structuring and articulation"
      ],
      weaknesses: [
        "Ancient and medieval history concepts need strengthening",
        "Economic theories and applications require more depth",
        "Answer presentation needs to be more concise and focused"
      ],
      improvements: [
        "Study ancient and medieval history topics in more depth",
        "Practice applying economic theories to current scenarios",
        "Work on answer writing technique to be more precise"
      ]
    }
  }
];

export function ExamReadinessAnalyzer({ onClose }: { onClose?: () => void }) {
  const [selectedExam, setSelectedExam] = useState("jee");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null);

  const handleStartAssessment = () => {
    // In a real app, this would be an actual assessment
    // Here we just show the analysis after a brief delay
    setTimeout(() => {
      const exam = mockExams.find(e => e.id === selectedExam);
      if (exam) {
        setReadinessData(exam.data);
        setShowAnalysis(true);
      }
    }, 1000);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setShowAnalysis(false);
      setReadinessData(null);
    }
  };

  const radarData: ChartData<"radar"> = {
    labels: readinessData?.categories.map(cat => cat.name) || [],
    datasets: [
      {
        label: readinessData?.name || "Exam Readiness",
        data: readinessData?.categories.map(cat => cat.score) || [],
        backgroundColor: "rgba(111, 66, 193, 0.2)",
        borderColor: "rgba(111, 66, 193, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(111, 66, 193, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(111, 66, 193, 1)"
      }
    ]
  };

  const options: ChartOptions<"radar"> = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.2
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg border border-violet-100 dark:border-violet-900/30 relative">
      {/* Add close button at top right */}
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
      >
        <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
            Exam Readiness Analyzer
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get a personalized analysis of your preparation level for competitive exams
          </p>
        </div>
        
        {!showAnalysis ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select your target exam
                </label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                    <SelectValue placeholder="Select an exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockExams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleStartAssessment}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md"
                >
                  Start Assessment
                </Button>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-violet-100 dark:border-violet-900/30 shadow-sm">
              <h4 className="text-lg font-medium mb-3">How it works</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 p-1 rounded-full">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Our AI analyzes your current preparation level across key areas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 p-1 rounded-full">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Identifies your strengths and areas needing improvement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 p-1 rounded-full">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Creates a personalized study plan to maximize your exam score
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="relative animate-fade-in">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-0 right-0 z-10"
              onClick={handleClose}
            >
              <X size={18} />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md border border-violet-100 dark:border-violet-900/30 p-6">
                <h4 className="text-lg font-medium mb-3 text-center">
                  {readinessData?.name} Readiness Profile
                </h4>
                <div className="h-[300px] w-full">
                  <Radar data={radarData} options={options} />
                </div>
                <div className="text-center mt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
                  <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                    {readinessData?.overallScore}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card className="border-green-100 dark:border-green-900/30 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-emerald-500" size={18} />
                      <CardTitle className="text-lg text-emerald-700 dark:text-emerald-400">Strengths</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {readinessData?.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-1 rounded-full mt-0.5">
                            <ChevronRight size={12} />
                          </div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-red-100 dark:border-red-900/30 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="text-rose-500" size={18} />
                      <CardTitle className="text-lg text-rose-700 dark:text-rose-400">Areas to Improve</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {readinessData?.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 p-1 rounded-full mt-0.5">
                            <ChevronRight size={12} />
                          </div>
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  onClick={handleClose}
                >
                  Get Personalized Study Plan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
