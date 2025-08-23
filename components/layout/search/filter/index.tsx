import type { SortFilterItem } from 'lib/constants';
import { Suspense } from 'react';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <ul className="hidden md:block">
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
    </ul>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <nav>
      {title ? (
        <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
          {title}
        </h3>
      ) : null}
      <Suspense fallback={null}>
        {/* Desktop view: a list of links */}
        <FilterItemList list={list} />
        {/* Mobile view: a dropdown */}
        <div className="md:hidden">
          <FilterItemDropdown list={list} />
        </div>
      </Suspense>
    </nav>
  );
}
