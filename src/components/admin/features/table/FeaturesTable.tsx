
import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FeatureTableRow } from "./FeatureTableRow";
import { FeatureTableProps } from "./types";

export const FeaturesTable: React.FC<FeatureTableProps> = ({
  features,
  onToggleFeature,
  onEditFeature,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 hover:bg-muted/70">
          <TableHead>Feature</TableHead>
          <TableHead>Path</TableHead>
          <TableHead>Access Type</TableHead>
          <TableHead>Free Limit</TableHead>
          <TableHead>Allowed Plans</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature) => (
          <FeatureTableRow
            key={feature.id}
            feature={feature}
            onToggleFeature={onToggleFeature}
            onEditFeature={onEditFeature}
          />
        ))}
      </TableBody>
    </Table>
  );
};
