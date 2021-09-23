const express=require("express");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});   

const articleSchema= mongoose.Schema({
    title:String,
    content:String
});

const articles=mongoose.model("articles",articleSchema);

app.get("/",(req,res)=>{
    res.write("hello world!");
    res.send();
})

app.route("/articles")
.get((req,res)=>{
    const asfn = async ()=>{
        try {
            const docs=await articles.find();
            console.log(docs);
            res.send(docs);
        } catch (error) {
            console.error(error);
        }
        
    }
    asfn();
})
.post((req,res)=>{
    
    const asfn = async ()=>{
        try {
            const docs=await articles.create({
                title:req.body.title.trim(),
                content:req.body.content.trim()
            });
            // console.log(docs);
        } catch (error) {
            console.error(error);
        }
        
    }
    asfn();
    
})
.delete((req,res)=>{
    const asfn = async ()=>{
        try {
            const docs=await articles.deleteMany();
            console.log(docs);
        } catch (error) {
            console.error(error);
        }
        
    }
    asfn(); 
    
});

app.route("/articles/:articleName")

.get((req,res)=>{
        const articleName=req.params.articleName.trim();
        console.log(req.params);
        
        const asfn = async ()=>{
            try {
                const docs=await articles.findOne({
                    title:articleName
                });
                console.log(docs);
                res.send(docs);
            } catch (error) {
                console.error(error);
            }
            
        }
        asfn();
    })

.delete((req,res)=>{
    const articleName=req.params.articleName.trim();
    console.log(req.params);
    
    const asfn = async ()=>{
        try {
            const docs=await articles.findOneAndDelete({
                title:articleName
            });
            console.log(docs+"deleted");
            // res.send(docs);
        } catch (error) {
            console.error(error);
        }
    }
    asfn();
})

.put((req,res)=>{
    const articleName=req.params.articleName.trim();
    articles.replaceOne({title:articleName},
        {
            title:req.body.title,
            content:req.body.content
        },
        {overwrite:true})
        .then(x=> console.log(x)).
        catch(console.error);
})
.patch((req,res)=>{
    const articleName=req.params.articleName.trim();
    articles.updateOne({title:articleName},
        {$set:req.body})
        .then(x=> console.log(x)).
        catch(console.error);
})

app.listen(3000,()=>{
    console.log("server started on port 3000");
})

