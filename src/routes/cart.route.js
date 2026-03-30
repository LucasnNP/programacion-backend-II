import express from "express";
import CartManager from "../managers/cartManager.js";
import Cart from "../models/cart.model.js";

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
/*
cartRouter.post("/", async (req, res) => {
  try {
    const cart = await cart.create({});

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear el carrito" });
   }
  };

*/

// Obtener productos de un carrito por ID
cartRouter.get("/:cartId", async (req, res) => {
  try {
    const products = await cartManager.getCartById(req.params.cartId);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/*
cartRouter.get("/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartData = await cart.findById(cartId).populate("products.product"); //pupolate para obtener los detalles de los productos y no solo sus IDs
    if (!cartData) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    res.status(200).json({ status: "success", payload: cartData.products });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener los productos del carrito" }); 
  }

  }

*/

// Agregar un producto a un carrito por ID
cartRouter.post("/:cartId/product/:productId", async (req, res) => {
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

/*
cartRouter.post("/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    //verificar si el producto a agregar existe
    const productExists = await product.findById(productId).lean();
    if (!productExists) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    //verificar si el carrito existe
    const cart = await cart.findById(cartId);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    //verificar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex((p) => p.product == productId);
    if (productIndex !== -1) {
      //si el producto ya está en el carrito, actualizar la cantidad
      cart.products[productIndex].quantity += quantity || 1;
    } else {
      //si el producto no está en el carrito, agregarlo
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    //guardar los cambios en la base de datos
    const updatedCart = await cart.save();
    res.status(200).json({ status: "success", payload: updatedCart });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar el producto al carrito" });
  }
  }
*/

export default cartRouter;
