const ProductoModel = require('../models/ProductoModel');

class ProductoController {

    /** GET /api/productos */
    static async listar(req, res) {
        const { orderBy, direction, page = 1, limit = 10, categoria } = req.query;

        // Validar limit para no permitir valores absurdos
        const limitNum = Math.min(Math.max(1, Number(limit) || 10), 100);

        const resultado = await ProductoModel.obtenerTodos({
            orderBy,
            direction,
            page:      Number(page) || 1,
            limit:     limitNum,
            categoria: categoria ? Number(categoria) : undefined,
        });

        return res.status(200).json(resultado);
    }

    /** GET /api/productos/:id */
    static async obtenerUno(req, res) {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ status: 400, error: 'ID inválido.' });
        }

        const producto = await ProductoModel.obtenerPorId(id);

        if (!producto) {
            return res.status(404).json({ status: 404, error: `Producto con id ${id} no encontrado.` });
        }

        return res.status(200).json(producto);
    }

    /** POST /api/productos */
    static async crear(req, res) {
        const { nombre, descripcion, precio, stock, imagen_url, id_categoria } = req.body;

        const errores = ProductoController.#validar({ nombre, precio, id_categoria });
        if (errores.length > 0) {
            return res.status(400).json({ status: 400, error: 'Datos inválidos.', detalles: errores });
        }

        const insertId = await ProductoModel.insertar({ nombre, descripcion, precio, stock, imagen_url, id_categoria });
        const nuevo    = await ProductoModel.obtenerPorId(insertId);

        return res.status(201).json(nuevo);
    }

    /** PUT /api/productos/:id */
    static async actualizar(req, res) {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ status: 400, error: 'ID inválido.' });
        }

        const existente = await ProductoModel.obtenerPorId(id);
        if (!existente) {
            return res.status(404).json({ status: 404, error: `Producto con id ${id} no encontrado.` });
        }

        const { nombre, descripcion, precio, stock, imagen_url, id_categoria } = req.body;

        const errores = ProductoController.#validar({ nombre, precio, id_categoria });
        if (errores.length > 0) {
            return res.status(400).json({ status: 400, error: 'Datos inválidos.', detalles: errores });
        }

        await ProductoModel.actualizar(id, { nombre, descripcion, precio, stock, imagen_url, id_categoria });
        const actualizado = await ProductoModel.obtenerPorId(id);

        return res.status(200).json(actualizado);
    }

    // ── Privado ────────────────────────────────────────────────────────────────

    static #validar({ nombre, precio, id_categoria }) {
        const errores = [];
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            errores.push('El campo "nombre" es obligatorio.');
        }
        if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) <= 0) {
            errores.push('El campo "precio" debe ser un número mayor a 0.');
        }
        if (!id_categoria || isNaN(Number(id_categoria))) {
            errores.push('El campo "id_categoria" es obligatorio y debe ser un número.');
        }
        return errores;
    }
}

module.exports = ProductoController;
