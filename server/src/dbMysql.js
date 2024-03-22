import mysql from "mysql2";

// Configuración de la conexión a la base de datos
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345678',
//     database: 'marketshare'
// });


const connection = mysql.createConnection({
    host: 'bkotinfuaeft3kozxpjy-mysql.services.clever-cloud.com',
    user: 'uwzl1jw2ikcl4cvn',
    password: 'oTDqfYQYi0PCIkKTWvUi',
    database: 'bkotinfuaeft3kozxpjy'
});
let isConnected = false;

// Establecer la conexión
// Establecer la conexión
export const connectDBMysql = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error de conexión:', err);
            return;
        }
        isConnected = true;
        console.log('Conexión establecida');
        
        // Agregar un ping a la base de datos cada hora para mantener la conexión viva
        setInterval(() => {
            connection.query('SELECT 1');
        }, 600000); // 3600000 milisegundos = 1 hora
    });
}

connection.on('error', (err) => {
    console.error('Error en la conexión:', err);
    isConnected = false;
    // Si el error es una desconexión, intenta reconectar
    if (err) {
        connectDBMysql();
    } else {
        throw err; // Si el error no es una desconexión, lanza una excepción
    }
});

// Intenta conectar al inicio
connectDBMysql();

// Ejecutar consultas u operaciones en la base de datos aquí
export default connection;

// Cerrar la conexión cuando hayas terminado
// connection.end();
