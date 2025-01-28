const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');
const crypto = require('crypto');

// Ruta para el login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Encriptar la contraseña ingresada para compararla con la almacenada
    const hashedPassword = crypto.createHash('sha256').update(password).digest();
    
    // Buscar el usuario en la base de datos
    const result = await sql.query`
      SELECT * FROM Usuario WHERE Email = ${email} AND Contraseña = ${hashedPassword}`;
    
    if (result.recordset.length > 0) {
      // Usuario encontrado, autenticación exitosa
      res.json({ message: 'Login exitoso', userId: result.recordset[0].ID_Usuario });
    } else {
      // Usuario no encontrado o credenciales incorrectas
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
});

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
      // Encriptar la contraseña
      const hashedPassword = crypto.createHash('sha256').update(password).digest();
  
      // Insertar el nuevo usuario en la base de datos
      await sql.query`
        INSERT INTO Usuario (Nombre, Email, Contraseña, Rol)
        VALUES (${nombre}, ${email}, ${hashedPassword}, ${rol})`;
  
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);  // Log detallado del error
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  });
  

module.exports = router;
