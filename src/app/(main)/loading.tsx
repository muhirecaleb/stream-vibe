export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 w-64 bg-muted rounded-lg" />
        <div className="h-4 w-96 bg-muted rounded-lg" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-20 bg-muted rounded-lg" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
