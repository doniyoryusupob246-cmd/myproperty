'use client';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}
const rooms = ['1', '2', '3', '4', '5+'];

export const RoomsSelect: React.FC<Props> = ({ className }) => {
  const [isActiveRooms, setIsActiveRooms] = React.useState<string[]>([]);

  const toggleRoom = (room: string) => {
    setIsActiveRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room],
    );
  };
  return (
    <div className={cn(className)}>
      <h3 className="font-medium">Комнаты</h3>
      <div className="flex justify-between mt-2">
        {rooms.map((room) => (
          <Button
            onClick={() => toggleRoom(room)}
            key={room}
            variant={isActiveRooms.includes(room) ? 'default' : 'outline'}
            className="w-12.5 h-12.5">
            {room}
          </Button>
        ))}
      </div>
    </div>
  );
};
