'use client';

import clsx from 'clsx';
import type { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { ListItem, PathFilterItem as PathFilterItemType } from '.';

function PathFilterItemComponent({ item }: { item: PathFilterItemType }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;

  // Always calculate href, regardless of active state
  const href = useMemo(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('q');
    return createUrl(item.path, newParams);
  }, [item.path, searchParams]);

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

  // Always calculate href, regardless of active state
  const href = useMemo(() => {
    const q = searchParams.get('q');
    return createUrl(
      pathname,
      new URLSearchParams({
        ...(q && { q }),
        ...(item.slug && item.slug.length && { sort: item.slug }),
      }),
    );
  }, [pathname, searchParams, item.slug]);

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
  return 'path' in item ? (
    <PathFilterItemComponent item={item as PathFilterItemType} />
  ) : (
    <SortFilterItemComponent item={item} />
  );
}
