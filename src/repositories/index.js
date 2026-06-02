import UserDAO from "../dao/UserDAO.js";
import UserRespository from "./UserRepository.js";

export const userRepository = new UserRepository(new UserDAO());
