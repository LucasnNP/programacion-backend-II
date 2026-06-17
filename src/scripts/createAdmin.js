import dotenv from "dotenv";
import connectMongoDB from "../config/db.js";
import UserRepository from "../repositories/UserRepository.js";
import { createHash } from "../utils/bcrypt.js";
import __dirname from "../../dirname.js";

dotenv.config({ path: __dirname + "/.env" });

const userRepository = new UserRepository();

const createAdmin = async () => {
  try {
    await connectMongoDB();

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("Faltan variables ADMIN_EMAIL o ADMIN_PASSWORD");
    }

    const email = process.env.ADMIN_EMAIL;

    const existingAdmin = await userRepository.getByEmail(email);

    if (existingAdmin) {
      console.log("El administrador ya existe");
      process.exit(0);
    }

    await userRepository.create({
      first_name: process.env.ADMIN_FIRST_NAME || "Admin",
      last_name: process.env.ADMIN_LAST_NAME || "Sistema",
      email: process.env.ADMIN_EMAIL,
      age: 30,
      password: createHash(process.env.ADMIN_PASSWORD),
      role: "admin",
      cart: null,
    });

    console.log("Administrador creado correctamente");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
