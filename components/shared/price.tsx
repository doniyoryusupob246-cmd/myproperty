import React from 'react';
import { RangeSlider } from './range-slider';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Price: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'mt-10 w-full pb-7')}>
      <div className="mb-4">
        <h3 className="font-medium">Цена ($)</h3>
      </div>

      <div className="w-[80%] mx-auto">
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>
    </div>
  );
};
