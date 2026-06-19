export const validateCartOwner = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }

  if (!req.user.cart) {
    return res.status(403).json({
      status: "error",
      message: "Usuario sin carrito asociado",
    });
  }

  if (req.user.cart.toString() !== req.params.cartId) {
    return res.status(403).json({
      status: "error",
      message: "No puede acceder a un carrito ajeno",
    });
  }

  next();
};
