import Grid from 'components/grid';

const skeletonIds = Array.from({ length: 12 }, (_, i) => `skeleton-${i}`);

export default function Loading() {
  return (
    <>
      <div className="mb-4 h-6" />
      <Grid className="grid-cols-2 lg:grid-cols-3">
        {skeletonIds.map((id) => (
          <Grid.Item
            key={id}
            className="animate-pulse bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </Grid>
    </>
  );
}
