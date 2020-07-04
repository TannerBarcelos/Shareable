const express = require('express');
const app = express();
const connectDB = require('./config/db')

// middlewares
app.use(express.json({
  extended: false
}))


// connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Running')
})

// define routes for the API -> all logic sub routes with express router are in the specified folders
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile')); // will hit any of the routes in the profile file : using router there allowed us to make multiple routes we could export and user here such that the browser would pattern match to the right route if anything was cchained onto /profil/...
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))