const express = require('express');
const app = express();

// Middleware
app.use(express.json());


app.get('/math/circle/:radius', (req, res) => {
  const radius = parseFloat(req.params.radius);
  
  if (isNaN(radius)) {
    return res.status(400).type('text').send('Invalid radius');
  }
  
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  
  res.json({
    radius: radius,
    area: area,
    circumference: circumference
  });
});


app.get('/math/rectangle/:length/:width', (req, res) => {
  const length = parseFloat(req.params.length);
  const width = parseFloat(req.params.width);
  
  if (isNaN(length) || isNaN(width)) {
    return res.status(400).type('text').send('Invalid dimensions');
  }
  
  const area = length * width;
  const perimeter = 2 * (length + width);
  
  res.json({
    length: length,
    width: width,
    area: area,
    perimeter: perimeter
  });
});


app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const root = parseFloat(req.query.root);
  
  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).type('text').send('Invalid base or exponent');
  }
  
  let result = Math.pow(base, exponent);
  
  if (!isNaN(root) && root > 0) {
    result = Math.pow(result, 1 / root);
  }
  
  res.json({
    base: base,
    exponent: exponent,
    result: result,
    root: isNaN(root) ? null : root
  });
});


const quotesData = {
  successQuotes: [
    { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston S. Churchill" },
    { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston S. Churchill" },
    { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
  ],
  perseveranceQuotes: [
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot" },
    { quote: "Fall seven times, stand up eight.", author: "Japanese Proverb" }
  ],
  happinessQuotes: [
    { quote: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
    { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" }
  ]
};

const categories = Object.keys(quotesData);


app.get('/quotebook/categories', (req, res) => {
  const categoryList = categories
    .map(category => `a possible category is ${category}`)
    .join('\n');
  
  res.type('text').send(categoryList);
});


app.get('/quotebook/quote/:category', (req, res) => {
  const category = req.params.category;
  
  if (!categories.includes(category)) {
    return res.status(400).json({ error: `no category listed for ${category}` });
  }
  
  const quotes = quotesData[category];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  res.json(randomQuote);
});


app.post('/quotebook/quote/new', (req, res) => {
  const { category, quote, author } = req.body;
  
  
  if (!category || !quote || !author) {
    return res.status(400).json({ error: 'invalid or insufficient user input' });
  }
  
  
  if (!categories.includes(category)) {
    return res.status(400).json({ error: 'invalid or insufficient user input' });
  }
  
  
  quotesData[category].push({ quote, author });
  
  res.type('text').send('Success!');
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
