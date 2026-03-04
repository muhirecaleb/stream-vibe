"use client"

import { useState } from "react";
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Download className="h-5 w-5" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white">Download Options</h3>
                <p className="text-xs text-muted-foreground">Select a gateway for {title}</p>
             </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 rounded-2xl bg-amber-500/10 p-4 border border-amber-500/20">
            <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/80 leading-relaxed">
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
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110", gate.bg)}>
                  <gate.icon className={cn("h-6 w-6", gate.color)} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors">{gate.name}</h4>
                  <p className="truncate text-xs text-muted-foreground">{gate.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-white/20 group-hover:text-white/60" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 bg-white/5 px-6 py-4">
          <Button 
            variant="secondary" 
            className="w-full rounded-xl"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
