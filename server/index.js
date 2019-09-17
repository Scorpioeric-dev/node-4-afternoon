require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')


const app = express()
const {PORT,SESSION_SECRET} = process.env


//middleware
app.use(express.json())
app.use(
    session({
        secret:SESSION_SECRET,
        resave:false,
        saveUninitialized:true
    })
)
//this is middleware checking the session object 
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

//endpoints
app.get('/api/swag',swagController.read)
//authCtrl
app.get('/api/user',authController.getUser)
app.post('/api/register',authController.register)
app.post('/api/login',authController.login)
app.delete('/api/signout',authController.signout)
//why the use of checkout in params of post?
//cartCtrl
app.post('/api/cart/checkout',cartController.checkout)
app.post('/api/cart/:id',cartController.add)

//searchCtrl
app.get('/api/search',searchController.search)







app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})