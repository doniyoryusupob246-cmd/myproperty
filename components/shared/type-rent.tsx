import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  className?: string;
}

export const TypeRent: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <RadioGroup className="flex gap-5 justify-center mt-8" defaultValue="Аренда квартир">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="Аренда квартир" id="Аренда квартир" />
          <Label htmlFor="Аренда квартир">Аренда квартир</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="Аренда домов" id="Аренда домов" />
          <Label htmlFor="Аренда домов">Аренда домов</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
