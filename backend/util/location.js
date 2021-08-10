const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDES2fu3iyBW9M8LX_UF44D4okLt0OJi0k";

//USING AXIOS PACKAGE POG
async function getCoordsForAddress(address) {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${API_KEY}`);

  const data = response.data;
  if(!data || data.status === 'ZERO_RESULTS')
  {
      const error = new HttpError('Could not find location for the specified address',422);
      throw error; //????? shouldnt I next this error? maybe not because it is not express!
  }
  //console.log(data);   
  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

module.exports = getCoordsForAddress;
