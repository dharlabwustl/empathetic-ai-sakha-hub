
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlanType } from "@/services/featureService";

interface FeatureFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  planFilter: PlanType | "all";
  onPlanFilterChange: (value: string) => void;
  premiumFilter: "all" | "premium" | "free";
  onPremiumFilterChange: (value: string) => void;
  onExport: () => void;
}

const FeatureFilters: React.FC<FeatureFiltersProps> = ({
  searchQuery,
  onSearchChange,
  planFilter,
  onPlanFilterChange,
  premiumFilter,
  onPremiumFilterChange,
  onExport
}) => {
  // Create an array of plan types for the select dropdown
  const planTypes: PlanType[] = ["free", "basic", "premium", "enterprise", "group", "institute", "corporate"];

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Search features..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <Select value={premiumFilter} onValueChange={onPremiumFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="premium">Premium Only</SelectItem>
            <SelectItem value="free">Free Only</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={planFilter} onValueChange={onPlanFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            {planTypes.map((planType) => (
              <SelectItem key={planType} value={planType}>{planType.charAt(0).toUpperCase() + planType.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={onExport}
        >
          <Download size={16} />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

export default FeatureFilters;
