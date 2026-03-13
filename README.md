# 🎬 API REST - Gestión de Películas y Series

## 📌 Descripción del Proyecto

Esta API REST fue desarrollada en Node.js utilizando Express y MongoDB como base de datos.  
Permite gestionar la información de:

- Géneros
- Directores
- Productoras
- Tipos
- Media (Películas y Series)

Se implementaron operaciones CRUD (Crear, Consultar, Actualizar y Eliminar) para cada módulo, siguiendo los principios de arquitectura REST.

---

## 🛠 Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Postman (para pruebas)

---

## 📂 Estructura del Proyecto
src/
├── db/
│ └── mongo.js
├── config/
│ └── env.js
├── helpers/
│ └── validarObjectId.js
├── models/
│ ├── genero.model.js
│ ├── director.model.js
│ ├── productora.model.js
│ ├── tipo.model.js
│ └── media.model.js
├── services/
│ ├── genero.service.js
│ ├── director.service.js
│ ├── productora.service.js
│ ├── tipo.service.js
│ └── media.service.js
├── controllers/
│ ├── genero.controller.js
│ ├── director.controller.js
│ ├── productora.controller.js
│ ├── tipo.controller.js
│ └── media.controller.js
├── routes/
│ ├── genero.routes.js
│ ├── director.routes.js
│ ├── productora.routes.js
│ ├── tipo.routes.js
│ └── media.routes.js
├── middlewares/
│ ├── error.middleware.js
│ └── notFound.middleware.js
├── app.js
└── server.js


Cada módulo sigue una arquitectura organizada en:

- **Model** → Define el esquema de la base de datos.
- **Service** → Contiene la lógica de negocio.
- **Controller** → Maneja las peticiones HTTP.
- **Routes** → Define los endpoints REST.

---

## ⚙️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio
git clone <https://github.com/LauGarciaAgudelo/peliculas-api
cd peliculas-api


### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
PORT=3000
MONGO_URI=mongodb://localhost:27017/peliculas_db

### 4️⃣ Ejecutar el servidor
npm run dev
El servidor se ejecutará en:
http://localhost:3000


---

## 📌 Endpoints Disponibles

### 🔹 Género
- POST /api/generos
- GET /api/generos
- GET /api/generos/:id
- PUT /api/generos/:id
- DELETE /api/generos/:id

---

### 🔹 Director
- POST /api/directores
- GET /api/directores
- GET /api/directores/:id
- PUT /api/directores/:id
- DELETE /api/directores/:id

---

### 🔹 Productora
- POST /api/productoras
- GET /api/productoras
- GET /api/productoras/:id
- PUT /api/productoras/:id
- DELETE /api/productoras/:id

---

### 🔹 Tipo
- POST /api/tipos
- GET /api/tipos
- GET /api/tipos/:id
- PUT /api/tipos/:id
- DELETE /api/tipos/:id

---

### 🔹 Media (Películas / Series)
- POST /api/medias
- GET /api/medias
- GET /api/medias/:id
- PUT /api/medias/:id
- DELETE /api/medias/:id

---

## 🧪 Pruebas en Postman

Para probar la API:

1. Crear un Environment en Postman.
2. Definir la variable:
   - baseUrl = http://localhost:3000
3. Ejecutar los endpoints en el siguiente orden:
   - Crear Género
   - Crear Director
   - Crear Productora
   - Crear Tipo
   - Crear Media

La API valida que Género, Director y Productora estén en estado ACTIVO antes de crear una Media.

---

## 📌 Reglas Implementadas

- El campo "estado" solo acepta ACTIVO o INACTIVO.
- El campo "serial" en Media es único.
- La "url" en Media es única.
- No se permite crear una Media si el género, director o productora están INACTIVO.
- Se utilizan referencias (ObjectId) para relacionar los módulos.

---

## 🎯 Conclusión

La API cumple con los principios REST y permite gestionar completamente la información del sistema de películas y series.  
Se implementó una arquitectura modular para mantener el código organizado y escalable.

## 👩‍💻 Autor

Proyecto desarrollado por: Laura Vanessa García
Asignatura: Desarrollo Web II
Semestre: Sexto