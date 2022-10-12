const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes= require('./Routes/userRouter')
const universityRoute = require('./Routes/universitiesListRouter')
const lugunRoute = require('./Routes/lugunRoutes')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


// middleware for the users
app.use('/api', userRoutes)

// middleware for the universities in Nigeria
app.use('/api', universityRoute)

// middleware for locations in the university
app.use('/api', lugunRoute)

app.listen(9000, ()=> console.log("server is working!!!...."))