import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProjectCarouselProps {
  images: string[];
  projectName: string;
  className?: string;
}

export default function ProjectCarousel({ images, projectName, className = '' }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-bg-softer border-2 border-black flex items-center justify-center p-8 text-ink-faint ${className}`}>
        <ImageIcon className="w-8 h-8 opacity-40" />
      </div>
    );
  }

  // Ensure index is safely within bounds when switching categories/projects
  const safeIndex = currentIndex < images.length ? currentIndex : 0;
  const currentImage = images[safeIndex] || images[0];
  const imageSrc = currentImage.startsWith('/') ? currentImage : `/${currentImage}`;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => {
      const valid = prev < images.length ? prev : 0;
      return valid === 0 ? images.length - 1 : valid - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => {
      const valid = prev < images.length ? prev : 0;
      return valid === images.length - 1 ? 0 : valid + 1;
    });
  };

  return (
    <div className={`border-3 border-black bg-bg-soft shadow-[4px_4px_0px_#000] rounded-none overflow-hidden relative group ${className}`}>
      {/* Top Overlay Badge & Slide Counter */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-2 pointer-events-none">
        <span className="bg-black/90 text-white font-mono text-[10px] font-extrabold px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] uppercase">
          SCREENSHOT {String(safeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Main Image Display */}
      <div className="relative aspect-video bg-black/5 overflow-hidden flex items-center justify-center">
        <img
          key={imageSrc}
          src={imageSrc}
          alt={`${projectName} preview ${safeIndex + 1}`}
          className="w-full h-full object-cover object-top filter grayscale contrast-110 opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />

        {/* Carousel Prev / Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-btn-primary text-btn-primary-text border-2 border-black p-2 shadow-[2px_2px_0px_#000] opacity-90 hover:opacity-100 hover:scale-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all z-20 cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3] pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-btn-primary text-btn-primary-text border-2 border-black p-2 shadow-[2px_2px_0px_#000] opacity-90 hover:opacity-100 hover:scale-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all z-20 cursor-pointer"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-4 h-4 stroke-[3] pointer-events-none" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar Indicator */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 p-2 bg-bg-softer border-t-2 border-black overflow-x-auto">
          {images.map((img, idx) => {
            const thumbSrc = img.startsWith('/') ? img : `/${img}`;
            return (
              <button
                key={img}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-7 h-5 border border-black overflow-hidden transition-all rounded-none cursor-pointer ${
                  idx === safeIndex
                    ? 'border-2 border-black ring-2 ring-btn-primary scale-105 opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Go to screenshot ${idx + 1}`}
              >
                <img src={thumbSrc} alt="" className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" decoding="async" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
