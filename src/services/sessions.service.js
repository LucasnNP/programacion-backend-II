import UserRepository from "../repositories/UserRepository.js";
import CartRepository from "../repositories/CartRepository.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

const userRepository = new UserRepository();
const cartRepository = new CartRepository();

export const registerUser = async (userData) => {
  //verificar si los campos obligatorios están presentes
  const { first_name, last_name, email, age, password } = userData;

  if (!first_name || !last_name || !email || !age || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Verificar si el usuario ya existe
  const userExists = await userRepository.getByEmail(email);
  if (userExists) {
    throw new Error("El usuario ya existe");
  }

  // Crear un carrito para el nuevo usuario
  const cart = await cartRepository.create({
    products: [],
  });

  // Crear un nuevo usuario
  const hashedPassword = createHash(userData.password);
  const user = await userRepository.create({
    first_name,
    last_name,
    email,
    age,
    password: hashedPassword, // Hash de la contraseña
    cart: cart._id, // Asociar el carrito al usuario
  });

  return user;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Correo y contraseña son obligatorios");
  }

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
