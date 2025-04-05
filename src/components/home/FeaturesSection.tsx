
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const plans = [
    {
      title: "Basic",
      price: "Free",
      description: "Essential AI support for everyday needs",
      features: [
        "Limited AI conversation (5 queries/day)",
        "Basic personalized dashboard",
        "Role-specific templates",
        "Weekly progress tracking",
        "Email support"
      ]
    },
    {
      title: "Premium",
      price: "$19.99/mo",
      description: "Complete AI companion experience",
      features: [
        "Unlimited AI conversations",
        "Advanced personalization",
        "Full access to role-specific tools",
        "Emotional intelligence features",
        "Burnout detection & prevention",
        "Custom dashboards & analytics",
        "Priority support",
        "Weekly insights report"
      ],
      popular: true
    }
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Subscription Plans</h2>
          <p className="text-lg text-gray-700">
            Choose the plan that best fits your needs and start your journey with Sakha AI today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden transition-all ${
                plan.popular 
                  ? "border-2 border-sakha-blue shadow-xl" 
                  : "border border-gray-200 shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white text-center py-2">
                  <span className="text-sm font-semibold">MOST POPULAR</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-gray-500 ml-1">/month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-sakha-blue text-white" : "bg-gray-100 text-gray-700"
                      }`}>
                        <Check size={12} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  asChild
                >
                  <Link to="/signup">
                    {plan.popular ? "Get Premium" : "Start Free"}
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
