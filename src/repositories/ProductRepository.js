import ProductDAO from "../dao/ProductDAO.js";

export default class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  getByIdLean(id) {
    return this.dao.getByIdLean(id);
  }

  getByCode(code) {
    return this.dao.getByCode(code);
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

  updateStock(id, stock) {
    return this.dao.updateStock(id, stock);
  }

  toggleStatus(id) {
    return this.dao.toggleStatus(id);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}
