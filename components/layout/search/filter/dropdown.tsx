'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { SortFilterItem } from 'lib/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ListItem } from '.';
import { FilterItem } from './item';

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Derives the active title. Memoized to only re-run when dependencies change.
  // Dependencies are pathname, searchParams (for sorting), and the list itself.
  const activeTitle = useMemo(() => {
    const activeItem = list.find((listItem) => {
      // Check for path-based items (collections)
      if ('path' in listItem) {
        return pathname === listItem.path;
      }
      // Check for slug-based items (sorting)
      if ('slug' in listItem) {
        return searchParams.get('sort') === listItem.slug;
      }
      return false;
    });

    // Fallback to the title of the first item if no active item is found.
    return activeItem?.title ?? list[0]?.title;
  }, [pathname, list, searchParams]);

  // Handles clicking outside the dropdown to close it.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Handles keyboard events for accessibility, e.g., closing with Escape key.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setOpenSelect(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full items-center justify-between rounded-sm border border-black/30 px-4 py-2 text-sm dark:border-white/30"
      >
        <div>{activeTitle}</div>
        <ChevronDownIcon className="h-4" />
      </button>
      {openSelect && (
        <div
          // Added role="menu" for accessibility to treat this div as an interactive menu.
          role="menu"
          // Closes the dropdown when an item inside is clicked.
          onClick={() => setOpenSelect(false)}
          // Handles keyboard navigation within the menu.
          onKeyDown={handleKeyDown}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
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
