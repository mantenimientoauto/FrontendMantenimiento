// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LoginStyle.css';
import fetchPost from '../Methods/FetchPost.js';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleAuthentication } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await fetchPost('https://mantenimientoautosbackend.onrender.com/user/login', {
        nit: username,
        contrasena: password
      });
    
      localStorage.setItem('token', data.token); //
      const isAdmin = data.user.rol === 'admin';
      handleAuthentication(isAdmin);
      navigate('/home');
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas o error de red');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-background d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col-md-12">
          <div className="card custom-gray">
            <div className="card-body">
              <div className='d-flex justify-content-center mt-1 pb-4'>
                <img src="https://i.imgur.com/DzS1R1X.jpg" alt='Logo' className='custom-size' />
              </div>
              <h6>REPORTES DE MANTENIMIENTO JCM S.A.S.</h6>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-block btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Cargando...</span>
                    </div>
                  ) : (
                    'Iniciar sesión'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
