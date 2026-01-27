
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import UserGuide from './components/UserGuide';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'guide'>('landing');

  // Simple hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#guide') {
        setCurrentView('guide');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen">
      {currentView === 'landing' ? (
        <LandingPage onNavigateToGuide={() => window.location.hash = 'guide'} />
      ) : (
        <UserGuide onBackToLanding={() => window.location.hash = ''} />
      )}
    </div>
  );
};

export default App;
