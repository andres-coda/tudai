# TiendaOnline API — TPE Parte 3

API REST pública para el catálogo de TiendaOnline. Comparte la base de datos MySQL con el TPE Parte 2.

## Integrantes

- Andres Coda — acoda@alumnos.exa.unicen.edu.ar

---

## Instalación

```bash
npm install
npm start
# o con hot-reload (Node 18+):
npm run dev
```

La API corre por defecto en `http://localhost:3000`.

### Variables de entorno (opcionales)

| Variable     | Default              | Descripción                          |
|--------------|----------------------|--------------------------------------|
| `DB_HOST`    | `localhost`          | Host de MySQL                        |
| `DB_PORT`    | `3306`               | Puerto de MySQL                      |
| `DB_NAME`    | `tienda_online`      | Nombre de la base de datos           |
| `DB_USER`    | `root`               | Usuario de MySQL                     |
| `DB_PASS`    | _(vacío)_            | Contraseña de MySQL                  |
| `PORT`       | `3000`               | Puerto del servidor HTTP             |
| `AUTH_TOKEN` | `secret-token-tienda-2024` | Token para operaciones de escritura |

---

## Autenticación

Los endpoints de escritura (`POST`, `PUT`) requieren el siguiente header:

```
Authorization: Bearer secret-token-tienda-2024
```

Los endpoints de lectura (`GET`) son públicos y no requieren autenticación.

---

## Códigos de respuesta

| Código | Descripción                                      |
|--------|--------------------------------------------------|
| `200`  | OK — operación exitosa                           |
| `201`  | Created — recurso creado exitosamente            |
| `400`  | Bad Request — datos inválidos o faltantes        |
| `401`  | Unauthorized — falta el header Authorization    |
| `403`  | Forbidden — token inválido                       |
| `404`  | Not Found — recurso no encontrado                |
| `500`  | Internal Server Error — error en el servidor     |

---

## Endpoints — Productos

### `GET /api/productos`

Lista todos los productos. Soporta paginado, ordenamiento y filtro por categoría.

**Query params opcionales:**

| Parámetro   | Tipo    | Default       | Descripción                                                  |
|-------------|---------|---------------|--------------------------------------------------------------|
| `orderBy`   | string  | `id_producto` | Campo por el que ordenar: `id_producto`, `nombre`, `precio`, `stock`, `id_categoria` |
| `direction` | string  | `ASC`         | Dirección: `ASC` o `DESC`                                    |
| `page`      | number  | `1`           | Número de página                                             |
| `limit`     | number  | `10`          | Resultados por página (máx. 100)                             |
| `categoria` | number  | _(sin filtro)_| Filtrar por `id_categoria`                                   |

**Ejemplos:**

```
GET /api/productos
GET /api/productos?orderBy=precio&direction=DESC
GET /api/productos?categoria=1&orderBy=nombre&direction=ASC
GET /api/productos?page=2&limit=5
GET /api/productos?orderBy=precio&direction=ASC&page=1&limit=3&categoria=2
```

