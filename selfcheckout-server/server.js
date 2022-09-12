const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {ProductController} = require("./ProductController");
const mongoose = require("mongoose")

const app = express();


mongoose.connect("mongodb://localhost")
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '../selfcheckout-frontend/dist/selfcheckout-frontend')));
app.get('/', (req,res) => {
    res.sendFile("index.html");
});

new ProductController("/api").apply(app);

app.listen(8080, function(){
    console.log("This server port is up and running ");
});
