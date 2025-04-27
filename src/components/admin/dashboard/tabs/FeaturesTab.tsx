
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";
import { Layers, ArrowRight, Shield, Users, Download, Settings, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const FeaturesTab = () => {
  const navigate = useNavigate();
  const features = getFeatures();
  
  const premiumFeatures = features.filter(feature => feature.isPremium);
  const basicFeatures = features.filter(feature => !feature.isPremium);
  const limitedFeatures = features.filter(feature => feature.freeAccessLimit);
  
  const premiumPercentage = Math.round((premiumFeatures.length / features.length) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
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

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-violet-800 dark:text-violet-300">Platform Features Management</h2>
          <p className="text-muted-foreground">Manage and monitor all features across subscription plans</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/admin/features')} 
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700"
          >
            <Settings size={16} />
            <span>Manage Features</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Schema</span>
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden border-indigo-100 dark:border-indigo-900/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Features</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{features.length}</div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300">
                <Layers size={24} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Available across all subscription plans
            </div>
          </CardContent>
          <CardFooter className="bg-blue-50/50 dark:bg-blue-900/20 py-2 px-4">
            <span className="text-xs text-blue-600 dark:text-blue-300 font-medium">Features define the platform's value</span>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden border-amber-100 dark:border-amber-900/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40">
            <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-300">Premium Features</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{premiumFeatures.length}</div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-300">
                <Shield size={24} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Restricted to premium subscription plans
            </div>
          </CardContent>
          <CardFooter className="bg-amber-50/50 dark:bg-amber-900/20 py-2 px-4">
            <span className="text-xs text-amber-600 dark:text-amber-300 font-medium">Premium features drive conversions</span>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden border-green-100 dark:border-green-900/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Free Features</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{basicFeatures.length}</div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-300">
                <Users size={24} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Available to all users, including free tier
            </div>
          </CardContent>
          <CardFooter className="bg-green-50/50 dark:bg-green-900/20 py-2 px-4">
            <span className="text-xs text-green-600 dark:text-green-300 font-medium">Free features build user base</span>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="border-violet-100 dark:border-violet-900/30 shadow-md">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40">
            <CardTitle className="text-violet-800 dark:text-violet-300">Feature Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 inline-block bg-violet-500 mr-2 rounded-sm"></span>
                  Premium Features
                </span>
                <span className="text-sm font-medium">{premiumPercentage}%</span>
              </div>
              <Progress value={premiumPercentage} className="h-2" />
              <div className="flex justify-end mt-1">
                <Badge variant="outline" className="text-xs text-violet-600">
                  {premiumFeatures.length} Features
                </Badge>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 inline-block bg-green-500 mr-2 rounded-sm"></span>
                  Free Features
                </span>
                <span className="text-sm font-medium">{100 - premiumPercentage}%</span>
              </div>
              <Progress value={100 - premiumPercentage} className="h-2 bg-gray-200 dark:bg-gray-700">
                <div className="h-full bg-green-500 transition-all" />
              </Progress>
              <div className="flex justify-end mt-1">
                <Badge variant="outline" className="text-xs text-green-600">
                  {basicFeatures.length} Features
                </Badge>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 inline-block bg-blue-500 mr-2 rounded-sm"></span>
                  Limited Access Features
                </span>
                <span className="text-sm font-medium">{Math.round((limitedFeatures.length / features.length) * 100)}%</span>
              </div>
              <Progress value={(limitedFeatures.length / features.length) * 100} className="h-2 bg-gray-200 dark:bg-gray-700">
                <div className="h-full bg-blue-500 transition-all" />
              </Progress>
              <div className="flex justify-end mt-1">
                <Badge variant="outline" className="text-xs text-blue-600">
                  {limitedFeatures.length} Features
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-indigo-100 dark:border-indigo-900/30 shadow-md h-full">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40">
              <CardTitle className="text-indigo-800 dark:text-indigo-300">Most Used Features</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="space-y-4">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{feature.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {feature.isPremium ? 'Premium Access' : 'Free Access'}
                          {feature.freeAccessLimit ? ` • ${feature.freeAccessLimit.limit} ${feature.freeAccessLimit.type} limit` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                        {90 - index * 10}%
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/admin/features')}>
                        <Eye size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-indigo-50/50 dark:bg-indigo-900/20 py-3 px-4 flex justify-between">
              <span className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">Usage analytics help optimize features</span>
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => navigate('/admin/features')}>
                View All <ArrowRight size={12} className="ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-purple-100 dark:border-purple-900/30 shadow-md h-full">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40">
              <CardTitle className="text-purple-800 dark:text-purple-300">Feature Usage Insights</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">24/7 Tutor</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Academic Advisor</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Flashcards & Revision</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Practice Exams</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Mental Health Zone</span>
                    <span className="text-sm font-medium">54%</span>
                  </div>
                  <Progress value={54} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-purple-50/50 dark:bg-purple-900/20 py-3 px-4 flex justify-between">
              <span className="text-xs text-purple-600 dark:text-purple-300 font-medium">Optimize feature engagement</span>
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => navigate('/admin/analytics')}>
                Full Analytics <ArrowRight size={12} className="ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturesTab;
