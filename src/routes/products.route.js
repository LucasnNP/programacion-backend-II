import express from "express";
import {
  getAllProducts,
  getProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
  toggleStatus,
} from "../controllers/product.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const productsRouter = express.Router();

// Obtener todos los productos o un producto por ID

productsRouter.get("/", getAllProducts);

productsRouter.get("/:productId", validateObjectId("productId"), getProduct);

// Crear un nuevo producto
productsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  createNewProduct,
);

// Actualizar un producto por ID
productsRouter.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  validateObjectId("productId"),
  updateExistingProduct,
);

// Activar o desactivar un producto por ID
productsRouter.patch(
  "/:productId/status",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  toggleStatus,
);

// Eliminar un producto por ID
productsRouter.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  validateObjectId("productId"),
  deleteExistingProduct,
);

export default productsRouter;
