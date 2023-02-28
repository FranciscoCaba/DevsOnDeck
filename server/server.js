const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8000
require('dotenv').config()
const cookieParser = require('cookie-parser')

require('./config/mongoose.config')

//MIDDLEWARE
app.use(express.json(), express.urlencoded({ extended: true }))

//COOKIES MIDDLEWARE
app.use(cookieParser())

//CORS
app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))

//RUTAS
const Routes = require('./routes/User.routes')
Routes(app)

app.listen(PORT, () => console.log("Servidor corriendo en el puerto", PORT))