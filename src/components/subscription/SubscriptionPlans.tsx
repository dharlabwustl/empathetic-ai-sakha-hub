import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, CheckCircle, User, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import GroupPlanInviteModal from './GroupPlanInviteModal';
import { SubscriptionPlansProps } from './batch/types';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
  isGroup?: boolean;
  userCount?: number;
}

const individualPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    billing: 'monthly',
    description: '7-day trial with limited features',
    features: [
      { name: 'Basic AI Tutor Access', included: true },
      { name: 'Limited Study Materials', included: true },
      { name: 'Progress Tracking', included: true },
      { name: 'Personalized Study Plan', included: false },
      { name: 'Advanced Practice Exams', included: false },
      { name: 'Unlimited AI Conversations', included: false },
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 499,
    billing: 'monthly',
    description: 'Perfect for individual exam preparation',
    features: [
      { name: 'Everything in Free Trial', included: true },
      { name: 'Full AI Tutor Access', included: true },
      { name: 'Complete Study Materials', included: true },
      { name: 'Personalized Study Plan', included: true },
      { name: 'Standard Practice Exams', included: true },
      { name: 'Limited AI Conversations', included: true },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999,
    billing: 'monthly',
    description: 'Complete preparation experience',
    recommended: true,
    features: [
      { name: 'Everything in Basic', included: true },
      { name: 'Advanced AI Tutor with Specializations', included: true },
      { name: 'Premium Study Materials', included: true },
      { name: 'Dynamic Study Plan Optimization', included: true },
      { name: 'Advanced Practice Exams', included: true },
      { name: 'Unlimited AI Conversations', included: true },
    ]
  }
];

