import mysql from "mysql2";

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'bkotinfuaeft3kozxpjy-mysql.services.clever-cloud.com',
    user: 'uwzl1jw2ikcl4cvn',
    password: 'oTDqfYQYi0PCIkKTWvUi',
    database: 'bkotinfuaeft3kozxpjy'
});

let isConnected = false;

// Establecer la conexión
export const connectDBMysql = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error de conexión:', err);
            return;
        }
        isConnected = true;
        console.log('Conexión establecida');
    });
}

// Escuchar eventos de error en la conexión
connection.on('error', (err) => {
    console.error('Error en la conexión:', err);
    isConnected = false;
    // Si el error es una desconexión, intenta reconectar
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Intentando reconectar a la base de datos...');
        setTimeout(connectDBMysql, 2000); // Intenta reconectar después de 2 segundos
    } else {
        throw err; // Si el error no es una desconexión, lanza una excepción
    }
});

// Ejecutar consultas u operaciones en la base de datos aquí
export default connection;

// Cerrar la conexión cuando hayas terminado
// connection.end();
