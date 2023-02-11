const { MongoClient } = require("mongodb");
 
// Connection URL (Replace the url string with your connection string.)
// const url = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017";
 
// Create a new MongoClient
const client = new MongoClient(url);
 
async function main() {
  try {
    // ----- Use connect method to connect to the server ----- 
    await client.connect();
    console.log('Connected successfully to server');
    
    // ----- Database Name ----- 
    const database = client.db('fruitsDB');
    // ----- Create a collection ----- 
    const fruitsCollection = database.collection('fruits');
 
    // ----- Insert a document (data in row) -----
    // Create an array of documents to insert
    const docs = [
        {
            name: "Apple",  
            score: 8, 
            review: "Great Fruit"},
        {   
            name: "Orange", 
            score: 6, 
            review: "Kinda Sour"},
        {
            name: "Banana", 
            score: 9, 
            review: "Great Stuff"}
       ];
     
    const insertResult = await fruitsCollection.insertMany(docs);
    console.log("Inserted " + insertResult.insertedCount + " documents into the fruitsCollection.");
    
    // ----- 3rd cmd (to check whether the data is in mongosh) -----  
    // (1)mongosh 
    // (2)show dbs 
    // (3)use <databseName>
    // (4)show collections
    // (5)db.<collectionName>.find()
    
    // ----- Find all documents -----
    const findResult = await fruitsCollection.find({}).toArray();
    console.table(findResult);
 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 
main().catch(console.dir);