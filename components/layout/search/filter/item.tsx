'use client';

import clsx from 'clsx';
import type { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react'; // Import useMemo
import type { ListItem, PathFilterItem as PathFilterItemType } from '.';

function PathFilterItemComponent({ item }: { item: PathFilterItemType }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;

  // Memoize the href generation for stability.
  const href = useMemo(() => {
    // If the item is active, it's rendered as a <p> tag, so no href is needed.
    if (active) return '';

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('q'); // Clears the 'q' (search query) parameter

    // Assuming createUrl is a stable function reference from 'lib/utils'
    return createUrl(item.path, newParams);
  }, [active, item.path, searchParams]); // Dependencies for memoization

  const commonProps = {
    className: clsx(
      'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
      {
        'underline underline-offset-4': active,
      },
    ),
  };

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      {active ? (
        <p {...commonProps}>{item.title}</p>
      ) : (
        <Link href={href} {...commonProps}>
          {item.title}
        </Link>
      )}
    </li>
  );
}

function SortFilterItemComponent({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;

  // Memoize the href generation for stability.
  const href = useMemo(() => {
    // If the item is active, it's rendered as a <p> tag, so no href is needed.
    if (active) return '';

    const q = searchParams.get('q');
    // Constructs new URLSearchParams based on 'q' and the sort slug.
    // This correctly handles clearing the sort parameter if item.slug is empty.
    return createUrl(
      pathname,
      new URLSearchParams({
        ...(q && { q }),
        ...(item.slug && item.slug.length && { sort: item.slug }),
      }),
    );
  }, [active, pathname, searchParams, item.slug]); // Dependencies for memoization

  const commonProps = {
    className: clsx('w-full hover:underline hover:underline-offset-4', {
      'underline underline-offset-4': active,
    }),
  };

  return (
    <li
      className="mt-2 flex text-sm text-black dark:text-white"
      key={item.title}
    >
      {active ? (
        <p {...commonProps}>{item.title}</p>
      ) : (
        <Link href={href} prefetch={false} {...commonProps}>
          {item.title}
        </Link>
      )}
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  // PathFilterItemType is used here to match the type expected by PathFilterItemComponent
  return 'path' in item ? (
    <PathFilterItemComponent item={item as PathFilterItemType} />
  ) : (
    <SortFilterItemComponent item={item} />
  );
}
