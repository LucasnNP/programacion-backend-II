import express from "express";
import {
  addProduct,
  createNewCart,
  emptyCart,
  getCart,
  removeProduct,
  updateQuantity,
} from "../controllers/carts.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { validateCartOwner } from "../middlewares/cartOwner.js";
import { purchase } from "../controllers/purchase.controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const cartRouter = express.Router();

// Crear un nuevo carrito
cartRouter.post("/", createNewCart);

// Obtener productos de un carrito por ID
cartRouter.get("/:cartId", validateObjectId("cartId"), getCart);

// Agregar un producto a un carrito por ID
cartRouter.post(
  "/:cartId/product/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  validateObjectId("cartId"),
  validateObjectId("productId"),
  validateCartOwner,
  addProduct,
);

// Actualizar la cantidad de un producto en un carrito por ID
cartRouter.put(
  "/:cartId/product/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  validateCartOwner,
  validateObjectId("cartId"),
  validateObjectId("productId"),
  updateQuantity,
);

// Eliminar un producto de un carrito por ID
cartRouter.delete(
  "/:cartId/product/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  validateCartOwner,
  validateObjectId("cartId"),
  validateObjectId("productId"),
  removeProduct,
);

// Eliminar todos los productos de un carrito
cartRouter.delete(
  "/:cartId",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  validateCartOwner,
  validateObjectId("cartId"),
  emptyCart,
);

// Comprar carrito
cartRouter.post(
  "/:cartId/purchase",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  validateCartOwner,
  validateObjectId("cartId"),
  purchase,
);

export default cartRouter;
