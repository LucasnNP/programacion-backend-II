class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const exists = this.products.some((product) => product.code === code);
    if (exists) {
      console.error(`el código "${code}" ya existe`);
      return;
    }

    const newProduct = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      console.error("Not Found");
      return;
    }

    return product;
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

console.log(manager.getProducts());

console.log(manager.getProductById(1));
console.log(manager.getProductById(99));
