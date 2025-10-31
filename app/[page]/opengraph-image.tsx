import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/shopify';
import { headers } from 'next/headers';

export default async function Image({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  // Access uncached data first (required for Next.js 15.6+)
  await headers();

  const { page: pageHandle } = await params;
  const page = await getPage(pageHandle);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
