const mysql = require('mysql')
require('dotenv').config()

const DB_conection = mysql.createConnection({
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB
})

DB_conection.connect((err) => {
    if (err) {
        console.log("hubo un error al conectar con la base de datos");
        console.log(err);

        return
    } else {
        console.log("conexion establecida");

    }
})

module.exports = DB_conection