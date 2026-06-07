import ProductDAO from "../dao/ProductDAO.js";

export default class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  getAll(filter, options) {
    return this.dao.getAll(filter, options);
  }

  create(productData) {
    return this.dao.create(productData);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}
