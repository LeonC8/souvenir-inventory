// import mongoose
const mongoose = require('mongoose');

// "import" mongoose schema
const Schema = mongoose.Schema;

// defining schema
const SouvenirSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    description: { type: String },
    quantity: { type: Number },
    imageUrl: { type: String }
  });

// creating a model
const Souvenir = mongoose.model('Souvenir', SouvenirSchema)

// exporting the model to be used in other files
module.exports = Souvenir;
