
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Terms and Conditions</h1>
          <div className="prose prose-purple max-w-none">
            <p className="mb-4">Last Updated: April 25, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>Welcome to Sakha AI ("we," "our," or "us"), a product of Greatwisdom India Pvt Ltd. By accessing or using our website, mobile applications, and services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). Please read these Terms carefully before using our Services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
            <p>"User" refers to any individual who accesses or uses our Services, including students, parents, teachers, and educational institutions.</p>
            <p>"Content" refers to all text, images, videos, audio, and other materials available through our Services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
            <p>To use certain features of our Services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Use of Services</h2>
            <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-8 my-4">
              <li>Use the Services in any way that violates applicable laws or regulations</li>
              <li>Impersonate another person or entity</li>
              <li>Engage in any activity that interferes with or disrupts the Services</li>
              <li>Attempt to gain unauthorized access to any portion of the Services</li>
              <li>Use the Services to transmit any malware, viruses, or other harmful code</li>
              <li>Share your account credentials with any third party</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Greatwisdom India Pvt Ltd, its licensors, or other content suppliers and are protected by copyright, trademark, and other intellectual property laws.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. AI Technology</h2>
            <p>Our Services utilize both open-source AI engines and in-house AI models to provide personalized learning experiences. While we strive to provide accurate and helpful information, we do not guarantee the accuracy, completeness, or reliability of any AI-generated content. The AI technology should be used as a supplementary learning tool and not as a replacement for professional educational guidance.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Privacy</h2>
            <p>Your use of our Services is also governed by our Privacy Policy, which can be found <a href="/privacy" className="text-purple-600 hover:text-purple-800">here</a>. By using our Services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p>We reserve the right to terminate or suspend your account and access to our Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of our Services, us, or third parties, or for any other reason.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Disclaimer of Warranties</h2>
            <p>THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL GREATWISDOM INDIA PVT LTD, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
            <p>We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised Terms.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:hello@sakhaai.com" className="text-purple-600 hover:text-purple-800">hello@sakhaai.com</a>.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
