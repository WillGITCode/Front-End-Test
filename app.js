const express = require('express')
const app = express()
//Installed node-fetch because fetch didn't work in node enviroment
//TODO find out why 
const fetch = require('node-fetch');

app.use(express.static("public"));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    
    res.render('landing')
})

app.get('/showpage', (req, res) => {
    const posts = fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => console.log(json))
    res.render('showpage', {posts:posts})
})

app.listen(3000, () => console.log('Font-End Test Server Started!'))