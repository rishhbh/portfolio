import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { ThemeProvider } from './context/ThemeContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';

function App() {
  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <HelmetProvider>
          <Router>
            <CustomCursor />
            <NoiseOverlay />
            <CommandPalette />
            <div className="flex flex-col min-h-screen text-ink selection:bg-[var(--selection-bg)] selection:text-ink font-sans relative z-0">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </HelmetProvider>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
