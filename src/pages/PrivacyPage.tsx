
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
          <div className="prose prose-purple max-w-none">
            <p className="mb-4">Last Updated: April 25, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>At Sakha AI ("we," "our," or "us"), a product of Greatwisdom India Pvt Ltd, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, mobile applications, and services (collectively, the "Services").</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, information we collect automatically when you use our Services, and information from third-party sources. This may include:</p>
            <ul className="list-disc pl-8 my-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and educational information.</li>
              <li><strong>Usage Information:</strong> Information about how you use our Services, including learning patterns, test scores, and study habits.</li>
              <li><strong>Device Information:</strong> Information about the device you use to access our Services, including IP address, device type, and operating system.</li>
              <li><strong>Learning Data:</strong> Study progress, quiz results, flashcard usage, and other learning activities.</li>
              <li><strong>Emotional State Data:</strong> If you choose to use our mood tracking features, we collect information about your self-reported emotional states.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-8 my-4">
              <li>Provide, maintain, and improve our Services</li>
              <li>Personalize your learning experience</li>
              <li>Communicate with you about our Services</li>
              <li>Develop new products and features</li>
              <li>Generate and analyze aggregate statistics about our users</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with our legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. AI Technology and Data Processing</h2>
            <p>Our Services use artificial intelligence technologies, including both open-source AI engines and our proprietary in-house AI models. These technologies process your data to:</p>
            <ul className="list-disc pl-8 my-4">
              <li>Create personalized learning plans</li>
              <li>Adapt content to your learning style</li>
              <li>Provide tailored recommendations based on your progress</li>
              <li>Analyze patterns to improve our educational offerings</li>
            </ul>
            <p>We implement technical and organizational measures to ensure a level of security appropriate to the risk of processing your personal data.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-8 my-4">
              <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as hosting, data analysis, and customer service.</li>
              <li><strong>Educational Institutions:</strong> If you are using our Services through a school or institution, we may share information with that organization.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety or the rights and safety of others.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
            <p>We retain your information for as long as necessary to provide you with our Services and for legitimate business purposes, such as maintaining the performance of our Services, making data-driven business decisions, and complying with our legal obligations.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-8 my-4">
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate or incomplete personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p>To exercise these rights, please contact us at <a href="mailto:hello@sakhaai.com" className="text-purple-600 hover:text-purple-800">hello@sakhaai.com</a>.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>Our Services are designed for users of all ages, including children. We collect and process children's personal information only with appropriate parental consent and in compliance with applicable laws, such as the Children's Online Privacy Protection Act (COPPA) in the United States.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The most current version will always be posted on our website. We encourage you to review this Privacy Policy periodically for any changes.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Greatwisdom India Pvt Ltd<br />
            Email: <a href="mailto:hello@sakhaai.com" className="text-purple-600 hover:text-purple-800">hello@sakhaai.com</a><br />
            Phone: +91-8007194747<br />
            Address: Gurgaon Office: Nasscom office Udyog Vihar, India</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
