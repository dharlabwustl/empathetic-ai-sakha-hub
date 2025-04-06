
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Lightbulb, Smile, Heart, Target, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const OnboardingSection = () => {
  const steps = [
    {
      icon: <User className="text-sky-500" size={24} />,
      title: "Role Identification",
      description: "Choose your role & exam goal from options like IIT-JEE, NEET, UPSC, and more for personalized support."
    },
    {
      icon: <Calendar className="text-sky-500" size={24} />,
      title: "Target Exam Date",
      description: "Set your exam date so we can create a tailored study timeline for optimal preparation."
    },
    {
      icon: <Clock className="text-sky-500" size={24} />,
      title: "Daily Study Hours",
      description: "Tell us your available study time so we can design a realistic and effective study plan."
    },
    {
      icon: <Lightbulb className="text-sky-500" size={24} />,
      title: "Strong & Weak Subjects",
      description: "Identify your academic strengths and areas for improvement for personalized focus."
    },
    {
      icon: <Smile className="text-sky-500" size={24} />,
      title: "Study Pace Preference",
      description: "Choose between Aggressive, Balanced or Relaxed pace to match your learning style."
    },
    {
      icon: <Heart className="text-sky-500" size={24} />,
      title: "Preferred Study Time",
      description: "Morning, Afternoon, Evening, or Night - tell us when you're most productive."
    },
    {
      icon: <Target className="text-sky-500" size={24} />,
      title: "Smart Plan Generation",
      description: "Our AI creates your personalized study calendar, flashcards, and quiz sets based on your inputs."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sky-100/50 via-white to-violet-100/50" id="onboarding">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 gradient-text">Seamless Onboarding Experience</h2>
          <p className="text-lg text-gray-700">
            Get started with Sakha AI through our intuitive, chat-based onboarding process that personalizes your experience from day one.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-violet-400 to-sky-300 hidden md:block"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className={cn(
                  "flex flex-col md:flex-row gap-8",
                  "opacity-0 animate-fade-in"
                )} style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}>
                  <div className="md:w-16 flex md:justify-center">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center z-10 shadow-md avatar-glow">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow card-hover">
                    <h3 className="text-xl font-semibold mb-2 gradient-text">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              className="bg-gradient-to-r from-sky-500 to-violet-500 text-white group py-6 px-8 text-lg animate-glow"
              size="lg"
              asChild
            >
              <Link to="/signup" className="flex items-center gap-2">
                <span>Start Your Personalized Journey</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
