import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { FitIDPage } from './pages/FitIDPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FitIDPage />} />
        <Route path="/fitid" element={<FitIDPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;