'use client'

import Image from 'next/image'
import { useState } from 'react'

interface VideoCardProps {
  id: string
  title: string
  thumbnail: string
  duration?: string
  views?: string
  channel?: string
  onSelect: (id: string) => void
}

export default function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  channel,
  onSelect,
}: VideoCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(thumbnail) && !imageFailed

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className="media-card group"
    >
      <div className="relative aspect-video bg-muted">
        {showImage && (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        {duration && (
          <span className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 text-foreground text-sm rounded-md">
            {duration}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-foreground group-hover:text-primary line-clamp-2 text-sm">
          {title}
        </h3>
        {channel && (
          <p className="text-xs text-secondary mt-1">{channel}</p>
        )}
        {views && (
          <p className="text-xs text-secondary mt-1">{views} views</p>
        )}
      </div>
    </button>
  )
}
