import UserRepository from "../repositories/UserRepository.js";
import CartRepository from "../repositories/CartRepository.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

const userRepository = new UserRepository();
const cartRepository = new CartRepository();

export const registerUser = async (userData) => {
  // Verificar si el usuario ya existe
  const userExists = await userRepository.getByEmail(userData.email);
  if (userExists) {
    throw new Error("El usuario ya existe");
  }

  // Crear un carrito para el nuevo usuario
  const cart = await cartRepository.create({
    products: [],
  });

  // Crear un nuevo usuario
  const user = await userRepository.create({
    ...userData,
    password: createHash(userData.password), // Hash de la contraseña
    cart: cart._id, // Asociar el carrito al usuario
  });

  return user;
};

export const loginUser = async (email, password) => {
  // Buscar al usuario por su correo electrónico
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // Verificar la contraseña
  const validPassword = isValidPassword(user, password);
  if (!validPassword) {
    throw new Error("Credenciales inválidas");
  }

  return {
    user,
    token: generateToken(user),
  };
};
