
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  Rocket,
  Star,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const InvestorsPartners = () => {
  const benefits = [
    "Access to the latest NVIDIA developer resources and training",
    "Exclusive NVIDIA hardware to accelerate our AI strategies", 
    "Technical mentorship from NVIDIA experts",
    "Priority access to new AI frameworks and tools",
    "Marketing and go-to-market support",
    "Networking opportunities with other AI startups"
  ];

  const futurePartnerships = [
    {
      category: "Technology Partners",
      description: "Cloud providers, AI/ML platforms, and educational technology companies",
      icon: <Zap className="h-6 w-6" />
    },
    {
      category: "Educational Institutions", 
      description: "Universities, colleges, and coaching institutes for content partnerships",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      category: "Government Bodies",
      description: "Educational boards and examination authorities for official endorsements", 
      icon: <Shield className="h-6 w-6" />
    }
  ];

  const investmentOpportunities = [
    {
      stage: "Series A",
      focus: "Scale AI capabilities and expand to new exam categories",
      amount: "₹50-100 Cr", 
      timeline: "Q2 2025"
    },
    {
      stage: "Strategic Partnerships",
      focus: "Content partnerships and technology integrations",
      amount: "Ongoing",
      timeline: "Continuous"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Investors & Partners
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join us in revolutionizing education with AI-powered learning solutions for millions of students across India
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50 border-blue-200">
                  <Building2 className="h-5 w-5 mr-2" />
                  NVIDIA Inception Partner
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 border-green-200">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  High Growth Potential
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2 bg-purple-50 border-purple-200">
                  <Users className="h-5 w-5 mr-2" />
                  Million+ Student Market
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NVIDIA Partnership Story */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Partnership Journey</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Backed by industry leaders who believe in our vision
                </p>
              </div>

              <Card className="overflow-hidden shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <img
                        src="/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png"
                        alt="NVIDIA Inception Logo"
                        className="h-12 w-auto"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold">NVIDIA Inception Program</CardTitle>
                      <p className="text-green-100 text-lg">Accelerating AI Innovation in Education</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Partnership Story</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        PREPZR was accepted into the prestigious NVIDIA Inception Program, recognizing our innovative approach to AI-powered education. 
                        This partnership validates our technology stack and positions us at the forefront of the AI revolution in Indian education.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Through this partnership, we're leveraging cutting-edge GPU acceleration and AI frameworks to deliver 
                        personalized learning experiences that adapt to each student's unique learning patterns and exam requirements.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Partnership Benefits</h3>
                      <div className="space-y-3">
                        {benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mt-1">
                              <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Investment Opportunities</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Join us in transforming education for millions of students
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {investmentOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <CardTitle className="text-2xl">{opportunity.stage}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{opportunity.focus}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">Target Amount:</span>
                            <span className="text-blue-600 dark:text-blue-400 font-bold">{opportunity.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Timeline:</span>
                            <span className="text-gray-700 dark:text-gray-300">{opportunity.timeline}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Future Partnerships */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Future Partnership Opportunities</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  We're actively seeking strategic partnerships to expand our impact
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {futurePartnerships.map((partnership, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="h-full text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <div className="text-purple-600 dark:text-purple-400">
                            {partnership.icon}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{partnership.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">{partnership.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join us in revolutionizing education and creating the next generation of AI-powered learning solutions
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Target className="h-5 w-5 mr-2" />
                  Investment Inquiries
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Rocket className="h-5 w-5 mr-2" />
                  Partnership Opportunities
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InvestorsPartners;
