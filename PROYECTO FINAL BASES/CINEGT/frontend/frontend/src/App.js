import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Sesiones from './components/Sesiones';
import Pelicula from './components/Pelicula';
import Compra from './components/Compra';
import Modificacion from './components/Modificacion';
import Devolucion from './components/Devolucion';
import Reportes from './components/Reportes';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import Menu from './components/Menu';
import SesionSinCSV from './components/SesionSinCSV';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/sesiones" element={<ProtectedRoute><Sesiones /></ProtectedRoute>} />
            <Route path="/pelicula" element={<ProtectedRoute><Pelicula /></ProtectedRoute>} />
            <Route path="/compra" element={<ProtectedRoute><Compra /></ProtectedRoute>} />
            <Route path="/modificacion" element={<ProtectedRoute><Modificacion /></ProtectedRoute>} />
            <Route path="/devolucion" element={<ProtectedRoute><Devolucion /></ProtectedRoute>} />
            <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sesion-sin-csv" element={<SesionSinCSV />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
