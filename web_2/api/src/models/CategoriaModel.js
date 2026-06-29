const db = require('../../config/db');

const CAMPOS_ORDENABLES = ['id_categoria', 'nombre'];

class CategoriaModel {

    /**
     * Lista todas las categorías con cantidad de productos.
     * Soporta: ordenamiento por cualquier campo, dirección y paginado.
     */
    static async obtenerTodas({ orderBy = 'nombre', direction = 'ASC', page = 1, limit = 10 } = {}) {
        const campo = CAMPOS_ORDENABLES.includes(orderBy) ? `c.${orderBy}` : 'c.nombre';
        const dir   = direction.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const offset = (Math.max(1, page) - 1) * limit;

        const [rows] = await db.query(`
            SELECT c.id_categoria, c.nombre, c.descripcion, c.imagen_url,
                   COUNT(p.id_producto) AS cantidad_productos
            FROM categoria c
            LEFT JOIN producto p ON c.id_categoria = p.id_categoria
            GROUP BY c.id_categoria
            ORDER BY ${campo} ${dir}
            LIMIT ? OFFSET ?
        `, [Number(limit), Number(offset)]);

        const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM categoria');

        return {
            data: rows,
            meta: {
                total,
                page:       Number(page),
                limit:      Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /** Obtiene una categoría por ID con sus productos */
    static async obtenerPorId(id) {
        const [[categoriaRows], [productosRows]] = await Promise.all([
            db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]),
            db.query(`
                SELECT id_producto, nombre, descripcion, precio, stock, imagen_url
                FROM producto WHERE id_categoria = ?
                ORDER BY nombre
            `, [id]),
        ]);

        if (!categoriaRows[0]) return null;

        return {
            ...categoriaRows[0],
            productos: productosRows,
        };
    }

    /** Inserta una nueva categoría */
    static async insertar({ nombre, descripcion, imagen_url }) {
        const [result] = await db.query(`
            INSERT INTO categoria (nombre, descripcion, imagen_url)
            VALUES (?, ?, ?)
        `, [nombre, descripcion ?? null, imagen_url ?? null]);

        return result.insertId;
    }

    /** Actualiza una categoría existente */
    static async actualizar(id, { nombre, descripcion, imagen_url }) {
        const [result] = await db.query(`
            UPDATE categoria
            SET nombre = ?, descripcion = ?, imagen_url = ?
            WHERE id_categoria = ?
        `, [nombre, descripcion ?? null, imagen_url ?? null, id]);

        return result.affectedRows;
    }
}

module.exports = CategoriaModel;
