
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface GridItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  footerText?: string;
  linkTo: string;
  linkText?: string;
  onAction?: () => void;
}

interface StandardGridLayoutProps {
  items: GridItem[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
}

const getBadgeVariant = (color?: string) => {
  switch (color) {
    case 'primary': return 'bg-primary text-primary-foreground hover:bg-primary/90';
    case 'secondary': return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
    case 'success': return 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
    case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300';
    case 'danger': return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
  }
};

export const StandardGridLayout: React.FC<StandardGridLayoutProps> = ({
  items,
  title,
  subtitle,
  emptyMessage = "No items found",
  className = "",
  gridClassName = "",
  cardClassName = ""
}) => {
  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {items.length > 0 ? (
        <motion.div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${gridClassName}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link to={item.linkTo} className="block h-full">
                <Card className={`h-full transition-all hover:shadow-md hover:border-primary/50 ${cardClassName}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {item.icon && <div className="mt-0.5">{item.icon}</div>}
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      {item.badge && (
                        <Badge className={getBadgeVariant(item.badgeColor)}>{item.badge}</Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Content can be customized by the parent component */}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center pt-0">
                    <span className="text-sm text-muted-foreground">{item.footerText}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 text-primary"
                      onClick={item.onAction}
                    >
                      {item.linkText || "View"} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};
