import {
  addProductsToCart,
  clearCart,
  createCart,
  getCartProducts,
  removeProductFromCart,
  updateProductQuantity,
} from "../services/carts.service.js";

export const createNewCart = async (req, res) => {
  try {
    const cart = await createCart();

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const products = await getCartProducts(req.params.cartId);

    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await addProductsToCart(cartId, productId, quantity);

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await updateProductQuantity(cartId, productId, quantity);

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const cart = await removeProductFromCart(
      req.params.cartId,
      req.params.productId,
    );

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const cart = await clearCart(req.params.cartId);

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
