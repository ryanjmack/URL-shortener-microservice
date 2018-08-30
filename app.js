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
  // standardize urls. should all be prefaced with 'https://'
  let url = req.body.url;
  const https = 'https://';
  const http = /^http:\/\//i;
  if (http.test(url)) {
    url = url.replace(http, https);
  }
  else if (url.indexOf(https) === -1) {
    url = https + url;
  }

  // chop off trailing slashes
  let back  = /\/$/;
  url = url.replace(back, '');

  urlModel.findOne({"url": url}, (err, result) => {
    if (result) {
      let display = {
        url: result.url,
        short_url: result.short_url
      };
      res.json(display);
    }

    else {
      let id;
      urlModel.countDocuments({}, (err, count) => {
        id = count + 1;
      })
      .then(() => {
        urlExists(url)
          .then(response => {
            const doc = new urlModel({url, short_url: `api/shorturl/${id}`});
            doc.save()
                .then(result => {
                    console.log(result.id);  // this will be the new created ObjectId
                })
                .catch(err => {
                  res.send("There was an issue saving the data to the database.");
                });

            let display = {
              url: doc.url,
              short_url: doc.short_url
            };
            res.json(display);
          })
          .catch(err => {
            res.send(`Error. The URL "${url}" doesn\'t exist, the site is down or the site has security issues.`);
          });
      });
    } // end else block

  });
});


// serve index.html on any route other than the api end point
app.get('*', (req, res) => {
  res.status(404).sendFile("404.html", {root: __dirname + '/public'});
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
