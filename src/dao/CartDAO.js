import Cart from "../models/cart.model.js";

export default class CartDAO {
  async create(cartData = {}) {
    return await Cart.create(cartData);
  }

  async getById(id) {
    return await Cart.findById(id);
  }

  async getByIdWithProducts(id) {
    return await Cart.findById(id).populate("products.product");
  }

  async update(id, updateData) {
    return await Cart.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Cart.findByIdAndDelete(id);
  }
}
