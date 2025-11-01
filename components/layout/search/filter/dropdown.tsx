'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { SortFilterItem } from 'lib/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ListItem } from '.';
import { FilterItem } from './item';

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // read only the value we care about so deps stay stable
  const sortParam = searchParams.get('sort') ?? null;
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const activeTitle = useMemo(() => {
    const activeItem = list.find((listItem) => {
      if ('path' in listItem) {
        return pathname === listItem.path;
      }
      if ('slug' in listItem) {
        return sortParam === listItem.slug;
      }
      return false;
    });

    return activeItem?.title ?? list[0]?.title ?? '';
  }, [pathname, list, sortParam]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Close dropdown when navigation state changes to avoid UI races
  useEffect(() => {
    setOpenSelect(false);
  }, [pathname, sortParam]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') setOpenSelect(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpenSelect((s) => !s)}
        className={clsx(
          'flex w-full items-center justify-between rounded-sm',
          'border border-black/30 px-4 py-2 text-sm dark:border-white/30',
        )}
      >
        <div>{activeTitle}</div>
        <ChevronDownIcon className="h-4" />
      </button>

      {openSelect && (
        <div
          role="menu"
          onClick={() => setOpenSelect(false)}
          onKeyDown={handleKeyDown}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
          {list.map((item: ListItem) => {
            let key: string;
            if ('path' in item) key = item.path;
            else {
              const sortItem = item as SortFilterItem;
              key = sortItem.slug ?? sortItem.title;
            }
            return <FilterItem key={key} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
