import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import './Reportes.css';

const Reportes = () => {
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate para la navegación

  // Parámetros para reportes
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [percentage, setPercentage] = useState('');
  const [salaId, setSalaId] = useState('');

  // Función para ejecutar el reporte
  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    let url = '';
    let params = {};

    try {
      switch (reportType) {
        case 'sesiones':
          url = 'http://localhost:5000/api/reportes/sesiones';
          params = { startDate: dateRange.start, endDate: dateRange.end };
          break;
        case 'transacciones':
          url = 'http://localhost:5000/api/reportes/transacciones';
          params = { startDate: dateRange.start, endDate: dateRange.end };
          break;
        case 'ocupacion':
          url = 'http://localhost:5000/api/reportes/ocupacion';
          params = { salaId };
          break;
        case 'bajaOcupacion':
          url = 'http://localhost:5000/api/reportes/bajaOcupacion';
          params = { percentage };
          break;
        case 'topPeliculas':
          url = 'http://localhost:5000/api/reportes/topPeliculas';
          break;
        default:
          setError('Selecciona un tipo de reporte válido.');
          setLoading(false);
          return;
      }

      const response = await axios.get(url, { params });
      setReportData(response.data);
    } catch (error) {
      setError('Error al cargar los datos del reporte');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el botón de regreso a Home
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="reportes-container">
      <h2>Reportes</h2>
      
      {/* Botón para regresar a Home */}
      <button onClick={handleBackToHome} className="back-button">Volver a Home</button>

      {/* Seleccionar el tipo de reporte */}
      <div className="report-type-selector">
        <label>
          <input
            type="radio"
            value="sesiones"
            checked={reportType === 'sesiones'}
            onChange={() => setReportType('sesiones')}
          />
          Sesiones en Rango de Fechas
        </label>
        <label>
          <input
            type="radio"
            value="transacciones"
            checked={reportType === 'transacciones'}
            onChange={() => setReportType('transacciones')}
          />
          Transacciones en Rango de Fechas
        </label>
        <label>
          <input
            type="radio"
            value="ocupacion"
            checked={reportType === 'ocupacion'}
            onChange={() => setReportType('ocupacion')}
          />
          Promedio Ocupación por Sala
        </label>
        <label>
          <input
            type="radio"
            value="bajaOcupacion"
            checked={reportType === 'bajaOcupacion'}
            onChange={() => setReportType('bajaOcupacion')}
          />
          Sesiones con Baja Ocupación
        </label>
        <label>
          <input
            type="radio"
            value="topPeliculas"
            checked={reportType === 'topPeliculas'}
            onChange={() => setReportType('topPeliculas')}
          />
          Top 5 Películas por Promedio de Asientos Vendidos
        </label>
      </div>

      {/* Parámetros adicionales según el reporte seleccionado */}
      {reportType === 'sesiones' || reportType === 'transacciones' ? (
        <div className="date-range">
          <label>Fecha Inicio:
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </label>
          <label>Fecha Fin:
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </label>
        </div>
      ) : null}

      {reportType === 'ocupacion' && (
        <div className="sala-id">
          <label>ID Sala:
            <input
              type="number"
              value={salaId}
              onChange={(e) => setSalaId(e.target.value)}
            />
          </label>
        </div>
      )}

      {reportType === 'bajaOcupacion' && (
        <div className="percentage">
          <label>Porcentaje de Ocupación:
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </label>
        </div>
      )}

      <button onClick={fetchReportData}>Ejecutar Reporte</button>

      {/* Mostrar mensaje de carga o error */}
      {loading && <p>Cargando datos...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Tabla de datos del reporte */}
      <table className="report-table">
        <thead>
          <tr>
            {reportData.length > 0 && Object.keys(reportData[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
