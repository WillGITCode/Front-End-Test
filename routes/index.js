const express   = require('express')
const router    = express.Router()
const fetch     = require('node-fetch')

let users = []

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json()
.then(data => users = data))

//Landing rout
router.get('/', (req, res) => {
    req.session.currentUser = null
    res.render('landing')
})

//Login Routes
//=========================================//
//Login form
router.get('/login', (req, res) => {
    res.render('login')
})
//login logic
router.post('/login', (req, res) => {
    let userCheck = req.body.username
    let isUser = false;
    //check if user exists
    for(const k in users) {
        if(users[k].username === userCheck){
            // currentUser = userCheck
            req.session.currentUser = userCheck
            isUser = true;
        }
    }
    if(isUser === true){
        res.redirect('/posts')
    }else{
        res.redirect('/login')
    }
})
//logout logic
router.get('/logout', (req, res) => {
    req.session.currentUser = null
    res.redirect('/')
})
//Sign Up form
router.get('/register', (req, res) => {
    res.render('register')
})
//Sign Up logic
router.post('/register', (req, res) => {
    let name = req.body.name,
        username = req.body.username,
        email = req.body.email,
        phone = req.body.phone,
        website = req.body.website,
        street = req.body.street,
        suite = req.body.suite,
        city = req.body.city,
        zipcode = req.body.zipcode,
        companyName = req.body.companyName,
        catchPhrase = req.body.catchPhrase,
        bs = req.body.bs,
        id = users.length +1,
        address = {street:street, suite:suite, city:city, zipcode:zipcode},
        company = {companyName:companyName, catchPhrase:catchPhrase, bs:bs}
        newUser = {id:id, name:name, username:username, email:email, phone:phone, website:website, address:address, company:company}
    users.push(newUser)
    res.redirect('/posts')
})


module.exports = router