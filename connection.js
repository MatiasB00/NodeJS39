const mysql = require("mysql");

const pool = mysql.createPool({
    user:'root',
    host:'localhost',
    database: 'SeleccionArgentina',
    password:'',
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
