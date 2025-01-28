const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');

// Endpoint para modificar asientos
router.post('/api/modificarAsientos', async (req, res) => {
  const { ventaId, nuevosAsientos, sesionDestinoId } = req.body;

  try {
    await sql.query`
      EXEC CambioDeAsientos 
      @ID_Venta = ${ventaId}, 
      @NuevosAsientos = ${nuevosAsientos}, 
      @ID_SesionDestino = ${sesionDestinoId}
    `;
    res.json({ message: 'Cambio de asientos realizado exitosamente' });
  } catch (error) {
    console.error('Error al realizar la modificación de asientos:', error);
    res.status(500).json({ message: 'Error al realizar la modificación de asientos' });
  }
});

module.exports = router;
