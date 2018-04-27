const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//Installed node-fetch because fetch didn't work in node enviroment
//TODO find out why 
const fetch = require('node-fetch');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let users,
    posts,
    albums,
    photos,
    comments;

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json()
.then(data => posts = data))

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json()
.then(data => users = data))

let currentUser = null;

//middleware function
//passes user info between routes
app.use(function(req, res, next) {
    res.locals.currentUser = currentUser;
    next();
});

//Landing rout
app.get('/', (req, res) => {
    res.render('landing')
})

//Show posts rout
app.get('/posts', (req, res) => {
    console.log(currentUser)
    res.render('posts', {posts:posts})
})

//New Post post rout
app.post('/posts', (req, res) => {
    //get data from form
    let title = req.body.title
    let body = req.body.body
    let newPost = {title: title, body: body}
    posts.push(newPost)
    //redirect to posts page
    res.redirect('/posts')
})

//New Post form rout
app.get('/posts/new',isLoggedIn, (req, res) => {
    res.render('new.ejs')
})


//Login Routes
//=========================================//
//Login form
app.get('/login', (req, res) => {
    res.render('login')
})
//login logic
app.post('/login', (req, res) => {
    let userCheck = req.body.username
    let isUser = false;
    //check if user exists
    for(const k in users) {
        if(users[k].username === userCheck){
            currentUser = userCheck
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
app.get('/logout', (req, res) => {
    currentUser = null
    res.redirect('/')
})
//Sign Up form
app.get('/register', (req, res) => {
    res.render('register')
})
//Sign Up logic
app.post('/register', (req, res) => {
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



//middle ware
function isLoggedIn(req, res, next){
    if(currentUser !== null){
        return next()
    }
    res.redirect('/login')
}

app.listen(3000, () => console.log('Font-End Test Server Started!'))