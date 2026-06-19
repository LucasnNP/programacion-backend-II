import "./src/config/env.js";
import express from "express";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import productsRouter from "./src/routes/products.route.js";
import cartRouter from "./src/routes/cart.route.js";
import sessionsRouter from "./src/routes/sessions.route.js";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/views.route.js";
import connectMongoDB from "./src/config/db.js";
import { initializePassport } from "./src/config/passport.config.js";
import passport from "passport";
import { verifyToken } from "./src/utils/jwt.js";
import User from "./src/models/user.model.js";

const app = express();
const PORT = process.env.PORT || 8081;

connectMongoDB();

// Middleware para poder recibir JSON
app.use(express.json());

// Middleware para poder recibir datos de formularios y parsearlos correctamente
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

// Middleware para verificar el token en cada solicitud y agregar el usuario a res.locals
app.use(async (req, res, next) => {
  res.locals.user = null;

  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = verifyToken(token);

      if (decoded) {
        const user = await User.findById(decoded.id).lean();

        if (user) {
          res.locals.user = user;
        }
      }
    } catch (error) {
      res.locals.user = null;
    }
  }

  next();
});

// Handlebars configuration
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// Productos
app.use("/api/products", productsRouter);

// Carritos
app.use("/api/carts", cartRouter);

// Sesiones
app.use("/api/sessions", sessionsRouter);

app.use("/", viewsRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciado correctamente");
});
