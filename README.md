# Carpas El Fuerte - E-Commerce

Proyecto Node.js + Express + MongoDB (Mongoose) para la empresa **Carpas El Fuerte**.

## Arquitectura MVC

```
src/
├── app.js                  # Configuración Express
├── index.js                # Punto de entrada
├── controllers/
│   ├── productosController.js
│   └── carritoController.js
├── models/
│   ├── productosModel.js
│   ├── carritoModel.js
│   └── usuariosModel.js
├── routes/
│   ├── productosRoutes.js
│   ├── carritoRoutes.js
│   └── usuariosRoutes.js
├── database/
│   └── conexionAtlas.js
└── views/               # Handlebars templates
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/productos | Listar todos los productos |
| GET | /api/productos/:id | Obtener producto por ID |
| POST | /api/productos | Crear nuevo producto |
| PUT | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto |
| POST | /api/carrito | Guardar pedido del carrito |
| GET | /api/carrito | Listar todos los pedidos |

## Instalación

```bash
npm install
cp .env.example .env
# Completar MONGO_PASSWORD en .env
npm start
```
