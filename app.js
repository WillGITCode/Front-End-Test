const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
//Installed node-fetch because fetch didn't work in node enviroment
//TODO find out why 
const fetch         = require('node-fetch');

const postRoutes    = require('./routes/posts'),
      commentRoutes = require('./routes/comments'),
      indexRoutes   = require('./routes/index')


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
 
app.use(require("express-session")({
    secret: "One To Rule Them All!",
    resave: false,
    saveUninitialized: false
}));


//middleware function
//passes user info between routes
app.use(function(req, res, next) {
    console.log(req.session.currentUser)
        res.locals.currentUser = req.session.currentUser
    next();
});

app.use(indexRoutes)
app.use(postRoutes)
app.use(commentRoutes)

app.listen(3000, () => console.log('Font-End Test Server Started!'))