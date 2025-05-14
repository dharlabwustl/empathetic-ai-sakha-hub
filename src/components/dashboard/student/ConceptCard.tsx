import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
  conceptProgress: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  conceptProgress
}) => {
  return (
    <Link to={`/dashboard/student/concepts/${id}`}>
      <Card className="border shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="secondary">{difficulty}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Subject: {subject}</span>
            <Progress 
              value={conceptProgress} 
              className="h-1 w-full bg-gray-200"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConceptCard;
