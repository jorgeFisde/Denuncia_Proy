const router = require('express').Router()
const jwt = require('jsonwebtoken')
const DB_conection = require('../service/database')
const login = require('../routes/login')

router.get('/home', (req, res) => {
    //renderizar home
    res.render('index.html')
})


router.get('/api/home', login.verifyToken,(req, res) => {
    sql = `
    SELECT * FROM MisReportes WHERE idUsuario = ?
    `
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.send('Hubo un error al cargar el inicio')
            console.log('token invalido')

        } else {
            DB_conection.query(sql, [data.user.id], (err, result) => {
                if (err) {
                    res.send('hubo un error al acceder')
                    console.log('**Error: ' + err);
                    
                } else {
                    data.user.misReportes = result
                    res.json(data.user.misReportes) 
                }
            })
        }
    })
})

module.exports = router