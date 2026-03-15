import express from "express";
import CartManager from "../managers/cartManager";

const cartRouter = express.Router();
const cartManager = new CartManager("./src/data/carts.json");

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Obtener productos de un carrito por ID
cartRouter.get("/:cartId", async (req, res) => {
  try {
    const products = await cartManager.getCartById(req.params.cartId);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Agregar un producto a un carrito por ID
cartRouter.post("/:cartId/products/:productId", async (req, res) => {
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

export default cartRouter;
