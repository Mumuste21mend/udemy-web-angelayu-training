require('dotenv').config();
const express = require( "express");
const ejs = require( "ejs");
const mongoose = require( "mongoose");
const bcrypt = require('bcrypt');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

const DB_HOST=process.env.DB_HOST;
const DB_PORT=process.env.DB_PORT;
const DB_NAME=process.env.DB_NAME;
const PORT=process.env.PORT;

const saltRounds = 10;


 mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,{useNewUrlParser:true});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
});


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
    .then(user=>user? 
                bcrypt
                    .compare(password, user.password)
                    .then((result)=>
                        result?
                        res.render("secrets",{user:{email,password}}):
                        console.log("password unmatched"))
                :console.log("email does not exist"))
    .catch(console.error);
});

app.route("/register")
.get((req,res)=>{
    res.render("register");
})
.post((req,res)=>{
    bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash=> {
        // Store hash in your password DB.
        const aUser= new User( {    
            email:req.body.username,
            password:hash
            });
            aUser.save().then(res.render("secrets",{user:aUser}))})
    .catch(console.error);;
   
})
app.listen(PORT,()=>{
    console.log(`successfully connecting to port ${PORT}`);
})