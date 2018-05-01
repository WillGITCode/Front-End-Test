const express       = require('express')
const router        = express.Router()
const fetch         = require('node-fetch')
const middleware    = require("../middleware");

let posts = []

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json()
.then(data => posts = data))

//Show index rout
router.get('/', (req, res) => {
    res.render('posts/index', {posts:posts})
})

//New Post post rout
router.post('/', (req, res) => {
    //get data from form
    let title = req.body.title
    let body = req.body.body
    let newPost = {title: title, body: body}
    posts.push(newPost)
    //redirect to posts page
    //TODO fix control flow so redirects to the show page of the new Post
    res.redirect('/posts')
})

//New Post form rout
router.get('/new',middleware.isLoggedIn, (req, res) => {    
    res.render('posts/new')
})

//Show post rout
router.get('/:id', (req, res) => {
    //variable to store view page info
    let post
    //Get post details
    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id)
    .then(response => response.json())
    .then(data => post = data)
    //Get user details
    .then(() => fetch('https://jsonplaceholder.typicode.com/users/' + post.userId))
    .then(response => response.json())
    .then(data => post.user = data)
    //Get comments on post
    .then(() => fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id + '/comments'))
    .then(response => response.json())
    .then(data => post.comments = data)
    //Render view show page
    .then(() => res.render('posts/show', {post:post}))
})


module.exports = router