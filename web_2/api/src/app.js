const express    = require('express');
const config     = require('../config/config');
const productos  = require('./routes/productos');
const categorias = require('./routes/categorias');

const app = express();

// ── Middlewares globales ──────────────────────────────────────
app.use(express.json()); // parsear body JSON

// ── Rutas ─────────────────────────────────────────────────────
app.use('/api/productos',  productos);
app.use('/api/categorias', categorias);

// Ruta raíz — info de la API
app.get('/', (req, res) => {
    res.json({
        nombre:   'TiendaOnline API',
        version:  '1.0.0',
        endpoints: {
            productos:  '/api/productos',
            categorias: '/api/categorias',
        },
    });
});

// 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).json({ status: 404, error: `Ruta ${req.method} ${req.path} no encontrada.` });
});

// ── Manejador global de errores ───────────────────────────────
// Captura cualquier error no manejado en los controllers/models
// y evita que el servidor se caiga
app.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).json({ status: 500, error: 'Error interno del servidor.' });
});

// ── Iniciar servidor ──────────────────────────────────────────
app.listen(config.api.port, () => {
    console.log(`TiendaOnline API corriendo en http://localhost:${config.api.port}`);
});
