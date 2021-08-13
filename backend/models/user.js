const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

//if u add unique to true it makes the look up faster because DB knows it can sort by that prop
 const userSchema = new Schema({
     name: {type: String, required: true},
     email: {type: String, required: true, unique: true},
     password: {type: String, required: true, minlength: 6},
     image: {type: String, required: true},
     places: [{type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
 });
 userSchema.plugin(uniqueValidator); //this actually makes sure the email we send in is unique

module.exports = mongoose.model('User',userSchema);