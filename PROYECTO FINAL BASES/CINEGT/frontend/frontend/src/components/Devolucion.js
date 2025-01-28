import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Devolucion.css';

const Devolucion = () => {
  const [ventaId, setVentaId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/anularVenta', {
        ventaId,
        usuarioId
      });
      setMessage(response.data.message);
      // Limpiar el formulario después de enviar
      setVentaId('');
      setUsuarioId('');
    } catch (error) {
      setMessage('Error al realizar la anulación. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  // Navegar a la página Home
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="devolucion-container">
      <h2>Anulación de Venta</h2>

      <form onSubmit={handleSubmit}>
        <label>ID de Venta:</label>
        <input
          type="number"
          value={ventaId}
          onChange={(e) => setVentaId(e.target.value)}
          required
        />

        <label>ID de Usuario:</label>
        <input
          type="number"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          required
        />

        <button type="submit">Anular Venta</button>
      </form>
      {message && <p>{message}</p>}
      {/* Botón para regresar a Home */}
      <button onClick={handleBackToHome} className="back-button">Volver a Home</button>
    </div>
  );
};

export default Devolucion;
