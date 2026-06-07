export const validateCartOwner = (req, res, next) => {
  const cartId = req.params.cartId;

  if (req.user.cart.toString() !== cartId) {
    return res.status(403).json({
      status: "error",
      message: "No puede modificar un carrito ajeno",
    });
  }

  next();
};
