import { v4 as newId } from "uuid";
import fs from "fs/promises";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // verificar si un código  ya existe
  verifyCode(code, products) {
    return products.some((product) => product.code === code);
  }

  //Obligatoriedad de campos
  validateProductFields(product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = product;

    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();

      this.validateProductFields(product);

      const existentCode = this.verifyCode(product.code, products);
      if (existentCode) {
        throw new Error("El código ya existe");
      }

      const id = newId();
      const newProduct = { id, ...product };

      products.push(newProduct);

      await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");

      return newProduct;
    } catch (error) {
      throw new Error("Error al agregar el producto:" + error.message);
    }
  }

  async getProducts() {
    try {
      const productJson = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productJson);

      return products;
    } catch (error) {
      throw new Error("Error al leer los productos:" + error.message);
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const productFound = products.find((product) => product.id === productId);

      if (!productFound) {
        throw new Error("Producto no encontrado");
      }

      return productFound;
    } catch (error) {
      throw new Error("Error al obtener el producto por ID:" + error.message);
    }
  }

  async deleteProductById(productId) {
    try {
      const products = await this.getProducts();

      const filteredProducts = products.filter(
        (product) => product.id !== productId,
      );

      if (products.length === filteredProducts.length) {
        throw new Error("Producto no encontrado");
      }

      await fs.writeFile(
        this.path,
        JSON.stringify(filteredProducts, null, 2),
        "utf-8",
      );
      return null;
    } catch (error) {
      throw new Error("Error al eliminar el producto:" + error.message);
    }
  }
}

const manager = new ProductManager();

manager.addProduct(
  "Teclado",
  "Teclado mecánico",
  15000,
  "img/teclado.jpg",
  "TEC001",
  10,
);

manager.addProduct("Mouse", "Mouse gamer", 8000, "img/mouse.jpg", "MOU001", 20);

console.table(manager.getProducts());

console.table(manager.getProductById(1));
console.table(manager.getProductById(99));
