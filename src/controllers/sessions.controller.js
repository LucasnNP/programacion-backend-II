import { registerUser, loginUser } from "../services/sessions.service.js";
import UserCurrentDTO from "../dto/UserCurrentDTO.js";

export const register = async (req, res) => {
  try {
    await registerUser(req.body);

    res.redirect("/login");
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token } = await loginUser(email, password);

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .redirect("/profile");
  } catch (error) {
    res.status(401).json({ status: "error", message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

export const current = async (req, res) => {
  try {
    const userDTO = new UserCurrentDTO(req.user);

    res.json({
      status: "success",
      payload: userDTO,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
