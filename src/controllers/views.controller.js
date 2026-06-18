import {
  getAdminViewData,
  getCartViewData,
  getProductsViewData,
  getProductViewData,
} from "../services/views.service.js";

export const renderProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    //filtro
    let filter = { status: true };

    if (query) {
      if (query === "true" || query === "false") {
        filter = { status: query === "true" };
      } else {
        filter = { category: query };
      }
    }

    //ordenamiento
    const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    const data = await getProductsViewData(
      filter,
      Number(limit),
      Number(page),
      sortOption,
    );

    const products = data.docs;
    delete data.docs;

    const links = [];

    for (let i = 1; i <= data.totalPages; i++) {
      links.push({
        number: i,
        link: `?limit=${limit}&page=${i}&query=${query || ""}&sort=${sort || ""}`,
      });
    }

    res.render("products", {
      products,
      links,
      ...data,
      query,
      sort,
      title: "Productos",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const renderProduct = async (req, res) => {
  try {
    const product = await getProductViewData(req.params.productId);

    res.render("product", { product, title: "Detalle del producto" });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const renderCart = async (req, res) => {
  try {
    const cart = await getCartViewData(req.params.cartId);

    res.render("cart", { cart, user: res.locals.user, title: "Tu carrito" });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const renderAdmin = async (req, res) => {
  try {
    const products = await getAdminViewData();

    res.render("admin", {
      title: "Panel de administración",
      user: req.user.toObject(),
      products,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
