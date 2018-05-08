const express = require('express')
const router = express.Router()
const fetch     = require('node-fetch')
const middleware    = require("../middleware");

//This code is outside of Show index rout because Api doesn't update resources
//This is not how a real app would work, however, it makes a better demo
//The app makes the required requests aswell
//=====================================================//
 let albums = []

 fetch('https://jsonplaceholder.typicode.com/albums')
 .then(response => response.json()
 .then(data => albums = data))
//====================================================//

//Index album rout
router.get('/', (req, res) => {  
    res.render('albums/index', {albums:albums})
})


//Show album rout
router.get('/:id', (req, res) => {  

    let album = []
    let photos = []

    fetch('https://jsonplaceholder.typicode.com/albums/' + req.params.id)
    .then(response => response.json())
    .then(data => album = data)
    .then(() =>fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + req.params.id))
    .then(response => response.json())
    .then(data => photos = data)
    .then(() => res.render('albums/show', {album:album, photos:photos}))
})



module.exports = router