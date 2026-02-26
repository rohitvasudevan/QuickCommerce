const express = require('express');
const config = require('config');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const router = express.Router();
const gemini = new GoogleGenerativeAI(config.get('geminiKey'));


router.post('/', async (req, res) => {
const { products, orderHistory } = req.body;


const prompt = `Recommend products based on user order history: ${JSON.stringify(orderHistory)} and available products: ${JSON.stringify(products)}`;


try {
const model = gemini.getGenerativeModel({ model: "gemini-pro" });
const result = await model.generateContent(prompt);
res.json({ recommendations: result.response.text() });
} catch (err) {
res.status(500).json({ msg: "AI error" });
}
});


module.exports = router;