import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SesionSinCSV.css';

const SesionSinCSV = () => {
  const [idSala, setIdSala] = useState('');
  const [idPelicula, setIdPelicula] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/sesiones/manual', {
        idSala,
        idPelicula,
        fechaInicio: `${fechaInicio}:00` // Agrega segundos al final
      });
      setMessage(response.data.message);
      if (response.data.success) {
        setIdSala('');
        setIdPelicula('');
        setFechaInicio('');
      }
    } catch (error) {
      setMessage('Error al crear la sesión. Inténtalo de nuevo.');
    }
  };

  // Botón para volver al menú
  const handleBackToMenu = () => {
    navigate('/Home');
  };

  return (
    <div className="sesion-sin-csv-container">
      <h2>Cargar Sesión Manualmente</h2>
      
      <form onSubmit={handleSubmit}>
        <label>ID de Sala:</label>
        <input
          type="number"
          value={idSala}
          onChange={(e) => setIdSala(e.target.value)}
          required
        />

        <label>ID de Película:</label>
        <input
          type="number"
          value={idPelicula}
          onChange={(e) => setIdPelicula(e.target.value)}
          required
        />

        <label>Fecha de Inicio (YYYY-MM-DD HH:MM):</label>
        <input
          type="text"
          placeholder="YYYY-MM-DD HH:MM" // Ayuda al usuario con el formato
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />

        <button type="submit">Cargar Sesión</button>
      </form>

      <button onClick={handleBackToMenu} className="back-to-menu-button">Volver a Home</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SesionSinCSV;
