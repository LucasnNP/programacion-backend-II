import { purchaseCart } from "../services/purchase.service.js";

export const purchase = async (req, res) => {
  try {
    const { cartId } = req.params;

    const result = await purchaseCart(cartId, req.user.email);

    res.status(200).json({
      status: "success",
      ticket: result.ticket,
      productsWithoutStock: result.productsWithoutStock,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
