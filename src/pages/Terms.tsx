
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Last updated: May 19, 2025
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Welcome to PREPZR. These Terms of Service ("Terms") govern your use of the PREPZR website and services (collectively, "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>"PREPZR"</strong> refers to PREPZR Education Pvt. Ltd., the company that provides the Services.
                </li>
                <li>
                  <strong>"User"</strong> refers to any individual who accesses or uses our Services, whether as a student, educator, or visitor.
                </li>
                <li>
                  <strong>"Content"</strong> refers to all materials available through our Services, including concept cards, flashcards, practice exams, and other educational materials.
                </li>
                <li>
                  <strong>"User Content"</strong> refers to any content submitted, uploaded, or otherwise provided by users to our Services.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. Account Registration</h2>
              <p className="text-gray-700 dark:text-gray-300">
                To access certain features of our Services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. Subscription and Payment</h2>
              <p className="text-gray-700 dark:text-gray-300">
                PREPZR offers both free and paid subscription plans. By subscribing to a paid plan, you agree to pay the applicable fees as they become due. All fees are exclusive of taxes unless stated otherwise. Subscription fees are non-refundable except as required by law or as explicitly stated in our refund policy.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. User Conduct</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By using our Services, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate another person or entity</li>
                <li>Use the Services for any unauthorized or illegal purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Share your account credentials with others</li>
                <li>Post or transmit harmful, offensive, or inappropriate content</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. Content and Intellectual Property</h2>
              <p className="text-gray-700 dark:text-gray-300">
                All content provided through our Services, including but not limited to text, graphics, logos, and educational materials, is the property of PREPZR or its licensors and is protected by intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on our content unless explicitly permitted by us.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. User Content</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You retain ownership of any content you submit to our Services. By submitting User Content, you grant PREPZR a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content for the purpose of providing and improving our Services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">8. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may terminate or suspend your access to our Services at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. PREPZR does not guarantee that the Services will be error-free, uninterrupted, or secure.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                To the maximum extent permitted by law, PREPZR shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our Services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">11. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website or through email notification. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Email: legal@prepzr.com<br />
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

export default Terms;
