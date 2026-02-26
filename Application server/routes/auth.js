const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');


const router = express.Router();


router.post('/signup', async (req, res) => {
const { name, email, password } = req.body;


const hashed = await bcrypt.hash(password, 10);
const newUser = new User({ name, email, password: hashed });
await newUser.save();


res.json({ msg: "User registered" });
});


router.post('/login', async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: "Invalid credentials" });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ msg: "Invalid credentials" });


const token = jwt.sign({ id: user._id }, config.get("jwtSecret"));
res.json({ token, user });
});


module.exports = router;