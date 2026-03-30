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

/*
productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    

    const data = await Product.paginate({}, { limit, page: pageNum }); // el método lean() devuelve objetos JavaScript simples en lugar de documentos Mongoose, lo que mejora el rendimiento al no incluir métodos adicionales de Mongoose
    const products = data.docs;
    delete data.docs; // se elimina la propiedad docs para no enviar información redundante al cliente

    res.status(200).json({ status: "success", payload: products, ...data }); 
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al obtener los productos" });
  }
*/

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

/*
productsRouter.post("/", async (req, res) => {
  try {
  const newProduct = req.body;

  const product = await Product.create(newProduct);

  res.status(201).json({ status: "success", payload: product });
  }catch (error) {
    res.status(500).json({ status: "error", message: "error al agregar el producto" });
  }
*/

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

/* 
productsRouter.put("/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const updates = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true }); // se pasa el objeto de configuración para que me llegue la info del producto actualizado y valide los datos según el esquema definido en el modelo
      if (!updatedProduct) return res.status(404).json({ status: "error", message: "producto no encontrado" });
      res.status(200).json({ status: "success", payload: updatedProduct });

    } catch (error) {
        res.status(500).json({ status: "error", message: "error al actualizar el producto" });
  }
*/

// Eliminar un producto por ID
productsRouter.delete("/:productId", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/* 
productsRouter.delete("/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;

      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) return res.status(404).json({ status: "error", message: "producto no encontrado" });
      
      res.status(204).send();
    } catch (error) {
        res.status(500).json({ status: "error", message: "error al eliminar el producto" });
    }
  
  }
*/

export default productsRouter;
