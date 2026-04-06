import express from "express";
import Product from "../models/product.model.js";

const productsRouter = express.Router();

// Obtener todos los productos o un producto por ID

productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, category = null, order = "asc" } = req.query; // se obtienen los parámetros de consulta limit y page, con valores predeterminados de 10 y 1 respectivamente en caso de que no se proporcionen en la solicitud

    const filter = category ? { category } : {}; // se crea un objeto de filtro para la consulta a la base de datos, si se proporciona un valor para category se agrega al filtro, de lo contrario el filtro queda vacío para obtener todos los productos

    const data = await Product.paginate(filter, {
      limit,
      page,
      sort: { price: order === "asc" ? 1 : -1 },
      select: "-__v -createdAt -updatedAt",
    }); // se utiliza el método paginate del modelo Product para obtener los productos paginados según los parámetros limit y page. El primer argumento es un objeto de consulta vacío {} para obtener todos los productos, pero se podrían agregar filtros si se desea.
    const products = data.docs;
    delete data.docs; // se elimina la propiedad docs para no enviar información redundante al cliente

    res.status(200).json({ status: "success", payload: products, ...data }); // para enviar la información de paginación junto con los productos, pero en orden correspondiente (primero los productos y luego los datos de paginación)
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error al obtener los productos" });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).select(
      "-__v -createdAt -updatedAt",
    ); // se utiliza el método findById del modelo Product para obtener un producto por su ID, se seleccionan solo los campos necesarios para enviar al cliente y se excluyen los campos __v, createdAt y updatedAt que no son relevantes para el cliente
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error al obtener el producto" });
  }
});

// Crear un nuevo producto
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    const product = await Product.create(newProduct);

    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error al agregar el producto" });
  }
});

// Actualizar un producto por ID
productsRouter.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    }); // se pasa el objeto de configuración para que me llegue la info del producto actualizado y valide los datos según el esquema definido en el modelo
    if (!updatedProduct)
      return res
        .status(404)
        .json({ status: "error", message: "producto no encontrado" });
    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error al actualizar el producto" });
  }
});

// Eliminar un producto por ID
productsRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ status: "error", message: "producto no encontrado" });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error al eliminar el producto" });
  }
});

export default productsRouter;
