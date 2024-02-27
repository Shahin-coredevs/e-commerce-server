const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.cuy74ex.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("=> Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const userCollection = client.db("e-commerce").collection("Users");
const productCollection = client.db("e-commerce").collection("products");
const cartCollection = client.db("e-commerce").collection("carts");

module.exports = {
    connectToDatabase,
    userCollection,
    productCollection,
    cartCollection
};
