import * as tipoService from "../services/tipo.service.js";

export async function crear(req, res, next) {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || String(nombre).trim().length < 2) {
      return res.status(400).json({
        message: "El nombre es obligatorio y debe tener mínimo 2 caracteres",
      });
    }

    const nuevo = await tipoService.crearTipo({
      nombre: String(nombre).trim(),
      descripcion: descripcion ? String(descripcion).trim() : "",
    });

    return res.status(201).json(nuevo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya existe un tipo con ese nombre",
      });
    }
    next(error);
  }
}

export async function listar(req, res, next) {
  try {
    const tipos = await tipoService.listarTipos();
    return res.json(tipos);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;

    const tipo = await tipoService.obtenerTipoPorId(id);
    if (!tipo) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    return res.json(tipo);
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const datosActualizar = {};
    if (nombre !== undefined) datosActualizar.nombre = String(nombre).trim();
    if (descripcion !== undefined)
      datosActualizar.descripcion = String(descripcion).trim();

    const actualizado = await tipoService.actualizarTipo(
      id,
      datosActualizar
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    return res.json(actualizado);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya existe un tipo con ese nombre",
      });
    }
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;

    const eliminado = await tipoService.eliminarTipo(id);
    if (!eliminado) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}