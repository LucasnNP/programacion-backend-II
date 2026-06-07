import UserDAO from "../dao/UserDAO.js";

export default class UserRepository {
  constructor() {
    this.dao = new UserDAO();
  }

  getByEmail(email) {
    return this.dao.getByEmail(email);
  }

  getById(id) {
    return this.dao.getById(id);
  }

  create(userData) {
    return this.dao.create(userData);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }

  getCurrentUserDTO(user) {
    return {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
    };
  }
}
