# My Ecommerce - Backend con JWT, Passport y Arquitectura por Capas

## Descripción

Proyecto backend de ecommerce desarrollado con Node.js, Express y MongoDB Atlas.

La aplicación implementa autenticación basada en JWT, autorización por roles, gestión de productos, carritos de compra, tickets de compra, recuperación de contraseña por correo electrónico y renderizado de vistas mediante Handlebars.

---

# Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Passport
- Passport-JWT
- JSON Web Token (JWT)
- Handlebars
- bcrypt
- cookie-parser
- dotenv
- multer
- nodemailer
- mongoose-paginate-v2

---

# Arquitectura

El proyecto sigue una arquitectura por capas:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
DAO
  ↓
MongoDB
```

Esta estructura permite separar responsabilidades y facilita el mantenimiento y escalabilidad de la aplicación.

---

# Instalación

## 1. Clonar repositorio

```bash
git clone https://github.com/LucasnNP/programacion-backend-II.git
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=

URI_MONGODB=

JWT_SECRET=

MAIL_USER=tu_correo@gmail.com
MAIL_PASS=tu_password_de_aplicacion

ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_FIRST_NAME=
ADMIN_LAST_NAME=
```

---

# Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

# Funcionalidades implementadas

## Gestión de usuarios

### Registro

- Registro mediante formulario.
- Validación de datos.
- Contraseña hasheada con bcrypt.
- Creación automática de carrito asociado.

### Login

- Inicio de sesión mediante email y contraseña.
- Generación de JWT.
- Almacenamiento del token en cookie HTTP Only.

### Logout

- Eliminación de cookie JWT.
- Cierre de sesión seguro.

### Perfil

- Ruta protegida con Passport JWT.
- Visualización de información del usuario autenticado.

### Recuperación de contraseña

- Solicitud de recuperación mediante correo electrónico.
- Generación de token temporal.
- Envío de enlace mediante Nodemailer.
- Validación de expiración.
- Impide reutilizar la contraseña actual.

---

## Roles y autorización

### Usuario

Puede:

- Navegar productos.
- Gestionar su carrito.
- Realizar compras.
- Consultar su perfil.

### Administrador

Puede:

- Acceder al panel de administración.
- Crear productos.
- Editar productos.
- Activar y desactivar productos.
- Visualizar todos los productos del catálogo.

---

## Gestión de productos

### Funcionalidades

- Alta de productos.
- Edición de productos.
- Activación y desactivación lógica.
- Carga de imágenes mediante Multer.
- Vista de detalle.
- Paginación.
- Filtros por categoría.
- Ordenamiento por precio.

### Carga de imágenes

Las imágenes se almacenan en:

```text
/public/images
```

y se asocian automáticamente al producto al momento de su creación.

---

## Gestión de carritos

### Funcionalidades

- Crear carrito.
- Agregar productos.
- Modificar cantidades.
- Eliminar productos.
- Vaciar carrito.
- Visualizar subtotal por producto.
- Cálculo automático del total.

### Seguridad

- Cada usuario únicamente puede modificar su propio carrito.
- Validación mediante middleware propietario del carrito.

---

## Compra de productos

### Proceso de compra

- Verificación de stock disponible.
- Actualización automática de inventario.
- Generación de ticket de compra.
- Eliminación de productos comprados del carrito.
- Conservación de productos sin stock suficiente.

### Ticket

Cada compra genera un documento con:

- Código único.
- Fecha de compra.
- Monto total.
- Comprador.

---

# Autenticación JWT

La autenticación se implementa mediante:

- Passport
- Passport-JWT
- Cookies HTTP Only

Ruta protegida:

```http
GET /api/sessions/current
```

Respuesta:

```json
{
  "status": "success",
  "payload": {
    "id": "123",
    "email": "usuario@email.com",
    "role": "user"
  }
}
```

---

# Middleware global de usuario

Se implementó un middleware global que:

- Verifica el JWT en cada request.
- Obtiene el usuario desde MongoDB.
- Inyecta el usuario en `res.locals`.

Permitiendo renderizar navegación dinámica según el estado de autenticación.

---

# Vistas

| Ruta                   | Descripción             |
| ---------------------- | ----------------------- |
| /                      | Home                    |
| /products              | Listado de productos    |
| /products/:productId   | Detalle de producto     |
| /register              | Registro                |
| /login                 | Inicio de sesión        |
| /profile               | Perfil                  |
| /carts/:cartId         | Carrito                 |
| /admin                 | Panel de administración |
| /admin/edit/:productId | Edición de producto     |
| /forgot-password       | Solicitar recuperación  |
| /reset-password/:token | Restablecer contraseña  |

---

# API

## Sessions

| Método | Ruta                                |
| ------ | ----------------------------------- |
| POST   | /api/sessions/register              |
| POST   | /api/sessions/login                 |
| GET    | /api/sessions/logout                |
| GET    | /api/sessions/current               |
| POST   | /api/sessions/forgot-password       |
| POST   | /api/sessions/reset-password/:token |

---

## Products

| Método | Ruta                            |
| ------ | ------------------------------- |
| GET    | /api/products                   |
| GET    | /api/products/:productId        |
| POST   | /api/products                   |
| PUT    | /api/products/:productId        |
| PATCH  | /api/products/:productId/status |

---

## Carts

| Método | Ruta                                  |
| ------ | ------------------------------------- |
| POST   | /api/carts                            |
| GET    | /api/carts/:cartId                    |
| POST   | /api/carts/:cartId/product/:productId |
| PUT    | /api/carts/:cartId/product/:productId |
| DELETE | /api/carts/:cartId/product/:productId |
| DELETE | /api/carts/:cartId                    |
| POST   | /api/carts/:cartId/purchase           |

---

# Características destacadas

- Arquitectura DAO / Repository / Service / Controller.
- MongoDB Atlas.
- JWT y Passport.
- Autorización por roles.
- Panel de administración.
- Recuperación de contraseña por email.
- Carga de imágenes con Multer.
- Compra con generación de tickets.
- Protección de carritos por propietario.
- Soft delete mediante activación/desactivación de productos.
- Renderizado dinámico con Handlebars.

---

# Mejoras futuras

Las siguientes funcionalidades se encuentran identificadas como posibles evoluciones del proyecto:

## Interfaz de usuario

- Rediseño completo de la UI utilizando Bootstrap o un framework moderno como React.
- Unificación visual de formularios, tablas, botones y navegación.
- Diseño responsive para dispositivos móviles.
- Mejor experiencia de usuario mediante notificaciones visuales en reemplazo de `alert()`.

---

## Gestión de usuarios y roles

- Mostrar únicamente las opciones permitidas según el rol autenticado.
- Ocultar enlaces y acciones no autorizadas desde la interfaz.
- Implementar roles adicionales (Supervisor, etc.).
- Administración de usuarios desde un panel exclusivo para administradores.

---

## Gestión de productos

- Reemplazo y actualización de imágenes de productos.
- Galería con múltiples imágenes por producto.
- Búsqueda por texto utilizando índices Full Text de MongoDB.
- Historial de cambios y auditoría de modificaciones.

---

## Carritos y compras

- Envío automático de correo electrónico al finalizar una compra con:
  - Número de ticket.
  - Productos adquiridos.
  - Cantidades.
  - Total abonado.
  - Fecha de compra.

- Historial de compras por usuario.

- Consulta de tickets desde el perfil.

- Cancelación de pedidos bajo determinadas condiciones.

---

## Seguridad

- Implementación de Refresh Tokens.
- Bloqueo temporal ante múltiples intentos fallidos de login.
- Verificación de email al registrarse.
- Autenticación de dos factores (2FA).
- Mejorar protección de endpoints sensibles.

---

## Administración

- Dashboard con métricas de negocio:
  - Productos más vendidos.
  - Ventas por período.
  - Usuarios registrados.
  - Tickets generados.

- Gestión de stock mediante alertas automáticas.

- Reportes exportables en PDF o Excel.

---

## Arquitectura y calidad

- Incorporación de pruebas unitarias con Jest.
- Incorporación de pruebas de integración.
- Documentación de API mediante Swagger.
- Contenerización mediante Docker.
- Manejo global de errores y monitoreo de aplicación.

---

## Escalabilidad

- Integración con pasarelas de pago reales (Mercado Pago, Stripe, PayPal).

  ***

# Autor

Lucas Prat
