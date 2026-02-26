const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');


const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(config.get("mongoURI"))
.then(() => console.log("MongoDB Connected (Application server)"));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/warehouse', require('./routes/warehouse'));
app.use('/api/recommend', require('./routes/recommend'));


app.listen(5000, () => console.log("Application server running on 5000"));