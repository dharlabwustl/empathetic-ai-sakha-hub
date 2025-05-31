
import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Plus, Star, Zap, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CreditSystemProps {
  currentCredits: number;
  totalCredits: number;
  onPurchaseCredits: () => void;
}

const CreditSystem: React.FC<CreditSystemProps> = ({
  currentCredits,
  totalCredits,
  onPurchaseCredits
}) => {
  const creditPercentage = (currentCredits / totalCredits) * 100;
  
  const creditTiers = [
    { name: 'Basic Features', icon: <Zap className="h-4 w-4" />, credits: 0, color: 'text-blue-500' },
    { name: '3D Models', icon: <Star className="h-4 w-4" />, credits: 2, color: 'text-purple-500' },
    { name: 'Interactive Visuals', icon: <Crown className="h-4 w-4" />, credits: 3, color: 'text-pink-500' },
    { name: 'Advanced Analysis', icon: <Crown className="h-4 w-4" />, credits: 5, color: 'text-indigo-500' }
  ];

  const creditPacks = [
    { credits: 10, price: 99, bonus: 0, popular: false },
    { credits: 25, price: 199, bonus: 5, popular: true },
    { credits: 50, price: 349, bonus: 15, popular: false },
    { credits: 100, price: 599, bonus: 40, popular: false }
  ];

  return (
    <div className="space-y-6">
      {/* Current Credits Status */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
              <Coins className="h-5 w-5" />
            </div>
            Your Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentCredits}
              </span>
              <span className="text-sm text-gray-500">
                of {totalCredits} credits
              </span>
            </div>
            
            <Progress 
              value={creditPercentage} 
              className="h-2"
            />
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {creditPercentage < 20 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-600 dark:text-amber-400 font-medium"
                >
                  ⚠️ Running low on credits! Consider purchasing more.
                </motion.p>
              )}
              {creditPercentage >= 20 && creditPercentage < 50 && (
                <p>You have enough credits for several premium features.</p>
              )}
              {creditPercentage >= 50 && (
                <p className="text-green-600 dark:text-green-400">
                  Great! You have plenty of credits for all features.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feature Credits Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {creditTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className={`${tier.color}`}>
                    {tier.icon}
                  </div>
                  <span className="font-medium">{tier.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {tier.credits === 0 ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      FREE
                    </Badge>
                  ) : (
                    <Badge variant="outline" className={`${tier.color} border-current`}>
                      {tier.credits} credits
                    </Badge>
                  )}
                  {currentCredits >= tier.credits ? (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credit Purchase Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Purchase Credits</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unlock premium features with our flexible credit packs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditPacks.map((pack, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                  pack.popular 
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
              >
                {pack.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center space-y-3">
                  <div className="text-2xl font-bold">
                    {pack.credits + pack.bonus}
                    <span className="text-sm font-normal text-gray-500 ml-1">credits</span>
                  </div>
                  
                  {pack.bonus > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      +{pack.bonus} bonus credits included!
                    </div>
                  )}
                  
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    ₹{pack.price}
                  </div>
                  
                  <Button 
                    onClick={onPurchaseCredits}
                    className={`w-full ${
                      pack.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Why Purchase Credits?
                </p>
                <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Access cutting-edge 3D learning models</li>
                  <li>• Create interactive visualizations</li>
                  <li>• Get advanced AI analysis and insights</li>
                  <li>• Priority support and faster processing</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditSystem;
