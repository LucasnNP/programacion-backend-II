import CartRepository from "../repositories/CartRepository.js";
import ProductRepository from "../repositories/ProductRepository.js";

const productRepository = new ProductRepository();
const cartRepository = new CartRepository();

export const getProductsViewData = async (filter, limit, page, sortOption) => {
  return await productRepository.getAll(filter, {
    limit,
    page,
    sort: sortOption,
    lean: true,
  });
};

export const getProductViewData = async (productId) => {
  const product = await productRepository.getByIdLean(productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};

export const getCartViewData = async (cartId) => {
  const cart = await cartRepository.getByIdWithProductsLean(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  cart.products = cart.products.map((item) => ({
    ...item,
    subtotal: item.product.price * item.quantity,
  }));

  cart.total = cart.products.reduce((acc, item) => acc + item.subtotal, 0);

  return cart;
};

export const getAdminViewData = async () => {
  const data = await productRepository.getAll({}, { lean: true, limit: 1000 });

  return data.docs;
};
