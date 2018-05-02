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
    console.log(users)
    res.render('users/index', {users:users})
})


module.exports = router