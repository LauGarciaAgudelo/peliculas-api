import { Productora } from "./productora.model.js";

export async function crearProductora(data) {
  return Productora.create(data);
}

export async function listarProductoras({ estado } = {}) {
  const filtro = {};
  if (estado) filtro.estado = estado;

  return Productora.find(filtro).sort({ nombre: 1 });
}

export async function obtenerProductoraPorId(id) {
  return Productora.findById(id);
}

export async function actualizarProductora(id, data) {
  return Productora.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function eliminarProductora(id) {
  return Productora.findByIdAndDelete(id);
}