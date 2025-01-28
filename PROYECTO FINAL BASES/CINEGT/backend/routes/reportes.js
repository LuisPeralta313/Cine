const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');

// Endpoint para Obtener sesiones en un rango de fechas
router.get('/api/reportes/sesiones', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const result = await sql.query`EXEC ObtenerSesionYPeliculaRango @FechaInicio = ${startDate}, @FechaFin = ${endDate}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener reporte de sesiones:', error);
    res.status(500).json({ message: 'Error al obtener reporte de sesiones' });
  }
});

// Endpoint para Obtener transacciones en un rango de fechas
router.get('/api/reportes/transacciones', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const result = await sql.query`EXEC ObtenerLogTransaccionesRango @FechaInicio = ${startDate}, @FechaFin = ${endDate}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener reporte de transacciones:', error);
    res.status(500).json({ message: 'Error al obtener reporte de transacciones' });
  }
});

// Endpoint para Obtener promedio de ocupación por sala
router.get('/api/reportes/ocupacion', async (req, res) => {
  const { salaId } = req.query;
  try {
    const result = await sql.query`EXEC ObtenerPromedioAsientosOcupadosPorSala @ID_Sala = ${salaId}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener promedio de ocupación por sala:', error);
    res.status(500).json({ message: 'Error al obtener promedio de ocupación por sala' });
  }
});

// Endpoint para Obtener sesiones con baja ocupación (menor a un porcentaje dado)
router.get('/api/reportes/bajaOcupacion', async (req, res) => {
  const { percentage } = req.query;
  try {
    const result = await sql.query`EXEC SesionesConOcupacionBaja @Porcentaje = ${percentage}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener sesiones con baja ocupación:', error);
    res.status(500).json({ message: 'Error al obtener sesiones con baja ocupación' });
  }
});

// Endpoint para Obtener Top 5 películas con mayor promedio de asientos vendidos
router.get('/api/reportes/topPeliculas', async (req, res) => {
  try {
    const result = await sql.query`EXEC TopPeliculasMayorPromedioAsientosVendidos`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener el top de películas por promedio de asientos vendidos:', error);
    res.status(500).json({ message: 'Error al obtener el top de películas por promedio de asientos vendidos' });
  }
});

module.exports = router;
