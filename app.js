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

let posts = [
    {id: 99,
     title: 'ja;fkhjglhlk jlkjalffhjggl   alfghlj',
     thumb: 'urljlajgfg'   
    },
    {
    id: 99,
    title: 'nnnnnns   sgj s ',
    thumb: 'fjjjjjgfg' 
    },
    {
    id: 99,
     title: '5645     45664         457464',
     thumb: 'fhj hjsfghjs'
    }]

// var posts =[];

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json()
.then(data => posts = data))


app.get('/showpage', (req, res) => {
    

    res.render('showpage', {posts:posts})
})




app.listen(3000, () => console.log('Font-End Test Server Started!'))