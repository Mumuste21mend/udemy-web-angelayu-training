const express = require( "express");
const ejs = require( "ejs");
const mongoose = require( "mongoose");
const encrypt = require( "mongoose-encryption");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

const secret ="Thisisourlittlesecret.";

userSchema.plugin(encrypt,{secret:secret,encryptedFields:['password']});

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
    .then( user=>{
        (user.password===password)?res.render("secrets",{user:{email,password}}):console.log("password unmatched")})
    .catch(console.error);
});
//post.meh@tit.com
app.route("/register")
.get((req,res)=>{
    res.render("register");
})
.post((req,res)=>{
    const aUser= new User( {    
        email:req.body.username,
        password: req.body.password
        });
        aUser.save().then(res.render("secrets",{user:aUser})).catch(console.error);
    
})
app.listen(3000,()=>{
    console.log("successfully connecting to port 3000");
})