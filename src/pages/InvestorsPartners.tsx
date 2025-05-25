
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, TrendingUp, Rocket, Star, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/layout/Footer';

const InvestorsPartners = () => {
  const partnerships = [
    {
      name: 'NVIDIA Inception Program',
      type: 'Strategic Technology Partner',
      logo: '/lovable-uploads/c13c9764-a94b-443a-9e17-418ecca7ef44.png',
      description: 'PREPZR is proud to be a member of the prestigious NVIDIA Inception Program, joining an elite community of AI-driven startups that are transforming industries worldwide. This partnership empowers us with cutting-edge resources and exclusive access to accelerate our AI-powered educational platform.',
      benefits: [
        'Access to latest developer resources and training programs',
        'Exclusive NVIDIA hardware to accelerate our AI strategies',
        'Technical mentorship and support from NVIDIA experts',
        'Early access to new technologies and development tools',
        'Networking opportunities with industry leaders',
        'Marketing and go-to-market support'
      ],
      status: 'Active',
      joinedDate: '2024',
      story: 'Our journey with NVIDIA began when we recognized the transformative potential of AI in education. As we developed our personalized learning algorithms, we needed powerful computing resources and expertise to bring our vision to life. The NVIDIA Inception Program provided us with the perfect platform to scale our AI capabilities and connect with like-minded innovators in the startup ecosystem.'
    }
  ];

  const investmentHighlights = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Market Opportunity',
      description: '$280B+ global education technology market with rapid AI adoption',
      color: 'bg-blue-500'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Growing User Base',
      description: 'Expanding student community across competitive exam preparation',
      color: 'bg-green-500'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'AI-First Approach',
      description: 'Cutting-edge AI technology powering personalized learning experiences',
      color: 'bg-purple-500'
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Scalable Platform',
      description: 'Built for global expansion with robust, scalable architecture',
      color: 'bg-orange-500'
    }
  ];

  const upcomingOpportunities = [
    'Series A funding round opening Q2 2025',
    'Strategic partnerships with leading educational institutions',
    'International market expansion opportunities',
    'Technology licensing and white-label solutions',
    'Corporate training and enterprise solutions'
  ];

  return (
    <>
      <Helmet>
        <title>Investors & Partners - PREPZR</title>
        <meta name="description" content="Join PREPZR's journey in revolutionizing education through AI. Learn about our partnerships, investment opportunities, and strategic collaborations." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Building the Future of Education
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Investors & Partners
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Join us in revolutionizing education through AI-powered personalized learning. 
                Discover partnership opportunities and investment potential in the future of exam preparation.
              </p>
            </motion.div>

            {/* Investment Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {investmentHighlights.map((highlight, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-lg ${highlight.color} flex items-center justify-center text-white mb-3`}>
                      {highlight.icon}
                    </div>
                    <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Strategic Partnerships */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Strategic Partnerships</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We collaborate with industry leaders to deliver cutting-edge educational technology
              </p>
            </motion.div>

            <div className="space-y-8">
              {partnerships.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row items-start gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-40 h-24 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl flex items-center justify-center p-6 shadow-lg">
                            <img 
                              src={partner.logo} 
                              alt={`${partner.name} logo`}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            <h3 className="text-3xl font-bold">{partner.name}</h3>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-sm">{partner.type}</Badge>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {partner.status}
                              </Badge>
                              <Badge variant="outline">Since {partner.joinedDate}</Badge>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-lg">Our Partnership Story</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                              {partner.story}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {partner.description}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                              <Star className="h-5 w-5 text-yellow-500" />
                              Partnership Benefits & Access
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {partner.benefits.map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Future Partnerships */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-12 text-center"
            >
              <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <CardContent className="p-8">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    <Rocket className="h-12 w-12 mx-auto mb-3" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">More Partnerships Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We're actively building relationships with leading technology companies, 
                    educational institutions, and industry experts to expand our ecosystem.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Investment Opportunity */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Investment Opportunity</h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Be part of the next generation of educational technology. Join our mission to make quality education accessible through AI.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Why Invest in PREPZR?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                        Proven AI technology with measurable learning outcomes
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                        Large addressable market with global expansion potential
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                        Strong partnerships with technology leaders like NVIDIA
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                        Experienced team with education and technology expertise
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Upcoming Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
                    <ul className="space-y-3 text-white/90">
                      {upcomingOpportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
              >
                Contact Us for Investment Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Partnership Opportunities</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                Interested in partnering with PREPZR? We're always looking for strategic collaborations that advance our mission.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { title: 'Educational Institutions', description: 'Integrate our AI technology into your curriculum' },
                  { title: 'Technology Partners', description: 'Collaborate on cutting-edge educational innovations' },
                  { title: 'Content Partners', description: 'Expand our content library with your expertise' }
                ].map((type, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold mb-2">{type.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button size="lg" variant="outline">
                Explore Partnership Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default InvestorsPartners;
