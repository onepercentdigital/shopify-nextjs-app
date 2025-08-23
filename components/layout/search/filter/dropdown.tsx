'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { SortFilterItem } from 'lib/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ListItem } from '.';
import { FilterItem } from './item';

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    let newActiveTitle = '';
    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        newActiveTitle = listItem.title;
      }
    });

    // FIX: Only update state if the active title has actually changed.
    // This prevents the infinite render loop.
    if (newActiveTitle && newActiveTitle !== active) {
      setActive(newActiveTitle);
    }
  }, [pathname, list, searchParams, active]); // Add `active` to dependencies

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full items-center justify-between rounded-sm border border-black/30 px-4 py-2 text-sm dark:border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </button>
      {openSelect && (
        <div className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black">
          {list.map((item: ListItem) => {
            let key: string;
            if ('path' in item) {
              key = item.path;
            } else {
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
