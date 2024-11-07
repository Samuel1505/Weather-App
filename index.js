// index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/weather', async (req, res) => {
    try {
        const city = req.body.city;
        const apiKey = "3b839d3937a6e268982014f989f09696";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        const response = await axios.get(url);
        const weather = {
            city: response.data.name,
            country: response.data.sys.country,
            temperature: Math.round(response.data.main.temp),
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            icon: response.data.weather[0].icon
        };
        
        res.render('index', { weather, error: null });
    } catch (error) {
        res.render('index', { 
            weather: null, 
            error: 'Error fetching weather data. Please try again.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});wqq3 