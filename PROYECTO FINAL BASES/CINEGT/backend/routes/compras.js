const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');

// Endpoint para realizar la compra de asientos
router.post('/api/comprar', async (req, res) => {
  const { usuarioId, sesionId, cantidad, asignacionAutomatica, asientosManual } = req.body;

  try {
    await sql.query`
      EXEC VentaDeAsientos 
      @ID_Usuario = ${usuarioId}, 
      @ID_Sesion = ${sesionId}, 
      @Cantidad = ${cantidad}, 
      @AsignacionAutomatica = ${asignacionAutomatica ? 1 : 0}, 
      @AsientosManual = ${asientosManual}
    `;
    res.json({ message: 'Compra realizada exitosamente' });
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    res.status(500).json({ message: 'Error al realizar la compra' });
  }
});

module.exports = router;
