import express from "express";
import productsRouter from "./src/routes/products.route.js";
import cartRouter from "./src/routes/cart.route.js";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/views.route.js";
import http from "http";
import { Server } from "socket.io";
import ProductManager from "./src/managers/productManager.js";
import connectMongoDB from "./src/config/db.js";
import dotenv from "dotenv";

//inicialización de variables de entorno
dotenv.config();

const app = express();
//const PORT = process.env.PORT || 8081;

connectMongoDB();

// Declaración de servidior para poder configurar manualmente
const server = http.createServer(app);
const io = new Server(server);
const productManager = new ProductManager("./src/data/products.json");

// Middleware para poder recibir JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static("./public"));

// Middleware para poder recibir datos de formularios y parsearlos correctamente
app.use(express.urlencoded({ extended: true }));

// Handlebars configuration
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Productos
app.use("/api/products", productsRouter);

// Carritos
app.use("/api/carts", cartRouter);

app.use("/", viewsRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado con id: " + socket.id);

  const products = await productManager.getProducts();
  socket.emit("product list", { products });

  socket.on("delete product", async ({ productId }) => {
    await productManager.deleteProductById(productId);

    // Se obtiene la lista actualizada de productos y se emite a todos los clientes conectados
    const products = await productManager.getProducts();
    io.emit("product list", { products });
  });

  socket.on("new product", async () => {
    const products = await productManager.getProducts();
    io.emit("product list", { products });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado con id: " + socket.id);
  });
});

// Iniciar el servidor
server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
