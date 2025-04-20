
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TabProps } from "../types";

export const GeneralTab: React.FC<TabProps> = ({ editedFeature, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Title</Label>
        <Input
          id="title"
          name="title"
          value={editedFeature.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={editedFeature.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="path" className="text-right">Path</Label>
        <Input
          id="path"
          name="path"
          value={editedFeature.path}
          onChange={(e) => onChange("path", e.target.value)}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subscription" className="text-right">Subscription</Label>
        <div className="flex items-center gap-2 col-span-3">
          <Switch
            id="subscription"
            checked={editedFeature.isPremium}
            onCheckedChange={(checked) => onChange("isPremium", checked)}
          />
          <span>{editedFeature.isPremium ? 'Premium' : 'Basic'}</span>
        </div>
      </div>
    </div>
  );
};
