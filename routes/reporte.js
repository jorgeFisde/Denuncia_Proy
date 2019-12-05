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
    SELECT * FROM Reportes WHERE idEstado = ?
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
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
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
        DB_conection.query(sql, [emp.respuesta,emp.idEstado,emp.myID,emp.idRep], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send('Reporte enviado!')
                console.log('Reporte creado!');

            }
        })
    
})

router.get('/api/reportes_atendidos', (req, res) => {
    var sql = `
        SELECT * FROM Reportes_atendidos WHERE id_admin = ?
    `
        DB_conection.query(sql, [req.session.user.id], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send(rows)
                

            }
        })
    
})

router.get('/api/reporte_en_proceso', (req, res) => {
    var sql = `
        SELECT * FROM Reportes_proceso WHERE id_admin = ?
    `
        DB_conection.query(sql, [req.session.user.id], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send(rows)
                

            }
        })
    
})

router.post('/api/actualizar_reporte', (req, res) => {
    var sql = `
        CALL actualizar_respuesta(?,?,?,?)
    `
        DB_conection.query(sql, [req.body.idEstado, req.body.idRes,req.body.idEstado, req.body.idRep], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send('Reporte atendido!')
                

            }
        })
    
})


module.exports = router