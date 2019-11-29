const path = require('path')
const express = require('express')
const session = require('express-session')
const app = express()

//Settings
app.set('views', path.join(__dirname + '/views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 6000000
    }
}));
//archivos publicos para que sean visibles en la app y servidor
app.use(express.static(path.join(__dirname + '/public')))

// ejs: renderisar archivos html para e insertar codigo javaScript
app.engine('.html', require('ejs').renderFile)
app.set('view engine', 'ejs')

// routes
app.use(require('./routes/login').router)
app.use(require('./routes/registro'))
app.use(require('./routes/reporte'))
app.use(require('./routes/home'))

// app listen
app.listen("3000",()=>{
    console.log("estoy en port 3000" + Date.now());
    
})

