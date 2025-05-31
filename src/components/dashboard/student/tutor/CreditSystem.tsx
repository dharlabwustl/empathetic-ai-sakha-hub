
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, Crown, Zap, Gift, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  originalPrice?: number;
  bestValue?: boolean;
  bonus?: number;
}

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
      price: 99,
      originalPrice: 120
    },
    {
      id: 'popular',
      name: 'Popular Pack',
      credits: 25,
      price: 199,
      originalPrice: 300,
      bestValue: true,
      bonus: 5
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      credits: 50,
      price: 349,
      originalPrice: 600,
      bonus: 15
    }
  ];

  const creditUsage = [
    { feature: '3D Models', cost: 2, icon: '🎯' },
    { feature: 'Interactive Visuals', cost: 3, icon: '📊' },
    { feature: 'Advanced Analysis', cost: 5, icon: '🧠' }
  ];

  const progressPercentage = Math.min((userCredits / 50) * 100, 100);

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-b">
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-600" />
          Credit System
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Available Credits</span>
            <Badge className="bg-yellow-100 text-yellow-800 text-lg px-3 py-1">
              {userCredits}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {progressPercentage < 100 ? `${50 - userCredits} more for Pro status` : 'Pro status achieved!'}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-6">
        {/* Credit Usage Guide */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            Credit Usage
          </h4>
          <div className="space-y-2">
            {creditUsage.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.feature}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.cost} credits
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credit Packs */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Gift className="h-4 w-4 text-green-500" />
            Purchase Credits
          </h4>
          <div className="space-y-3">
            {creditPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden ${
                  pack.bestValue 
                    ? 'ring-2 ring-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' 
                    : 'hover:shadow-md transition-shadow'
                }`}>
                  {pack.bestValue && (
                    <div className="absolute -top-1 -right-1">
                      <Badge className="bg-green-500 text-white rounded-bl-lg rounded-tr-lg">
                        <Crown className="h-3 w-3 mr-1" />
                        Best Value
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{pack.name}</h5>
                      {pack.originalPrice && (
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{pack.originalPrice}
                          </span>
                          <div className="text-sm font-bold text-green-600">
                            Save ₹{pack.originalPrice - pack.price}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-100 text-blue-700">
                        {pack.credits} Credits
                      </Badge>
                      {pack.bonus && (
                        <Badge className="bg-orange-100 text-orange-700">
                          +{pack.bonus} Bonus
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">₹{pack.price}</div>
                      <Button
                        size="sm"
                        onClick={() => onPurchaseCredits(pack.id)}
                        className={pack.bestValue 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" 
                          : "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                        }
                      >
                        Purchase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Premium Benefits</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Advanced 3D molecular models</li>
            <li>• Interactive physics simulations</li>
            <li>• Detailed performance analytics</li>
            <li>• Priority AI responses</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditSystem;
