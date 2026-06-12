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

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}
