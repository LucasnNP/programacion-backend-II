import { v4 as newId } from "uuid";
import fs from "fs/promises";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    try {
      const carts = await this.getCarts();

      const newCart = {
        id: newId(),
        products: [],
      };

      carts.push(newCart);

      await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");

      return newCart;
    } catch (error) {
      throw new Error("Error al crear el carrito:" + error.message);
    }
  }

  async getCarts() {
    try {
      const cartJson = await fs.readFile(this.path, "utf-8");
      return JSON.parse(cartJson);
    } catch (error) {
      throw new Error("Error al leer los carritos:" + error.message);
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();

      const cartFound = carts.find((cart) => cart.id === cartId);

      if (!cartFound) {
        throw new Error("Carrito no encontrado");
      }

      return cartFound.products;
    } catch (error) {
      throw new Error("Error al obtener el carrito por ID:" + error.message);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getCarts();

      const cartIndex = carts.findIndex((cart) => cart.id === cartId);

      if (cartIndex === -1) {
        throw new Error("Carrito no encontrado");
      }

      const productIndex = carts[cartIndex].products.findIndex(
        (product) => product.product === productId,
      );

      if (productIndex === -1) {
        carts[cartIndex].products.push({ product: productId, quantity: 1 });
      } else {
        carts[cartIndex].products[productIndex].quantity += 1;
      }

      await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");

      return carts[cartIndex];
    } catch (error) {
      throw new Error(
        "Error al agregar el producto al carrito:" + error.message,
      );
    }
  }
}

export default CartManager;
