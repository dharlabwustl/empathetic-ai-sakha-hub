
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const SubscriptionPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Select the subscription that best fits your learning goals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">₹1,499</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
            <CardDescription>Perfect for beginners</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Access to all concept cards</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Basic study planner</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>5 practice tests per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Community forum access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-violet-400 shadow-lg relative">
          <div className="absolute top-0 right-0 bg-violet-500 text-white text-xs px-2 py-1 rounded-bl-md">
            POPULAR
          </div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">₹2,499</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
            <CardDescription>For serious exam preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Everything in Basic plan</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Advanced personalized study planner</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Unlimited practice tests</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Weekly performance reports</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>1 virtual tutor session per month</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-500">Subscribe</Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">₹4,999</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
            <CardDescription>Ultimate exam success package</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Everything in Pro plan</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>1-on-1 coaching sessions</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Personalized doubt clearing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Advanced analytics dashboard</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Guaranteed score improvement</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Need a customized plan for your institution?</p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
