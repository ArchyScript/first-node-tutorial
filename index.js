const express = require('express')
const app = express()
require('dotenv/config')
// const bodyParser = require('body-parser')

// 
const { connectDatabase } = require('./controller/mongooseConnect')

// middleware 
app.use(express.json()); // To parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// API port
const PORT = process.env.PORT

// connect to database
connectDatabase()

// routes
const authRoute = require('./dev-ed/auth')
const postsRoute = require('./dev-ed/posts')

// referencing routes
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)

// listen to port
app.listen(PORT, () => {
    console.log(`server litening on port: ${PORT}`)
})