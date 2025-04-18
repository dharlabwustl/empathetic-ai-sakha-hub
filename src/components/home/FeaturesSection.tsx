
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { individualPlans } from "@/components/pricing/pricingData";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Choose Your Plan</h2>
          <p className="text-lg text-gray-700">
            Get started with Sakha AI today and transform your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {individualPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden transition-all ${
                plan.recommended 
                  ? "border-2 border-sakha-blue shadow-xl" 
                  : "border border-gray-200 shadow-md"
              }`}
            >
              {plan.recommended && (
                <div className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white text-center py-2">
                  <span className="text-sm font-semibold">MOST POPULAR</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-sakha-blue font-medium mb-2">{plan.subtitle}</p>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included 
                          ? plan.recommended 
                            ? "bg-sakha-blue text-white" 
                            : "bg-gray-100 text-gray-700"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <Check size={12} />
                      </span>
                      <span className={feature.included ? "" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.recommended 
                      ? "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white" 
                      : plan.title === "Free Trial"
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  asChild
                >
                  <Link to="/signup">
                    {plan.title === "Free Trial" ? "Start Free" : "Choose Plan"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
