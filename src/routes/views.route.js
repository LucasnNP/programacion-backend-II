import express from "express";
import ProductManager from "../managers/productManager";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

viewsRouter.get("/dashboard", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("dashboard", { products, title: "Dashboard" });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

viewsRouter.get("/dasboard/detail/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productManager.getProductById(req.params.productId);
    res.render("product", { product, title: "Product Detail" });
  } catch {
    res
      .status(500)
      .render("error", { message: "Error al obtener el producto" });
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default viewsRouter;
