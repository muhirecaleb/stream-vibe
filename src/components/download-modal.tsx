"use client"

import { Download, X, ExternalLink, HardDrive, Zap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const gateways = [
    {
      name: "VidSrc Direct Download",
      description: "Quickest way to find direct download links and mirrors.",
      icon: Zap,
      url: type === "movie"
        ? `https://vidsrc.me/download/movie?tmdb=${tmdbId}`
        : `https://vidsrc.me/download/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      name: "1337x Torrents",
      description: "Best for high-quality BluRay and WEB-DL torrents.",
      icon: HardDrive,
      url: `https://1337x.to/search/${encodeURIComponent(searchQuery)}/1/`,
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      name: "TorrentGalaxy",
      description: "Reliable source for verified releases and fast speeds.",
      icon: ExternalLink,
      url: `https://torrentgalaxy.to/torrents.php?search=${encodeURIComponent(searchQuery)}`,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  // Add YTS only for movies
  if (type === "movie") {
    gateways.push({
      name: "YTS.mx (Movies Only)",
      description: "Smallest file sizes with excellent 720p/1080p quality.",
      icon: Download,
      url: `https://yts.mx/browse-movies/${encodeURIComponent(title)}/all/all/0/latest/0/all`,
      color: "text-green-500",
      bg: "bg-green-500/10"
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity dark:bg-background/80"
        onClick={onClose}
      />
      
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        className="animate-in fade-in zoom-in relative w-full max-w-xl overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl duration-200"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/40 px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
             </div>
             <div className="min-w-0">
                <h3 id="download-modal-title" className="text-base font-semibold">Download Options</h3>
                <p className="truncate text-xs text-muted-foreground">Select a gateway for {title}</p>
             </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 rounded-full"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start gap-3 rounded-md border border-gold/25 bg-gold/10 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-xs leading-relaxed text-foreground/80">
              Downloads are fulfilled via external gateways. We recommend using an ad-blocker and a VPN for the best experience on external sites.
            </p>
          </div>

          <div className="grid gap-3">
            {gateways.map((gate) => (
              <a
                key={gate.name}
                href={gate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105", gate.bg)}>
                  <gate.icon className={cn("h-5 w-5", gate.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold transition-colors group-hover:text-primary">{gate.name}</h4>
                  <p className="truncate text-xs text-muted-foreground">{gate.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-muted/40 px-6 py-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
