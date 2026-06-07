import UserRespository from "./UserRepository.js";
import CartRepository from "./CartRepository.js";
import ProductRepository from "./ProductRepository.js";

export const userRepository = new UserRepository();
export const cartRepository = new CartRepository();
export const productRepository = new ProductRepository();