**Respuesta 200:**
```json
{
  "data": [
    {
      "id_producto": 1,
      "nombre": "Auriculares Bluetooth",
      "descripcion": "Auriculares inalámbricos con cancelación de ruido activa",
      "precio": "15999.99",
      "stock": 25,
      "imagen_url": null,
      "id_categoria": 1,
      "categoria_nombre": "Electrónica"
    }
  ],
  "meta": {
    "total": 7,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### `GET /api/productos/:id`

Obtiene un producto específico por su ID.

**Ejemplo:**
```
GET /api/productos/1
```

**Respuesta 200:**
```json
{
  "id_producto": 1,
  "nombre": "Auriculares Bluetooth",
  "descripcion": "Auriculares inalámbricos con cancelación de ruido activa",
  "precio": "15999.99",
  "stock": 25,
  "imagen_url": null,
  "id_categoria": 1,
  "categoria_nombre": "Electrónica"
}
```

**Respuesta 404:**
```json
{
  "status": 404,
  "error": "Producto con id 99 no encontrado."
}
```

---

### `POST /api/productos`

Crea un nuevo producto. **Requiere autenticación.**

**Headers:**
```
Authorization: Bearer secret-token-tienda-2024
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Smartwatch Pro",
  "descripcion": "Reloj inteligente con GPS y monitor cardíaco",
  "precio": 45000,
  "stock": 10,
  "imagen_url": "https://ejemplo.com/smartwatch.jpg",
  "id_categoria": 1
}
```

| Campo         | Tipo    | Requerido | Descripción                  |
|---------------|---------|-----------|------------------------------|
| `nombre`      | string  | ✅        | Nombre del producto          |
| `precio`      | number  | ✅        | Precio (mayor a 0)           |
| `id_categoria`| number  | ✅        | ID de la categoría           |
| `descripcion` | string  | ❌        | Descripción                  |
| `stock`       | number  | ❌        | Stock disponible (default 0) |
| `imagen_url`  | string  | ❌        | URL de imagen                |

**Respuesta 201:**
```json
{
  "id_producto": 8,
  "nombre": "Smartwatch Pro",
  "descripcion": "Reloj inteligente con GPS y monitor cardíaco",
  "precio": "45000.00",
  "stock": 10,
  "imagen_url": "https://ejemplo.com/smartwatch.jpg",
  "id_categoria": 1,
  "categoria_nombre": "Electrónica"
}
```

**Respuesta 400:**
```json
{
  "status": 400,
  "error": "Datos inválidos.",
  "detalles": [
    "El campo \"nombre\" es obligatorio.",
    "El campo \"precio\" debe ser un número mayor a 0."
  ]
}
```

---

### `PUT /api/productos/:id`

Actualiza un producto existente. **Requiere autenticación.**

**Headers:**
```
Authorization: Bearer secret-token-tienda-2024
Content-Type: application/json
```

**Body:** (mismos campos que POST, todos requeridos excepto los opcionales)
```json
{
  "nombre": "Smartwatch Pro Max",
  "descripcion": "Nueva versión con pantalla AMOLED",
  "precio": 52000,
  "stock": 8,
  "imagen_url": "https://ejemplo.com/smartwatch-max.jpg",
  "id_categoria": 1
}
```

**Respuesta 200:** devuelve el producto actualizado (mismo formato que GET por ID).

**Respuesta 404:**
```json
{
  "status": 404,
  "error": "Producto con id 99 no encontrado."
}
```

---

## Endpoints — Categorías

### `GET /api/categorias`

Lista todas las categorías con la cantidad de productos de cada una. Soporta paginado y ordenamiento.

**Query params opcionales:**

| Parámetro   | Tipo   | Default    | Descripción                                        |
|-------------|--------|------------|----------------------------------------------------|
| `orderBy`   | string | `nombre`   | Campo por el que ordenar: `id_categoria`, `nombre` |
| `direction` | string | `ASC`      | Dirección: `ASC` o `DESC`                          |
| `page`      | number | `1`        | Número de página                                   |
| `limit`     | number | `10`       | Resultados por página (máx. 100)                   |

**Ejemplos:**
```
GET /api/categorias
GET /api/categorias?orderBy=nombre&direction=DESC
GET /api/categorias?page=1&limit=3
```

**Respuesta 200:**
```json
{
  "data": [
    {
      "id_categoria": 4,
      "nombre": "Deportes",
      "descripcion": "Equipamiento y ropa deportiva",
      "imagen_url": null,
      "cantidad_productos": 1
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### `GET /api/categorias/:id`

Obtiene una categoría por ID, incluyendo el listado de sus productos.

**Ejemplo:**
```
GET /api/categorias/1
```

**Respuesta 200:**
```json
{
  "id_categoria": 1,
  "nombre": "Electrónica",
  "descripcion": "Dispositivos electrónicos y accesorios tecnológicos",
  "imagen_url": null,
  "productos": [
    {
      "id_producto": 1,
      "nombre": "Auriculares Bluetooth",
      "descripcion": "Auriculares inalámbricos con cancelación de ruido activa",
      "precio": "15999.99",
      "stock": 25,
      "imagen_url": null
    },
    {
      "id_producto": 2,
      "nombre": "Cargador USB-C 65W",
      "descripcion": "Cargador rápido compatible con notebooks y celulares",
      "precio": "3499.00",
      "stock": 50,
      "imagen_url": null
    }
  ]
}
```

**Respuesta 404:**
```json
{
  "status": 404,
  "error": "Categoría con id 99 no encontrada."
}
```

---

### `POST /api/categorias`

Crea una nueva categoría. **Requiere autenticación.**

**Headers:**
```
Authorization: Bearer secret-token-tienda-2024
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Jardín",
  "descripcion": "Artículos para jardinería y exterior",
  "imagen_url": "https://ejemplo.com/jardin.jpg"
}
```

| Campo        | Tipo   | Requerido | Descripción       |
|--------------|--------|-----------|-------------------|
| `nombre`     | string | ✅        | Nombre            |
| `descripcion`| string | ❌        | Descripción       |
| `imagen_url` | string | ❌        | URL de imagen     |

**Respuesta 201:** devuelve la categoría creada con sus productos (lista vacía).

---

### `PUT /api/categorias/:id`

Actualiza una categoría existente. **Requiere autenticación.**

**Headers:**
```
Authorization: Bearer secret-token-tienda-2024
Content-Type: application/json
```

**Body:** (mismos campos que POST)
```json
{
  "nombre": "Jardín y Exterior",
  "descripcion": "Artículos para jardinería, exterior y decoración de espacios al aire libre",
  "imagen_url": "https://ejemplo.com/jardin-exterior.jpg"
}
```

**Respuesta 200:** devuelve la categoría actualizada (mismo formato que GET por ID).

---

## Estructura del proyecto

```
tienda-api/
├── src/
│   ├── app.js                        ← Entry point, Express y rutas
│   ├── controllers/
│   │   ├── ProductoController.js     ← Manejo de requests y validaciones
│   │   └── CategoriaController.js
│   ├── models/
│   │   ├── ProductoModel.js          ← Queries a la base de datos
│   │   └── CategoriaModel.js
│   ├── middlewares/
│   │   └── auth.js                   ← Validación de token Bearer
│   └── routes/
│       ├── productos.js              ← Definición de rutas
│       └── categorias.js
└── config/
    ├── config.js                     ← Constantes de configuración
    └── db.js                         ← Pool de conexiones MySQL
```

---

## Requerimientos cumplidos

### Obligatorios
- ✅ GET colección completa (`/api/productos`, `/api/categorias`)
- ✅ Ordenamiento por al menos un campo con dirección ASC/DESC
- ✅ GET por ID (`/api/productos/:id`, `/api/categorias/:id`)
- ✅ POST para crear (`/api/productos`, `/api/categorias`)
- ✅ PUT para modificar (`/api/productos/:id`, `/api/categorias/:id`)
- ✅ Códigos HTTP: 200, 201, 400, 401, 403, 404, 500

### Opcionales
- ✅ **Paginado** — `?page=1&limit=10` con metadatos `total`, `totalPages`
- ✅ **Filtrado** — `/api/productos?categoria=1`
- ✅ **Ordenamiento por cualquier campo** — `?orderBy=precio&direction=DESC`
- ✅ **Autenticación por token** — header `Authorization: Bearer <token>` en POST y PUT
