const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase } = require('./config/db');
require('dotenv').config();
//const usuariosRoute = require('./routes/usuarios');
//app.use('/api/usuarios', usuariosRoute);
const authRoute = require('./routes/auth');
const sesionesRoute = require('./routes/sesiones');
//const sesionesRoute = require('./routes/sesiones');
const reportesRoute = require('./routes/reportes');
const peliculasRoute = require('./routes/peliculas');
const comprasRoute = require('./routes/compras');
const modificacionRoute = require('./routes/modificacion');
const devolucionRoute = require('./routes/devolucion');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectToDatabase();  // Conectar a la base de datos

// Definición de rutas
app.get('/', (req, res) => res.send('API CineGT'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

const usuariosRoute = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoute);

process.on('uncaughtException', (error) => {
    console.error('Error no controlado:', error);
    process.exit(1); // Salida segura después de registrar el error
  });
  
  process.on('unhandledRejection', (error) => {
    console.error('Promesa no manejada:', error);
    process.exit(1);
  });

  app.use('/api', authRoute);
  app.use(sesionesRoute);
  app.use(sesionesRoute);
  app.use(reportesRoute);
  app.use(peliculasRoute);
  app.use(comprasRoute);
  app.use(modificacionRoute);
  app.use(devolucionRoute);
  

