
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, LockIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  isPremium: boolean;
  userSubscription: "Basic" | "Premium";
}

export default function FeatureCard({
  title,
  description,
  icon,
  path,
  isPremium,
  userSubscription,
}: FeatureCardProps) {
  const isLocked = isPremium && userSubscription === "Basic";

  return (
    <Card className={`h-full flex flex-col ${isLocked ? "opacity-75" : ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sakha-blue">{icon}</span>
            <span>{title}</span>
          </div>
          {isPremium && (
            <Badge variant={isLocked ? "outline" : "default"} className={isLocked ? "text-amber-500 border-amber-300" : "bg-sakha-purple"}>
              Premium
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant={isLocked ? "outline" : "default"}
          className={isLocked ? "w-full" : "w-full bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"}
          disabled={isLocked}
          asChild
        >
          <Link to={isLocked ? "/pricing" : path} className="flex items-center justify-center gap-2">
            {isLocked ? (
              <>
                <LockIcon size={16} />
                <span>Upgrade to Premium</span>
              </>
            ) : (
              <>
                <span>Open {title}</span>
                <ChevronRight size={16} />
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
