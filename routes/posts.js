const express       = require('express')
const router        = express.Router()
const fetch         = require('node-fetch')
const middleware    = require("../middleware");

let posts = []

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json()
.then(data => posts = data))

//Show posts rout
router.get('/posts', (req, res) => {
    res.render('posts', {posts:posts})
})

//New Post post rout
router.post('/posts', (req, res) => {
    //get data from form
    let title = req.body.title
    let body = req.body.body
    let newPost = {title: title, body: body}
    posts.push(newPost)
    //redirect to posts page
    res.redirect('/posts')
})

//New Post form rout
router.get('/posts/new',middleware.isLoggedIn, (req, res) => {
    res.render('new.ejs')
})


module.exports = router