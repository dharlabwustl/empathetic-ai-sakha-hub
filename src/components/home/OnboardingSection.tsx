
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, UserRound, Lightbulb, Smile, Heart, Target } from "lucide-react";

const OnboardingSection = () => {
  const steps = [
    {
      icon: <UserRound className="text-sakha-blue" size={24} />,
      title: "Role Identification",
      description: "Choose your role from Student, Employee, Doctor/Researcher, or Founder to get tailored support."
    },
    {
      icon: <Lightbulb className="text-sakha-blue" size={24} />,
      title: "Personality & Working Style",
      description: "Take a short personality assessment so Sakha can adapt to your unique working style."
    },
    {
      icon: <Smile className="text-sakha-blue" size={24} />,
      title: "Emotional Check-in",
      description: "Share your mood and emotional state to enable empathetic support from Sakha."
    },
    {
      icon: <Heart className="text-sakha-blue" size={24} />,
      title: "Habit & Behavior Analysis",
      description: "Let Sakha understand your routine to provide personalized guidance and nudges."
    },
    {
      icon: <Target className="text-sakha-blue" size={24} />,
      title: "Goals & Interests",
      description: "Define your interests and goals to unlock tailored features and content."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10" id="onboarding">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Seamless Onboarding Experience</h2>
          <p className="text-lg text-gray-700">
            Get started with Sakha AI through our intuitive, chat-based onboarding process that personalizes your experience from day one.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sakha-blue/20 hidden md:block"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-16 flex md:justify-center">
                    <div className="w-12 h-12 rounded-full bg-sakha-lavender/20 flex items-center justify-center z-10">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white group"
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
