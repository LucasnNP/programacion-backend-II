import ProductRepository from "../repositories/ProductRepository.js";

const productRepository = new ProductRepository();

export const getProducts = async (filter, options) => {
  return await productRepository.getAll(filter, options);
};

export const getProductById = async (id) => {
  const product = await productRepository.getById(id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};

export const createProduct = async (productData) => {
  const existingProduct = await productRepository.getByCode(productData.code);

  if (existingProduct) {
    throw new Error("Ya existe un prodcuto con ese código");
  }

  if (productData.price <= 0) {
    throw new Error("El precio debe ser mayor a cero");
  }

  if (productData.stock < 0) {
    throw new Error("El stock no puede ser negativo");
  }

  return await productRepository.create(productData);
};

export const updateProduct = async (id, updateData) => {
  const existingProduct = await productRepository.getById(id);

  if (!existingProduct) {
    throw new Error("Producto no encontrado");
  }

  if (updateData.price !== undefined && updateData.price <= 0) {
    throw new Error("El precio debe ser mayor a cero");
  }

  if (updateData.stock !== undefined && updateData.stock < 0) {
    throw new Error("El stock no puede ser negativo");
  }

  return product;
};

export const deleteProduct = async (id) => {
  const product = await productRepository.delete(id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};
