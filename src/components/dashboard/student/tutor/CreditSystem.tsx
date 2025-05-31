
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, ShoppingCart, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreditSystemProps {
  userCredits: number;
  onPurchaseCredits: () => void;
}

const creditPacks = [
  {
    id: 'basic',
    name: 'Basic Pack',
    credits: 10,
    price: 99,
    description: 'Perfect for regular usage',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    credits: 25,
    price: 199,
    description: 'Most popular choice',
    popular: true
  },
  {
    id: 'unlimited',
    name: 'Unlimited Pack',
    credits: 100,
    price: 499,
    description: 'Best value for power users',
    popular: false
  }
];

const CreditSystem: React.FC<CreditSystemProps> = ({
  userCredits,
  onPurchaseCredits
}) => {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Coins className="h-5 w-5 text-amber-600" />
            Your Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <motion.div 
                className="text-3xl font-bold text-amber-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {userCredits}
              </motion.div>
              <p className="text-sm text-muted-foreground">Credits available</p>
            </div>
            <Button
              onClick={onPurchaseCredits}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy More
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Credit Packs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {creditPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`relative p-4 rounded-lg border ${
                pack.popular 
                  ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' 
                  : 'border-gray-200 bg-gray-50 dark:bg-gray-800/50'
              }`}>
                {pack.popular && (
                  <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-purple-500 to-pink-500">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      {pack.name}
                      <Badge variant="secondary" className="text-xs">
                        {pack.credits} credits
                      </Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground">{pack.description}</p>
                    <p className="text-lg font-bold text-green-600 mt-1">₹{pack.price}</p>
                  </div>
                  
                  <Button
                    size="sm"
                    variant={pack.popular ? "default" : "outline"}
                    className={pack.popular ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" : ""}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">Credit Usage Guide</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>AI Chat</span>
              <Badge variant="secondary">Free</Badge>
            </div>
            <div className="flex justify-between">
              <span>Smart Search</span>
              <Badge variant="secondary">1 credit</Badge>
            </div>
            <div className="flex justify-between">
              <span>AI Insights</span>
              <Badge variant="secondary">1 credit</Badge>
            </div>
            <div className="flex justify-between">
              <span>3D Models</span>
              <Badge variant="secondary">2 credits</Badge>
            </div>
            <div className="flex justify-between">
              <span>Interactive Visuals</span>
              <Badge variant="secondary">3 credits</Badge>
            </div>
            <div className="flex justify-between">
              <span>Advanced Analysis</span>
              <Badge variant="secondary">5 credits</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditSystem;
