import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import {readFileSync} from 'fs'

// import mongoose
import mongoose from 'mongoose'

// "import" mongoose schema
const Schema = mongoose.Schema;

// defining schema
const SouvenirSchema = new Schema({
    name: { type: String },
    barCode: { type: String },
    description: { type: String },
    quantity: { type: Number },
    imageUrl: { type: String },
  });

// creating a model
export const Souvenir = mongoose.model('Souvenir', SouvenirSchema)

// Logic to create db and seed all data 
export const initiDB = (async () => {

    const dbConnection = async function(a, b) {
        const result = await mongoose.connect('mongodb://localhost:27017/mongoose');
        console.log(result);
    }

    dbConnection();

    /* const fileContent = readFileSync('seed.json', 'utf8')
    if(fileContent) {

        const seedData = JSON.parse(fileContent);

        // Insert seed data to table
        seedData['Souvenirs'].forEach(async (product) => {
            const instance = new Souvenir()
            instance.name = product.name;
            instance.description = product.description;
            instance.quantity = product.quantity;
            instance.barCode = product.barCode;
            instance.imageUrl = product.imageUrl;
            await instance.save(function (err) {
                console.log(err ? err : 'Succesfull storing.');
            });
        })
    } */

    
})

// Service for fetching all souvenirs
export const getAllData = async () => {
    
    // we use empty object 
    const souvenirs = await Souvenir.find();

    return souvenirs;

}