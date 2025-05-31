
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ShoppingCart, 
  Star, 
  TrendingUp,
  Gift,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { CreditPack } from "@/types/creditPack";

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
      description: 'Best value for regular users',
      bestValue: true,
      features: ['All Premium Features', '20% Bonus Credits', 'Priority Support']
    },
    {
      id: 'power',
      name: 'Power Pack',
      credits: 50,
      price: 17.99,
      description: 'For heavy premium feature usage',
      features: ['All Premium Features', '25% Bonus Credits', 'Early Access']
    },
    {
      id: 'unlimited',
      name: 'Monthly Unlimited',
      credits: 999,
      price: 24.99,
      description: 'Unlimited access for one month',
      features: ['Unlimited Premium Features', 'Priority Support', 'Exclusive Content']
    }
  ];

  const getCreditLevel = () => {
    if (userCredits >= 50) return { level: 'High', color: 'green', icon: Star };
    if (userCredits >= 20) return { level: 'Medium', color: 'blue', icon: TrendingUp };
    if (userCredits >= 5) return { level: 'Low', color: 'yellow', icon: Clock };
    return { level: 'Critical', color: 'red', icon: Zap };
  };

  const creditLevel = getCreditLevel();
  const IconComponent = creditLevel.icon;

  return (
    <div className="space-y-6">
      {/* Current Credits Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2 rounded-lg bg-${creditLevel.color}-500 text-white`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IconComponent className="h-5 w-5" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-lg">Your Credits</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Credit Level: {creditLevel.level}
                </p>
              </div>
            </div>
            <div className="text-right">
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {userCredits}
              </motion.div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Credits remaining
              </p>
            </div>
          </div>
          
          <Progress 
            value={Math.min((userCredits / 50) * 100, 100)} 
            className="h-2 mb-2"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>0</span>
            <span>50+ credits</span>
          </div>
        </CardContent>
      </Card>

      {/* Credit Packs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Purchase Credits
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose a credit pack that suits your learning needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Card className={`${
                  pack.bestValue 
                    ? "border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" 
                    : "hover:border-gray-300"
                }`}>
                  {pack.bestValue && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Best Value
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-lg mb-1">{pack.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {pack.description}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <motion.div
                          className="text-2xl font-bold text-blue-600"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {pack.credits === 999 ? '∞' : pack.credits}
                        </motion.div>
                        <Zap className="h-5 w-5 text-yellow-500" />
                      </div>
                      
                      <div className="text-3xl font-bold mb-4">
                        ${pack.price}
                        {pack.credits === 999 && (
                          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                            /month
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {pack.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className={`w-full ${
                          pack.bestValue 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" 
                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        }`}
                        onClick={() => onPurchaseCredits(pack.id)}
                      >
                        {pack.credits === 999 ? 'Subscribe' : 'Purchase'}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditSystem;
