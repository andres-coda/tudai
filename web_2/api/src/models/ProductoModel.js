const db = require('../../config/db');

// Campos válidos por los que se puede ordenar
const CAMPOS_ORDENABLES = ['id_producto', 'nombre', 'precio', 'stock', 'id_categoria'];

class ProductoModel {

    /**
     * Lista todos los productos con nombre de categoría.
     * Soporta: ordenamiento por cualquier campo, dirección, paginado y filtro por categoría.
     *
     * @param {object} opciones
     * @param {string}  opciones.orderBy   - campo por el que ordenar
     * @param {string}  opciones.direction - 'ASC' | 'DESC'
     * @param {number}  opciones.page      - página actual (1-based)
     * @param {number}  opciones.limit     - items por página
     * @param {number}  opciones.categoria - filtrar por id_categoria
     */
    static async obtenerTodos({ orderBy = 'id_producto', direction = 'ASC', page = 1, limit = 10, categoria } = {}) {
        // Validar campo de ordenamiento para evitar SQL injection
        const campo = CAMPOS_ORDENABLES.includes(orderBy) ? `p.${orderBy}` : 'p.id_producto';
        const dir   = direction.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const offset = (Math.max(1, page) - 1) * limit;

        const params = [];
        let whereClause = '';

        if (categoria) {
            whereClause = 'WHERE p.id_categoria = ?';
            params.push(Number(categoria));
        }

        // Query principal
        const query = `
            SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock,
                   p.imagen_url, p.id_categoria,
                   c.nombre AS categoria_nombre
            FROM producto p
            LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
            ${whereClause}
            ORDER BY ${campo} ${dir}
            LIMIT ? OFFSET ?
        `;
        params.push(Number(limit), Number(offset));

        // Query de total para metadatos de paginado
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM producto p
            ${whereClause}
        `;
        const countParams = categoria ? [Number(categoria)] : [];

        const [[rows], [countRows]] = await Promise.all([
            db.query(query, params),
            db.query(countQuery, countParams),
        ]);

        const total = countRows[0].total;

        return {
            data:  rows,
            meta: {
                total,
                page:       Number(page),
                limit:      Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /** Obtiene un producto por ID con nombre de categoría */
    static async obtenerPorId(id) {
        const [rows] = await db.query(`
            SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock,
                   p.imagen_url, p.id_categoria,
                   c.nombre AS categoria_nombre
            FROM producto p
            LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
            WHERE p.id_producto = ?
        `, [id]);

        return rows[0] ?? null;
    }

    /** Inserta un nuevo producto */
    static async insertar({ nombre, descripcion, precio, stock, imagen_url, id_categoria }) {
        const [result] = await db.query(`
            INSERT INTO producto (nombre, descripcion, precio, stock, imagen_url, id_categoria)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [nombre, descripcion ?? null, precio, stock ?? 0, imagen_url ?? null, id_categoria]);

        return result.insertId;
    }

    /** Actualiza un producto existente */
    static async actualizar(id, { nombre, descripcion, precio, stock, imagen_url, id_categoria }) {
        const [result] = await db.query(`
            UPDATE producto
            SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, id_categoria = ?
            WHERE id_producto = ?
        `, [nombre, descripcion ?? null, precio, stock ?? 0, imagen_url ?? null, id_categoria, id]);

        return result.affectedRows;
    }
}

module.exports = ProductoModel;
