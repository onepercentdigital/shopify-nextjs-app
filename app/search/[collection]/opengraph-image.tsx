import OpengraphImage from 'components/opengraph-image';
import { getCollection } from 'lib/shopify';
import { headers } from 'next/headers';

export default async function Image({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  // Access uncached data first (required for Next.js 15.6+)
  await headers();

  const { collection: collectionHandle } = await params;
  const collection = await getCollection(collectionHandle);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
