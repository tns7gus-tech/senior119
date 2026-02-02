import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeniorLayout from './components/layout/SeniorLayout';
import Home from './pages/Home';
import CheckPage from './pages/CheckPage';
import LocationFinder from './pages/LocationFinder';
import Unemployment from './pages/guides/Unemployment';
import Severance from './pages/guides/Severance';
import Violation from './pages/guides/Violation';
import Privacy from './pages/Privacy';
import { GlobalErrorBoundary } from './components/common/ErrorBoundary';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      <GlobalErrorBoundary>
        <BrowserRouter>
          <SeniorLayout>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Diagnosis Page (Dynamic by type) */}
              <Route path="/check/:type" element={<CheckPage />} />

              {/* Location Finder */}
              <Route path="/location" element={<LocationFinder />} />

              {/* Guides */}
              <Route path="/guide/unemployment" element={<Unemployment />} />
              <Route path="/guide/severance" element={<Severance />} />
              <Route path="/guide/violation" element={<Violation />} />

              {/* Privacy Policy */}
              <Route path="/privacy" element={<Privacy />} />

              {/* 404 Page (Fallback) */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SeniorLayout>
        </BrowserRouter>
      </GlobalErrorBoundary>
    </div>
  );
}

export default App;
