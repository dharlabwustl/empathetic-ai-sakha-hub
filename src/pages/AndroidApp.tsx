
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Smartphone, BookOpen, Brain, Medal, Bell, LineChart, Calendar, ChevronRight, Shield, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AndroidApp = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  // State for subscription plan selection
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");

  const features = [
    { 
      name: "Personalized Dashboard", 
      description: "Your study progress, recommendations and daily goals in one place",
      icon: <Smartphone className="h-5 w-5" />
    },
    { 
      name: "24/7 AI Tutor", 
      description: "Get your questions answered any time with our intelligent AI tutor",
      icon: <Brain className="h-5 w-5" /> 
    },
    { 
      name: "Study Materials & Flashcards", 
      description: "Access all your study materials and flashcards on the go",
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: "Progress Analytics", 
      description: "Visual insights into your study performance and areas of improvement",
      icon: <LineChart className="h-5 w-5" /> 
    },
    { 
      name: "Exam Readiness", 
      description: "Track your preparation level with our exam readiness analyzer",
      icon: <Medal className="h-5 w-5" /> 
    },
    { 
      name: "Smart Notifications", 
      description: "Timely reminders for your study schedule and important updates",
      icon: <Bell className="h-5 w-5" /> 
    },
  ];
  
  const subscriptionPlans = [
    {
      id: "free",
      name: "Free Plan",
      price: "₹0",
      period: "Forever",
      features: [
        "Limited AI tutor questions",
        "Basic study materials",
        "Daily streak tracking",
        "Basic progress analytics"
      ],
      isPopular: false,
      buttonText: "Download Now"
    },
    {
      id: "monthly",
      name: "Student Pro",
      price: "₹249",
      period: "Per month",
      features: [
        "Unlimited AI tutor questions",
        "Full study materials library",
        "Personalized study planner",
        "Advanced analytics & insights",
        "Offline material access",
        "Priority customer support"
      ],
      isPopular: true,
      buttonText: "Start 7-Day Free Trial"
    },
    {
      id: "yearly",
      name: "Student Pro Annual",
      price: "₹1,999",
      period: "Per year",
      discount: "Save ₹989",
      features: [
        "Everything in Student Pro",
        "2 months free",
        "Mock test generator",
        "Peer community access",
        "Goal tracking with rewards",
        "Exclusive webinar access"
      ],
      isPopular: false,
      buttonText: "Start 7-Day Free Trial"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-3/5 h-3/5 bg-gradient-to-br from-violet-200/50 to-transparent rounded-bl-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-tr-full -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-violet-900">
                  Your AI Study Partner <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">in Your Pocket</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Experience the full power of Sakha AI on your Android device. Study smarter, track progress, and get help anytime, anywhere.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download on Google Play
                  </Button>
                  
                  <Link to="/signup">
                    <Button size="lg" variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
                      Create Free Account
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free download, premium features available with subscription</span>
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Phone Mockup */}
                <div className="relative mx-auto max-w-xs">
                  <div className="relative w-[280px] h-[570px] bg-black rounded-[36px] p-3 shadow-2xl border-8 border-gray-800 mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black z-10 rounded-b-xl"></div>
                    <div className="h-full w-full bg-white rounded-3xl overflow-hidden">
                      {/* App Screenshot */}
                      <div className="h-full w-full overflow-hidden">
                        <img 
                          src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
                          alt="Sakha AI Mobile App" 
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Features */}
                  <motion.div
                    className="absolute -top-4 -left-16 bg-white p-2 rounded-lg shadow-md max-w-[140px]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                        <Brain className="h-3 w-3 text-violet-600" />
                      </div>
                      <span className="text-xs font-medium">AI Tutor</span>
                    </div>
                    <p className="text-xs text-gray-500">24/7 learning support</p>
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/3 -right-20 bg-white p-2 rounded-lg shadow-md max-w-[140px]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <LineChart className="h-3 w-3 text-indigo-600" />
                      </div>
                      <span className="text-xs font-medium">Progress</span>
                    </div>
                    <p className="text-xs text-gray-500">Real-time analysis</p>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-12 -left-20 bg-white p-2 rounded-lg shadow-md max-w-[140px]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                        <BookOpen className="h-3 w-3 text-pink-600" />
                      </div>
                      <span className="text-xs font-medium">Materials</span>
                    </div>
                    <p className="text-xs text-gray-500">Study on the go</p>
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -z-10 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* App Usage Flow Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-900">
                Get Started in Three Simple Steps
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our app is designed to get you learning quickly with minimal setup.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Sign Up",
                  description: "Create your account with basic information and your learning goals",
                  icon: <Shield className="h-8 w-8" />
                },
                {
                  step: 2,
                  title: "Complete Onboarding",
                  description: "Tell us about your study habits, strengths, and exam dates",
                  icon: <Calendar className="h-8 w-8" />
                },
                {
                  step: 3,
                  title: "Start Learning",
                  description: "Access your personalized dashboard and begin your study journey",
                  icon: <Brain className="h-8 w-8" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-4 relative">
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-violet-600 text-white text-sm flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                    <div className="text-violet-600">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-violet-900">{step.title}</h3>
                  <p className="text-center text-gray-600">{step.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%-10px)] w-16 border-t-2 border-dashed border-violet-300">
                      <ChevronRight className="text-violet-300 absolute top-[-12px] right-[-6px]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-900">Powerful Features on Your Mobile</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our Android app brings the complete Sakha AI learning experience to your mobile device, with full syncing to your web account.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-violet-50 to-white p-6 rounded-xl border border-violet-100 shadow-sm"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                    <div className="text-violet-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-violet-900">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Subscription Plans Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-900">Flexible Subscription Plans</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Choose the plan that works best for you and your study needs.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {subscriptionPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-white p-6 rounded-xl border ${plan.isPopular ? 'border-violet-500 shadow-lg' : 'border-gray-200 shadow-sm'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <Badge className="bg-violet-600">Most Popular</Badge>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-1 text-violet-900">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                    {plan.discount && (
                      <div className="mt-1 text-green-600 text-sm font-medium">{plan.discount}</div>
                    )}
                  </div>
                  <div className="mb-6 border-t border-gray-100 pt-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className={`w-full ${plan.isPopular ? 'bg-violet-600 hover:bg-violet-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Student Dashboard Preview */}
        <section className="py-20 bg-gradient-to-br from-violet-50 via-indigo-50 to-violet-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-violet-900">
                  Your Complete Study Dashboard <span className="text-violet-600">in Your Pocket</span>
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Access your personalized dashboard on the go, with real-time updates and seamless syncing between your devices.
                </p>

                <Tabs defaultValue="dashboard" className="mb-8">
                  <TabsList className="grid grid-cols-3 bg-violet-100">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="ai-tutor">AI Tutor</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                  </TabsList>
                  <TabsContent value="dashboard" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-700">
                          A fully personalized home screen with your daily study plan, progress metrics, and smart recommendations based on your learning patterns.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Daily Schedule</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Smart Reminders</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Quick Actions</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="ai-tutor" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-700">
                          Get instant help with any subject with our AI tutor that understands your learning style and adapts to your needs.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">24/7 Availability</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Concept Explanations</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Problem Solving</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="progress" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-700">
                          Track your learning journey with detailed analytics, progress charts, and insights into your strengths and areas for improvement.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Visual Charts</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Weekly Reports</Badge>
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Smart Analysis</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-wrap gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                      Get Started Free
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="border-violet-300 text-violet-700 hover:bg-violet-50">
                    <Download size={16} className="mr-2" /> Download App
                  </Button>
                </div>
              </motion.div>

              {/* Dashboard Screenshots */}
              <motion.div 
                className="relative flex justify-center"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative max-w-xs">
                  {/* Main phone */}
                  <div className="relative w-[260px] h-[530px] bg-black rounded-[30px] p-2 shadow-xl border-8 border-gray-800 mx-auto z-20">
                    <div className="h-full w-full bg-violet-50 rounded-3xl overflow-hidden">
                      <div className="h-12 bg-violet-600 flex items-center justify-between px-4">
                        <span className="text-white text-sm font-medium">Student Dashboard</span>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
                          <div className="h-2 w-1/3 bg-violet-200 rounded mb-2"></div>
                          <div className="h-1.5 w-4/5 bg-gray-100 rounded mb-1"></div>
                          <div className="h-1.5 w-2/3 bg-gray-100 rounded"></div>
                          <div className="mt-2 flex space-x-1">
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="bg-violet-100 rounded-md p-2 shadow-sm">
                            <div className="h-1.5 w-8 bg-violet-300 rounded mb-1"></div>
                            <div className="h-3 w-10 bg-violet-500 rounded"></div>
                          </div>
                          <div className="bg-indigo-100 rounded-md p-2 shadow-sm">
                            <div className="h-1.5 w-8 bg-indigo-300 rounded mb-1"></div>
                            <div className="h-3 w-10 bg-indigo-500 rounded"></div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                          <div className="h-2 w-1/4 bg-violet-200 rounded mb-1"></div>
                          <div className="space-y-1">
                            <div className="h-1.5 w-full bg-gray-100 rounded"></div>
                            <div className="h-1.5 w-3/4 bg-gray-100 rounded"></div>
                            <div className="h-1.5 w-1/2 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Left phone (slightly behind) */}
                  <div className="absolute -left-24 top-10 w-[220px] h-[450px] bg-black rounded-[24px] p-2 shadow-lg border-8 border-gray-800 z-10 rotate-[-12deg]">
                    <div className="h-full w-full bg-violet-50 rounded-2xl overflow-hidden">
                      <div className="h-10 bg-indigo-500 flex items-center justify-between px-3">
                        <span className="text-white text-xs font-medium">AI Tutor Chat</span>
                      </div>
                      <div className="p-2">
                        <div className="flex justify-end mb-1">
                          <div className="bg-violet-100 rounded-lg p-1.5 max-w-[80%]">
                            <div className="h-1 w-24 bg-violet-300 rounded mb-0.5"></div>
                            <div className="h-1 w-20 bg-violet-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-start mb-1">
                          <div className="bg-indigo-100 rounded-lg p-1.5 max-w-[80%]">
                            <div className="h-1 w-28 bg-indigo-300 rounded mb-0.5"></div>
                            <div className="h-1 w-32 bg-indigo-300 rounded mb-0.5"></div>
                            <div className="h-1 w-16 bg-indigo-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-violet-100 rounded-lg p-1.5 max-w-[80%]">
                            <div className="h-1 w-18 bg-violet-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right phone (slightly behind) */}
                  <div className="absolute -right-20 top-20 w-[220px] h-[450px] bg-black rounded-[24px] p-2 shadow-lg border-8 border-gray-800 z-10 rotate-[12deg]">
                    <div className="h-full w-full bg-violet-50 rounded-2xl overflow-hidden">
                      <div className="h-10 bg-pink-500 flex items-center justify-between px-3">
                        <span className="text-white text-xs font-medium">Progress Analytics</span>
                      </div>
                      <div className="p-2">
                        <div className="h-16 bg-white rounded-lg mb-2">
                          <div className="h-full flex items-end px-1">
                            <div className="w-5 h-[20%] bg-indigo-300 rounded-t mx-0.5"></div>
                            <div className="w-5 h-[45%] bg-indigo-400 rounded-t mx-0.5"></div>
                            <div className="w-5 h-[65%] bg-indigo-500 rounded-t mx-0.5"></div>
                            <div className="w-5 h-[80%] bg-indigo-600 rounded-t mx-0.5"></div>
                            <div className="w-5 h-[60%] bg-indigo-500 rounded-t mx-0.5"></div>
                            <div className="w-5 h-[70%] bg-indigo-600 rounded-t mx-0.5"></div>
                            <div className="w-5 h-[90%] bg-indigo-700 rounded-t mx-0.5"></div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 mb-2">
                          <div className="h-1.5 w-1/3 bg-pink-300 rounded mb-1"></div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-pink-200 mr-1"></div>
                            <div className="flex-1">
                              <div className="h-1 w-20 bg-gray-200 rounded mb-0.5"></div>
                              <div className="h-1 w-12 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -z-10 w-72 h-72 bg-gradient-to-br from-violet-200/30 via-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -top-10 -left-10"></div>
                  <div className="absolute -z-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 via-indigo-200/30 to-violet-200/30 rounded-full blur-3xl -bottom-10 -right-10"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security and Privacy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-violet-900">Your Data Security is Our Priority</h2>
              <p className="text-lg text-gray-700">
                We take multiple measures to ensure your study data and personal information are secure.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "End-to-End Encryption",
                  description: "All your data is encrypted in transit and at rest",
                  icon: <Lock className="h-6 w-6" />
                },
                {
                  title: "Privacy Controls",
                  description: "Full control over what data is collected and shared",
                  icon: <Shield className="h-6 w-6" />
                },
                {
                  title: "Secure Authentication",
                  description: "Two-factor authentication to protect your account",
                  icon: <CheckCircle className="h-6 w-6" />
                },
                {
                  title: "Data Backups",
                  description: "Regular backups to ensure you never lose progress",
                  icon: <Calendar className="h-6 w-6" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-violet-50 p-4 rounded-lg border border-violet-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3 mx-auto">
                    <span className="text-violet-600">{item.icon}</span>
                  </div>
                  <h3 className="text-center text-lg font-medium mb-2 text-violet-900">{item.title}</h3>
                  <p className="text-center text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Download CTA */}
        <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your exam preparation?</h2>
              <p className="text-xl mb-10 text-violet-100">
                Download the Sakha AI Student App now and experience the future of personalized learning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-100 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download on Google Play
                </Button>
                
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Create Free Account
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-sm text-violet-200">
                Compatible with Android 8.0 and above. Free download with optional premium features.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AndroidApp;
