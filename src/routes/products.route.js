import express from "express";
import ProductManager from "../managers/productManager.js";
import uploaderMulter from "../utils/multer.config.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

// Obtener todos los productos o un producto por ID
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.productId);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Crear un nuevo producto
productsRouter.post("/", uploaderMulter.single("file0"), async (req, res) => {
  try {
    const pathImage = "/public/uploads/" + req.file.filename;

    const newProduct = {
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      thumbnail: pathImage,
    };

    const product = await productManager.addProduct(newProduct);

    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Actualizar un producto por ID
productsRouter.put("/:productId", async (req, res) => {
  try {
    const updates = req.body;

    const updatedProduct = await productManager.updateProductById(
      req.params.productId,
      updates,
    );

    res.status(200).json({ status: "success", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Eliminar un producto por ID
productsRouter.delete("/:productId", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default productsRouter;
