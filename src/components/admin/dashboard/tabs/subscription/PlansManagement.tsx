
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Users, User, Building, Building2 } from "lucide-react";
import { individualPlans, groupPlans } from "@/components/pricing/pricingData";
import { PlanType } from "@/services/featureService";

const getPlanIcon = (planType: PlanType) => {
  switch (planType) {
    case PlanType.Free:
    case PlanType.Basic:
    case PlanType.Premium:
      return <User size={16} />;
    case PlanType.Group:
      return <Users size={16} />;
    case PlanType.Institute:
      return <Building2 size={16} />;
    case PlanType.Corporate:
      return <Building size={16} />;
    default:
      return <User size={16} />;
  }
};

const getPlanBadge = (planType: PlanType) => {
  switch (planType) {
    case PlanType.Free:
      return <Badge className="bg-gray-100 text-gray-800">Free</Badge>;
    case PlanType.Basic:
      return <Badge className="bg-blue-100 text-blue-800">Basic</Badge>;
    case PlanType.Premium:
      return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
    case PlanType.Group:
      return <Badge className="bg-green-100 text-green-800">Group</Badge>;
    case PlanType.Institute:
      return <Badge className="bg-amber-100 text-amber-800">Institute</Badge>;
    case PlanType.Corporate:
      return <Badge className="bg-indigo-100 text-indigo-800">Corporate</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Other</Badge>;
  }
};

const PlansManagement = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Subscription Plans</h3>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add New Plan</span>
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...individualPlans, ...groupPlans].map((plan, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      {getPlanIcon(plan.title.includes("Group") || plan.title.includes("Institute") || plan.title.includes("Corporate") 
                        ? PlanType.Group 
                        : PlanType.Basic)}
                    </div>
                    <span>
                      {("trial" in plan && plan.trial) ? "Trial" : 
                        plan.title.includes("Group") || plan.title.includes("Institute") || plan.title.includes("Corporate") 
                        ? "Group" : "Individual"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{plan.title}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell className="max-w-xs truncate">{plan.description}</TableCell>
                <TableCell>{plan.features.length} features</TableCell>
                <TableCell>
                  <Badge className={
                    "recommended" in plan && plan.recommended 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                  }>
                    {"recommended" in plan && plan.recommended ? "Recommended" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default PlansManagement;
