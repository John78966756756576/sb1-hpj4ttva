import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface RatingBreakdownProps {
  categories: {
    name: string;
    value: number;
  }[];
  max?: number;
  className?: string;
}

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
  categories,
  max = 10,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {categories.map((category, index) => {
        const percentage = (category.value / max) * 100;
        let colorClass = '';
        
        if (percentage >= 90) colorClass = 'bg-success-500';
        else if (percentage >= 70) colorClass = 'bg-primary-500';
        else if (percentage >= 50) colorClass = 'bg-accent-500';
        else if (percentage >= 30) colorClass = 'bg-warning-500';
        else colorClass = 'bg-error-500';
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{category.name}</span>
              <span className="font-semibold">{category.value.toFixed(1)}/{max}</span>
            </div>
            <div className="h-2 w-full bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", colorClass)}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;