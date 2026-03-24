import { useState, useEffect } from 'react';
import { Navbar, Footer, Home, PrivacyPolicy } from './components/Layout';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' ? <Home /> : <PrivacyPolicy />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
