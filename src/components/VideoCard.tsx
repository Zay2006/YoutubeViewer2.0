interface VideoCardProps {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  onSelect: (id: string) => void
}

export default function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  onSelect,
}: VideoCardProps) {
  return (
    <div 
      onClick={() => onSelect(id)}
      className="card cursor-pointer group hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img 
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 text-foreground text-sm rounded-md">
          {duration}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-foreground group-hover:text-primary line-clamp-2 text-sm">
          {title}
        </h3>
        <p className="text-xs text-secondary mt-1">
          {views} views
        </p>
      </div>
    </div>
  )
}
