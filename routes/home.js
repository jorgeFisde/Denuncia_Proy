const router = require('express').Router()
const jwt = require('jsonwebtoken')
const DB_conection = require('../service/database')
const login = require('../routes/login')
router.get('/home', (req, res) => {
    //renderizar home
    //res.render('index.html')
    if (req.session.user != undefined) {
        res.render('index.html')
    }
    res.sendStatus(500)
})

router.get('/reportes_atendidos', (req, res) => {
    //renderizar home

    if (req.session.user != undefined) {
        res.render('report_atendido.html')
    }
    res.sendStatus(500)
})

router.get('/reportes_pendientes', (req, res) => {
    //renderizar home

    if (req.session.user != undefined) {
        res.render('proceso.html')
    }
    res.sendStatus(500)
})

router.get('/api/home', login.verifyToken, (req, res) => {
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
                    res.json(data.user)
                    console.log(data.user);

                }
            })
        }
    })
})

router.get('/api/ver_respuestas', login.verifyToken, (req, res) => {
    sql = `
    SELECT * FROM ver_respuestas WHERE idUsuario = ?
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
                    res.json(result)
                    console.log(result);

                }
            })
        }
    })
})

router.get('/api/miCuenta', login.verifyToken, (req, res) => {
    sql = `
    SELECT * FROM Reportest WHERE id_Usuario = ?
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
                    res.json(data.user)
                    console.log(data.user);

                }
            })
        }
    })
})

router.get('/api/home/obtenerCat', (req, res) => {
    var sql = `
        SELECT id,nombre FROM Categoria
    `
    DB_conection.query(sql, (err, rows) => {
        if (err) {
            console.log(`Error: ${err.sqlMessage}`);
            res.send(`Error: ${err.sqlMessage}`)
        } else {
            res.json(rows)
        }
    })
})



module.exports = router