const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')

const commentRoutes = require("./routes/comments"),
      postsRoutes = require("./routes/posts"),
      indexRoutes = require("./routes/index"),
      albumRoutes = require("./routes/albums"),
      photoRoutes = require("./routes/photos"),
      userRoutes = require("./routes/users");


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
        res.locals.currentUser = req.session.currentUser
    next();
});

app.use(indexRoutes)
app.use("/posts", postsRoutes)
app.use("/posts/:id/comments", commentRoutes)
app.use("/users", userRoutes)
app.use("/albums", albumRoutes)
app.use("/photos", photoRoutes)

app.listen(3000, () => console.log('Font-End Test Server Started!'))