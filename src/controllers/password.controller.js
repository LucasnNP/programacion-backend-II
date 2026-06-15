import UserRepository from "../repositories/UserRepository.js";
import { sendPasswordRecoveryEmail } from "../services/mail.service.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateRecoveryToken, verifyToken } from "../utils/jwt.js";

const userRepository = new UserRepository();

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Debe ingresar un correo electronico",
      });
    }

    const user = await userRepository.getByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    const token = generateRecoveryToken(user);

    const recoveryLink = `http://localhost:8080/api/sessions/reset-password/${token}`;

    await sendPasswordRecoveryEmail(user.email, recoveryLink);

    res.json({
      status: "success",
      message: "Correo de recuperación enviado",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = verifyToken(token);

    if (!decoded) {
      throw new Error("Token invalido o expirado");
    }

    const user = await userRepository.getById(decoded.id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const samePassword = isValidPassword(user, password);

    if (samePassword) {
      return res.status(400).json({
        status: "error",
        message: "La nueva contraseña no puede ser igual a la anterior",
      });
    }

    await userRepository.update(user._id, { password: createHash(password) });

    res.json({
      status: "success",
      message: "Contraseña restablecida correctamente",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Token invalido o expirado",
    });
  }
};
