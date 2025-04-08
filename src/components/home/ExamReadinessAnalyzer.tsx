
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  CheckCircle, 
  BookOpen,
  Clock,
  Brain,
  AlertCircle,
  Award,
  ArrowRight,
  User,
  GraduationCap,
  Calendar,
  Clock3,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface ExamReadinessAnalyzerProps {
  onClose: () => void;
}

type ExamType = "UPSC" | "NEET" | "JEE" | "Banking" | "CLAT" | "MBA" | "CUET";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: number;
}

const examQuestions: Record<ExamType, Question[]> = {
  "UPSC": [
    {
      id: 1,
      text: "Which of the following is NOT a Fundamental Right guaranteed by the Indian Constitution?",
      options: [
        "Right to Freedom of Religion",
        "Right to Property",
        "Right to Equality",
        "Right to Constitutional Remedies"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which of the following committees recommended the Panchayati Raj system in India?",
      options: [
        "Ashok Mehta Committee",
        "Balwant Rai Mehta Committee",
        "Narasimham Committee",
        "Sarkaria Commission"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "The concept of 'Directive Principles of State Policy' in the Indian Constitution was borrowed from which country's constitution?",
      options: [
        "United States",
        "United Kingdom",
        "Ireland",
        "Australia"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "Who among the following was the Chairman of the Drafting Committee of the Indian Constitution?",
      options: [
        "Jawaharlal Nehru",
        "B.R. Ambedkar",
        "Rajendra Prasad",
        "Sardar Vallabhbhai Patel"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "The Battle of Plassey was fought in which year?",
      options: [
        "1757",
        "1764",
        "1772",
        "1784"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      text: "Which of the following rivers flows through a rift valley?",
      options: [
        "Godavari",
        "Narmada",
        "Krishna",
        "Cauvery"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: "Who among the following was NOT associated with the Home Rule Movement in India?",
      options: [
        "Annie Besant",
        "Bal Gangadhar Tilak",
        "Bipin Chandra Pal",
        "Lala Lajpat Rai"
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      text: "The term 'demographic dividend' refers to:",
      options: [
        "Increase in per capita income",
        "Economic growth potential from changes in age structure",
        "Population control measures",
        "Increase in life expectancy"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      text: "The Indus Valley Civilization was discovered in the year:",
      options: [
        "1901",
        "1921",
        "1931",
        "1941"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      text: "Under which Article of the Indian Constitution is the President's Rule imposed in states?",
      options: [
        "Article 352",
        "Article 356",
        "Article 360",
        "Article 370"
      ],
      correctAnswer: 1
    }
  ],
  "NEET": [
    {
      id: 1,
      text: "Which of the following organelles is responsible for cellular respiration?",
      options: [
        "Ribosomes",
        "Golgi apparatus",
        "Mitochondria",
        "Endoplasmic reticulum"
      ],
      correctAnswer: 2
    },
    {
      id: 2, 
      text: "A body of mass 2 kg is moving with a velocity of 10 m/s. What is its kinetic energy?",
      options: [
        "100 J",
        "200 J",
        "20 J",
        "10 J"
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "Mendel's principle of independent assortment is applicable when genes are:",
      options: [
        "Located on the same chromosome and tightly linked",
        "Located on the same chromosome but far apart",
        "Located on different chromosomes",
        "Both B and C"
      ],
      correctAnswer: 3
    },
    {
      id: 4,
      text: "Which of the following is an example of a saturated hydrocarbon?",
      options: [
        "Ethene",
        "Ethane",
        "Ethyne",
        "Benzene"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "The human heart is:",
      options: [
        "Neurogenic and myogenic",
        "Neurogenic",
        "Myogenic",
        "None of these"
      ],
      correctAnswer: 2
    },
    {
      id: 6,
      text: "Which of the following is NOT a connective tissue?",
      options: [
        "Blood",
        "Bone",
        "Cartilage",
        "Epithelial tissue"
      ],
      correctAnswer: 3
    },
    {
      id: 7,
      text: "The SI unit of electric current is:",
      options: [
        "Coulomb",
        "Ampere",
        "Volt",
        "Ohm"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "The most electronegative element among the following is:",
      options: [
        "Sodium",
        "Bromine",
        "Fluorine",
        "Oxygen"
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      text: "Which of the following hormones is responsible for the secondary sexual characteristics in males?",
      options: [
        "Estrogen",
        "Progesterone",
        "Testosterone",
        "Thyroxine"
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      text: "The enzyme pepsin is inactive in:",
      options: [
        "Acidic medium",
        "Alkaline medium",
        "Neutral medium",
        "Both B and C"
      ],
      correctAnswer: 1
    }
  ],
  "JEE": [
    {
      id: 1,
      text: "If the sum of the roots of the quadratic equation ax² + bx + c = 0 is equal to the product of its roots, then:",
      options: [
        "b = c",
        "a = c",
        "a + c = 0",
        "b + c = 0"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "The unit vector perpendicular to both i + j and j + k is:",
      options: [
        "(i - k)/√2",
        "(i + k)/√2",
        "(i - j)/√2",
        "(j - k)/√2"
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "The work done in moving a charge of 2C through a potential difference of 12V is:",
      options: [
        "6 J",
        "10 J",
        "24 J",
        "48 J"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "What is the maximum number of electrons that can be accommodated in all orbitals with principal quantum number n = 3?",
      options: [
        "9",
        "18",
        "27",
        "8"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "The speed of light in vacuum is approximately:",
      options: [
        "3 × 10⁷ m/s",
        "3 × 10⁸ m/s",
        "3 × 10⁹ m/s",
        "3 × 10⁶ m/s"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      text: "A projectile is fired at an angle θ with the horizontal. Its horizontal range will be maximum when θ is:",
      options: [
        "30°",
        "45°",
        "60°",
        "90°"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: "If a² + b² = c² where a, b, c are positive integers, then the triangle with sides a, b, c is:",
      options: [
        "Equilateral",
        "Isosceles",
        "Right-angled",
        "Obtuse-angled"
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      text: "The oxidation state of oxygen in hydrogen peroxide (H₂O₂) is:",
      options: [
        "-1",
        "-2",
        "+1",
        "+2"
      ],
      correctAnswer: 0
    },
    {
      id: 9,
      text: "The value of the integral ∫(cos²x)dx from 0 to π/2 is:",
      options: [
        "π/4",
        "1",
        "π/2",
        "0"
      ],
      correctAnswer: 0
    },
    {
      id: 10,
      text: "The half-life of a radioactive element is 4 hours. The fraction of the element that remains after 12 hours is:",
      options: [
        "1/3",
        "1/8",
        "1/4",
        "1/6"
      ],
      correctAnswer: 1
    }
  ],
  "Banking": [
    {
      id: 1,
      text: "What is the minimum percentage of its demand and time liabilities that a bank has to maintain as Cash Reserve Ratio (CRR)?",
      options: [
        "3%",
        "4%",
        "6%",
        "8%"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "If a train travels at 50 kmph, it reaches its destination late by 1 hour. If it travels at 60 kmph, it is late by 40 minutes. Find the distance of the journey.",
      options: [
        "300 km",
        "350 km",
        "400 km",
        "450 km"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "Which of the following is NOT a function of the Reserve Bank of India?",
      options: [
        "Banker's Bank",
        "Controller of Credit",
        "Lender of Last Resort",
        "Providing Agricultural Loans"
      ],
      correctAnswer: 3
    },
    {
      id: 4,
      text: "Which of the following is a primary function of commercial banks?",
      options: [
        "Accepting deposits",
        "Acting as a government advisor",
        "Currency issuance",
        "Maintaining foreign exchange reserves"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      text: "NEFT stands for:",
      options: [
        "National Electronic Funds Transfer",
        "National Electronic Financial Transaction",
        "New Electronic Funds Transfer",
        "National Electronic Foreign Transfer"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      text: "The interest rate at which the Reserve Bank of India lends to commercial banks is called:",
      options: [
        "Bank Rate",
        "Repo Rate",
        "Reverse Repo Rate",
        "Cash Reserve Ratio"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: "If A can do a piece of work in 10 days and B can do it in 15 days, how many days will they take to finish it together?",
      options: [
        "5 days",
        "6 days",
        "7.5 days",
        "12 days"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "The difference between simple and compound interest on Rs. 1000 for 2 years at 10% per annum is:",
      options: [
        "Rs. 10",
        "Rs. 20",
        "Rs. 21",
        "Rs. 100"
      ],
      correctAnswer: 0
    },
    {
      id: 9,
      text: "KYC in banking stands for:",
      options: [
        "Know Your Client",
        "Know Your Customer",
        "Keep Your Currency",
        "Key Yield Calculation"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      text: "Which of the following is a component of M1 money supply?",
      options: [
        "Time deposits",
        "Currency with public",
        "Post office savings",
        "Treasury bills"
      ],
      correctAnswer: 1
    }
  ],
  "CLAT": [
    {
      id: 1,
      text: "Principle: Ignorance of law is no excuse. Fact: X was unaware about the law which prohibited the use of mobile phones while driving. He was caught using his phone while driving. X pleads he didn't know about such law. Which of the following is correct?",
      options: [
        "X will be excused as he was unaware",
        "X will not be excused as ignorance of law is no excuse",
        "X will be partially excused",
        "X will be excused if it was his first offense"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "The principle of 'res ipsa loquitur' is related to which area of law?",
      options: [
        "Constitutional Law",
        "Criminal Law",
        "Law of Torts",
        "Contract Law"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "Which Article of the Indian Constitution abolishes Untouchability?",
      options: [
        "Article 14",
        "Article 15",
        "Article 17",
        "Article 21"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "Which of the following is NOT an essential element of a valid contract?",
      options: [
        "Offer and Acceptance",
        "Consideration",
        "Writing and Registration",
        "Free Consent"
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      text: "The maxim 'nemo dat quod non habet' means:",
      options: [
        "No one can give what they do not have",
        "Let the buyer beware",
        "The law does not concern itself with trifles",
        "The thing speaks for itself"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      text: "Which of the following writs is issued to release a person from illegal detention?",
      options: [
        "Habeas Corpus",
        "Mandamus",
        "Prohibition",
        "Quo Warranto"
      ],
      correctAnswer: 0
    },
    {
      id: 7,
      text: "In which landmark case did the Supreme Court of India establish the 'basic structure doctrine'?",
      options: [
        "Maneka Gandhi v. Union of India",
        "Kesavananda Bharati v. State of Kerala",
        "A.K. Gopalan v. State of Madras",
        "M.C. Mehta v. Union of India"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "Which of the following is NOT a recognized source of International Law?",
      options: [
        "International Conventions",
        "International Customs",
        "Judicial Decisions",
        "Declarations by the UN Secretary General"
      ],
      correctAnswer: 3
    },
    {
      id: 9,
      text: "The concept of 'mens rea' is related to which branch of law?",
      options: [
        "Civil Law",
        "Criminal Law",
        "Constitutional Law",
        "Administrative Law"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      text: "Which of the following is NOT included in the definition of 'State' under Article 12 of the Indian Constitution?",
      options: [
        "Central Government",
        "Parliament",
        "Supreme Court",
        "Local Authorities"
      ],
      correctAnswer: 2
    }
  ],
  "MBA": [
    {
      id: 1,
      text: "If REASON is coded as 5, and BELIEVED as 8, then what would be the code for GOVERNMENT?",
      options: [
        "9",
        "10",
        "7",
        "6"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "A company sold 30% more products this year than last year. If the sales were valued at $1.3 million last year, what is the value of this year's sales?",
      options: [
        "$1.69 million",
        "$1.6 million",
        "$1.9 million",
        "$1.39 million"
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "Which of the following is NOT one of Porter's Five Forces?",
      options: [
        "Threat of new entrants",
        "Bargaining power of suppliers",
        "Market capitalization",
        "Rivalry among existing competitors"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "SWOT analysis refers to the analysis of:",
      options: [
        "Strengths, Weaknesses, Opportunities, and Threats",
        "Strategy, Work, Organization, and Time",
        "System, Workforce, Operations, and Technology",
        "Scope, Willingness, Objectives, and Targets"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      text: "The break-even point is where:",
      options: [
        "Total revenue equals total cost",
        "Marginal revenue equals marginal cost",
        "Fixed costs equal variable costs",
        "Profit is maximum"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      text: "A statement like 'All students are intelligent' is refuted by:",
      options: [
        "Some students are not intelligent",
        "No students are intelligent",
        "All intelligent people are students",
        "Some intelligent people are students"
      ],
      correctAnswer: 0
    },
    {
      id: 7,
      text: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
      options: [
        "40",
        "42",
        "36",
        "48"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "Which of the following is NOT a characteristic of a perfectly competitive market?",
      options: [
        "Large number of buyers and sellers",
        "Homogeneous products",
        "Product differentiation",
        "Free entry and exit"
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      text: "If A's salary is 20% more than B's salary, then B's salary is what percentage less than A's salary?",
      options: [
        "16.67%",
        "20%",
        "25%",
        "33.33%"
      ],
      correctAnswer: 0
    },
    {
      id: 10,
      text: "Which of the following best represents the BCG matrix?",
      options: [
        "Market share and market growth",
        "Product and profitability",
        "Sales and growth",
        "Product life cycle and brand equity"
      ],
      correctAnswer: 0
    }
  ],
  "CUET": [
    {
      id: 1,
      text: "Choose the most appropriate meaning of the idiom: 'To call a spade a spade'",
      options: [
        "To be outspoken",
        "To be diplomatic",
        "To be blunt and direct",
        "To be dishonest"
      ],
      correctAnswer: 2
    },
    {
      id: 2,
      text: "Which of the following gases has the highest percentage in the Earth's atmosphere?",
      options: [
        "Oxygen",
        "Carbon Dioxide",
        "Nitrogen",
        "Argon"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "Choose the word that is opposite in meaning to 'FRUGAL':",
      options: [
        "Economical",
        "Extravagant",
        "Prudent",
        "Thrifty"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      text: "If FADE is coded as 2134, how would you code DEAR?",
      options: [
        "3412",
        "4321",
        "1243",
        "3421"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      text: "Choose the alternative which best expresses the meaning of the idiom: 'At the drop of a hat'",
      options: [
        "Very quickly",
        "Very slowly",
        "With great difficulty",
        "After a long time"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      text: "Who wrote the novel 'The God of Small Things'?",
      options: [
        "Vikram Seth",
        "Arundhati Roy",
        "Amitav Ghosh",
        "Salman Rushdie"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: "Choose the pair that best represents the relationship: Doctor : Patient",
      options: [
        "Lawyer : Client",
        "Teacher : School",
        "Farmer : Crop",
        "Author : Book"
      ],
      correctAnswer: 0
    },
    {
      id: 8,
      text: "The process by which plants make their food is called:",
      options: [
        "Respiration",
        "Transpiration",
        "Photosynthesis",
        "Digestion"
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      text: "In the sentence 'The cat sat on the mat', 'on the mat' is a:",
      options: [
        "Noun phrase",
        "Verb phrase",
        "Adjectival phrase",
        "Prepositional phrase"
      ],
      correctAnswer: 3
    },
    {
      id: 10,
      text: "What is the square root of 529?",
      options: [
        "13",
        "21",
        "23",
        "27"
      ],
      correctAnswer: 2
    }
  ]
};

// Enhanced screening questions for more personalized assessment
const screeningQuestions = [
  {
    id: 1,
    question: "When are you planning to appear for this exam?",
    options: ["Within 3 months", "3-6 months", "6-12 months", "More than a year"]
  },
  {
    id: 2,
    question: "Have you attempted this exam before?",
    options: ["No, this is my first attempt", "Yes, once", "Yes, twice", "Yes, more than twice"]
  },
  {
    id: 3,
    question: "Are you attending coaching for this exam?",
    options: ["Yes, regular coaching", "Yes, occasional classes", "Self-study with online resources", "Completely self-study"]
  },
  {
    id: 4,
    question: "How many hours do you study daily on average?",
    options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"]
  },
  {
    id: 5,
    question: "What's your highest educational qualification?",
    options: ["High School", "Bachelor's Degree", "Master's Degree", "Ph.D. or equivalent"]
  }
];

// Profile questions for deeper assessment
const profileQuestions = [
  {
    id: 1,
    question: "What subjects are you most confident in?",
    multi: true
  },
  {
    id: 2,
    question: "What subjects do you find challenging?",
    multi: true
  },
  {
    id: 3,
    question: "How would you rate your current stress level regarding the exam?",
    slider: true,
    min: 1,
    max: 10
  },
  {
    id: 4,
    question: "What is your primary motivation for taking this exam?",
    options: ["Career advancement", "Higher education", "Family expectation", "Personal interest"]
  },
  {
    id: 5,
    question: "What study materials are you currently using?",
    multi: true,
    options: ["Standard textbooks", "Reference books", "Online courses", "Coaching material", "Previous years' papers", "Mock tests"]
  }
];

const examSubjects: Record<ExamType, string[]> = {
  "UPSC": ["History", "Geography", "Polity", "Economics", "Science", "Current Affairs"],
  "NEET": ["Physics", "Chemistry", "Biology", "Botany", "Zoology"],
  "JEE": ["Physics", "Chemistry", "Mathematics"],
  "Banking": ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Computer Knowledge"],
  "CLAT": ["Legal Reasoning", "Logical Reasoning", "English", "Current Affairs", "Quantitative Techniques"],
  "MBA": ["Verbal Ability", "Data Interpretation", "Logical Reasoning", "Quantitative Aptitude"],
  "CUET": ["Language", "Domain Knowledge", "General Test"]
};

const ExamReadinessAnalyzer = ({ onClose }: ExamReadinessAnalyzerProps) => {
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [screeningAnswers, setScreeningAnswers] = useState<Record<number, string>>({});
  const [profileAnswers, setProfileAnswers] = useState<Record<number, any>>({});
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [confidenceLevel, setConfidenceLevel] = useState(60);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  
  const [readinessScore, setReadinessScore] = useState(0);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [detailedFeedback, setDetailedFeedback] = useState<Record<string, number>>({});

  // Select exam and prepare random test questions
  const handleSelectExam = (exam: ExamType) => {
    setSelectedExam(exam);
    
    // Select 10 random questions from the pool
    const allQuestions = examQuestions[exam];
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 10));
    
    setStep(2);
  };

  const handleScreeningAnswer = (questionId: number, answer: string) => {
    setScreeningAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleProfileAnswer = (questionId: number, answer: any) => {
    setProfileAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleExamAnswer = (questionId: number, optionIndex: number) => {
    setExamAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const startExam = () => {
    setTimerActive(true);
    setStep(4);
  };

  // Handle timer countdown
  useState(() => {
    let interval: number | undefined;
    
    if (timerActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerActive(false);
      calculateReadinessScore();
      setStep(5);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleNextStep = () => {
    if (step === 2) {
      // Check if all screening questions are answered
      const screeningQuestionCount = screeningQuestions.length;
      if (Object.keys(screeningAnswers).length >= 3) {
        setStep(3);
      }
    } else if (step === 3) {
      // Check if profile questions have at least some answers
      if (Object.keys(profileAnswers).length >= 2) {
        setTimerActive(true);
        setStep(4);
      }
    } else if (step === 4) {
      // Submit exam and calculate score
      setTimerActive(false);
      calculateReadinessScore();
      setStep(5);
    }
  };

  const calculateReadinessScore = () => {
    let score = 0;
    let correctAnswers = 0;
    
    // Calculate correct answers
    if (selectedExam) {
      selectedQuestions.forEach(q => {
        if (examAnswers[q.id] === q.correctAnswer) {
          correctAnswers++;
        }
      });
    }
    
    // Calculate score based on correct answers (60% of total)
    const correctPercentage = (correctAnswers / selectedQuestions.length) * 100;
    score += (correctPercentage * 0.6);
    
    // Add score based on study hours (15% of total)
    const studyHoursAnswer = screeningAnswers[4];
    if (studyHoursAnswer === "More than 6 hours") {
      score += 15;
    } else if (studyHoursAnswer === "4-6 hours") {
      score += 12;
    } else if (studyHoursAnswer === "2-4 hours") {
      score += 8;
    } else {
      score += 4;
    }
    
    // Add score based on coaching (10% of total)
    const coachingAnswer = screeningAnswers[3];
    if (coachingAnswer === "Yes, regular coaching") {
      score += 10;
    } else if (coachingAnswer === "Yes, occasional classes") {
      score += 8;
    } else if (coachingAnswer === "Self-study with online resources") {
      score += 6;
    } else {
      score += 3;
    }
    
    // Add score based on confidence level (15% of total)
    score += (confidenceLevel / 100) * 15;
    
    // Set the final score
    setReadinessScore(Math.round(score));
    
    // Calculate subject-wise performance
    if (selectedExam) {
      const subjects = examSubjects[selectedExam];
      
      // Simulate subject performance
      const subjectPerformance: Record<string, number> = {};
      subjects.forEach(subject => {
        // Random performance between 30-90%
        subjectPerformance[subject] = Math.floor(Math.random() * 60) + 30;
      });
      
      // Sort by performance
      const sortedSubjects = [...subjects].sort((a, b) => 
        (subjectPerformance[b] || 0) - (subjectPerformance[a] || 0)
      );
      
      setStrengths(sortedSubjects.slice(0, 2));
      setWeaknesses(sortedSubjects.slice(-2));
      setDetailedFeedback(subjectPerformance);
      
      // Set recommendations based on score and weaknesses
      const baseRecommendations = [
        `Focus more on ${weaknesses[0]} and ${weaknesses[1]} with targeted practice`,
        "Take more mock tests to improve time management",
        "Join a study group for peer learning"
      ];
      
      if (score < 40) {
        setRecommendations([
          "Increase daily study hours by 2-3 hours",
          "Establish a structured study schedule",
          ...baseRecommendations,
          "Consider enrolling in a coaching program"
        ]);
      } else if (score < 70) {
        setRecommendations([
          "Increase daily study hours by 1-2 hours",
          ...baseRecommendations,
          "Review fundamentals of weak subjects"
        ]);
      } else {
        setRecommendations([
          "Maintain current study schedule",
          ...baseRecommendations,
          "Focus on advanced topics in your stronger subjects"
        ]);
      }
    }
  };

  const renderExamSelector = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-6 text-center">Select Your Exam</h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Choose the exam you're preparing for to receive a personalized readiness assessment and a tailored study plan.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {(Object.keys(examQuestions) as ExamType[]).map((exam) => (
          <motion.button
            key={exam}
            onClick={() => handleSelectExam(exam)}
            className="p-6 border border-purple-100 rounded-lg hover:bg-purple-50 transition-all duration-300 text-left relative overflow-hidden hover:shadow-md hover:-translate-y-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-violet-400 to-violet-600"></div>
            <h3 className="text-xl font-semibold text-violet-700">{exam}</h3>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{examSubjects[exam].join(", ")}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">Analyze Readiness</span>
              <ChevronRight size={16} className="text-purple-600" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderScreeningQuestions = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2 text-center">Quick Screening</h2>
      <p className="text-gray-600 mb-8 text-center">
        Let's first understand your exam preparation journey for <span className="font-semibold text-violet-700">{selectedExam}</span>.
      </p>
      
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          {screeningQuestions.map((q) => (
            <motion.div 
              key={q.id} 
              className="border border-gray-100 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: q.id * 0.1 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-start">
                <span className="bg-violet-100 text-violet-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  {q.id}
                </span>
                {q.question}
              </h3>
              
              <RadioGroup
                onValueChange={(value) => handleScreeningAnswer(q.id, value)}
                className="space-y-3 mt-4"
              >
                {q.options?.map((option, index) => (
                  <div key={index} 
                    className={`border rounded-lg p-4 transition-colors ${
                      screeningAnswers[q.id] === option 
                        ? 'border-violet-500 bg-violet-50' 
                        : 'border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    <RadioGroupItem 
                      value={option} 
                      id={`q${q.id}-option${index}`} 
                      className="sr-only"
                    />
                    <Label 
                      htmlFor={`q${q.id}-option${index}`}
                      className="flex items-center cursor-pointer"
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        screeningAnswers[q.id] === option 
                          ? 'bg-violet-500 text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {screeningAnswers[q.id] === option ? <CheckCircle size={12} /> : ''}
                      </span>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleNextStep}
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          disabled={Object.keys(screeningAnswers).length < 3}
        >
          Continue to Your Profile <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderProfileQuestions = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2 text-center">Your Learning Profile</h2>
      <p className="text-gray-600 mb-8 text-center">
        Help us understand your learning style and strengths for <span className="font-semibold text-violet-700">{selectedExam}</span>.
      </p>
      
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          {profileQuestions.map((q) => (
            <motion.div 
              key={q.id} 
              className="border border-gray-100 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: q.id * 0.1 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-start">
                <span className="bg-violet-100 text-violet-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  {q.id}
                </span>
                {q.question}
              </h3>
              
              {q.slider ? (
                <div className="space-y-4 px-2">
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    step={1}
                    onValueChange={(value) => {
                      handleProfileAnswer(q.id, value[0]);
                      setConfidenceLevel(value[0] * 10);
                    }}
                    className="mt-6"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Low Stress</span>
                    <span>High Stress</span>
                  </div>
                  {profileAnswers[q.id] && (
                    <p className="text-sm text-violet-600 font-medium text-center mt-2">
                      Stress level: {profileAnswers[q.id]}/10
                    </p>
                  )}
                </div>
              ) : q.multi ? (
                <div className="space-y-2 mt-4">
                  {selectedExam && examSubjects[selectedExam].map((subject, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        id={`subject-${q.id}-${index}`}
                        className="data-[state=checked]:bg-violet-600 data-[state=checked]:text-white"
                        onCheckedChange={(checked) => {
                          const currentSubjects = profileAnswers[q.id] || [];
                          if (checked) {
                            handleProfileAnswer(q.id, [...currentSubjects, subject]);
                          } else {
                            handleProfileAnswer(
                              q.id,
                              currentSubjects.filter((s: string) => s !== subject)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`subject-${q.id}-${index}`} className="ml-2 text-gray-700">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup
                  onValueChange={(value) => handleProfileAnswer(q.id, value)}
                  className="space-y-2 mt-4"
                >
                  {q.options?.map((option, index) => (
                    <div key={index} 
                      className={`border rounded-lg p-4 transition-colors ${
                        profileAnswers[q.id] === option 
                          ? 'border-violet-500 bg-violet-50' 
                          : 'border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <RadioGroupItem 
                        value={option} 
                        id={`profq${q.id}-option${index}`} 
                        className="sr-only"
                      />
                      <Label 
                        htmlFor={`profq${q.id}-option${index}`}
                        className="flex items-center cursor-pointer w-full"
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          profileAnswers[q.id] === option 
                            ? 'bg-violet-500 text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {profileAnswers[q.id] === option ? <CheckCircle size={12} /> : ''}
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleNextStep}
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          disabled={Object.keys(profileAnswers).length < 2}
        >
          Start Mini Assessment <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderExamInstructions = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-6 text-center">Assessment Instructions</h2>
      
      <div className="max-w-2xl mx-auto bg-violet-50 p-6 rounded-xl border border-violet-100">
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-violet-100 p-3 rounded-full text-violet-700">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-violet-800 mb-1">About This Assessment</h3>
            <p className="text-gray-600">
              This mini-assessment will help us evaluate your current preparation level for {selectedExam}.
              It consists of 10 carefully selected questions covering various topics.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-violet-100 p-3 rounded-full text-violet-700">
            <Clock3 size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-violet-800 mb-1">Time Limit</h3>
            <p className="text-gray-600">
              You'll have 15 minutes to complete the assessment. The timer will start once you begin.
              If you run out of time, your answers up to that point will be submitted automatically.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-violet-100 p-3 rounded-full text-violet-700">
            <List size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-violet-800 mb-1">Scoring</h3>
            <p className="text-gray-600">
              Each question has equal weightage. Your final readiness score will be calculated based on
              your answers combined with your profile information.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-violet-100 p-3 rounded-full text-violet-700">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-violet-800 mb-1">After Completion</h3>
            <p className="text-gray-600">
              You'll receive a personalized readiness report with detailed insights about your strengths,
              areas for improvement, and tailored recommendations.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button
          onClick={startExam}
          className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-6 rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
        >
          Start Assessment <ChevronRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderExamQuestions = () => (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-violet-800">{selectedExam} Assessment</h2>
        <div className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Clock size={18} className="mr-2" />
          Time Left: {formatTime(timeRemaining)}
        </div>
      </div>
      
      <div className="bg-violet-50 p-4 rounded-lg mb-6">
        <Progress value={(examAnswers ? Object.keys(examAnswers).length : 0) * 10} className="h-2" />
        <div className="flex justify-between mt-2 text-sm">
          <span>Question {Object.keys(examAnswers).length || 0}/10</span>
          <span>{(examAnswers ? Object.keys(examAnswers).length : 0) * 10}% Complete</span>
        </div>
      </div>
      
      <div className="space-y-10">
        {selectedQuestions.map((question, index) => (
          <div key={question.id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              <span className="text-violet-600 font-bold mr-2">Q{index + 1}.</span> 
              {question.text}
            </h3>
            
            <RadioGroup
              onValueChange={(value) => handleExamAnswer(question.id, parseInt(value))}
              className="space-y-3 mt-6"
            >
              {question.options.map((option, optIndex) => (
                <div 
                  key={optIndex} 
                  className={`border rounded-lg p-4 transition-colors ${
                    examAnswers[question.id] === optIndex 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-violet-300'
                  }`}
                >
                  <RadioGroupItem 
                    value={optIndex.toString()} 
                    id={`q${question.id}-opt${optIndex}`} 
                    className="sr-only"
                  />
                  <Label 
                    htmlFor={`q${question.id}-opt${optIndex}`}
                    className="flex items-center cursor-pointer"
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      examAnswers[question.id] === optIndex 
                        ? 'bg-violet-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <Button
          onClick={handleNextStep}
          className="bg-violet-600 hover:bg-violet-700 text-white w-full py-6 text-lg"
          disabled={Object.keys(examAnswers).length < 5}
        >
          Submit Assessment <ChevronRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderReadinessReport = () => (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your {selectedExam} Readiness Report
        </motion.h2>
        <p className="text-gray-600">
          Based on your profile and assessment performance, here's your personalized evaluation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="md:col-span-1 bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl p-6 flex flex-col items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative mb-4">
            <div className="w-36 h-36 rounded-full flex items-center justify-center bg-white border-8 border-purple-100 shadow-lg">
              <span className="text-4xl font-bold text-violet-700">{readinessScore}%</span>
            </div>
            <div className="absolute -right-2 -top-2 bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold shadow-md">
              {selectedExam}
            </div>
          </div>
          <p className="text-xl font-semibold text-violet-800 mt-2">
            {readinessScore < 40 ? 'Getting Started' : 
             readinessScore < 70 ? 'Making Progress' : 'Well Prepared'}
          </p>
          <p className="text-center text-gray-600 mt-2">
            {readinessScore < 40 
              ? "You're at the beginning of your journey. With dedicated effort, you'll see rapid improvement."
              : readinessScore < 70
              ? "You've built a good foundation. Focus on weak areas to take your preparation to the next level."
              : "You're on track for success! Fine-tune your preparation with targeted practice."}
          </p>
        </motion.div>
        
        <motion.div 
          className="md:col-span-2 border border-gray-100 rounded-xl p-6 bg-white shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-violet-700 mb-4 flex items-center">
            <Brain className="mr-2" /> Subject Performance
          </h3>
          
          {selectedExam && examSubjects[selectedExam].map((subject, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{subject}</span>
                <span className="text-sm font-medium text-gray-700">{detailedFeedback[subject] || 0}%</span>
              </div>
              <Progress 
                value={detailedFeedback[subject] || 0} 
                className="h-2" 
                indicatorClassName={
                  detailedFeedback[subject] && detailedFeedback[subject] < 40 ? "bg-red-500" :
                  detailedFeedback[subject] && detailedFeedback[subject] < 70 ? "bg-amber-500" :
                  "bg-green-500"
                }
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="border border-green-100 rounded-lg p-6 bg-green-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-green-700">Your Strengths</h3>
          </div>
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-700">{strength} - <span className="text-green-600 font-medium">{detailedFeedback[strength]}% proficiency</span></span>
              </li>
            ))}
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-700">Good understanding of core concepts</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="border border-red-100 rounded-lg p-6 bg-red-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-red-700">Areas to Improve</h3>
          </div>
          <ul className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-gray-700">{weakness} - <span className="text-red-600 font-medium">only {detailedFeedback[weakness]}% proficiency</span></span>
              </li>
            ))}
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span className="text-gray-700">Time management during tests</span>
            </li>
          </ul>
        </motion.div>
      </div>
      
      <motion.div 
        className="border border-violet-100 rounded-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <Brain className="text-violet-600 mr-2" />
          <h3 className="text-lg font-semibold text-violet-700">Personalized Recommendations</h3>
        </div>
        <ul className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-medium mr-3 mt-0.5">
                {index + 1}
              </div>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Get Your Full Study Plan</h3>
            <p className="text-white/90 max-w-xl">
              Sign up now to access your complete personalized study strategy, AI-powered tutoring, 
              detailed analytics, and exam-specific resources.
            </p>
          </div>
          <Button 
            className="bg-white text-violet-700 hover:bg-gray-100 whitespace-nowrap px-8"
            size="lg"
            asChild
          >
            <Link to="/signup">
              Sign Up Free <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <div className="flex justify-between items-center border-b border-gray-100 p-4 md:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center mr-3 shadow-md">
                <BookOpen size={18} />
              </div>
              <div>
                <h2 className="font-bold text-xl bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                  {step === 1 ? "Exam Readiness Analyzer" : 
                   step === 2 ? `${selectedExam} Screening` :
                   step === 3 ? `${selectedExam} Profile` :
                   step === 4 ? `${selectedExam} Assessment` :
                   `${selectedExam} Readiness Report`}
                </h2>
                <p className="text-sm text-gray-500">Step {step} of 5</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100">
              <X size={20} />
            </Button>
          </div>
          
          <div className="px-4 py-2 bg-violet-50 border-b border-violet-100">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-violet-600 h-2.5 rounded-full"
                initial={{ width: `${((step - 1) / 5) * 100}%` }}
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {step === 1 && renderExamSelector()}
            {step === 2 && renderScreeningQuestions()}
            {step === 3 && renderProfileQuestions()}
            {step === 4 && (timeRemaining === 900 ? renderExamInstructions() : renderExamQuestions())}
            {step === 5 && renderReadinessReport()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExamReadinessAnalyzer;
