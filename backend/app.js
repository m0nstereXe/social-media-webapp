const express = require('express');
const bodyParse = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();

app.use('/api/places',placesRoutes);

app.listen(5000);