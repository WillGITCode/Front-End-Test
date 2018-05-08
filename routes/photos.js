const express = require('express')
const router = express.Router()
const fetch     = require('node-fetch')
const middleware    = require("../middleware");

//Index album rout
router.get('/:id', (req, res) => {  

    let photo = []

    fetch('https://jsonplaceholder.typicode.com/photos/' + req.params.id)
    .then(response => response.json()
    .then(data => photo = data))
    .then(() => res.render('photos/show', {photo:photo}))
})

module.exports = router