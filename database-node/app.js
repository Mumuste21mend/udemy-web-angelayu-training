const { MongoClient } = require("mongodb");
console.log(typeof(MongoClient));
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const db = client.db('fruitsDB');
    const collection = db.collection('fruits');
    // Query for a movie that has the title 'Back to the Future'

    const query =[ { _id:1,fruit:"della3" }, { _id:2,fruit:"banan" }, { _id:3,fruit:"fraise" }];
    await collection.insertMany(query);
    const fruit = await collection.find();
    console.log(fruit);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);