
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' button on the homepage. Follow the instructions to enter your details and create your password."
    },
    {
      question: "What exams does PREPZR support?",
      answer: "PREPZR currently supports preparation for NEET, JEE, UPSC, and various other competitive exams. We're constantly adding support for more exams."
    },
    {
      question: "How does the AI tutor work?",
      answer: "Our AI tutor uses advanced language models to understand your questions and provide personalized answers. It can explain concepts, solve problems, and guide your study sessions based on your specific needs."
    },
    {
      question: "Can I access PREPZR on my mobile device?",
      answer: "Yes! PREPZR is fully responsive and works on smartphones, tablets, and computers. You can study anytime, anywhere on any device with an internet connection."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you instructions to reset your password."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">Help Center</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-700 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">For general inquiries and account issues:</p>
                    <a href="mailto:support@prepzr.com" className="text-blue-600 hover:underline">support@prepzr.com</a>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Live Chat</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Available Monday to Friday, 9am to 5pm IST</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Start Chat</button>
                  </div>
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

export default Help;
