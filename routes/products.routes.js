import { Router } from "express";
import { deleteAllProducts, fetchProducts, deleteProduct, souvenirForm, addProduct, editSouvenir } from '../controllers/products.controller.js'

const router = Router();

// home
router.get("/", fetchProducts);

// adding
router.get("/add", souvenirForm);
router.post("/addProduct", addProduct)

// deleting
router.get("/deleteAll", deleteAllProducts);
router.get("/delete/:id", deleteProduct);

// edit
router.get("/edit/:id", souvenirForm);
router.post("/editProduct", editSouvenir);

export default router;