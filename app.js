const PORT    = Number(process.env.PORT || 3000);
const express = require('express');
const app     = express();

// bodyParser for POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for serving static files
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile('index.html');
});


app.get('/api/shorturl/:id?', (req, res) => {
  // TODO: query DB with id of the shorturl and redirect the user to it
  console.log(req.params.id);
  res.sendFile('index.html', {root: __dirname + '/public'});
});


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
