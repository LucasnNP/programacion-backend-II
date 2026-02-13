import express from "express";
import ProductManager from "./src/managers/productManager.js";
import CartManager from "./src/managers/cartManager.js";

const app = express();

// Middleware para poder recibir JSON
app.use(express.json());

//instancias de los managers
const productManager = new ProductManager("./src/data/products.json");
const cartManager = new CartManager("./src/data/carts.json");

// Productos

// Obtener todos los productos o un producto por ID
app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.productId);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Crear un nuevo producto
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addProduct(newProduct);

    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Actualizar un producto por ID
app.put("/api/products/:productId", async (req, res) => {
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
app.delete("/api/products/:productId", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Carritos

// Crear un nuevo carrito
app.post("/api/carts", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Obtener productos de un carrito por ID
app.get("/api/carts/:cartId", async (req, res) => {
  try {
    const products = await cartManager.getCartById(req.params.cartId);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Agregar un producto a un carrito por ID
app.post("/api/carts/:cartId/products/:productId", async (req, res) => {
  try {
    const cart = await cartManager.addProductToCart(
      req.params.cartId,
      req.params.productId,
    );

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
