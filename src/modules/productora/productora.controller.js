import * as productoraService from "./productora.service.js";

function estadoValido(estado) {
  return estado === "ACTIVO" || estado === "INACTIVO";
}

export async function crear(req, res, next) {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;

    if (!nombre || String(nombre).trim().length < 2) {
      return res.status(400).json({
        message: "El nombre es obligatorio y debe tener mínimo 2 caracteres",
      });
    }

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const nueva = await productoraService.crearProductora({
      nombre: String(nombre).trim(),
      estado: estado || "ACTIVO",
      slogan: slogan ? String(slogan).trim() : "",
      descripcion: descripcion ? String(descripcion).trim() : "",
    });

    return res.status(201).json(nueva);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya existe una productora con ese nombre",
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

    const productoras = await productoraService.listarProductoras({ estado });
    return res.json(productoras);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;

    const productora = await productoraService.obtenerProductoraPorId(id);
    if (!productora) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }

    return res.json(productora);
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, estado, slogan, descripcion } = req.body;

    if (estado && !estadoValido(estado)) {
      return res.status(400).json({
        message: "El estado debe ser ACTIVO o INACTIVO",
      });
    }

    const datosActualizar = {};
    if (nombre !== undefined) datosActualizar.nombre = String(nombre).trim();
    if (estado !== undefined) datosActualizar.estado = estado;
    if (slogan !== undefined) datosActualizar.slogan = String(slogan).trim();
    if (descripcion !== undefined)
      datosActualizar.descripcion = String(descripcion).trim();

    const actualizado = await productoraService.actualizarProductora(
      id,
      datosActualizar
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }

    return res.json(actualizado);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya existe una productora con ese nombre",
      });
    }
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;

    const eliminada = await productoraService.eliminarProductora(id);
    if (!eliminada) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}