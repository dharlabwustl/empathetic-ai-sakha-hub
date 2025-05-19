
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Last updated: May 19, 2025
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300">
                At PREPZR ("we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Account Information:</strong> When you create an account, we collect your name, email address, phone number, password, and profile information.
                </li>
                <li>
                  <strong>Learning Data:</strong> We collect information about your learning activities, including study plans, quiz results, flashcard progress, and concept card interactions.
                </li>
                <li>
                  <strong>Mood Tracking Data:</strong> If you use our mood tracking feature, we collect information about your emotional state during study sessions.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect information about the device you use to access our service, including IP address, browser type, operating system, and device identifiers.
                </li>
                <li>
                  <strong>Usage Information:</strong> We collect information about how you interact with our platform, including the pages you visit, features you use, and time spent.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>To provide and personalize our services to you</li>
                <li>To improve your learning experience through adaptive content</li>
                <li>To analyze and improve our platform's features and performance</li>
                <li>To communicate with you about your account or our services</li>
                <li>To ensure the security of our platform and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who help us provide and improve our services
                </li>
                <li>
                  <strong>Educational Institutions:</strong> With your consent, we may share progress data with schools or tutors
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include encryption, access controls, and regular security assessments.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Restrict or object to certain processing of your data</li>
                <li>Request transfer of your data</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our services are intended for students aged 13 and older. For users under 18, we require parental consent. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website or through email notification.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Email: privacy@prepzr.com<br />
                Address: PREPZR Education Pvt. Ltd., #42, Tech Park, Whitefield, Bangalore - 560066, India
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
