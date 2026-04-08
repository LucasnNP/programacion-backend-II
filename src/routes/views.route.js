import express from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
  res.render("home", {
    title: "Inicio",
  });
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    //filtro
    let filter = {};
    if (query) {
      if (query === "true" || query === "false") {
        filter = { status: query === "true" };
      } else {
        filter = { category: query };
      }
    }

    //ordenamiento
    const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    const data = await Product.paginate(filter, {
      limit: Number(limit),
      page: Number(page),
      sort: sortOption,
      lean: true,
    }); //en caso de que limit y page vengan como strings, se convierten a números para evitar problemas con la paginación

    const products = data.docs;
    delete data.docs;

    const links = [];

    for (let i = 1; i <= data.totalPages; i++) {
      links.push({
        number: i,
        link: `?limit=${limit}&page=${i}&query=${query || ""}&sort=${sort || ""}`,
      });
    }

    res.render("products", { products, links, ...data, query, sort });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No es posible obtener los productos",
    });
  }
});

viewsRouter.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).lean();

    if (!product) return res.status(404).send("Producto no encontrado");

    res.render("product", { product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No es posible obtener el producto" });
  }
});

viewsRouter.get("/carts/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    const cartData = await Cart.findById(cartId)
      .populate("products.product")
      .lean();

    if (!cartData) return res.status(404).send("Carrito no encontrado");

    res.render("cart", { cart: cartData });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No es posible obtener el carrito",
    });
  }
});

export default viewsRouter;
