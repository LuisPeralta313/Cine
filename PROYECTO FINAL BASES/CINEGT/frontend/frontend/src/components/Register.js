import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Navegar a la página Home
 const handleBackToHome = () => {
  navigate('/home');
};

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', {
        nombre,
        email,
        password,
        rol,
      });
      setMessage('Usuario registrado exitosamente');
      navigate('/login'); // Redirige al login después del registro
    } catch (error) {
      setMessage('Error al registrar usuario. Intenta de nuevo.');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <label>Rol:</label>
        <select value={rol} onChange={(e) => setRol(Number(e.target.value))}>
          <option value={0}>Usuario</option>
          <option value={1}>Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
        {message && <p>{message}</p>}
        
      </form>
      {/* Botón para regresar a Login */}
      <button onClick={handleBackToHome} className="back-button">Volver a Login</button>
    </div>
  );
};


export default Register;
