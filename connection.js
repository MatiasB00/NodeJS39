const mysql = require("mysql");

const pool = mysql.createPool({
    user:'root',
    host:'localhost',
    database: 'SeleccionArgentina',
    password:'Bilicich123!43005765',
    multipleStatements: true
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err)
    } else {
        console.log('Conexión con la base de datos exitosa.')
    }
});

module.exports = pool;