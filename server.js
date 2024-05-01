const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Blog = require('./models/blog.js')

const morgan = require('morgan')
const methodOverride = require('method-override')

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/blogs/new', (req, res) => {
    res.render('blogs/new.ejs')
})

app.get('/blogs', async (req, res) => {
    const allBlogs = await Blog.find()

    let categories = {}
    allBlogs.forEach((blog) => {
        if (categories[blog.category] === undefined) {
            categories[blog.category] = []
        } 
        categories[blog.category].push(blog)
    })
    res.render('./blogs/index.ejs', {
        allBlogsByCategories: categories,
        categories: Object.keys(categories)
    })
})


//creates a route to a form for the user to fill out

app.post('/blogs', async (req, res) => {
    let newBlog = (req.body)
       
        if(newBlog.hasImg === 'yes') {
            newBlog.imgYes === true
        } else {
            newBlog.imgNo === false
            newBlog.imgLink = ''
        }

        await Blog.create(req.body)
        res.redirect('/')

})

app.get('/blogs/:id', async (req, res) => {
    let foundBlog = await Blog.findById(req.params.id)
    res.render('./blogs/show.ejs', {
    blog: foundBlog
    })
})

app.get('/blogs/:id/edit', async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id)
    res.render('blogs/edit.ejs', {
        blog: foundBlog
    })
})

app.put('/blogs/:id', async (req, res) => {
    let updatedBlog = (req.body)
   
    if(updatedBlog.hasImg === 'yes') {
        updatedBlog.imgYes === true
    } else {
        updatedBlog.imgNo === false
        updatedBlog.imgNo = ''
    }

    await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
    res.redirect('/blogs')
})

app.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/blogs')
})

app.listen(3002, () => {
    console.log('listening on port 3000')
})
