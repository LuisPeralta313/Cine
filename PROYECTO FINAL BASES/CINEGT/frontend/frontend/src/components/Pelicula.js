import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pelicula.css';

const Pelicula = () => {
  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/peliculas', {
        nombre,
        duracion,
        descripcion,
        clasificacionId: clasificacion
      });
      setMessage(response.data.message);
      // Limpiar el formulario después de enviar
      setNombre('');
      setDuracion('');
      setDescripcion('');
      setClasificacion('');
    } catch (error) {
      setMessage('Error al insertar la película. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  // Navegar a la página Home
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="pelicula-container">
      <h2>Agregar Nueva Película</h2>

      
      <form onSubmit={handleSubmit}>
        <label>Nombre de la Película:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Duración (Horas:Minutos:Segundos):</label>
        <input
          type="text"
          placeholder="HH:MM:SS"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          pattern="^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$"
          title="Debe ser en formato HH:MM:SS"
          required
        />

        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>Clasificación (ID):</label>
        <input
          type="number"
          value={clasificacion}
          onChange={(e) => setClasificacion(e.target.value)}
          placeholder="Ingresa el ID de clasificación"
          required
        />

        <button type="submit">Agregar Película</button>
      </form>
      {message && <p>{message}</p>}
      {/* Botón para regresar a Home */}
      <button onClick={handleBackToHome} className="back-button">Volver a Home</button>
    </div>
  );
};

export default Pelicula;
