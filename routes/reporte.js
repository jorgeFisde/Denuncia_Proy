const router = require('express').Router()
const DB_conection = require('../service/database')
const path = require('path')
const multer = require('multer')
var upload = multer({ dest: 'public/Uploads/' })


// subir imagenes a un servidor
/*const storage = multer.diskStorage({
    destination: path.join( __dirname + '../public/Uploads'),
    
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
})*/

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image.png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

/*const upload = multer({
    storage: storage,
}).single('subirFoto')*/

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
            res.json(rows)
            console.log('Viendo reportes');

        }
    })
})

router.post('/api/crear_reporte',upload.single('foto') , (req, res) => {
    var emp = req.body
    var foto = req.file.path
    var sql = `
    CALL crear_Reporte(?,?,?,?,?,?)    
    `
    console.log(req.file.path);
    res.send('ok')

    /*  DB_conection.query(sql, [emp.Descripcion, emp.Categoria, foto, emp.lat, emp.lon, emp.id_usuario], (err, rows) => {
          if (err) {
              res.send('Hubo un error al crear el reporte')
              console.log('*** ERROR: ', err);
  
          } else {
              res.send('Reporte enviado!')
              console.log('Reporte creado!');
  
          }
      })*/

})


module.exports = router