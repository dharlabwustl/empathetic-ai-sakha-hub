
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Handshake, Rocket, Zap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const InvestorsPartners = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Investors & Partners
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Building the future of AI-powered education through strategic partnerships and investments that drive innovation and accessibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partnership Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in collaborative innovation that transforms education and empowers students worldwide.
            </p>
          </motion.div>

          {/* NVIDIA Partnership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/1ddc24fa-1cd8-4de0-b512-9e8d51900f0c.png" 
                    alt="NVIDIA Inception Program" 
                    className="h-16 w-auto bg-white p-2 rounded"
                  />
                  <div>
                    <CardTitle className="text-2xl">NVIDIA Inception Program Member</CardTitle>
                    <p className="text-green-100 mt-2">Accelerating AI Innovation Since 2025</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Our Partnership Story</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      As a proud member of the NVIDIA Inception Program 2025, PREPZR has gained access to cutting-edge AI resources that accelerate our mission to democratize quality education. This partnership enables us to leverage the latest GPU technologies and AI frameworks to create more personalized and effective learning experiences.
                    </p>
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Rocket className="h-5 w-5" />
                      <span>Accelerating Innovation Together</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Program Benefits</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <p className="font-medium">Latest Developer Resources & Training</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Access to NVIDIA's comprehensive AI development toolkit</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-purple-500 mt-1" />
                        <div>
                          <p className="font-medium">Exclusive NVIDIA Hardware Access</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cutting-edge GPUs to accelerate our AI strategies</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                          <p className="font-medium">Technical Support & Mentorship</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Direct guidance from NVIDIA's AI experts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Future Partnerships Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Growing Partnership Ecosystem</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're continuously expanding our network of strategic partners to enhance our platform and reach more students globally.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Technology Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Collaborating with leading tech companies to integrate cutting-edge AI and cloud technologies.
                  </p>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    • Cloud Infrastructure Partners
                    • AI/ML Platform Integrations
                    • Developer Tool Providers
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Educational Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Partnering with schools, colleges, and coaching institutes to provide comprehensive learning solutions.
                  </p>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    • Academic Content Partnerships
                    • Institutional Licensing
                    • Teacher Training Programs
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                    <Handshake className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Content Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Working with subject matter experts and content creators to develop high-quality educational materials.
                  </p>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    • Expert Content Contributors
                    • Video Learning Partners
                    • Assessment Platform Integrations
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Investment Opportunities</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join us in revolutionizing education and creating sustainable impact for millions of students worldwide.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Why Invest in PREPZR?</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span>Massive market opportunity in the $350B global education sector</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span>AI-powered platform with proven student success metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span>Strong social impact mission aligned with UN SDG #4</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span>Scalable technology with multiple revenue streams</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Investment Focus Areas</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300">AI Development</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Advancing our personalization and tutoring capabilities</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Market Expansion</h4>
                        <p className="text-sm text-green-600 dark:text-green-400">Scaling to new regions and educational segments</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Content Development</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400">Creating comprehensive learning materials</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ready to join our mission of transforming education through AI? Let's explore how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Partnership Inquiry
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Investment Information
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestorsPartners;
