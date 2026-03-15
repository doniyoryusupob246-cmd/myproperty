import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const SelectDistrict: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'flex justify-between items-center max-w-107.5 w-full mt-10')}>
      <h3 className="font-medium">Район</h3>
      <Select>
        <SelectTrigger className="w-70 rounded-full border-2">
          <SelectValue placeholder="Выберите район" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
