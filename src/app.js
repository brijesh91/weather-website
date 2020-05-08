const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//express is a function.its methods can be used as below.
const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App!",
    name: "Berlin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me!",
    name: "Berlin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page!",
    message: "Help page for weather app!",
    name: "Berlin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address!"
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error,forecastData) => {
        if (error) {
            return res.send({
                error
            })
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide search term",
    });
  } //we could have wrote else here, but return statement does the work for us

  console.log(req.query.search);
  console.log(res);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404!",
    errorMessage: "Help article not found!",
    name: "Berlin",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404!",
    errorMessage: "Page not found!",
    name: "Berlin",
  });
});

app.listen(port , () => {
  console.log("Server is up and running on port "+ port);
});

// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send('Help page!')
// })
