const express = require('express')
const router = express.Router()
const fetch     = require('node-fetch')
const middleware    = require("../middleware");

//This code is outside of Show index rout because Api doesn't update resources
//This is not how a real app would work, however, it makes a better demo
//The app makes the required requests aswell
//=====================================================//
let comments = []
fetch('https://jsonplaceholder.typicode.com/comments')
.then(response => response.json()
.then(data => comments = data))
//====================================================//

//New Comment form rout
router.get('/new',middleware.isLoggedIn, (req, res) => {   
    //Get post id
    let postId = parseInt(req.originalUrl.charAt(7))
    res.render('comments/new', {postId:postId})
})

//New Comment post rout
router.post('/', (req, res) => {
    //get data from form
    let name = req.body.name
    let body = req.body.body
    let id = comments.length-1
    let newComment = {name: name, body: body}
    //push to global array because API doesn't actually create or update resources
    //This will at least make it look legit in the app for demo purposes
    comments.push(newComment)

    // POST adds a random id to the object sent
    fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
        name: name,
        body: body,
        userId: res.locals.currentUser.id
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .then(res.redirect('/posts'))
})




module.exports = router