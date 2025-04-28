
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is Sakha AI?",
      answer: "Sakha AI is India's first emotionally intelligent study partner. It's an AI-powered platform that helps students prepare for competitive exams by providing personalized learning experiences. Sakha understands your personality, mood, and learning style to create the most effective study plans."
    },
    {
      question: "How does Sakha AI personalize my learning?",
      answer: "Sakha AI uses advanced machine learning to understand your learning style, track your progress, identify knowledge gaps, and adapt to your emotional state. It creates personalized study plans based on your goals, strengths, weaknesses, and preferences."
    },
    {
      question: "Which exams does Sakha AI support?",
      answer: "Currently, Sakha AI supports preparation for major competitive exams including IIT-JEE, NEET, UPSC, and other entrance examinations. We're continuously expanding our content library to include more exams."
    },
    {
      question: "What features are included in the free plan?",
      answer: "The free plan includes limited access to features like 24/7 Tutor, Academic Advisor, Flashcards & Revision, Practice Exams, Goal Tracking, Video Library, and Smart Notifications. Premium features are available with our paid subscriptions."
    },
    {
      question: "How accurate is Sakha AI's concept explanation?",
      answer: "Sakha AI's explanations are based on high-quality educational content verified by subject matter experts. Our AI models are trained on extensive academic materials to ensure accuracy and clarity in concept explanations."
    },
    {
      question: "Can I use Sakha AI on my mobile device?",
      answer: "Yes, Sakha AI is fully responsive and can be accessed on any device with a web browser, including smartphones and tablets. We optimize the experience for all screen sizes."
    },
    {
      question: "How does the mood tracking feature work?",
      answer: "Sakha AI's mood tracking feature allows you to log how you're feeling before studying. Based on your mood, Sakha adjusts its approach—offering encouragement when you're feeling low, challenging you when you're confident, or recommending breaks when you're stressed."
    },
    {
      question: "What happens to my data? Is it secure?",
      answer: "We take data privacy very seriously. All your personal data is encrypted and stored securely. We do not sell user data to third parties. Your study progress, mood logs, and personal information are used only to improve your learning experience."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. If you cancel before the end of your billing cycle, you'll retain access to premium features until the period ends."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team by emailing hello@sakhaai.com. We aim to respond to all inquiries within 24 hours during business days."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-12">Everything you need to know about Sakha AI</p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-purple-100">
                <AccordionTrigger className="text-lg font-medium py-4 hover:text-purple-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-purple-50 rounded-lg border border-purple-100">
            <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-gray-700 mb-4">We're here to help! Reach out to us and we'll get back to you as soon as possible.</p>
            <a 
              href="mailto:hello@sakhaai.com" 
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
