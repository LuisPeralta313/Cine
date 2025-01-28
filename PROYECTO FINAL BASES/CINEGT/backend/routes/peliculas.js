const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');

// Endpoint para insertar una nueva película
router.post('/api/peliculas', async (req, res) => {
  const { nombre, duracion, descripcion, clasificacionId } = req.body;

  try {
    await sql.query`INSERT INTO Pelicula (Nombre, Duracion, Descripcion, ID_Clasificacion) 
                    VALUES (${nombre}, ${duracion}, ${descripcion}, ${clasificacionId})`;
    res.json({ message: 'Película agregada exitosamente' });
  } catch (error) {
    console.error('Error al insertar la película:', error);
    res.status(500).json({ message: 'Error al insertar la película' });
  }
});

module.exports = router;
