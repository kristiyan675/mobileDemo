const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const {homeController} = require('./controllers/home')
const create = require("./controllers/create");
const {about} = require("./controllers/about");
const {details} = require("./controllers/details");
const {notFound} = require("./controllers/notFound");
const carsServices = require("./services/cars")
const accessoryService = require("./services/accessory")
const authService = require('./services/auth')
const remove = require('./controllers/remove')
const edit = require('./controllers/edit')
const initDb = require('./models/index')
const accessory = require('./controllers/accessory')
const attach = require("./controllers/attach");
const {registerGet, registerPost, loginGet, loginPost, logout} = require('./controllers/auth')
const {isLoggedIn} = require("./services/util");



start ()

async function start() {
    await initDb();
    const app = express()


    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine)
    app.set('view engine', 'hbs')

    app.use(session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: 'auto'}

    }))
    app.use(express.urlencoded({extended: true}))

    app.use('/static', express.static('static'))

    app.use(carsServices())
    app.use(accessoryService())
    app.use(authService())


    app.get('/', homeController)
    app.get('/about', about)
    app.get('/details/:id', details)

    app.get('/create', isLoggedIn(),create.get)
    app.post('/create', isLoggedIn(),create.post)
    app.get('/delete/:id', isLoggedIn(),remove.get)
    app.post('/delete/:id', isLoggedIn(),remove.post)
    app.get('/edit/:id', isLoggedIn(),edit.get)
    app.post('/edit/:id', isLoggedIn(),edit.post)
    app.get('/accessory', isLoggedIn(),accessory.get)
    app.post('/accessory', isLoggedIn(),accessory.post)
    app.get('/attach/:id', isLoggedIn(),attach.get)
    app.post('/attach/:id', isLoggedIn(),attach.post)

    app.get('/register', registerGet)
    app.post('/register', registerPost)

    app.get('/login', loginGet)
    app.post('/login', loginPost)
    app.get('/logout', logout)

    app.all('*', notFound)

    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })

}





