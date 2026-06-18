import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductViewData,
  toggleProductStatus,
  updateProduct,
} from "../services/product.service.js";
import fs from "fs";
import path from "path";

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, category = null, order = "asc" } = req.query;

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);

    const filter = {
      status: true,
    };

    if (category) {
      filter.category = category;
    }

    const data = await getProducts(filter, {
      limit: limitNum,
      page: pageNum,
      sort: { price: order === "asc" ? 1 : -1 },
      select: "-__v -createdAt -updatedAt",
    });

    const products = data.docs;
    delete data.docs;

    res.status(200).json({
      status: "success",
      payload: products,
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
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

export const renderEditProduct = async (req, res) => {
  try {
    const product = await getProductViewData(req.params.productId);

    const categories = [
      "Periféricos",
      "Laptops",
      "Componentes",
      "Webcams",
      "Accesorios",
    ].map((category) => ({
      name: category,
      selected: category === product.category,
    }));

    res.render("editProduct", {
      title: "Editar Producto",
      product,
      categories,
      user: req.user.toObject(),
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
    };

    if (req.file) {
      productData.thumbnail = `/images/${req.file.filename}`;
    }

    const product = await createProduct(productData);

    res.status(201).json({
      status: "success",
      payload: product,
    });
  } catch (error) {
    // Eliminar la imagen cargada en caso de error en el proceso de creación de producto
    if (req.file) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        req.file.filename,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(500).json({
      status: "error",
      message: error.message,
    });
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

export const toggleStatus = async (req, res) => {
  try {
    const product = await toggleProductStatus(req.params.productId);

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
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
