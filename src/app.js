const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Joshua Tu',
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Joshua Tu',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This page is for trouble shooting',
    title: 'Help',
    name: 'Joshua Tu',
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    })
  }

  geocode(req.query.address, (err, coordinates = {}) => {
    if (err) {
      return res.send({ error: err })
    }

    forecast(coordinates, (err, forecastData) => {
      if (err) {
        return res.send({ error: err })
      }
      res.send({
        address: req.query.address,
        forecast: forecastData,
      });
    })
  });

  // res.send({
  //   forecast: 'It is raining',
  //   location: 'Sydney',
  //   address: req.query.search,
  // });
});

// this products endpoint is just for demo
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search);
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Joshua Tu',
    errMsg: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  // res.send('My 404 page');
  res.render('404', {
    title: 404,
    name: 'Joshua Tu',
    errMsg: 'Page not found.',
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
