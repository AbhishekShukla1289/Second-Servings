const express = require('express')

//Cross-Origin-Resource-Sharing
const cors = require('cors')
const mongoose = require('mongoose')

//store environment variables 
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5001

const usersRouter = require('./routes/users')

//cors middleware
app.use(cors())
app.use(express.json()) //since server will send and receive json

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology : true})
const connection = mongoose.connection

app.use('/api/users' , usersRouter)

connection.once('open' , () => {
    console.log("connected to mongo")
})

//start the server ie. listen to a certain port
app.listen(port , () => {
    console.log(`Server is running on ${port}`)
})

