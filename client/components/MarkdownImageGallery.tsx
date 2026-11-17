import React, { useState } from "react";

interface MarkdownImageGalleryProps {
  src?: string;
  alt?: string;
}

export function MarkdownImageGallery({ src, alt }: MarkdownImageGalleryProps) {
  const rawImages = src
    ? src
        .split("|")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  const defaultImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  ];

  const images =
    rawImages.length > 0 && !rawImages.some((img) => img.includes("localhost"))
      ? rawImages
      : defaultImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgError(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgError(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentSrc = imgError ? defaultImages[0] : images[currentIndex];

  if (images.length === 1) {
    return (
      <img
        src={currentSrc}
        onError={() => setImgError(true)}
        className="rounded-lg max-h-[500px] w-auto mx-auto my-6 shadow-sm object-contain"
        alt={alt || ""}
      />
    );
  }

  return (
    <div className="relative my-6 mx-auto w-fit group select-none">
      <img
        src={currentSrc}
        onError={() => setImgError(true)}
        className="rounded-lg max-h-[500px] w-auto mx-auto shadow-sm object-contain block"
        alt={`${alt || "Gallery image"} (${currentIndex + 1}/${images.length})`}
      />

      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full border border-white opacity-80 hover:opacity-100 transition-all shadow-sm"
        aria-label="Previous image"
      >
        &larr;
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full border border-white opacity-80 hover:opacity-100 transition-all shadow-sm"
        aria-label="Next image"
      >
        &rarr;
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default MarkdownImageGallery;
