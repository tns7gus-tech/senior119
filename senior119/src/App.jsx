import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeniorLayout from './components/layout/SeniorLayout';
import Home from './pages/Home';
import CheckPage from './pages/CheckPage';
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
