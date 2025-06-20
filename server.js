require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const colors = require('colors')
const app = express()
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db');


//mongo connection
connectDB();


//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

app.listen(PORT,()=>{
    console.log(`server running in dev port: ${process.env.DEV_MODE} on ${PORT}`)
})

