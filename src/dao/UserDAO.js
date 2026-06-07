import User from "../models/user.model.js";

export default class UserDAO {
  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async getById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}
