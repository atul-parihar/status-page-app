import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar/Navbar';
import Incidents from './pages/Incidents';
import Services from './pages/Services';
import ProtectedRoute from './utils/ProtectedRoute';
import AccessDenied from './pages/AccessDenied';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          {/* Protected Routes */}
          <Route path="/services"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Services />
                  </ProtectedRoute>
                }
              />
              <Route path="/incidents"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'incident_adder']}>
                    <Incidents />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'incident_adder', 'viewer']}>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
