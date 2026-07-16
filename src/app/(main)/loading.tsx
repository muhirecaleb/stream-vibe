export default function Loading() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="h-64 rounded-2xl bg-muted md:h-80" />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="h-7 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-20 rounded-lg bg-muted" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-2/3 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
