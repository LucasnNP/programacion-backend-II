import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (userData) => {
  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new Error("El usuario ya existe");
  }

  // Crear un carrito para el nuevo usuario
  const cart = await Cart.create({
    products: [],
  });

  // Crear un nuevo usuario
  await User.create({
    ...userData,
    password: createHash(userData.password), // Hash de la contraseña
    cart: cart._id, // Asociar el carrito al usuario
  });

  return user;
};

export const loginUser = async (email, password) => {
  // Buscar al usuario por su correo electrónico
  const user = await User.findOne({ email });
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
