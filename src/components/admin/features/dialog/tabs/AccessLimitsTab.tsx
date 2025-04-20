
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabProps } from "../types";

export const AccessLimitsTab: React.FC<TabProps> = ({ editedFeature, onChange }) => {
  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription>
          Configure limits for users on the free plan. These limits will be enforced until users upgrade.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="limitType" className="text-right">Limit Type</Label>
        <Select 
          value={editedFeature.freeAccessLimit ? editedFeature.freeAccessLimit.type : "none"}
          onValueChange={(value) => {
            if (value === "none") {
              onChange("freeAccessLimit", undefined);
            } else {
              onChange("freeAccessLimit", {
                type: value as "time" | "usage" | "content",
                limit: editedFeature.freeAccessLimit?.limit || 0
              });
            }
          }}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select limit type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No limit</SelectItem>
            <SelectItem value="time">Time-based limit</SelectItem>
            <SelectItem value="usage">Usage-based limit</SelectItem>
            <SelectItem value="content">Content-based limit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {editedFeature.freeAccessLimit && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="limitValue" className="text-right">Limit Value</Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="limitValue"
              type="number"
              min="0"
              value={editedFeature.freeAccessLimit.limit}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  onChange("freeAccessLimit", {
                    ...editedFeature.freeAccessLimit,
                    limit: value
                  });
                }
              }}
              className="flex-1"
            />
            <span className="text-sm text-gray-500">
              {editedFeature.freeAccessLimit.type === "time" ? "days" : 
               editedFeature.freeAccessLimit.type === "usage" ? "uses" :
               "percent"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
