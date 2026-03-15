import React from 'react';
import { Button } from '../ui/button';

interface Props {
  className?: string;
  items: string[];
  title: string;
}

export const SelectVariants: React.FC<Props> = ({ className, items, title }) => {
  const [isActive, setIsActive] = React.useState<string[]>([]);
  const toggle = (item: string) => {
    setIsActive((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));
  };
  return (
    <div className="mt-3">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <Button
            onClick={() => toggle(item)}
            key={item}
            variant={isActive.includes(item) ? 'default' : 'outline'}
            className="h-[50px] border-2">
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};
