import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Dock from './components/Dock';
import Footer from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { ThemeProvider } from './context/ThemeContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { Preloader } from './components/Preloader';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <HelmetProvider>
          <Helmet>
            {/* Primary */}
            <title>Rishabh Sharma — Software Engineer</title>
            <meta name="title" content="Rishabh Sharma — Software Engineer" />
            <meta name="description" content="Backend-focused software engineer. I build APIs, AI systems, and containerized backends. Final year B.Tech CSE (AI & ML), School of Management Sciences, Lucknow." />
            <meta name="keywords" content="Rishabh Sharma, backend developer, software engineer, Node.js, Express, MongoDB, Docker, AI integration, LayerZero, KaushalAI, Lucknow, SMS Lucknow, portfolio" />
            <meta name="author" content="Rishabh Sharma" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#0a0a0a" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="https://rishabhh.is-a.dev" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://rishabhh.is-a.dev" />
            <meta property="og:title" content="Rishabh Sharma — Software Engineer" />
            <meta property="og:description" content="Backend-focused software engineer. APIs, AI systems, containerized backends. Built LayerZero and KaushalAI — winner of Ideas to Impact 2026." />
            <meta property="og:image" content="https://rishabhh.is-a.dev/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Rishabh Sharma — Software Engineer" />
            <meta property="og:site_name" content="Rishabh Sharma" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://rishabhh.is-a.dev" />
            <meta name="twitter:title" content="Rishabh Sharma — Software Engineer" />
            <meta name="twitter:description" content="Backend-focused software engineer. APIs, AI systems, containerized backends. Built LayerZero and KaushalAI — winner of Ideas to Impact 2026." />
            <meta name="twitter:image" content="https://rishabhh.is-a.dev/og-image.png" />
            <meta name="twitter:creator" content="@rishhbh" />

            {/* Favicon */}
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* Schema */}
            <script type="application/ld+json">
              {`
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rishabh Sharma",
  "url": "https://rishabhh.is-a.dev",
  "jobTitle": "Software Engineer",
  "sameAs": [
    "https://github.com/rishhbh",
    "https://linkedin.com/in/rishabhh-sharma"
  ]
}
              `}
            </script>
          </Helmet>
          <Router>
            <CustomCursor />
            <NoiseOverlay />
            <CommandPalette />

            <AnimatePresence mode="wait">
              {isBooting ? (
                <Preloader key="preloader" onComplete={() => setIsBooting(false)} />
              ) : null}
            </AnimatePresence>

            {!isBooting && (
              <div className="flex flex-col min-h-screen text-ink selection:bg-[var(--selection-bg)] selection:text-ink font-sans relative z-0 select-none">
                <Navbar />
                <Dock />
                <main className="flex-grow">
                  <PageTransition />
                </main>
                <Footer />
              </div>
            )}
          </Router>
        </HelmetProvider>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
