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

// .then(fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id + '/comments'))
    // .then(response => response.json())
    // .then(json => post.push(json))
    // .then(post => console.log(post))
    // .catch(err => console.error('Request failed', err)))

    //Get post comments
    //equivalent to /comments?postId=1
    //  fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id + '/comments')
    //  .then(response => response.json())
    //  .then(json => console.log(json))

//Show post rout
router.get('/:id', (req, res) => {
    let post

    //Get post details
    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id)
    .then(response => response.json())
    .then(data => post = data)
    .then(() => fetch('https://jsonplaceholder.typicode.com/users/' + post.userId))
    .then(response => response.json())
    .then(data => post.user = data)
    .then(() => fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id + '/comments'))
    .then(response => response.json())
    .then(data => post.comments = data)
    .then(() => console.log(post))
    

    .then(() => res.render('posts/show', {post:post}))

})


module.exports = router