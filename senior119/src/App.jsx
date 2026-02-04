import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeniorLayout from './components/layout/SeniorLayout';
import Home from './pages/Home';
import CheckPage from './pages/CheckPage';
import LocationFinder from './pages/LocationFinder';
import Unemployment from './pages/guides/Unemployment';
import Severance from './pages/guides/Severance';
import Violation from './pages/guides/Violation';
import MinimumWage from './pages/guides/MinimumWage';
import AnnualLeave from './pages/guides/AnnualLeave';
import Insurance from './pages/guides/Insurance';
import UnfairDismissal from './pages/guides/UnfairDismissal';
import Evidence from './pages/guides/Evidence';
import Privacy from './pages/Privacy';
import { GlobalErrorBoundary } from './components/common/ErrorBoundary';
import NotFound from './pages/NotFound';
import AIChatbot from './components/common/AIChatbot';

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

              {/* Guides - 기존 */}
              <Route path="/guide/unemployment" element={<Unemployment />} />
              <Route path="/guide/severance" element={<Severance />} />
              <Route path="/guide/violation" element={<Violation />} />

              {/* Guides - 신규 */}
              <Route path="/guide/minimum-wage" element={<MinimumWage />} />
              <Route path="/guide/annual-leave" element={<AnnualLeave />} />
              <Route path="/guide/insurance" element={<Insurance />} />
              <Route path="/guide/unfair-dismissal" element={<UnfairDismissal />} />
              <Route path="/guide/evidence" element={<Evidence />} />

              {/* Privacy Policy */}
              <Route path="/privacy" element={<Privacy />} />

              {/* 404 Page (Fallback) */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SeniorLayout>

          {/* Floating AI Chatbot */}
          <AIChatbot />
        </BrowserRouter>
      </GlobalErrorBoundary>
    </div>
  );
}

export default App;


