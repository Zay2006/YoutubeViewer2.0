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
      className="cursor-pointer group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-video">
        <img 
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
          {duration}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary line-clamp-2 text-sm">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {views} views
        </p>
      </div>
    </div>
  )
}
