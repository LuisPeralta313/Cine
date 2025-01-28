const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');

// Endpoint para anular una venta
router.post('/api/anularVenta', async (req, res) => {
  const { ventaId, usuarioId } = req.body;

  try {
    await sql.query`
      EXEC SP_Anular_Venta 
      @ID_Venta = ${ventaId}, 
      @ID_Usuario = ${usuarioId}
    `;
    res.json({ message: 'Venta anulada exitosamente' });
  } catch (error) {
    console.error('Error al realizar la anulación de venta:', error);
    res.status(500).json({ message: 'Error al realizar la anulación de venta' });
  }
});

module.exports = router;
