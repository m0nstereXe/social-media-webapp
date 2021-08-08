const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');


const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes);

//error handling middleware (one with 4 inputs)
app.use((error,req,res,next) => {
    if (res.headerSent)
    {
        return next(error);
    }
    res.status(error.code || 500); //either the set code or default something went wrong
    res.json({message: error.message || 'Something went wrong.'});
});

app.listen(5000);