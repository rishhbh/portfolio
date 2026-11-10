import { useState, useEffect } from 'react';

interface NpmDownloadResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export function useNpmDownloads(packageName = 'purgeport'): number | null {
  const [downloads, setDownloads] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(`npm_downloads_${packageName}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Cache for 1 hour
          if (Date.now() - parsed.timestamp < 3600000 && typeof parsed.downloads === 'number') {
            return parsed.downloads;
          }
        }
      } catch {
        // Ignore JSON/localStorage errors
      }
    }
    return 487; // Initial baseline
  });

  useEffect(() => {
    let isCancelled = false;

    fetch(`https://api.npmjs.org/downloads/point/last-year/${packageName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`NPM API returned status ${res.status}`);
        }
        return res.json() as Promise<NpmDownloadResponse>;
      })
      .then((data) => {
        if (!isCancelled && typeof data.downloads === 'number') {
          setDownloads(data.downloads);
          try {
            localStorage.setItem(
              `npm_downloads_${packageName}`,
              JSON.stringify({ downloads: data.downloads, timestamp: Date.now() })
            );
          } catch {
            // Ignore storage quota
          }
        }
      })
      .catch((err) => {
        // Fallback gracefully without breaking UI
        console.warn('Unable to retrieve live npm downloads:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [packageName]);

  return downloads;
}
