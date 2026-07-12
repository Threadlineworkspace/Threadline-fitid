// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'sonner';
// import { HomePage } from './pages/HomePage';
// import { AboutPage } from './pages/AboutPage';
// import { FitIDPage } from './pages/FitIDPage';
// import { ConfirmationPage } from './pages/ConfirmationPage';
// import { AdminLogin } from './pages/AdminLogin';
// import { AdminDashboard } from './pages/AdminDashboard';
// import { Navbar } from './components/layout/Navbar';
// import { Footer } from './components/layout/Footer';

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/fitid" element={<FitIDPage />} />
//           <Route path="/confirmation" element={<ConfirmationPage />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         </Routes>
//       </main>
//       <Footer />
//       <Toaster position="top-right" richColors />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
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
          {/* Redirect root to FitID page */}
          <Route path="/" element={<Navigate to="/fitid" replace />} />
          <Route path="/fitid" element={<FitIDPage />} />
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