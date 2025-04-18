
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, Users, Building2, Building, User, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const individualPlans = [
    {
      title: "Free",
      price: "₹0",
      period: "forever",
      subtitle: "Limited essentials",
      description: "Perfect for trying out Sakha AI",
      features: [
        { name: "Limited AI conversation (5 queries/day)", included: true },
        { name: "Basic personalized dashboard", included: true },
        { name: "Limited access to study tools", included: true },
        { name: "3 academic goals", included: true },
        { name: "Limited video content", included: true },
        { name: "Email support", included: true },
        { name: "Advanced personalization", included: false },
        { name: "Full content library", included: false },
        { name: "Emotional intelligence features", included: false },
        { name: "Weekly insights report", included: false },
      ],
      recommended: false,
      color: "gray"
    },
    {
      title: "Basic",
      price: "₹499",
      period: "/month",
      subtitle: "Expanded learning tools",
      description: "For serious students who want more features",
      features: [
        { name: "Unlimited AI conversations", included: true },
        { name: "Personalized dashboard", included: true },
        { name: "Full access to study tools", included: true },
        { name: "Unlimited academic goals", included: true },
        { name: "Expanded video library", included: true },
        { name: "Priority email support", included: true },
        { name: "Basic personalization", included: true },
        { name: "Smart notifications", included: true },
        { name: "Emotional intelligence features", included: false },
        { name: "Weekly insights report", included: false },
      ],
      recommended: false,
      color: "blue"
    },
    {
      title: "Premium",
      price: "₹999",
      period: "/month",
      subtitle: "Complete AI companion",
      description: "Unlock the full potential of Sakha AI",
      features: [
        { name: "Unlimited AI conversations", included: true },
        { name: "Advanced personalized dashboard", included: true },
        { name: "Full access to all tools & features", included: true },
        { name: "Unlimited goals with advanced tracking", included: true },
        { name: "Complete video & content library", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced AI personalization", included: true },
        { name: "Emotional intelligence coaching", included: true },
        { name: "Mental health support tools", included: true },
        { name: "Weekly insights & progress reports", included: true },
      ],
      recommended: true,
      color: "purple"
    },
  ];

  const groupPlans = [
    {
      title: "Group",
      price: "₹3,999",
      period: "/month",
      subtitle: "For small study groups",
      description: "Shared access for 5 users",
      features: [
        { name: "All Basic plan features", included: true },
        { name: "5 user accounts", included: true },
        { name: "Group progress tracking", included: true },
        { name: "Collaborative study tools", included: true },
        { name: "Shared resource library", included: true },
        { name: "Group chat support", included: true },
      ],
      icon: <Users size={20} />,
      color: "green"
    },
    {
      title: "Institute",
      price: "₹19,999",
      period: "/month",
      subtitle: "For educational institutes",
      description: "For up to 50 students",
      features: [
        { name: "All Premium plan features", included: true },
        { name: "50 student accounts", included: true },
        { name: "Admin dashboard", included: true },
        { name: "Performance analytics", included: true },
        { name: "Custom content integration", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      icon: <Building2 size={20} />,
      color: "amber"
    },
    {
      title: "Corporate",
      price: "₹49,999",
      period: "/month",
      subtitle: "For employee families",
      description: "For up to 100 users",
      features: [
        { name: "All Premium plan features", included: true },
        { name: "100 user accounts", included: true },
        { name: "Family account grouping", included: true },
        { name: "Advanced admin controls", included: true },
        { name: "Custom branding options", included: true },
        { name: "API access", included: true },
      ],
      icon: <Building size={20} />,
      color: "blue"
    },
  ];

  const faq = [
    {
      question: "How do free access limits work?",
      answer: "Free plans provide limited access to features. For example, you may be limited to 5 AI tutor questions per day, 3 study plans, or access to only 20-50% of certain content. You'll see these limits clearly marked when using the features."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to premium features. If you downgrade, you'll continue to have premium access until the end of your current billing cycle."
    },
    {
      question: "How do group plans work?",
      answer: "Our group plans allow multiple users to access premium features at a discounted rate. The group admin can invite members, and each member gets their own personalized dashboard and tracking while sharing access to premium features."
    },
    {
      question: "Do you offer discounts for students?",
      answer: "Yes, we offer a 50% discount on our Basic plan for students with a valid student ID. Please contact our support team after signing up to verify your student status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, and net banking in India. For Institute and Corporate plans, we also offer invoice-based payments."
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
            <Tabs defaultValue="individual" className="max-w-6xl mx-auto mb-8">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="individual" className="flex items-center gap-2">
                    <User size={16} /> Individual
                  </TabsTrigger>
                  <TabsTrigger value="group" className="flex items-center gap-2">
                    <Users size={16} /> Groups & Organizations
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="individual">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {individualPlans.map((plan, index) => (
                    <Card 
                      key={index}
                      className={`relative rounded-xl overflow-hidden transition-all h-full flex flex-col ${
                        plan.recommended 
                          ? "border-2 border-sakha-blue shadow-xl -mt-4 pb-4" 
                          : "border border-gray-200 shadow-md"
                      }`}
                    >
                      {plan.recommended && (
                        <div className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white text-center py-2">
                          <span className="text-sm font-semibold">MOST POPULAR</span>
                        </div>
                      )}
                      
                      <div className="p-8 flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-2xl font-display font-bold">{plan.title}</h3>
                          {plan.color && (
                            <div className={`h-8 w-8 rounded-full bg-${plan.color}-100 flex items-center justify-center`}>
                              {plan.recommended ? (
                                <Star size={16} className={`text-${plan.color}-600`} />
                              ) : (
                                <User size={16} className={`text-${plan.color}-600`} />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="mb-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                        </div>
                        <p className="text-sakha-blue font-medium mb-2">{plan.subtitle}</p>
                        <p className="text-gray-600 mb-6">{plan.description}</p>
                        
                        <Button 
                          className={`w-full mb-8 ${
                            plan.recommended 
                              ? "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white" 
                              : index === 2 
                                ? "bg-sakha-dark-blue text-white hover:bg-sakha-dark-blue/90"
                                : index === 0 
                                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          asChild
                        >
                          <Link to="/signup">
                            {index === 0 ? "Start Free" : "Choose Plan"}
                          </Link>
                        </Button>
                        
                        <h4 className="font-medium mb-4 text-lg">Features:</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              {feature.included ? (
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  plan.recommended ? "bg-sakha-blue text-white" : "bg-gray-100 text-gray-700"
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
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {groupPlans.map((plan, index) => (
                    <Card 
                      key={index}
                      className="relative rounded-xl overflow-hidden transition-all h-full flex flex-col border border-gray-200 shadow-md"
                    >
                      <div className="p-8 flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-2xl font-display font-bold">{plan.title}</h3>
                          <div className={`h-10 w-10 rounded-full bg-${plan.color}-100 flex items-center justify-center`}>
                            {plan.icon}
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                        </div>
                        <p className="text-sakha-blue font-medium mb-2">{plan.subtitle}</p>
                        <p className="text-gray-600 mb-6">{plan.description}</p>
                        
                        <Button 
                          className="w-full mb-8 bg-gray-800 text-white hover:bg-gray-900"
                          asChild
                        >
                          <Link to="/contact-sales">
                            Contact Sales
                          </Link>
                        </Button>
                        
                        <h4 className="font-medium mb-4 text-lg">Features:</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 text-gray-700">
                                <Check size={12} />
                              </span>
                              <span>{feature.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="max-w-4xl mx-auto mt-16">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-display font-bold mb-4">Feature Access by Plan</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Free</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Basic</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="py-3 text-sm font-medium">24/7 AI Tutor</td>
                        <td className="py-3 text-sm">5 questions/day</td>
                        <td className="py-3 text-sm">Unlimited</td>
                        <td className="py-3 text-sm">Unlimited + Priority</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Flashcards & Revision</td>
                        <td className="py-3 text-sm">50% content</td>
                        <td className="py-3 text-sm">Full access</td>
                        <td className="py-3 text-sm">Full access + Advanced</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Video Library</td>
                        <td className="py-3 text-sm">20% content</td>
                        <td className="py-3 text-sm">Full access</td>
                        <td className="py-3 text-sm">Full access</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Concept Cards</td>
                        <td className="py-3 text-sm">40% content</td>
                        <td className="py-3 text-sm">Full access</td>
                        <td className="py-3 text-sm">Full access</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Mood Tracker</td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><Check className="text-green-500" size={16} /></td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Surrounding Influence</td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><Check className="text-green-500" size={16} /></td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Profile Analytics</td>
                        <td className="py-3 text-sm">Basic</td>
                        <td className="py-3 text-sm">Standard</td>
                        <td className="py-3 text-sm">Advanced</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
