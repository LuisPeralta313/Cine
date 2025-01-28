import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Sesiones.css';

const Sesiones = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Maneja el cambio del archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Enviar el archivo CSV al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Por favor, selecciona un archivo CSV.');
      return;
    }

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/sesiones/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al subir el archivo. Inténtalo de nuevo.');
    }
  };

  // Navegar a Home
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="sesiones-container">
      <h2>Cargar Sesiones desde CSV</h2>
      
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Subir Archivo</button>
      </form>

      {/* Botón para volver a Home */}
      <button onClick={handleBackToHome} className="back-to-home-button">Volver a Home</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Sesiones;
