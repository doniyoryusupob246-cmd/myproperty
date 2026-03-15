import React from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const FloorInput: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'mt-3')}>
      <h3 className="font-medium mb-2">Этаж</h3>
      <Input placeholder="От" className="h-10 mb-3 rounded-full  border-2" />
      <Input placeholder="До" className="h-10 rounded-full border-2" />
    </div>
  );
};
