import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { ThemeProvider } from './context/ThemeContext';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <CustomCursor />
          <NoiseOverlay />
          <div className="flex flex-col min-h-screen bg-bg text-ink selection:bg-[var(--selection-bg)] selection:text-ink font-sans relative z-0">
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
    </ThemeProvider>
  );
}

export default App;
