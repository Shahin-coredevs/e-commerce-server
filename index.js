const express = require('express');
const formData = require("express-form-data");
const { createServer } = require('http');
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

connectToDatabase()

// Router 
app.use('/', router);

app.listen(PORT, () => {
    console.log('=> Server running on', PORT);
});
