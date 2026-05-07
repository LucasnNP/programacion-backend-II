import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const SECRET = process.env.JWT_SECRET;

  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, cart: user.cart },
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
