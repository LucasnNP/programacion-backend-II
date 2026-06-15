import Product from "../models/product.model.js";

export default class ProductDAO {
  async getById(id) {
    return await Product.findById(id);
  }

  async getByCode(code) {
    return await Product.findOne({ code });
  }

  async getAll(filter = {}, options = {}) {
    return await Product.paginate(filter, options);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateStock(id, stock) {
    return await Product.findByIdAndUpdate(id, { stock }, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}
