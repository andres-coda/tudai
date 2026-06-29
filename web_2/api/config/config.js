// ─────────────────────────────────────────────────────────────
// Configuración de la base de datos
// Debe coincidir con los valores del config.php del TPE Parte 2
// ─────────────────────────────────────────────────────────────
const config = {
    db: {
        host:     process.env.DB_HOST     || 'localhost',
        port:     process.env.DB_PORT     || 3306,
        database: process.env.DB_NAME     || 'tienda_online',
        user:     process.env.DB_USER     || 'root',
        password: process.env.DB_PASS     || '',
    },
    api: {
        port:      process.env.PORT       || 3000,
        // Token estático para autenticación de escritura (PUT, POST)
        // En producción usar una variable de entorno segura
        authToken: process.env.AUTH_TOKEN || 'secret-token-tienda-2024',
    },
};

module.exports = config;
