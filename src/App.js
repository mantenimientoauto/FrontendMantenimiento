import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Login from './components/Login';
import Home from './pages/home';
import Mantenimiento from './pages/Mantenimiento';

function App() {
  // Estado para verificar la autenticación y el rol de administrador
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa en localStorage al cargar la aplicación
    const isLoggedIn = localStorage.getItem('isAuthenticated');
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función para manejar el inicio de sesión
  const handleAuthentication = (admin) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <Fragment>
        <Container className='pb-5'>
          {/* Definición de rutas */}
          <Routes>
            {/* Ruta para la página de inicio de sesión */}
            <Route path="/" element={<Login onLogin={handleAuthentication} />} />
            {/* Ruta protegida para la página de inicio */}
            <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} isAdmin={isAdmin} /> : <Navigate to="/" />} />
            {/* Ruta protegida para la página de mantenimiento */}
            <Route path="/mantenimiento" element={isAuthenticated ? <Mantenimiento isAdmin={isAdmin}/> : <Navigate to="/" />} />
          </Routes>
        </Container>
      </Fragment>
    </Router>
  );
}

export default App;