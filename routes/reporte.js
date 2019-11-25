const router = require('express').Router()
const DB_conection = require('../service/database')

const subirImg = require('../service/upload-aws')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image.png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

router.get('/reportes', (req, res) => {
    // Renderizar template (opcional)
})

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
                reportes: rows
            })
            console.log(rows);

        }
    })
})


    router.post('/api/crear_reporte', subirImg.single('foto'), (req, res) => {
        var emp = req.body
        var sql = `
    CALL crear_Reporte(?,?,?,?,?,?)    
    `

        DB_conection.query(sql, [emp.Descripcion, emp.Categoria, req.file.location, emp.lat, emp.lon, emp.id_usuario], (err, rows) => {
            if (err) {
                res.send('Hubo un error al crear el reporte')
                console.log('*** ERROR: ', err);

            } else {
                res.send('Reporte enviado!')
                console.log('Reporte creado!');

            }
        })


    


    /*  */

})


module.exports = router