import { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { ScrollProgress } from './components/ScrollProgress';
import { SideRail } from './components/SideRail';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';

const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((module) => ({ default: module.CommandPalette }))
);

function App() {
  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <HelmetProvider>
          <Helmet>
            <title>Rishabh Sharma — Backend & Systems Engineer</title>
            <meta name="title" content="Rishabh Sharma — Backend & Systems Engineer" />
            <meta name="description" content="Backend engineer building distributed pipelines, cache invalidation, and LLM integrations that survive production traffic. B.Tech CSE (AI & ML), Lucknow." />
            <meta name="keywords" content="Rishabh Sharma, backend developer, software engineer, Node.js, Express, MongoDB, Docker, AI pipelines, Layerzero, KaushalAI, JaaS, Purgeport, Lucknow" />
            <meta name="author" content="Rishabh Sharma" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#000000" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
            <link rel="canonical" href="https://rishabhh.is-a.dev" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://rishabhh.is-a.dev" />
            <meta property="og:title" content="Rishabh Sharma — Backend & Systems Engineer" />
            <meta property="og:description" content="Backend engineer building distributed pipelines, cache invalidation, and LLM integrations that survive production traffic. Built Layerzero, Purgeport, and KaushalAI." />
            <meta property="og:image" content="https://rishabhh.is-a.dev/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Rishabh Sharma" />
            <meta property="og:locale" content="en_IN" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://rishabhh.is-a.dev" />
            <meta name="twitter:title" content="Rishabh Sharma — Backend & Systems Engineer" />
            <meta name="twitter:description" content="Backend engineer building distributed pipelines, cache invalidation, and LLM integrations that survive production traffic. Built Layerzero, Purgeport, and KaushalAI." />
            <meta name="twitter:image" content="https://rishabhh.is-a.dev/og-image.png" />
            <meta name="twitter:creator" content="@rishhbh" />

            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          </Helmet>

          <Router>
            <SmoothScrollProvider>
              <ScrollProgress />
              <SideRail />
              <Suspense fallback={null}>
                <CommandPalette />
              </Suspense>

              <div className="flex flex-col min-h-screen bg-black text-white font-sans">
                <Navbar />
                <main className="flex-grow">
                  <PageTransition />
                </main>
                <Footer />
              </div>
            </SmoothScrollProvider>
          </Router>
        </HelmetProvider>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
