const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema for places
const placeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    address: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
    //connects it to users db and makes sure the creator id is of the ID type
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
});

//exports a constructor that will create models based on the schema above
module.exports = mongoose.model('Place',placeSchema); 