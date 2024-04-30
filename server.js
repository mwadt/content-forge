const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Blog = require('./models/blog.js')

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3002, () => {
    console.log('listening on port 3000')
})
