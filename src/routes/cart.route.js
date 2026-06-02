import express from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const cartRouter = express.Router();

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
  try {
    const cart = await Cart.create({});

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al crear el carrito" });
  }
});

// Obtener productos de un carrito por ID
cartRouter.get("/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartData = await Cart.findById(cartId).populate("products.product"); //pupolate para obtener los detalles de los productos y no solo sus IDs
    if (!cartData) {
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    }

    res.status(200).json({ status: "success", payload: cartData.products });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener los productos del carrito",
    });
  }
});

// Agregar un producto a un carrito por ID
cartRouter.post(
  "/:cartId/product/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;

      if (!Number.isInteger(quantity) || quantity <= 0)
        return res.status(400).json({
          status: "error",
          message:
            "La cantidad debe ser un número entero positivo mayor a cero",
        });

      //verificar si el producto a agregar existe
      const productExists = await Product.findById(productId).lean(); // va el lean porque solo quiero leer
      if (!productExists)
        return res
          .status(404)
          .json({ status: "error", message: "Producto no encontrado" });

      //verificar si el carrito existe
      const cart = await Cart.findById(cartId); // Sin lean porque voy a modificar el carrito, necesito el documento completo para poder guardar los cambios (objeto inteligente de mongoose)
      if (!cart)
        return res
          .status(404)
          .json({ status: "error", message: "Carrito no encontrado" });

      //verificar si el producto ya está en el carrito
      const productIndex = cart.products.findIndex(
        (p) => p.product == productId,
      );
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
      res.status(500).json({
        status: "error",
        message: "Error al agregar el producto al carrito",
      });
    }
  },
);

// Actualizar la cantidad de un producto en un carrito por ID
cartRouter.put("/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    if (!Number.isInteger(quantity) || quantity <= 0)
      return res.status(400).json({
        status: "error",
        message: "La cantidad debe ser un número entero positivo mayor a cero",
      });

    const cart = await Cart.findById(cartId);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    const productIndex = cart.products.findIndex((p) => p.product == productId);
    if (productIndex === -1)
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado en el carrito",
      });

    cart.products[productIndex].quantity = quantity;

    const updatedCart = await cart.save();
    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar la cantidad del producto en el carrito",
    });
  }
});

// Eliminar un producto de un carrito por ID
cartRouter.delete("/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true },
    );
    if (!updatedCart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: updatedCart.products });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar el producto del carrito",
    });
  }
});

// Eliminar todos los productos de un carrito
cartRouter.delete("/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true },
    );
    if (!updatedCart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    res.status(204).send({});
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar los productos del carrito",
    });
  }
});

export default cartRouter;