const groupPlans: Plan[] = [
  {
    id: 'group-basic',
    name: 'Group Basic',
    price: 1999, // This is total price, per user is 1999/5 = ~400
    billing: 'monthly',
    description: 'Perfect for study groups (5 users)',
    isGroup: true,
    userCount: 5,
    features: [
      { name: 'Everything in Basic Plan for 5 Users', included: true },
      { name: 'Group Study Sessions', included: true },
      { name: 'Shared Study Materials', included: true },
      { name: 'Group Progress Tracking', included: true },
      { name: 'Batch Leader Management', included: true },
    ]
  },
  {
    id: 'group-pro',
    name: 'Group Pro',
    price: 3999, // This is total price, per user is 3999/5 = ~800
    billing: 'monthly',
    description: 'Complete group learning experience (5 users)',
    recommended: true,
    isGroup: true,
    userCount: 5,
    features: [
      { name: 'Everything in Pro Plan for 5 Users', included: true },
      { name: 'Advanced Group Study Sessions', included: true },
      { name: 'Premium Shared Resources', included: true },
      { name: 'Competitive Progress Tracking', included: true },
      { name: 'Advanced Batch Management', included: true },
      { name: 'Group Analysis Dashboard', included: true },
    ]
  }
];

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlanId, 
  onSelectPlan,
  showGroupOption = true 
}) => {
  const [planType, setPlanType] = useState<'individual' | 'group'>('individual');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedGroupPlan, setSelectedGroupPlan] = useState<Plan | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    if (onSelectPlan) {
      onSelectPlan(plan, plan.isGroup);
      return;
    }
    
    if (plan.isGroup) {
      setSelectedGroupPlan(plan);
      setShowInviteModal(true);
    } else {
      // Individual plan checkout
      toast({
        title: "Processing",
        description: `Setting up your ${plan.name} plan. Please wait...`,
      });
      
      // Navigate to checkout page
      setTimeout(() => {
        navigate('/dashboard/student/checkout', { 
          state: { 
            selectedPlan: {
              id: plan.id,
              name: plan.name,
              price: plan.price,
              features: plan.features.filter(f => f.included).map(f => f.name),
              isPopular: plan.recommended,
              type: plan.id === 'free' ? 'free' : plan.id === 'basic' ? 'basic' : 'premium'
            },
            isGroupPlan: false
          } 
        }); 
      }, 500);
    }
  };

  const handleInviteComplete = (emails: string[], inviteCodes: string[], batchName: string, roleType: string) => {
    setShowInviteModal(false);
    
    if (!selectedGroupPlan) return;

    // Navigate to the checkout page with group plan details
    toast({
      title: "Proceeding to Payment",
      description: "Please complete the payment process to activate your group plan.",
    });
    
    navigate('/dashboard/student/checkout', {
      state: {
        selectedPlan: {
          id: selectedGroupPlan.id,
          name: selectedGroupPlan.name,
          price: selectedGroupPlan.price,
          features: selectedGroupPlan.features.filter(f => f.included).map(f => f.name),
          isPopular: selectedGroupPlan.recommended,
          userCount: selectedGroupPlan.userCount,
          type: selectedGroupPlan.id.includes('basic') ? 'group_basic' : 'group_premium',
          planType: 'group'
        },
        emails,
        inviteCodes,
        batchName,
        roleType,
        isGroup: true
      }
    });
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select the plan that best fits your study needs
          </motion.p>
        </div>

        <Tabs 
          defaultValue={planType} 
          onValueChange={(value) => setPlanType(value as 'individual' | 'group')}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <User size={16} />
                <span>Individual</span>
              </TabsTrigger>
              {showGroupOption && (
                <TabsTrigger value="group" className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Group Plans (5 Users)</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="individual" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {individualPlans.map((plan) => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  isCurrentPlan={plan.id === currentPlanId}
                  onSelectPlan={handleSelectPlan} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {groupPlans.map((plan) => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  isCurrentPlan={plan.id === currentPlanId}
                  onSelectPlan={handleSelectPlan} 
                />
              ))}
            </div>
            
            <motion.div 
              className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                <CheckCircle size={18} className="mr-2" />
                How Group Plans Work
              </h3>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-200 space-y-1">
                <li className="flex items-start">
                  <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Choose your group members first - they'll each receive an invitation code</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Pay once for all 5 users (significantly cheaper per user)</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>You become the batch leader with admin privileges</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your friends can use their invitation codes during signup or in their profile</span>
                </li>
              </ul>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {showInviteModal && selectedGroupPlan && (
        <GroupPlanInviteModal 
          plan={selectedGroupPlan}
          onClose={() => setShowInviteModal(false)}
          onComplete={handleInviteComplete}
        />
      )}
    </>
  );
}

const PlanCard = ({ 
  plan, 
  isCurrentPlan, 
  onSelectPlan 
}: { 
  plan: Plan, 
  isCurrentPlan?: boolean, 
  onSelectPlan: (plan: Plan) => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={`relative h-full flex flex-col ${
        plan.recommended ? 
        'border-2 border-blue-500 dark:border-blue-400 shadow-lg' : 
        'border border-gray-200 dark:border-gray-800'
      }`}>
        {plan.recommended && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Recommended
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            {plan.isGroup && (
              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                {plan.userCount} Users
              </Badge>
            )}
          </div>
          <div className="flex items-end mt-2">
            <span className="text-3xl font-bold">₹{plan.price}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 mb-0.5">/{plan.billing}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {plan.description}
          </p>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <motion.li 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Check 
                  size={18} 
                  className={`mr-2 mt-0.5 ${
                    feature.included ? 
                    'text-green-500 dark:text-green-400' : 
                    'text-gray-300 dark:text-gray-600'
                  }`} 
                />
                <span className={!feature.included ? 'text-gray-400 dark:text-gray-500 line-through' : ''}>
                  {feature.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            onClick={() => onSelectPlan(plan)}
            disabled={isCurrentPlan}
            variant={plan.recommended ? "default" : "outline"}
            className={`w-full ${plan.recommended ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''} ${
              isCurrentPlan ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700' : ''
            }`}
          >
            {isCurrentPlan ? 'Current Plan' : `Get ${plan.name}`}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SubscriptionPlans;
