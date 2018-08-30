# URL Shortener Microservice 

This is a full stack web app which shortens URLs, mimicking services such as Bitly or Google URL Shortener. 

URLs are POSTed to the server. A new document in the database is created (unless it exists already!) and a JSON object is sent with the original url and the shortened url. If the user goes to [https://ryanmack-urlshortener.herokuapp.com/api/shorturl/1](https://ryanmack-urlshortener.herokuapp.com/api/shorturl/1), they will be redirected to [google.com](www.google.com). Replace the number one at the end of the path with a proper shortened url and the user will be redirected to the original URL!

## Getting Started

Check out the [live demo](https://ryanmack-urlshortener.herokuapp.com/)!

Directions for usage are found on the demo.

## Built With

* Node.js
* Express
* MongoDB
* Mongoose
* SCSS
* Gulp for SCSS pre-processing and CSS prefixing.


## Final Thoughts

This project had a lot of configuration and MongoDB was completely new to me. I've used MySQL before and I think my next project will utilize MySQL or Postgres. I think configuration options take more time than actual development!

Onwards and upwards!!!
