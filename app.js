/***********************************************************************
* Configuration
***********************************************************************/
// .env file to connect to mongoose
require('dotenv').config()


// Schema for the URL model
const urlModel = require('./models/urls.js');


// Connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });


// test database connection
const db = mongoose.connection;
db.on('err', (err) => console.log("Connection Error.\n", err));
db.once('open', () => console.log('Connected to database.\n'));


// App dependencies
const PORT      = Number(process.env.PORT || 3000);
const express   = require('express');
const app       = express();
const urlExists = require('url-exists-deep');


// bodyParser for POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// middleware for serving static files
app.use(express.static(__dirname + '/public'));


/***********************************************************************
* Routes
***********************************************************************/
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


// user wants to be redirected to a short url
app.get('/api/shorturl/:id?', (req, res) => {
  urlModel.findOne({
      short_url: `api/shorturl/${req.params.id}`
    })
    .then(data => {
      console.log(data);
      res.redirect(data.url);
    })
    .catch(err => {
      res.status(400).send("Invalid URL");
    });
});


// user wants to shorten a url
app.post('/api/shorturl/new', (req, res) => {
  const postBody = req.body.url;

  // Return the POST message
  res.send(postBody);
});


// serve index.html on any route other than the api end point
app.get('*', (req, res) => {
  res.status(404).sendFile("404.html", {root: __dirname + '/public'});
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
