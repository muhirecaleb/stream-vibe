"use client"

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadModal } from "./download-modal";

interface DownloadTriggerProps {
  title: string;
  tmdbId: string;
  year?: string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
}

export function DownloadTrigger({
  title,
  tmdbId,
  year,
  type,
  season,
  episode
}: DownloadTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-full bg-primary/10 px-6 py-4 text-primary transition-all hover:bg-primary hover:text-white"
        variant="ghost"
      >
        <Download className="h-5 w-5" />
        <span className="font-bold">Download</span>
      </Button>

      <DownloadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        tmdbId={tmdbId}
        year={year}
        type={type}
        season={season}
        episode={episode}
      />
    </>
  );
}
