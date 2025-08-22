'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter

export default function Search() {
  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Add onSubmit handler
    event.preventDefault(); // Prevent full page reload

    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('q');

    if (searchQuery) {
      // Create a new URLSearchParams object from the current ones
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('q', searchQuery.toString()); // Set the new search query

      // Push to the new search URL, triggering client-side navigation
      router.push(`/search?${newSearchParams.toString()}`);
    }
  }

  return (
    <form
      onSubmit={onSubmit} // Attach onSubmit handler
      // Remove action attribute to prevent default browser form submission
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="h-11 w-full rounded-lg border bg-white px-4 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="pointer-events-none absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

// SearchSkeleton remains unchanged
export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="h-11 w-full rounded-lg border bg-white px-4 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
