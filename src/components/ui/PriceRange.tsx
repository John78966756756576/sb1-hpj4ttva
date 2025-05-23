import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  onChange?: (range: [number, number]) => void;
  formatValue?: (value: number) => string;
  className?: string;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  step = 100000,
  defaultValue = [min, max],
  onChange,
  formatValue = (value) => `$${(value / 1000000).toFixed(1)}M`,
  className,
}) => {
  const [range, setRange] = useState<[number, number]>(defaultValue);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  useEffect(() => {
    setRange(defaultValue);
  }, [defaultValue]);

  const handleChange = (value: number, type: 'min' | 'max') => {
    const newRange: [number, number] = [...range] as [number, number];
    
    if (type === 'min') {
      newRange[0] = Math.min(value, range[1] - step);
    } else {
      newRange[1] = Math.max(value, range[0] + step);
    }
    
    setRange(newRange);
    onChange?.(newRange);
  };

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleMouseDown = (type: 'min' | 'max') => {
    setIsDragging(type);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const slider = document.getElementById('price-range-slider');
      if (!slider) return;
      
      const rect = slider.getBoundingClientRect();
      const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const value = Math.round((percentage * (max - min) + min) / step) * step;
      
      handleChange(value, isDragging);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, min, max, step]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between text-sm font-medium">
        <span>{formatValue(range[0])}</span>
        <span>{formatValue(range[1])}</span>
      </div>
      
      <div 
        id="price-range-slider"
        className="relative h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full"
      >
        <div
          className="absolute h-full bg-primary-500 rounded-full"
          style={{
            left: `${getPercentage(range[0])}%`,
            width: `${getPercentage(range[1]) - getPercentage(range[0])}%`,
          }}
        />
        
        <div
          className={cn(
            "absolute w-5 h-5 bg-white dark:bg-secondary-200 rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10 border-2 border-primary-500 transition-transform",
            isDragging === 'min' && "scale-110"
          )}
          style={{ left: `${getPercentage(range[0])}%`, top: '50%' }}
          onMouseDown={() => handleMouseDown('min')}
        />
        
        <div
          className={cn(
            "absolute w-5 h-5 bg-white dark:bg-secondary-200 rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10 border-2 border-primary-500 transition-transform",
            isDragging === 'max' && "scale-110"
          )}
          style={{ left: `${getPercentage(range[1])}%`, top: '50%' }}
          onMouseDown={() => handleMouseDown('max')}
        />
      </div>
      
      <div className="flex justify-between text-xs text-secondary-500 dark:text-secondary-400">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default PriceRange;