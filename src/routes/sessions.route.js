import { Router } from "express";
import User from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // Validar que todos los campos estén presentes
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios",
      });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ status: "error", message: "El usuario ya existe" });
    }

    //hash de la contraseña
    const hashedPassword = createHash(password);

    // Crear el nuevo usuario
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    // Evitar enviar la contraseña en la respuesta
    const { password: _, ...userSafe } = newUser._doc;

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: userSafe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error interno del servidor" });
  }
});

sessionsRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionen correo y contraseña
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Correo y contraseña son obligatorios",
      });
    }

    // Buscar al usuario por correo
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const isValid = isValidPassword(user, password);
    if (!isValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = generateToken(user);

    // Enviar token como cookie segura
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Cambiar a true en producción con HTTPS
    });

    res.json({
      status: "success",
      message: "Login exitoso",
      user: { ...user._doc, password: undefined }, // Evitar enviar la contraseña
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error interno del servidor" });
  }
});

sessionsRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      status: "success",
      user: {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  },
);

export default sessionsRouter;
