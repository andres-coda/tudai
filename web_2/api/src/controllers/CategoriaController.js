const CategoriaModel = require('../models/CategoriaModel');

class CategoriaController {

    /** GET /api/categorias */
    static async listar(req, res) {
        const { orderBy, direction, page = 1, limit = 10 } = req.query;

        const limitNum = Math.min(Math.max(1, Number(limit) || 10), 100);

        const resultado = await CategoriaModel.obtenerTodas({
            orderBy,
            direction,
            page:  Number(page) || 1,
            limit: limitNum,
        });

        return res.status(200).json(resultado);
    }

    /** GET /api/categorias/:id */
    static async obtenerUna(req, res) {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ status: 400, error: 'ID inválido.' });
        }

        const categoria = await CategoriaModel.obtenerPorId(id);

        if (!categoria) {
            return res.status(404).json({ status: 404, error: `Categoría con id ${id} no encontrada.` });
        }

        return res.status(200).json(categoria);
    }

    /** POST /api/categorias */
    static async crear(req, res) {
        const { nombre, descripcion, imagen_url } = req.body;

        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({ status: 400, error: 'El campo "nombre" es obligatorio.' });
        }

        const insertId = await CategoriaModel.insertar({ nombre, descripcion, imagen_url });
        const nueva    = await CategoriaModel.obtenerPorId(insertId);

        return res.status(201).json(nueva);
    }

    /** PUT /api/categorias/:id */
    static async actualizar(req, res) {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ status: 400, error: 'ID inválido.' });
        }

        const existente = await CategoriaModel.obtenerPorId(id);
        if (!existente) {
            return res.status(404).json({ status: 404, error: `Categoría con id ${id} no encontrada.` });
        }

        const { nombre, descripcion, imagen_url } = req.body;

        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({ status: 400, error: 'El campo "nombre" es obligatorio.' });
        }

        await CategoriaModel.actualizar(id, { nombre, descripcion, imagen_url });
        const actualizada = await CategoriaModel.obtenerPorId(id);

        return res.status(200).json(actualizada);
    }
}

module.exports = CategoriaController;
