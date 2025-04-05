
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      title: "Basic",
      price: "Free",
      subtitle: "Essential AI support",
      description: "Perfect for getting started with Sakha AI",
      features: [
        { name: "Limited AI conversation (5 queries/day)", included: true },
        { name: "Basic personalized dashboard", included: true },
        { name: "Role-specific templates", included: true },
        { name: "Weekly progress tracking", included: true },
        { name: "Email support", included: true },
        { name: "Advanced personalization", included: false },
        { name: "Full access to role-specific tools", included: false },
        { name: "Emotional intelligence features", included: false },
        { name: "Burnout detection & prevention", included: false },
        { name: "Weekly insights report", included: false },
      ]
    },
    {
      title: "Premium",
      price: "$19.99",
      period: "/month",
      subtitle: "Complete AI companion experience",
      description: "Unlock the full potential of Sakha AI",
      popular: true,
      features: [
        { name: "Unlimited AI conversations", included: true },
        { name: "Advanced personalization", included: true },
        { name: "Full access to role-specific tools", included: true },
        { name: "Emotional intelligence features", included: true },
        { name: "Burnout detection & prevention", included: true },
        { name: "Custom dashboards & analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Weekly insights report", included: true },
        { name: "Multi-device sync", included: true },
        { name: "Ad-free experience", included: true },
      ]
    },
    {
      title: "Enterprise",
      price: "Custom",
      subtitle: "For organizations and teams",
      description: "Tailored solutions for your organization",
      features: [
        { name: "All Premium features", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom integration options", included: true },
        { name: "Team management dashboard", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Custom training modules", included: true },
        { name: "Organizational wellness insights", included: true },
        { name: "Bulk user management", included: true },
        { name: "API access", included: true },
        { name: "Security compliance features", included: true },
      ]
    }
  ];

  const faq = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to premium features. If you downgrade, you'll continue to have premium access until the end of your current billing cycle."
    },
    {
      question: "How does the free plan work?",
      answer: "The free plan gives you access to essential Sakha AI features with a limit of 5 AI conversation queries per day. It's a great way to experience the platform before committing to a premium subscription."
    },
    {
      question: "Do you offer discounts for students?",
      answer: "Yes, we offer a 50% discount on our Premium plan for students with a valid student ID. Please contact our support team after signing up to verify your student status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and local payment methods in select countries. For Enterprise plans, we also offer invoice-based payments."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 7-day money-back guarantee for Premium plans. If you're not satisfied with your purchase, contact our support team within 7 days of your subscription start date for a full refund."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Choose the plan that works best for your needs and start your journey with Sakha AI.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative rounded-xl overflow-hidden transition-all ${
                    plan.popular 
                      ? "border-2 border-sakha-blue shadow-xl -mt-4 pb-4" 
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
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-sakha-blue font-medium mb-2">{plan.subtitle}</p>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <Button 
                      className={`w-full mb-8 ${
                        plan.popular 
                          ? "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white" 
                          : index === 2 
                            ? "bg-sakha-dark-blue text-white hover:bg-sakha-dark-blue/90"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      asChild
                    >
                      <Link to="/signup">
                        {index === 2 ? "Contact Sales" : "Get Started"}
                      </Link>
                    </Button>
                    
                    <h4 className="font-medium mb-4 text-lg">Features:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              plan.popular ? "bg-sakha-blue text-white" : "bg-gray-100 text-gray-700"
                            }`}>
                              <Check size={12} />
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 text-gray-400">
                              <X size={12} />
                            </span>
                          )}
                          <span className={feature.included ? "" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold mb-10 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faq.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-lg mb-6">Still have questions?</p>
                <Button variant="outline" asChild>
                  <Link to="/support">Contact Our Support Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingAvatar />
    </div>
  );
};

export default Pricing;
