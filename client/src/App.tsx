import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
