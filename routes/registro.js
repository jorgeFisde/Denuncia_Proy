const router = require('express').Router()
const DB_conection = require('../service/database')

router.get('/registro', (req, res, next) => {
    //renderizar template registro
})

router.post('/api/registro', (req, res) => {
    var emp = req.body
    var sql = `
    CALL Crear_Usuario(?,?,?,?,?);
    `
    DB_conection.query(sql, [emp.nombre, emp.apellido, emp.fechaN, emp.email, emp.password], (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
            console.log('*** ERROR: ', err);
            
        } else {
            res.send('Usuario creado exitosamente!')
            console.log('Usuario creado exitosamente!');
            
        }
    })

})

module.exports = router