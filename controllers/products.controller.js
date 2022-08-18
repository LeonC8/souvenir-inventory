import {getAllData} from '../db.js'
import { Souvenir } from '../db.js';

// Service for getting view with all products displayed
export const fetchProducts = async (req, res)  => {
    try {
        const tableData = await getAllData();
        res.render('productsList', { tableData });
    }
    catch(error) {
      console.log(error)
      res.send(500)
    }
}

export const deleteAllProducts = async (req, res) => {
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
    res.render('partials/souvenirForm', {souvenir: souvenir});
  } else {
    res.render('partials/souvenirForm', {souvenir: {}});
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

    // send 200 OK
    res.send(200);
  } catch(error) {
    console.log(error);
    res.send(500);
  }
}

export const editSouvenir = async (req, res) => {
  await Souvenir.findByIdAndUpdate(req.body.id, req.body);
  console.log("updated souvenir");
  res.redirect('/');
}