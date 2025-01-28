import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Modificacion.css';

const Modificacion = () => {
  const [ventaId, setVentaId] = useState('');
  const [nuevosAsientos, setNuevosAsientos] = useState('');
  const [sesionDestinoId, setSesionDestinoId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/modificarAsientos', {
        ventaId,
        nuevosAsientos,
        sesionDestinoId
      });
      setMessage(response.data.message);
      // Limpiar el formulario después de enviar
      setVentaId('');
      setNuevosAsientos('');
      setSesionDestinoId('');
    } catch (error) {
      setMessage('Error al realizar la modificación. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  // Navegar a la página Home
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="modificacion-container">
      <h2>Modificación de Asientos</h2>

      <form onSubmit={handleSubmit}>
        <label>ID de Venta:</label>
        <input
          type="number"
          value={ventaId}
          onChange={(e) => setVentaId(e.target.value)}
          required
        />

        <label>ID de Sesión Destino:</label>
        <input
          type="number"
          value={sesionDestinoId}
          onChange={(e) => setSesionDestinoId(e.target.value)}
          required
        />

        <label>Nuevos Asientos (formato: A1,B2,C3):</label>
        <input
          type="text"
          value={nuevosAsientos}
          onChange={(e) => setNuevosAsientos(e.target.value)}
          placeholder="Ejemplo: A1,B2,C3"
          required
        />

        <button type="submit">Modificar Asientos</button>
      </form>
      {message && <p>{message}</p>}
       {/* Botón para regresar a Home */}
       <button onClick={handleBackToHome} className="back-button">Volver a Home</button>
    </div>
  );
};

export default Modificacion;
