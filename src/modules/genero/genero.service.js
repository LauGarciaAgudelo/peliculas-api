import { Genero } from "./genero.model.js";

export async function crearGenero(data) {
  return Genero.create(data);
}

export async function listarGeneros({ estado } = {}) {
  const filtro = {};
  if (estado) filtro.estado = estado;

  return Genero.find(filtro).sort({ nombre: 1 });
}

export async function obtenerGeneroPorId(id) {
  return Genero.findById(id);
}

export async function actualizarGenero(id, data) {
  return Genero.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function eliminarGenero(id) {
  return Genero.findByIdAndDelete(id);
}