import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { FitIDLanding } from './pages/FitIDLanding';
import { FitIDPage } from './pages/FitIDPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<FitIDLanding />} />
          <Route path="/fitid/questionnaire" element={<FitIDPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;