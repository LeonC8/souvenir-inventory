import {getAllData} from '../db.js'
import { Souvenir } from '../db.js';
import { formErrorHandling} from '../middleware/error-handling.js';

// Service for getting view with all products displayed
export const fetchProducts = async (req, res)  => {
    try {
        if (req.body.searchedName) {
          const tableData = await Souvenir.find({ "name": { "$regex": req.body.searchedName, "$options": "i" }});
          res.render('productsList', { tableData , home: '1', edit: '0'});
        }
        const tableData = await getAllData();
        res.render('productsList', { tableData , home: '1', edit: '0'});
    }
    catch(error) {
      console.log(error)
      res.send(500)
    }
}

export const deleteAll = async (req, res) => {
  try {
      await Souvenir.deleteMany({});
      console.log('deleted');
      res.redirect('/');
  } catch(error) {
      console.log(error);
      res.sendStatus(500);
  }
} 

export const deleteProduct = async(req, res) => {
  try {
    await Souvenir.findByIdAndDelete(req.params.id);
    console.log('deleted item with id' + req.params.id);
    res.redirect('/');
  } catch(error) {
    console.log(error);
    res.send(500);
  }
}

export const souvenirForm = async(req, res) => {
  if (req.params.id) {
    const souvenir = await Souvenir.findById(req.params.id);
    res.render('partials/souvenirForm', {souvenir: souvenir, id: req.params.id, edit: '1', home: '0', errors: ''});
  } else {
    res.render('partials/souvenirForm', {souvenir: {}, home: '0', edit: '0', errors: ''});
  }
}


export const addProduct = async(req, res) => {
  const data = req.body
  try {
    
    // create instance
    const instance = new Souvenir({
      name: data.name,
      barCode: data.barCode,
      description: data.description,
      quantity: data.quantity,
      imageUrl: data.imageUrl
    })

    // save
    await instance.save()

    // redirect home
    res.redirect('/');
  } catch(error) {
    formErrorHandling(error.errors, data, res, '0')
  }
}

export const editSouvenir = async (req, res) => {
  const data = req.body
  try {
    await Souvenir.findByIdAndUpdate(req.params.id, data, {runValidators: true});  
    res.redirect("/")
  } catch(error) {
    formErrorHandling(error.errors, data, res, '1', req.params.id)
  }
}