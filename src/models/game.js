const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    titulo:String,
    iconoEtiqueta:String,
    precio:Number,
    imagePath:String,
    category:String,
    url:String
});

module.exports = mongoose.model('game', gameSchema)