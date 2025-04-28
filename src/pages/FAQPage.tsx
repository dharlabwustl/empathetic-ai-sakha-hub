
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is Sakha AI?",
      answer: "Sakha AI is an AI-powered learning companion that helps students prepare for their exams effectively. It adapts to your learning style, mood, and habits to create personalized study plans and provide relevant content."
    },
    {
      question: "How does Sakha AI personalize my learning experience?",
      answer: "Sakha AI uses a combination of open-source AI engines and proprietary in-house AI models to understand your learning patterns, strengths, weaknesses, and emotional states. It then creates personalized study plans, recommends relevant content, and adapts to your progress in real-time."
    },
    {
      question: "What exams does Sakha AI support?",
      answer: "Sakha AI currently supports preparation for several competitive exams including IIT-JEE, NEET, and more. We're constantly adding support for additional exams based on user demand."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, Sakha AI offers a free tier with limited features so you can experience the platform before deciding on a paid subscription. This includes access to basic study planning and content features."
    },
    {
      question: "How secure is my data with Sakha AI?",
      answer: "We take data privacy and security very seriously. All user data is encrypted and stored securely. We do not share your personal information with third parties without your consent. For more details, please refer to our Privacy Policy."
    },
    {
      question: "Can I use Sakha AI on multiple devices?",
      answer: "Yes, Sakha AI is a web-based platform that you can access from any device with an internet connection. Your progress syncs across all your devices automatically."
    },
    {
      question: "How does the AI tutor feature work?",
      answer: "Our AI tutor uses natural language processing to understand your questions and provide detailed explanations on various subjects. It can break down complex topics, provide examples, and guide you through step-by-step solutions."
    },
    {
      question: "What should I do if I encounter technical issues?",
      answer: "If you encounter any technical issues, you can reach out to our support team at hello@sakhaai.com. We typically respond within 24 hours and are committed to resolving your issues as quickly as possible."
    },
    {
      question: "Are there any system requirements for using Sakha AI?",
      answer: "Sakha AI works on any modern web browser (Chrome, Firefox, Safari, Edge) with an internet connection. We recommend using the latest version of your browser for the best experience."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-purple-100 dark:border-purple-900 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">
                  <div className="flex items-start">
                    <div className="flex-1 text-left font-medium text-lg">{faq.question}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team is ready to help! Contact us at <a href="mailto:hello@sakhaai.com" className="text-purple-600 hover:underline">hello@sakhaai.com</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
