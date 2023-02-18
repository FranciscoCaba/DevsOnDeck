const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8000

require('./config/mongoose.config')

app.use(cors())

app.use(express.json(), express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log("Servidor corriendo en el puerto", PORT))