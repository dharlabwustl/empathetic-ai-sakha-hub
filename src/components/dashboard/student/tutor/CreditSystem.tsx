
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ShoppingCart, Star, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreditSystemProps {
  userCredits: number;
  onPurchaseCredits: () => void;
}

const CreditSystem: React.FC<CreditSystemProps> = ({
  userCredits,
  onPurchaseCredits
}) => {
  const creditPacks = [
    { credits: 10, price: 99, popular: false },
    { credits: 25, price: 199, popular: true },
    { credits: 50, price: 349, popular: false },
  ];

  return (
    <Card className="border-gradient-to-r from-purple-200 to-pink-200">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-5 w-5 text-yellow-500" />
          </motion.div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Credits
          </span>
          <Badge variant="outline" className="ml-auto">
            {userCredits} credits
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Use credits for premium AI features like 3D models, interactive visuals, and advanced analysis.
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Feature Costs:</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>3D Models</span>
              <Badge variant="outline" size="sm">2 credits</Badge>
            </div>
            <div className="flex justify-between">
              <span>Interactive Visuals</span>
              <Badge variant="outline" size="sm">3 credits</Badge>
            </div>
            <div className="flex justify-between">
              <span>Advanced Analysis</span>
              <Badge variant="outline" size="sm">5 credits</Badge>
            </div>
          </div>
        </div>
        
        {userCredits < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200"
          >
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Gift className="h-4 w-4" />
              <span className="text-sm font-medium">Low Credits</span>
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              You're running low on credits. Purchase more to access premium features.
            </p>
          </motion.div>
        )}
        
        <div className="grid grid-cols-3 gap-2">
          {creditPacks.map((pack) => (
            <motion.div
              key={pack.credits}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`cursor-pointer transition-all text-center relative ${
                pack.popular 
                  ? 'border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50' 
                  : 'hover:border-gray-300'
              }`}>
                {pack.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-purple-600">
                      {pack.credits}
                    </div>
                    <div className="text-xs text-gray-500">credits</div>
                    <div className="text-sm font-medium">
                      ₹{pack.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <Button 
          onClick={onPurchaseCredits}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Purchase Credits
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditSystem;
