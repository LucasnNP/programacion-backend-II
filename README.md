# My Ecommerce - Backend con JWT y Passport

## Descripción

Proyecto backend de ecommerce desarrollado con Node.js, Express y MongoDB.  
La aplicación permite:

- Gestión de productos
- Gestión de carritos
- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT y Passport
- Renderizado de vistas con Handlebars

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

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <https://github.com/LucasnNP/programacion-backend-II>
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080

URI_MONGODB=mongodb+srv://usuario:password@cluster.mongodb.net/myEcommerce

JWT_SECRET=tu_secret
```

---

## 4. Ejecutar el proyecto

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

## Productos

- Listado de productos
- Vista detalle
- Paginación
- Filtros por categoría
- Ordenamiento por precio

---

## Carritos

- Creación de carrito
- Agregar productos
- Modificar cantidades
- Eliminar productos
- Vaciar carrito
- Asociación automática de carrito al usuario registrado

---

## Usuarios y autenticación

### Registro

- Registro mediante formulario
- Validación de campos
- Contraseña hasheada con bcrypt
- Creación automática de carrito

### Login

- Inicio de sesión mediante email y contraseña
- Generación de JWT
- Token almacenado en cookies

### Perfil

- Ruta protegida mediante Passport JWT
- Visualización de datos del usuario autenticado

### Logout

- Eliminación de cookie JWT
- Redirección al login

---

# Autenticación JWT

La autenticación se implementa utilizando:

- Passport
- passport-jwt
- Cookies HTTP Only

---

## Ruta protegida `/current`

Endpoint utilizado para validar el usuario autenticado y devolver sus datos asociados al JWT.

```http
GET /api/sessions/current
```

Respuesta:

```json
{
  "status": "success",
  "user": {
    "id": "123",
    "first_name": "Lucas",
    "last_name": "Prat",
    "email": "usuario@email.com",
    "role": "user"
  }
}
```

---

# Middleware global de usuario

Se implementó un middleware global que:

- Verifica el JWT en cada request
- Obtiene el usuario desde MongoDB
- Inyecta el usuario en `res.locals`

Esto permite manejar navegación dinámica en Handlebars:

- Mostrar Login/Registro si no hay sesión
- Mostrar Perfil/Carrito si el usuario está autenticado

---

# Rutas principales

## Views

| Ruta            | Descripción          |
| --------------- | -------------------- |
| `/`             | Home                 |
| `/products`     | Listado de productos |
| `/products/:id` | Detalle de producto  |
| `/register`     | Registro             |
| `/login`        | Login                |
| `/profile`      | Perfil               |
| `/carts/:id`    | Vista carrito        |

---

## API

### Sessions

| Método | Ruta                     |
| ------ | ------------------------ |
| POST   | `/api/sessions/register` |
| POST   | `/api/sessions/login`    |
| GET    | `/api/sessions/current`  |

---

### Products

| Método | Ruta            |
| ------ | --------------- |
| GET    | `/api/products` |

---

### Carts

| Método | Ruta                                    |
| ------ | --------------------------------------- |
| POST   | `/api/carts`                            |
| GET    | `/api/carts/:cartId`                    |
| POST   | `/api/carts/:cartId/product/:productId` |
| PUT    | `/api/carts/:cartId/product/:productId` |
| DELETE | `/api/carts/:cartId/product/:productId` |
| DELETE | `/api/carts/:cartId`                    |

---

# Flujo de autenticación

1. El usuario se registra desde `/register`
2. Se crea automáticamente un carrito asociado
3. La contraseña se almacena hasheada con bcrypt
4. El usuario inicia sesión desde `/login`
5. Se genera un JWT
6. El JWT se almacena en una cookie HTTP Only
7. Passport valida el token en rutas protegidas
8. El middleware global carga el usuario en `res.locals`

---

# Características destacadas

- Persistencia con MongoDB Atlas
- Autenticación JWT
- Protección de rutas con Passport
- Middleware global para vistas dinámicas
- Navegación adaptada según autenticación
- Renderizado con Handlebars
- Asociación automática carrito-usuario

---

# Autor

Lucas Prat
