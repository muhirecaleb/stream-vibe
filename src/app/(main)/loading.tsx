export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-48 bg-muted rounded-md" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="aspect-[2/3] bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}
