import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AssociationPage } from './pages/AssociationPage';
import { ChurchPage } from './pages/ChurchPage';
import { SchoolPage } from './pages/SchoolPage';
import { ContactPage } from './pages/ContactPage';
import { DonatePage } from './pages/DonatePage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/association" element={<AssociationPage />} />
            <Route path="/church" element={<ChurchPage />} />
            <Route path="/school" element={<SchoolPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;