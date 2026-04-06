import express from "express";
import productsRouter from "./src/routes/products.route.js";
import cartRouter from "./src/routes/cart.route.js";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/views.route.js";
import connectMongoDB from "./src/config/db.js";
import dotenv from "dotenv";
import __dirname from "./dirname.js";

//inicialización de variables de entorno
dotenv.config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 8081;

connectMongoDB();

// Middleware para poder recibir JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(__dirname + "/public"));

// Middleware para poder recibir datos de formularios y parsearlos correctamente
app.use(express.urlencoded({ extended: true }));

// Handlebars configuration
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// Productos
app.use("/api/products", productsRouter);

// Carritos
app.use("/api/carts", cartRouter);

app.use("/", viewsRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciado correctamente");
});
