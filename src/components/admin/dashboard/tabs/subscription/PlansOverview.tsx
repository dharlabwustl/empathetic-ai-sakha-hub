
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { individualPlans, groupPlans } from "@/components/pricing/pricingData";

const PlansOverview = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Plans Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-4">Individual Plans</h3>
            <div className="space-y-4">
              {individualPlans.map((plan, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{plan.title}</p>
                    <p className="text-sm text-gray-500">{plan.price}{plan.period}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Group Plans</h3>
            <div className="space-y-4">
              {groupPlans.map((plan, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{plan.title}</p>
                    <p className="text-sm text-gray-500">{plan.price}{plan.period}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansOverview;
