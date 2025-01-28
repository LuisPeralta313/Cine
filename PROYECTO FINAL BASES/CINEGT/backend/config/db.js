const sql = require('mssql');

const config = {
  user: 'prueba1',                  // Nombre de usuario de la base de datos
  password: 'prueba12345',           // Contraseña del usuario
  server: '172.22.16.8',  // Nombre del servidor
  database: 'ProyectoBasesII',   // Nombre de la base de datos
  port: 1433,                    // Puerto de conexión
  options: {
    encrypt: false,            // Cambiar a true si usas Azure
    enableArithAbort: true
  }
};

// Crear `poolPromise` para manejar las conexiones
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(error => {
    console.error('Error de conexión:', error);
  });

// Conexión inicial para `connectToDatabase`
async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Conectado a SQL Server');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}

module.exports = { sql, poolPromise, connectToDatabase };
