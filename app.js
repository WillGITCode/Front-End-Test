const express = require('express')
const app = express()
const fetch = require('node-fetch');

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => console.log(json))
    res.render('landing')
})

app.get('/showpage', (req, res) => res.render('showpage'))

app.listen(3000, () => console.log('Font-End Test Server Started!'))