const express       = require('express')
const router        = express.Router()
const fetch         = require('node-fetch')
const middleware    = require("../middleware")

//This code is outside of Show index rout because Api doesn't update resources
//This is not how a real app would work, however, it makes a better demo
//The app makes the required requests aswell
//=====================================================//
let users = []

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json()
.then(data => users = data))
//====================================================//

//Show index rout
router.get('/', (req, res) => {
    res.render('users/index', {users:users})
})

//Show user rout
router.get('/:id', (req, res) => {
    //variable to store view page info
    let user
    //Get user details
    fetch('https://jsonplaceholder.typicode.com/users/' + req.params.id)
    .then(response => response.json())
    .then(data => user = data)
    //Render view show page
    .then(() => res.render('users/show', {user:user}))
})

//Show user albums rout
router.get('/:id/albums', (req, res) => {
    //variable to store view albums page info
    let albums = []
    let user = []
    //Get user and albums details
    fetch('https://jsonplaceholder.typicode.com/users/' + req.params.id + '/albums')
    .then(response => response.json())
    .then(data => albums = data)
    .then(() => fetch('https://jsonplaceholder.typicode.com/users/' + req.params.id))
    .then(response => response.json())
    .then(data => user = data)
    //Render view show page
    .then(() => res.render('albums/userAlbums', {albums:albums, user:user}))
})

module.exports = router