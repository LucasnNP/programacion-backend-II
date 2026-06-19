import express from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import {
  renderAdmin,
  renderCart,
  renderProduct,
  renderProducts,
} from "../controllers/views.controller.js";
import { renderEditProduct } from "../controllers/product.controller.js";

const viewsRouter = express.Router();

// Vista home queda como está ya que no consulta db
viewsRouter.get("/", async (req, res) => {
  res.render("home", {
    title: "Inicio",
  });
});

// Vista de productos
viewsRouter.get("/products", renderProducts);

// Vista de producto individual
viewsRouter.get("/products/:productId", renderProduct);

viewsRouter.get(
  "/admin/edit/:productId",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  renderEditProduct,
);

// Vista de carrito
viewsRouter.get(
  "/carts/:cartId",
  passport.authenticate("jwt", { session: false }),
  renderCart,
);

// Vista de administración
viewsRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  renderAdmin,
);

// Vista registro queda como está ya que no consulta db
viewsRouter.get("/register", (req, res) => {
  res.render("register", { title: "Registro" });
});

// Vista login queda como está ya que no consulta db
viewsRouter.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Vista de recuperación de contraseña
viewsRouter.get("/forgot-password", (req, res) => {
  res.render("forgotPassword", { title: "Recuperar Contraseña" });
});

// Vista de restablecimiento de contraseña
viewsRouter.get("/reset-password/:token", (req, res) => {
  res.render("resetPassword", {
    title: "Restablecer contraseña",
  });
});

// Vista perfil queda como está ya que no consulta db
viewsRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  authorization("user", "admin"),
  (req, res) => {
    res.render("profile", { title: "Perfil", user: req.user.toObject() });
  },
);

export default viewsRouter;
