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
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Download
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
