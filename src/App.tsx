import { useState, useEffect, useCallback } from 'react';
import { M3ThemeProvider } from './theme/m3Theme';
import { AppPage, resolvePageFromLocation, syncPageToHistory } from './utils/router';
import { Navbar, Footer, Home, PrivacyPolicy, TermsOfService } from './components/Layout';

export default function App() {
  const [currentPage, setCurrentPageState] = useState<AppPage>(() => resolvePageFromLocation());

  const setCurrentPage = useCallback((page: AppPage, sectionId?: string) => {
    setCurrentPageState(page);
    syncPageToHistory(page, false);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    // Ensure document title and path match initial page
    const resolved = resolvePageFromLocation();
    setCurrentPageState(resolved);
    syncPageToHistory(resolved, true);

    const handlePopState = () => {
      const nextPage = resolvePageFromLocation();
      setCurrentPageState(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <M3ThemeProvider>
      <div className="min-h-screen m3-app-shell font-sans transition-colors duration-300">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <main>
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === 'privacy' && <PrivacyPolicy setCurrentPage={setCurrentPage} />}
          {currentPage === 'terms' && <TermsOfService setCurrentPage={setCurrentPage} />}
        </main>

        <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </M3ThemeProvider>
  );
}
