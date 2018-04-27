const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//Installed node-fetch because fetch didn't work in node enviroment
//TODO find out why 
const fetch = require('node-fetch');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


//Set up temp server data using api
//example Shcema

// let posts = [{
//      userId: 1,
//      id: 99,
//      title: 'ja;fkhjglhlk jlkjalffhjggl   alfghlj',
//      body: 'urljlajgfg jpadfjgljfg ljlfkjg jlkjlfgjlkj'   
//     },
//     {
//      userId: 1,    
//      id: 99,
//      title: '5645     45664         457464',
//      body: 'fhj hjsfgh jpadfjgljfg ljlfkjg jlkjlfgjlkjjs'
//     }]

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

//Landing rout
app.get('/', (req, res) => {
    res.render('landing')
})

//Show posts rout
app.get('/posts', (req, res) => {
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
app.get('/posts/new', (req, res) => {
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
        console.log(users[k].username)
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
//middle ware
function isLoggedIn(req, res, next){
    if(currentUser !== null){
        return next()
    }
    res.redirect('/login')
}

app.listen(3000, () => console.log('Font-End Test Server Started!'))