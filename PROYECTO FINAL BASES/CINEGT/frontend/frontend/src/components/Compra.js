import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Compra.css';

const Compra = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [sesionId, setSesionId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [asignacionAutomatica, setAsignacionAutomatica] = useState(true);
  const [asientosManual, setAsientosManual] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/comprar', {
        usuarioId,
        sesionId,
        cantidad,
        asignacionAutomatica,
        asientosManual: asignacionAutomatica ? null : asientosManual
      });
      setMessage(response.data.message);
      // Limpiar el formulario después de enviar
      setUsuarioId('');
      setSesionId('');
      setCantidad('');
      setAsignacionAutomatica(true);
      setAsientosManual('');
    } catch (error) {
      setMessage('Error al realizar la compra. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  // Navegar a la página Home
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="compra-container">
      <h2>Venta de Asientos</h2>

      

      <form onSubmit={handleSubmit}>
        <label>ID del Usuario:</label>
        <input
          type="number"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          required
        />

        <label>ID de la Sesión:</label>
        <input
          type="number"
          value={sesionId}
          onChange={(e) => setSesionId(e.target.value)}
          required
        />

        <label>Cantidad de Asientos:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        <label>Asignación de Asientos:</label>
        <div>
          <input
            type="radio"
            id="automatica"
            name="asignacion"
            value="automatica"
            checked={asignacionAutomatica}
            onChange={() => setAsignacionAutomatica(true)}
          />
          <label htmlFor="automatica">Automática</label>
          <input
            type="radio"
            id="manual"
            name="asignacion"
            value="manual"
            checked={!asignacionAutomatica}
            onChange={() => setAsignacionAutomatica(false)}
          />
          <label htmlFor="manual">Manual</label>
        </div>

        {!asignacionAutomatica && (
          <div>
            <label>Asientos (formato: A1,B2,C3):</label>
            <input
              type="text"
              value={asientosManual}
              onChange={(e) => setAsientosManual(e.target.value)}
              placeholder="Ejemplo: A1,B2,C3"
              required={!asignacionAutomatica}
            />
          </div>
        )}

        <button type="submit">Realizar Compra</button>
      </form>
      {message && <p>{message}</p>}
      {/* Botón para regresar a Home */}
      <button onClick={handleBackToHome} className="back-button">Volver a Home</button>
    </div>
  );
};

export default Compra;
