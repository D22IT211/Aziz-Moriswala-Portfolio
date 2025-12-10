import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AllProjects from './pages/AllProjects';
import { MagneticCursor } from './components/ui/magnetic-cursor';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';

// RouteLoader Component to handle page transitions
const RouteLoader = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const prevPath = React.useRef(location.pathname);
  const prevTheme = React.useRef(theme);

  useEffect(() => {
    // Check if path changed
    const pathChanged = location.pathname !== prevPath.current;
    // Check if theme changed
    const themeChanged = theme !== prevTheme.current;

    if (!pathChanged && !themeChanged) {
      return;
    }

    // Update refs
    prevPath.current = location.pathname;
    prevTheme.current = theme;

    // Show loader
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1-second load duration

    return () => clearTimeout(timer);
  }, [location.pathname, theme]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader fullscreen={false} key="page-loader" />}
      </AnimatePresence>
      <div style={{ display: loading ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  );
};

function App() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {initialLoad ? (
              <Loader key="initial-loader" fullscreen={true} />
            ) : (
              <Router>
                <ScrollToTop />
                <MagneticCursor
                  cursorColor="#3b82f6"
                  cursorSize={20}
                  magneticFactor={0.3}
                >
                  <div className="flex flex-col min-h-screen transition-colors duration-300 bg-[var(--bg-base)] text-[var(--text-primary)]">
                    <Navbar />
                    <div className="flex-grow">
                      <Suspense fallback={<Loader fullscreen={false} />}>
                        <RouteLoader>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<AllProjects />} />
                            <Route path="/project/:id" element={<ProjectDetail />} />
                          </Routes>
                        </RouteLoader>
                      </Suspense>
                    </div>
                    <Footer />
                    <BackToTop />
                  </div>
                </MagneticCursor>
              </Router>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
