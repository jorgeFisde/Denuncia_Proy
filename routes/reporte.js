const router = require('express').Router()
const jwt = require('jsonwebtoken')
const DB_conection = require('../service/database')

const subirImg = require('../service/upload-aws')
const verificar = require('../routes/login').verifyToken

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image.png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

router.get('/api/ver_reportes', (req, res) => {
    var sql = `
    SELECT * FROM Reportes WHERE idEstado = 1
    `
    DB_conection.query(sql, [1], (err, rows) => {
        if (err) {
            res.send('Hubo un error al buscar los reportes')
            console.log('*** ERROR: ', err);

        } else {
            res.json({
                reportes: rows,
                mySession: req.session.user
            })
            console.log(rows);

        }
    })
})


router.post('/api/crear_reporte', verificar, subirImg.single('foto'), (req, res) => {
    var emp = req.body
    var sql = `
        CALL crear_Reporte(?,?,?,?,?,?)    
    `
    jwt.verify(req.token, 'my-secret-key', (err, data) => {
        DB_conection.query(sql, [emp.Descripcion, emp.Categoria, req.file.location, emp.lat, emp.lon, data.user.id], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send('Reporte enviado!')
                console.log('Reporte creado!');

            }
        })

    })

    /*  */

})


router.post('/api/crear_respuesta', (req, res) => {
    var emp = req.body
    var sql = `
        CALL crear_Respuesta_Administrador(?,?,?,?)
    `
    jwt.verify(req.token, 'my-secret-key', (err, data) => {
        DB_conection.query(sql, [emp.respuesta,emp.idEstdo,emp.myID,emp.idRep], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send('Reporte enviado!')
                console.log('Reporte creado!');

            }
        })
    })
})


module.exports = router