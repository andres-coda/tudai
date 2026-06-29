const config = require('../../config/config');

/**
 * Middleware de autenticación por token.
 * El cliente debe enviar el header: Authorization: Bearer <token>
 * Solo se aplica a las rutas que modifican datos (POST, PUT).
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status:  401,
            error:   'No autorizado',
            message: 'Se requiere el header Authorization: Bearer <token>',
        });
    }

    const token = authHeader.slice(7); // quitar "Bearer "

    if (token !== config.api.authToken) {
        return res.status(403).json({
            status:  403,
            error:   'Prohibido',
            message: 'Token inválido.',
        });
    }

    next();
}

module.exports = authMiddleware;
