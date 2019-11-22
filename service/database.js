const mysql = require('mysql')

const DB_conection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "toor",
    database: "Denuncia"
})

DB_conection.connect((err)=>{
    if (err) {
        console.log("hubo un error al conectar con la base de datos");
        console.log(err);
        
        return
    }else {
        console.log("conexion establecida");
        
    }
})

module.exports = DB_conection