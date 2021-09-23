const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = 3000;

const date=require(__dirname+"/date.js");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"))
var items=["wake up","breath" ,"do something","FOUUUR"];
let workList=[];


app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    let day = date.getDate()
    res.render('list.ejs', { listTitle:day ,items:items})

})
app.post("/",(req,res)=>{
    var item = req.body.newItem ;
    console.log(req.body);
    if(req.body.list==="work list"){
        workList.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
   
})
app.get('/work', (req, res) => {

   res.render('list.ejs', { listTitle:"work list" ,items:workList})

})

// app.post('/work', (req, res) => {
//     var workItem = req.body.newItem ;
//     if((workItem.trim().length))
//     workList.push(item);
//     res.redirect("/work");
// })
app.get('/about',(req,res)=>{
    res.render('about.ejs');
})

app.listen(PORT, () => { console.log(`i m listening on ${PORT}`) })