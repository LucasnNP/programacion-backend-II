import CartDAO from "../dao/CartDAO.js";

export default class CartRepository {
  constructor() {
    this.dao = new CartDAO();
  }

  create(cartData) {
    return this.dao.create(cartData);
  }

  getById(id) {
    return this.dao.getById(id);
  }

  getByIdWithProducts(id) {
    return this.dao.getByIdWithProducts(id);
  }

  getByIdWithProductsLean(id) {
    return this.dao.getByIdWithProductsLean(id);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }

  save(cart) {
    return this.dao.save(cart);
  }

  removeProduct(cartId, productId) {
    return this.dao.removeProduct(cartId, productId);
  }

  clearCart(cartId) {
    return this.dao.clearCart(cartId);
  }
}
