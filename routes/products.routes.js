import { Router } from "express";
import {  fetchProducts, deleteProduct, souvenirForm, addProduct, editSouvenir, deleteAll, filterProducts, filterForm } from '../controllers/products.controller.js'

const router = Router();

// home
router.get("/", fetchProducts);

// adding
router.get("/add", souvenirForm);
router.post("/addProduct", addProduct)

// deleting
router.get("/delete/:id", deleteProduct);
router.get("/deleteAll", deleteAll);

// edit
router.get("/edit/:id", souvenirForm);
router.post("/editProduct/:id", editSouvenir);

// search
router.post("/search", fetchProducts)

// filter
router.get("/filter", filterForm)
router.post("/filterAction", filterProducts)



export default router;