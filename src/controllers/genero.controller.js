import * as generoService from "../services/genero.service.js";

function estadoValido(estado) {
  return estado === "ACTIVO" || estado === "INACTIVO";
}

export async function crear(req, res, next) {
  try {
    const { nombre, estado, descripcion } = req.body;

    if (!nombre || nombre.trim().length < 2) {
      return res.status(400).json({
        message: "El nombre es obligatorio y debe tener mínimo 2 caracteres",
      });
    }

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const nuevoGenero = await generoService.crearGenero({
      nombre: nombre.trim(),
      estado: estado || "ACTIVO",
      descripcion: descripcion ? descripcion.trim() : "",
    });

    return res.status(201).json(nuevoGenero);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya existe un género con ese nombre",
      });
    }
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

    const generos = await generoService.listarGeneros({ estado });
    return res.json(generos);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;

    const genero = await generoService.obtenerGeneroPorId(id);
    if (!genero) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    return res.json(genero);
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, estado, descripcion } = req.body;

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const datosActualizar = {};
    if (nombre !== undefined) datosActualizar.nombre = nombre.trim();
    if (estado !== undefined) datosActualizar.estado = estado;
    if (descripcion !== undefined)
      datosActualizar.descripcion = descripcion.trim();

    const actualizado = await generoService.actualizarGenero(
      id,
      datosActualizar
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    return res.json(actualizado);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya existe un género con ese nombre",
      });
    }
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;

    const eliminado = await generoService.eliminarGenero(id);
    if (!eliminado) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}