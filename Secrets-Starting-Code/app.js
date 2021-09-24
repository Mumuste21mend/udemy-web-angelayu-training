require('dotenv').config();

const DB_HOST=process.env.DB_HOST;
const DB_PORT=process.env.DB_PORT;
const DB_NAME=process.env.DB_NAME;
const PORT=process.env.PORT; 

const express = require( "express");
const ejs = require( "ejs");
const mongoose = require( "mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

const User=require("./models/user");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'dead always fed',
    resave: false,
    saveUninitialized: true,
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,{useNewUrlParser:true});

 // schema and model are all in their module file

app.route("/").get((req,res)=>{
    res.render("home");
})
app.route("/login")

.get((req,res)=>{
  req.isAuthenticated()?res.redirect("/secrets"):res.render("login");
})
/* using passport.authenticate as a middleware that 
sets the req.user  invoke req.login() */
.post( 
    // passport.authenticate("local",{
    //     successRedirect: "/secrets",
    //     failureRedirect: "/login"
    // }),

    
    (req,res)=>{
    const user = new User({
        username:req.body.username.trim(),
        password:req.body.password
        });
    req.login(user,(err)=>{//create session 
       if(err){return next(err);}
       passport.authenticate("local")(req,res,()=>{ // authenticate and create session 
        res.redirect("/secrets");
    })
        });
    }
);

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    User.register({username:req.body.username},req.body.password)
    .then(user=> passport.authenticate("local")(req,res,()=>{
        res.redirect("/secrets");
    }))
    .catch(err=>{console.error(err);res.redirect("/register")})
})
  const isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login")
}
app.get("/secrets",isLoggedIn,(req,res)=>{
   res.render("secrets");
})
 
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect('/login');
})
app.listen(PORT,()=>{
    console.log(`successfully connecting to port ${PORT}`);
})