const router = require('express').Router()
const jwt = require('jsonwebtoken')
// Guardar accesstoken
var LocalStorage = require('node-localstorage').LocalStorage


const DB_conection = require('../service/database')

router.get('/login', (req, res) => {
    //renderizar template login
    res.render('login.html')
})

router.post('/api/login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var user = {}
    var sql = `
    SELECT id,nombre,apellido,fecha_de_nacimiento,email,es_Administrador FROM Usuario 
    WHERE email = ? AND contraseña = sha1(?)    
    `
    if (email && password) {
        DB_conection.query(sql, [email, password], (err, Result) => {
            if (Result.length > 0) {
                
                user = Result[0]
                console.log(user);
                
                const token = jwt.sign({ user }, 'my_secret_key', { expiresIn: '1h' }, (err, token) => {
                    res.json({
                        token: token
                    })
                })

            } else {
                res.json('Email o contraseña incorrecta!')
                console.log('*** ERROR: ', err);
            }
        })
    } else {
        res.send('Escriba email y contraseña')
    }
})

router.post('/api/web_login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var sql = `
    SELECT id,nombre,apellido,fecha_de_nacimiento,email,es_Administrador FROM Usuario 
    WHERE email = ? AND contraseña = sha1(?)    
    `
    if (email && password) {
        DB_conection.query(sql, [email, password], (err, rows) => {
            if (err) {
                res.send('Hubo un error en la base de datos')
                console.log('*** ERROR: ', err);

            } else {

                var user = rows[0]
                if (user == undefined) {
                    res.send('usuario o contraseña incorrecta!')
                } else {
                    if (user.es_Administrador == false) {
                        res.send('Usuario no admin')
                    } else {
                        req.session.user = user
                        res.send('Okay!')
                    }
                }
            }
        })
    } else {
        res.send('Escriba email y contraseña ')
    }
})




function verifyToken(req, res, next) {
    // cabezera del portador que se envia al verificar token
    const bearerHeader = req.headers['authorization']
    //console.log(bearerHeader);
    if (bearerHeader != undefined) {
        //separa en arreglos el string 
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = {
    router,
    verifyToken
}