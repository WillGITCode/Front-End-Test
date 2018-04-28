const express = require('express')
const router = express.Router()
const fetch     = require('node-fetch')

let comments = []

fetch('https://jsonplaceholder.typicode.com/comments')
.then(response => response.json()
.then(data => comments = data))

module.exports = router