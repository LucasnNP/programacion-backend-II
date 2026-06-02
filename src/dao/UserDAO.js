import User from "../models/user.model.js";

export default class UserDAO {
  getByEmail(email) {
    return User.findOne({ email });
  }

  getById(id) {
    return User.findById(id);
  }

  create(data) {
    return User.create(data);
  }
}
