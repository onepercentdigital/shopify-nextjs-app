'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(qParam);

  // depend only on the actual q value, not the unstable object
  useEffect(() => {
    setInputValue(qParam);
  }, [qParam]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newParams = new URLSearchParams(searchParams.toString());
    const trimmed = inputValue.trim();
    if (trimmed) newParams.set('q', trimmed);
    else newParams.delete('q');

    const currentQs = searchParams.toString();
    const nextQs = newParams.toString();
    // guard identical navigations
    if (currentQs === nextQs) return;

    const url = nextQs ? `/search?${nextQs}` : '/search';
    router.push(url);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-11 w-full rounded-lg border bg-white px-4 text-base text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="pointer-events-none absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="h-11 w-full rounded-lg border bg-white px-4 text-base text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
