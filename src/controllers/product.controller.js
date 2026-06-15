import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, category = null, order = "asc" } = req.query;

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);

    const filter = category ? { category } : {};

    const data = await getProducts(filter, {
      limit: limitNum,
      page: pageNum,
      sort: { price: order === "asc" ? 1 : -1 },
      select: "-__v -createdAt -updatedAt",
    });

    const products = data.docs;
    delete data.docs;

    res.status(200).json({ status: "success", payload: products, ...data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.productId);

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateExistingProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.productId, req.body);

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteExistingProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.productId);

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
