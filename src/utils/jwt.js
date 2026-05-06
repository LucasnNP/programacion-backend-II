import jwt from "jsonwebtoken";

const SECRET = "coderSecret";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "1h" },
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
