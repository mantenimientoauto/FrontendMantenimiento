import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LoginStyle.css'; // Importa tu archivo CSS

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    if (isAdminLogin) {
      if (username === 'admin' && password === 'adminpassword') {
        onLogin(true);
        navigate('/home');
      } else {
        alert('Credenciales de administrador incorrectas');
      }
    } else {
      if (username === 'user' && password === 'password') {
        onLogin(false);
        navigate('/home');
      } else {
        alert('Credenciales de usuario incorrectas');
      }
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
                {/* Input de username */}
                <div className="form-group">
                  <label htmlFor="username"/>
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
                {/* Input de password */}
                <div className="form-group">
                  <label htmlFor="password"/>
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
                {/* Botón de login */}
                <button type="submit" className={`btn btn-block ${isAdminLogin ? 'btn-danger' : 'btn-primary'}`}>
                  {isAdminLogin ? 'Iniciar sesión como Administrador' : 'Iniciar sesión'}
                </button>
              </form>
              <hr />
              {/* Toggle para cambiar entre login de usuario y login de administrador */}
              <button
                className="btn btn-secondary btn-block"
                onClick={() => setIsAdminLogin(!isAdminLogin)}
              >
                {isAdminLogin ? 'Cambiar a inicio' : 'Cambiar a Administrador'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
