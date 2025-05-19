
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Account & Subscription",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Sign up is simple! Click the 'Sign Up' button on our homepage, enter your email address, create a password, and you're ready to go. You can also sign up using your Google account for a quicker process."
        },
        {
          question: "What subscription plans do you offer?",
          answer: "We offer three main plans: Basic (free), Premium, and Ultimate. Each plan offers different features and access levels. You can view the detailed comparison on our Subscription page."
        },
        {
          question: "Can I change my subscription plan later?",
          answer: "Yes, you can upgrade or downgrade your subscription at any time. Changes will take effect at the start of your next billing cycle."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription from your Profile page under the 'Subscription' tab. Your access will continue until the end of the current billing period."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "How does the AI tutor work?",
          answer: "Our AI tutor uses advanced language models to understand your questions and provide personalized answers. It can explain concepts, help solve problems, and provide guidance based on your learning history and preferences."
        },
        {
          question: "What is mood tracking and how does it help?",
          answer: "The mood tracking feature allows you to record how you're feeling before study sessions. The system uses this information to recommend optimal study strategies and content based on your current emotional state, helping you study more effectively."
        },
        {
          question: "Can I download study materials for offline use?",
          answer: "Premium and Ultimate subscribers can download certain study materials for offline access. This includes PDF versions of concept cards and flashcards."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What devices are compatible with PREPZR?",
          answer: "PREPZR works on any device with a modern web browser. This includes desktop computers, laptops, tablets, and smartphones. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience."
        },
        {
          question: "I'm experiencing technical issues. What should I do?",
          answer: "First, try refreshing the page or logging out and back in. If problems persist, clear your browser cache or try a different browser. For continued issues, please contact our support team at support@prepzr.com with details of the problem."
        },
        {
          question: "Is my data safe and secure?",
          answer: "Yes, we take data security very seriously. All user data is encrypted both in transit and at rest. We never share your personal information with third parties without your consent. You can read more in our Privacy Policy."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {faqCategories.map((category, catIndex) => (
                <section key={catIndex}>
                  <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIndex) => (
                      <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 dark:text-gray-300">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))}
              
              <section className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="font-semibold mb-2">Still have questions?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you couldn't find the answer you were looking for, please contact our support team.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="/contact" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/help" 
                    className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50"
                  >
                    Help Center
                  </a>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
