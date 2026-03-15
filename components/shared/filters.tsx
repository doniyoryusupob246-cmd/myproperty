'use client';
import { FloorHouseInput } from '@/components/shared/floor-house-input';
import { FloorInput } from '@/components/shared/floor-input';
import { Price } from '@/components/shared/price';
import { RoomsSelect } from '@/components/shared/rooms-select';
import { SelectDistrict } from '@/components/shared/select-district';
import { SelectVariants } from '@/components/shared/select-variants';
import { SquareInput } from '@/components/shared/square-input';
import { TypeRent } from '@/components/shared/type-rent';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

interface Filter {
  type: 'rent' | 'sale';
  district?: string;
  priceMin?: number;
  priceMax?: number;
  rooms?: number[];
  area?: number;
  floor?: number;
  totalFloorsMain?: number;
  planning?: string[];
  renovation?: string[];
  bathroom?: string[];
  furniture?: 'all' | 'yes' | 'no';
}

const plans = [
  'Смежная',
  'Раздельная',
  'Смежно-раздельная',
  'Пентхаус',
  'Многоуровневая',
  'Студия',
  'Общежитие',
];

const repair = [
  'Авторский проект',
  'Евроремонт',
  'Средний',
  'Требует ремонта',
  'Чернвая',
  'Предчистовая',
];

const districts = [
  'Алмазарский',
  'Бектемирский',
  'Мирабадский',
  'Мирзо-Улугбекский',
  'Сергелийский',
  'Учтепинский',
  'Чиланзарский',
  'Шайхантахурский',
  'Юнусабадский',
  'Яккасарайский',
  'Яшнабадский',
];

const snoozel = ['Раздельный', 'Совмещённый', '2+'];
const furniture = ['Да', 'Нет', 'Все'];
export const Filters: React.FC<Props> = ({ className }) => {
  const [openSett, setOpenSett] = React.useState(false);
  const [filters, setFilters] = React.useState<Filter>({
    type: 'rent',
    rooms: [],
    planning: [],
    renovation: [],
  });

  const handleSubmit = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;
    console.log(user);
  };

  return (
    <div className="max-w-107.5 w-full mx-auto px-4 pt-5">
      <div className="bg-black/2 py-3 rounded-sm">
        <div className="w-50 mx-auto text-center">
          <h3 className="text-[14px] font-bold leading-3 mb-2">MyPropertyBot</h3>
          <p className="font-light leading-2 text-[10px]">мини-приложение</p>
        </div>
      </div>

      <div className="flex flex-col bg-black/2 py-5 rounded-sm mt-5 px-5">
        <div className="border rounded-full border-black py-1 px-3 w-50 text-center  mx-auto">
          <p className="text-[16px]">Создать фильтр</p>
        </div>

        <TypeRent />
        <SelectDistrict items={districts} />
        <Price />
        <RoomsSelect />
        <SquareInput />
      </div>

      <div
        className={`mt-4 px-4 pb-2 overflow-y-scroll overflow-hidden inset-shadow-xs transition-[max-height] duration-500 ease-in-out  ${
          openSett ? 'max-h-125' : 'max-h-0'
        }`}>
        <FloorInput />
        <FloorHouseInput />

        <SelectVariants title="Планировка" items={plans} />

        <SelectVariants title="Ремонт" items={repair} />
        <SelectVariants title="Санузел" items={repair} />
        <SelectVariants title="Санузел" items={snoozel} />
        <SelectVariants title="Санузел" items={furniture} />
      </div>

      <div
        onClick={() => setOpenSett(!openSett)}
        className="flex items-center justify-center mb-3 mt-3 gap-2 w-57.5 mx-auto cursor-pointer">
        <p className="text-[12px]">Дополнительные параметры</p>
        <ChevronDown className={openSett ? 'rotate-180' : 'rotate-[0]'} size={13} />
      </div>
      <div className="pb-4">
        <Button onClick={handleSubmit} className="w-full h-10 rounded-full">
          Сохранить
        </Button>
      </div>
    </div>
  );
};
