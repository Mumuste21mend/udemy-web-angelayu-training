const express = require( "express");
const ejs = require( "ejs");
const mongoose = require( "mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
const userSchema={
    email:String,
    password:String
}
const User=mongoose.model("User",userSchema);

app.route("/").get((req,res)=>{
    res.render("home");
})
app.route("/login")
.get((req,res)=>{
    res.render("login");
})
.post((req,res)=>{
     const [email,password]=  [req.body.username,req.body.password];
    User.findOne({email:email})
    .then( User.findOne({email:email,password:password}))
    .then(res.render("secrets",{user:{email,password}}))
    .catch(console.error);
});
//post.meh@tit.com
app.route("/register")
.get((req,res)=>{
    res.render("register");
})
.post((req,res)=>{
    const aUser=  {    
        email:req.body.username,
        password: req.body.password
        };
    User.create(aUser).then(res.render("secrets",{user:aUser})).catch(console.error);
    
})
app.listen(3000,()=>{
    console.log("successfully connecting to port 3000");
})