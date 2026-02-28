import * as directorService from "./director.service.js";

function estadoValido(estado) {
  return estado === "ACTIVO" || estado === "INACTIVO";
}

export async function crear(req, res, next) {
  try {
    const { nombres, estado } = req.body;

    if (!nombres || String(nombres).trim().length < 2) {
      return res.status(400).json({
        message: "Los nombres son obligatorios y deben tener mínimo 2 caracteres",
      });
    }

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const nuevo = await directorService.crearDirector({
      nombres: String(nombres).trim(),
      estado: estado || "ACTIVO",
    });

    return res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
}

export async function listar(req, res, next) {
  try {
    const { estado } = req.query;

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const directores = await directorService.listarDirectores({ estado });
    return res.json(directores);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;

    const director = await directorService.obtenerDirectorPorId(id);
    if (!director) {
      return res.status(404).json({ message: "Director no encontrado" });
    }

    return res.json(director);
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { nombres, estado } = req.body;

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const datosActualizar = {};
    if (nombres !== undefined) datosActualizar.nombres = String(nombres).trim();
    if (estado !== undefined) datosActualizar.estado = estado;

    const actualizado = await directorService.actualizarDirector(
      id,
      datosActualizar
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Director no encontrado" });
    }

    return res.json(actualizado);
  } catch (error) {
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;

    const eliminado = await directorService.eliminarDirector(id);
    if (!eliminado) {
      return res.status(404).json({ message: "Director no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}