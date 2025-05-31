
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Coins, 
  ShoppingCart, 
  Gift, 
  Zap,
  Star,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CreditPack } from '@/types/creditPack';

interface CreditSystemProps {
  userCredits: number;
  onPurchaseCredits: (packId: string) => void;
}

const CreditSystem: React.FC<CreditSystemProps> = ({
  userCredits,
  onPurchaseCredits
}) => {
  const creditPacks: CreditPack[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 10,
      price: 4.99,
      description: 'Perfect for trying premium features',
      features: ['3D Models', 'Interactive Visuals', 'Basic Analysis']
    },
    {
      id: 'popular',
      name: 'Popular Pack',
      credits: 25,
      price: 9.99,
      description: 'Most popular choice for regular users',
      bestValue: true,
      features: ['All Premium Features', 'Priority Support', 'Advanced Analysis']
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      credits: 50,
      price: 17.99,
      description: 'For serious exam preparation',
      features: ['Unlimited Access', 'Personal AI Coach', 'Detailed Analytics']
    }
  ];

  const creditUsage = [
    { feature: '3D Models', credits: 2, color: 'bg-blue-500' },
    { feature: 'Interactive Visuals', credits: 3, color: 'bg-purple-500' },
    { feature: 'Advanced Analysis', credits: 5, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Credit Balance Card */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Coins className="h-5 w-5" />
            Your Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-amber-800 dark:text-amber-200">
                {userCredits}
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Available Credits
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                Usage Progress
              </div>
              <Progress 
                value={(userCredits / 50) * 100} 
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Credit Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {creditUsage.map((item, index) => (
            <div key={item.feature} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="font-medium">{item.feature}</span>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {item.credits} Credits
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Credit Packs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Buy Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {creditPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                pack.bestValue 
                  ? 'border-gradient-to-r from-amber-400 to-orange-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              {pack.bestValue && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Best Value
                  </Badge>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{pack.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pack.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${pack.price}</div>
                  <div className="text-sm text-gray-500">{pack.credits} Credits</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {pack.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Star className="h-3 w-3 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => onPurchaseCredits(pack.id)}
                className={`w-full ${
                  pack.bestValue 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Zap className="h-4 w-4 mr-2" />
                Purchase Credits
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Free Credits Banner */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Gift className="h-8 w-8 text-green-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Earn Free Credits!
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                Complete daily challenges and study streaks to earn bonus credits
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditSystem;
