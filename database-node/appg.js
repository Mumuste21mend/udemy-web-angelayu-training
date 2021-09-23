const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
    name:{
      required:'{VALUE} is not supported',
      type:String},
    rating:{
      type:Number,
      min:1,
      max:10},
    review:String
});
const Fruit= mongoose.model("Fruit",fruitSchema);


let item;
//(err,fruits)=>{(err)? console.log(err):(item=fruits.map(fruit=>{fruit.name}));}

Fruit.find().toArray() ;
function s (err,att){
  if(err)console.log(err);
  if(att){
   att.map(elm=>elm.name);
    

  }}

console.log(typeof(docs));
console.log(item);
// console.log(docs);
// appel.save();
// mongoose.connection.close();
/*
const appel= new Fruit({
  name:"appel chan",
  rating:3.4,
  review:"one appel a day keep the cunt away "
});

const banana= new Fruit({
  name:"Banana",
  rating:4.4,
  review:"one appel a day keep the cunt away "
});
const orange= new Fruit({
  name:"Orange",
  rating:4.4,
  review:"one appel a day keep the cunt away "
});
// Fruit.insertMany([appel,banana,orange],(err)=>{(err)? console.log(err):console.log(`successfully `);});

mongoose.connection.close();
//   
const uri =
  "mongodb://localhost:27017";
// const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const db = client.db('fruitsDB');
    const collection = db.collection('fruits');
    // Query for a movie that has the title 'Back to the Future'

    // const query =[ { _id:1,fruit:"della3" }, { _id:2,fruit:"banan" }, { _id:3,fruit:"fraise" }];
   // await collection.insertMany(query);
    const fruit = collection.find();
    console.log(typeof(MongoClient));

    // console.log(fruit);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);*/