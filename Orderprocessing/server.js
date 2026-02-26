// order processing server code placeholder
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');


const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(config.get("mongoURI"))
.then(() => console.log("MongoDB Connected (Order processing)"));


app.use('/api/orders', require('./routes/orders'));


app.listen(5001, () => console.log("Order processing server running on 5001"));