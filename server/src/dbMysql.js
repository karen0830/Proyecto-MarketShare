import mysql from "mysql2";

// Juan Esteban : 
// MYSQL_ADDON_HOST=bs59xlngw3yt27rb5ghf-mysql.services.clever-cloud.com
// MYSQL_ADDON_DB=bs59xlngw3yt27rb5ghf
// MYSQL_ADDON_USER=umscavrhr6ccy3wj
// MYSQL_ADDON_PORT=3306
// MYSQL_ADDON_PASSWORD=rJuqDlcN5jTQ8h4m3OSe
// MYSQL_ADDON_URI=mysql://umscavrhr6ccy3wj:rJuqDlcN5jTQ8h4m3OSe@bs59xlngw3yt27rb5ghf-mysql.services.clever-cloud.com:3306/bs59xlngw3yt27rb5ghf

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'bkotinfuaeft3kozxpjy-mysql.services.clever-cloud.com',
    user: 'uwzl1jw2ikcl4cvn',
    password: 'oTDqfYQYi0PCIkKTWvUi',
    database: 'bkotinfuaeft3kozxpjy'
});

// Establecer la conexión
export const connectDBMysql = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error de conexión:', err);
            return;
        }
        console.log('Conexión establecida');
    });
}

// Ejecutar consultas u operaciones en la base de datos aquí
export default connection;
// Cerrar la conexión cuando hayas terminado
// connection.end();
