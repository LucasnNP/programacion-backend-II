import { randomUUID } from "crypto";

import CartRepository from "../repositories/CartRepository";
import ProductRepository from "../repositories/ProductRepository.js";
import TicketRepository from "../repositories/TicketRepository.js";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRespository = new TicketRepository();

export const purchaseCart = async (cartId, purchaseEmail) => {
  const cart = await cartRepository.getByIdWithProducts(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  let totalAmount = 0;

  const purchasedProducts = [];
  const productsWithoutStock = [];

  for (const item of cart.products) {
    const product = item.product;

    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;

      await productRepository.update(product._id, { stock: product.stock });

      totalAmount += product.price * item.quantity;

      purchasedProducts.push(item);
    } else {
      productsWithoutStock.push(product._id);
    }
  }

  if (purchasedProducts.length === 0) {
    throw new Error(
      "No se pudo completar la compra. Ningún producto tiene stock suficiente",
    );
  }

  const ticket = await ticketRespository.create({
    code: randomUUID(),
    amount: totalAmount,
    purchaser: purchaseEmail,
  });

  cart.products = cart.products.filter(
    (item) =>
      !purchasedProducts.some(
        (p) => p.product._id.toString() === item.product._id.toString(),
      ),
  );

  await cart.save();

  return {
    ticket,
    productsWithoutStock,
  };
};
