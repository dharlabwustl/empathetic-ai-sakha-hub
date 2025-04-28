
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: April 28, 2025</p>
          
          <div className="prose prose-purple max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                At Sakha AI, operated by Greatwisdom India Pvt Ltd ("we", "our", "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
              <p className="mt-2">
                We use your data to provide and improve our services. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">Personal Data</h3>
              <p>
                While using our services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Educational information</li>
                <li>Usage data and preferences</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Learning and Mood Data</h3>
              <p>
                To provide personalized learning experiences, we collect:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Study preferences and habits</li>
                <li>Academic goals and progress</li>
                <li>Test scores and performance metrics</li>
                <li>Mood logs and emotional states during study sessions</li>
                <li>Learning pace and knowledge gaps</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Personalizing your learning experience</li>
                <li>Generating adaptive study plans</li>
                <li>Analyzing usage patterns to enhance our platform</li>
                <li>Communicating with you about your account or subscription</li>
                <li>Sending notifications, updates, and promotional content (with your consent)</li>
                <li>Preventing fraud and ensuring the security of our platform</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. AI Models and Data Processing</h2>
              <p>
                Sakha AI uses both proprietary in-house AI models and open-source AI engines to process your data and provide personalized learning experiences. This processing includes:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Analyzing your learning patterns to identify strengths and weaknesses</li>
                <li>Processing mood data to adapt content delivery based on emotional state</li>
                <li>Generating personalized explanations and study materials</li>
                <li>Creating adaptive question sequences based on your performance</li>
              </ul>
              <p className="mt-2">
                We implement appropriate technical safeguards to protect your data during AI processing and ensure that our AI systems operate in compliance with applicable data protection laws.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Service providers who help us operate our platform</li>
                <li>Educational institutions (only with your explicit consent)</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="mt-2">
                We do not sell your personal information to third parties.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Request transfer of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will promptly delete such information from our servers.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-2">
                Greatwisdom India Pvt Ltd<br/>
                Email: hello@sakhaai.com<br/>
                Address: Nasscom office Udyog Vihar, Gurgaon, India
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
