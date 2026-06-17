import Product from "../models/product.model.js";

export default class ProductDAO {
  async getById(id) {
    return await Product.findById(id);
  }

  //metodo para las vistas
  async getByIdLean(id) {
    return await Product.findById(id).lean();
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

  async toggleStatus(id) {
    const product = await Product.findById(id);

    if (!product) return null;

    product.status = !product.status;

    return await product.save();
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}
