const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importa fs para manejar el sistema de archivos
const { sql } = require('../config/db'); // Importa solo `sql`
//const { sql, poolPromise } = require('../config/db');
const router = express.Router();


const upload = multer({ dest: 'uploads/' });

router.post('/api/sesiones/upload', upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, '..', req.file.path);

  try {
    // Verifica si el archivo existe antes de procesarlo
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: 'Error: El archivo no se ha guardado correctamente.' });
    }

    // Llama al procedimiento almacenado con la ruta del archivo
    await sql.query`EXEC SP_InsertarSesion_CSV @RutaArchivo = ${filePath}`;
    res.json({ message: 'Datos del archivo CSV subidos e insertados correctamente.' });

    // Elimina el archivo después de que se ha procesado exitosamente
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error al insertar datos desde CSV:', error);
    res.status(500).json({ message: 'Error al insertar datos en la base de datos.' });

    // En caso de error, verifica si el archivo existe antes de eliminarlo
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});


// Endpoint para crear una sesión manualmente usando el procedimiento almacenado SP_CrearSesion
router.post('/api/sesiones/manual', async (req, res) => {
  const { idSala, idPelicula, fechaInicio } = req.body;

  try {
    const result = await sql.query`EXEC SP_CrearSesion @ID_Sala = ${idSala}, @ID_Pelicula = ${idPelicula}, @Fecha_Inicio = ${fechaInicio}`;
    res.json({ success: true, message: 'Sesión creada correctamente.' });
  } catch (error) {
    console.error('Error al crear la sesión:', error);
    res.status(500).json({ success: false, message: 'Error al crear la sesión. Inténtalo de nuevo.' });
  }
});




module.exports = router;
