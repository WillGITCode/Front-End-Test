const express       = require('express')
const router        = express.Router()
//Installed node-fetch because fetch didn't work in node enviroment
//TODO find out why 
const fetch         = require('node-fetch')
const middleware    = require("../middleware");

//This code is outside of Show index rout because Api doesn't update resources
//This is not how a real app would work, however, it makes a better demo
//The app makes the required requests aswell
//=====================================================//
let posts = []

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json()
.then(data => posts = data))
//====================================================//

//Show index rout
router.get('/', (req, res) => {
    res.render('posts/index', {posts:posts})
})

//New Post form rout
router.get('/new',middleware.isLoggedIn, (req, res) => {    
    res.render('posts/new')
})

//New Post post rout
router.post('/', (req, res) => {
    //get data from form
    let title = req.body.title
    let body = req.body.body
    let newPost = {title: title, body: body}
    //push to global array because API doesn't actually create or update resources
    //This will at least make it look legit in the app for demo purposes
    posts.push(newPost)

    // POST adds a random id to the object sent
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: title,
        body: body,
        userId: res.locals.currentUser.id
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(res.redirect('/posts'))
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

// Edit Post Route
router.get("/:id/edit", function(req, res) {
    let post
    //Get post details
    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id)
    .then(response => response.json())
    .then(data => post = data)
    .then(() => res.render("posts/edit", {post:post}))
})


//Post edited campground rout
router.post("/:id", function(req, res) {
    
    //get data from form
    let title = req.body.title
    let body = req.body.body
    let userId = res.locals.currentUser.id
    let id = parseInt(req.params.id)
    let newPost = {title:title, body:body, userId:userId, id:id}
    //Change post object in global array because API doesn't actually create or update resources
    //This will at least make it look legit in the app for demo purposes
    posts.forEach((post) => {
        if(post.id == id){
            posts[id-1] = newPost
        }
    })

    // POST adds a random id to the object sent
    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title,
            body: body,
            userId: res.locals.currentUser.id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(res.redirect('/posts'))
})

//Destroy Post Rout
router.delete("/:id", function(req, res) {
    let id = parseInt(req.params.id)
    //Change post object in global array because API doesn't actually create or update resources
    //This will at least make it look legit in the app for demo purposes
    posts.forEach((post) => {
        if(post.id == id){
            //delete posts[id]
            posts.splice(id-1, 1)
        }
    })
    //TODO figure out why above code leaves a hole in array


    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id , {
        method: 'DELETE'
    })
    .then(res.redirect('/posts'))
})


module.exports = router