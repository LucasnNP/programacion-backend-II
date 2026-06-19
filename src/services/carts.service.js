import CartRepository from "../repositories/CartRepository.js";
import ProductRepository from "../repositories/ProductRepository.js";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

export const createCart = async () => {
  return await cartRepository.create({});
};

export const getCartProducts = async (cartId) => {
  const cart = await cartRepository.getByIdWithProducts(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  return cart.products;
};

export const addProductsToCart = async (cartId, productId, quantity) => {
  // Validar cantidad
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error(
      "La cantidad debe ser un número entero positivo mayor a cero",
    );
  }

  // Verificar el producto
  const product = await productRepository.getById(productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  if (!product.status) {
    throw new Error("EL producto no se encuentra disponible");
  }

  if (product.stock === 0) {
    throw new Error("Producto sin Stock disponible");
  }

  if (quantity > product.stock) {
    throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
  }

  // Verificar carrito
  const cart = await cartRepository.getById(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  //Verificar Si el producto ya existe en el carrito
  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId,
  );

  if (productIndex !== -1) {
    const newQuantity = cart.products[productIndex].quantity + quantity;

    if (newQuantity > product.stock) {
      throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
    }

    cart.products[productIndex].quantity = newQuantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  return await cart.save();
};

export const updateProductQuantity = async (cartId, productId, quantity) => {
  const cart = await cartRepository.getById(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  const product = await productRepository.getById(productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId,
  );

  if (productIndex === -1) {
    throw new Error("Producto no encontrado en el carrito");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error(
      "La cantidad debe ser un número entero positivo mayor a cero",
    );
  }

  if (quantity > product.stock) {
    throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
  }

  cart.products[productIndex].quantity = quantity;

  return await cart.save();
};

export const removeProductFromCart = async (cartId, productId) => {
  const existingCart = await cartRepository.getById(cartId);

  if (!existingCart) {
    throw new Error("Carrito no encontrado");
  }

  const productExists = existingCart.products.some(
    (p) => p.product.toString() === productId,
  );

  if (!productExists) {
    throw new Error("Producto no encontrado en el carrito");
  }

  const cart = await cartRepository.removeProduct(cartId, productId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  return cart.products;
};

export const clearCart = async (cartId) => {
  const cart = await cartRepository.clearCart(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  return cart;
};
