const { sql } = require('../config/db');

// Obtener todos los usuarios
async function obtenerUsuarios(req, res) {
  try {
    const result = await sql.query`SELECT * FROM Usuario`;
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
}

// Crear un nuevo usuario
async function crearUsuario(req, res) {
  const { Nombre, Email, Contraseña, Rol } = req.body;
  try {
    await sql.query`INSERT INTO Usuario (Nombre, Email, Contraseña, Rol) VALUES (${Nombre}, ${Email}, HASHBYTES('SHA2_256', ${Contraseña}), ${Rol})`;
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error al crear usuario');
  }
}



// Actualizar un usuario por ID
async function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { Nombre, Email, Contraseña, Rol } = req.body;
  try {
    await sql.query`
      UPDATE Usuario
      SET Nombre = ${Nombre},
          Email = ${Email},
          Contraseña = HASHBYTES('SHA2_256', ${Contraseña}),
          Rol = ${Rol}
      WHERE ID_Usuario = ${id}`;
    res.send('Usuario actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar usuario');
  }
}


// Eliminar un usuario por ID
async function eliminarUsuario(req, res) {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM Usuario WHERE ID_Usuario = ${id}`;
    res.send('Usuario eliminado exitosamente');
  } catch (error) {
    res.status(500).send('Error al eliminar usuario');
  }
}

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
