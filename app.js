const PORT    = Number(process.env.PORT || 3000);
const express = require('express');
const app     = express();


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile('index.html');
});


app.get('/api/shorturl/:id?', (req, res) => {
  // TODO: query DB with id of the shorturl and redirect the user to it
  console.log(req.params.id);
  res.sendFile('index.html', {root: __dirname + '/public'});
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
