
import { Brain, Heart, BookOpen, BrainCircuit, PencilRuler, PersonStanding } from "lucide-react";

const WhatIsSection = () => {
  const capabilities = [
    {
      icon: <BrainCircuit size={32} className="text-sakha-blue" />,
      title: "Multi-Role Understanding",
      description: "Adapts to each user type – whether a student, professional, doctor, researcher, or founder – tailoring insights and suggestions accordingly."
    },
    {
      icon: <Heart size={32} className="text-sakha-blue" />,
      title: "Context-Based Emotional Intelligence",
      description: "Understands emotional tone, stress indicators, and mental well-being using empathetic questioning and natural language patterns."
    },
    {
      icon: <Brain size={32} className="text-sakha-blue" />,
      title: "Critical Thinking Development",
      description: "Guides users with reflection-based prompts and challenging, open-ended questions that enhance reasoning and depth of understanding."
    },
    {
      icon: <PersonStanding size={32} className="text-sakha-blue" />,
      title: "Integrated Well-being Companion",
      description: "Tracks mood, habits, motivation, and emotional trends to offer timely nudges, support, and care-based interactions."
    },
    {
      icon: <BookOpen size={32} className="text-sakha-blue" />,
      title: "AI-Powered Learning Mentor",
      description: "Enables real-time tutoring, concept explanations, skill development paths, and even academic project guidance."
    },
    {
      icon: <PencilRuler size={32} className="text-sakha-blue" />,
      title: "Life-Long Personalization Engine",
      description: "Learns and grows with the user over time through behavior, preferences, and engagement style – adjusting dashboards, tools, and responses accordingly."
    }
  ];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">What is Sakha 1.0?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Sakha 1.0 is an advanced Large Language Model (LLM) system designed as an intelligent, emotionally-aware 
            companion for individuals across learning, career and well-being journeys.
          </p>
          <p className="text-xl font-display text-sakha-blue italic">
            "The empathetic AI that listens, learns, and evolves with you."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-5 p-3 bg-sakha-lavender/10 inline-block rounded-lg">
                {capability.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{capability.title}</h3>
              <p className="text-gray-600">{capability.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-sakha-blue/10 to-sakha-purple/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-semibold mb-4">Sakha's Active Role in Learning & Well-Being</h3>
          <p className="text-gray-700 mb-6">
            Sakha AI is not just a tool – it's becoming an active agent in the sectors of education, work productivity, 
            and personal growth. With emotional intelligence and empathy at its core, Sakha 1.0:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-sakha-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Promotes deeper learning through questioning</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-sakha-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Reduces stress by detecting burnout signals early</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-sakha-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Encourages goal-setting and self-reflection</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-sakha-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Becomes a thinking partner, not just an answer machine</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
