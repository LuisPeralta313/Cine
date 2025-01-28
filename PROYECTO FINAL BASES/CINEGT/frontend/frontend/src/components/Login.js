import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Iniciar sesión y redirigir
      login();
      navigate('/home');
    } catch (err) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  // Redirige a la página de registro
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      {/* Botón de "Registrarse" */}
      <button className="toggle-button" onClick={handleRegisterClick}>
        ¿No tienes cuenta? Regístrate aquí
      </button>
    </div>
  );
};

export default Login;
