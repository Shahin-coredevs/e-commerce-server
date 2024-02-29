const mongoose = require('mongoose');
const express = require('express');
const formData = require("express-form-data");
const cors = require('cors');
const router = require('./routes');
const { connectToDatabase } = require('./utils/Database');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(formData.parse());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true
    })
);

// Database connection
main().catch(err => console.log(err));

async function main() {
    try {
        mongoose.set('strictPopulate', false);
        await mongoose.connect('mongodb+srv://shahinalam:y89KSJmEgt0LnzUo@cluster0.cuy74ex.mongodb.net/e-commerce2');
        console.log("=> Connected to DB");
    } catch (error) {
        console.log(error);
    }

    // `await mongoose.connect('mongodb://${process.env.DBUSER}:${process.env.DBPASS}@127.0.0.1:27017/test')`;
}

// connectToDatabase()

// Router 
app.use('/', router);

app.listen(PORT, () => {
    console.log('=> Server running on', PORT);
});
