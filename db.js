import {readFileSync} from 'fs'

// import mongoose
import mongoose from 'mongoose'

// "import" mongoose schema
const Schema = mongoose.Schema;

// defining schema
const SouvenirSchema = new Schema({
    name: { type: String, required: [true, "Name is a required field."] },
    barCode: { type: String, validate: {
        validator: function(v) {
          return /\d\d-[a-zA-Z][a-zA-Z]-\d\d/i.test(v);
        },
        message: props => `${props.value} is not a valid barcode!`
      }, required: [true, "Barcode is a required field."] },
    description: { type: String, validate: {
        validator: function(v) {
          return v!='   ';
        },
        message: props => "Description is required"}, required: [true, "Description is required."] },
    quantity: { type: Number, required: [true, "Quantity is a required field."], min: [1, "Must be at least 1."] },
    imageUrl: { type: String, required: [true, "Image url is required."] },
  });

// creating a model
export const Souvenir = mongoose.model('Souvenir', SouvenirSchema)

// mongodb+srv://cvetkovskileon:leon2003C@cluster0.styi3ww.mongodb.net/test

// Logic to create db and seed all data 
export const initiDB = (async () => {

    const dbConnection = async function(a, b) {
        const result = await mongoose.connect('mongodb://mongo_db:27017');
        console.log(result);
    }

    dbConnection();

    const fileContent = readFileSync('seed.json', 'utf8')
    const initialData = await getAllData();
    if(initialData.length == 0) {

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
    }

    
})

// Service for fetching all souvenirs
export const getAllData = async () => {
    
    const souvenirs = await Souvenir.find();

    return souvenirs;

}