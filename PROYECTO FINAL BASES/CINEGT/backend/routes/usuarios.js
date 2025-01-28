const express = require('express');
const router = express.Router();
const { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarioController');
//const { obtenerUsuarios } = require('../controllers/usuarioController');

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

// Ruta para actualizar un usuario por ID
router.put('/:id', actualizarUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/:id', eliminarUsuario);

module.exports = router;
