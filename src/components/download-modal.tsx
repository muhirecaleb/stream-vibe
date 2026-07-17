"use client"

import { Download, X, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tmdbId: string;
  year?: string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
}

interface DownloadSource {
  name: string;
  url: string;
}

export function DownloadModal({
  isOpen,
  onClose,
  title,
  tmdbId,
  year,
  type,
  season,
  episode
}: DownloadModalProps) {
  if (!isOpen) return null;

  const searchQuery = type === "movie" 
    ? `${title} ${year || ""}`.trim()
    : `${title} S${season?.toString().padStart(2, '0')}E${episode?.toString().padStart(2, '0')}`;

  const sources: DownloadSource[] = [
    {
      name: "VidSrc",
      url: type === "movie"
        ? `https://vidsrc.me/download/movie?tmdb=${tmdbId}`
        : `https://vidsrc.me/download/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
    },
    {
      name: "1337x",
      url: `https://1337x.to/search/${encodeURIComponent(searchQuery)}/1/`,
    },
    {
      name: "TorrentGalaxy",
      url: `https://torrentgalaxy.to/torrents.php?search=${encodeURIComponent(searchQuery)}`,
    },
  ];

  if (type === "movie") {
    sources.push({
      name: "YTS",
      url: `https://yts.mx/browse-movies/${encodeURIComponent(title)}/all/all/0/latest/0/all`,
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      
      <div className="relative w-full max-w-lg rounded-lg bg-card border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Download</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-start gap-2 bg-accent rounded-md p-3 mb-4">
          <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Downloads are provided by external sources. Use an ad-blocker and VPN for the best experience.
          </p>
        </div>

        <div className="space-y-2">
          {sources.map((source) => (
            <a 
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-md border px-4 py-3 text-sm hover:bg-accent transition-colors"
            >
              <span className="font-medium">{source.name}</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
